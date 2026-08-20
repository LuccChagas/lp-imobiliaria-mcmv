import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type CorpoLead = {
  nome?: string;
  whatsapp?: string;
  dormitorios?: string;
  renda?: string;
  fgts?: string;
  origem?: string;
  pagina?: string;
};

function texto(valor: unknown, limite = 200) {
  return typeof valor === "string" ? valor.trim().slice(0, limite) : "";
}

/** Extrai as UTMs da URL da pagina para a planilha saber de onde veio o lead. */
function extrairUtms(pagina: string) {
  const vazio = {
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_content: "",
    utm_term: "",
  };
  if (!pagina) return vazio;
  try {
    const parametros = new URL(pagina).searchParams;
    return {
      utm_source: parametros.get("utm_source") ?? "",
      utm_medium: parametros.get("utm_medium") ?? "",
      utm_campaign: parametros.get("utm_campaign") ?? "",
      utm_content: parametros.get("utm_content") ?? "",
      utm_term: parametros.get("utm_term") ?? "",
    };
  } catch {
    return vazio;
  }
}

export async function POST(requisicao: Request) {
  let corpo: CorpoLead;
  try {
    corpo = (await requisicao.json()) as CorpoLead;
  } catch {
    return NextResponse.json({ ok: false, erro: "json_invalido" }, { status: 400 });
  }

  const nome = texto(corpo.nome, 120);
  const whatsapp = texto(corpo.whatsapp, 30);
  const digitos = whatsapp.replace(/\D/g, "");

  if (nome.length < 2 || digitos.length < 10 || digitos.length > 11) {
    return NextResponse.json({ ok: false, erro: "dados_invalidos" }, { status: 400 });
  }

  const pagina = texto(corpo.pagina, 500);

  const lead = {
    recebidoEm: new Date().toISOString(),
    nome,
    whatsapp,
    whatsappDigitos: digitos,
    dormitorios: texto(corpo.dormitorios, 60),
    renda: texto(corpo.renda, 60),
    fgts: texto(corpo.fgts, 20),
    origem: texto(corpo.origem, 60) || "formulario",
    pagina,
    referencia: texto(requisicao.headers.get("referer"), 500),
    ...extrairUtms(pagina),
  };

  // O encaminhamento e best-effort. Se o webhook cair, demorar ou responder
  // erro, o lead NAO pode ser bloqueado — o cliente ja seguiu para o WhatsApp.
  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.LEAD_WEBHOOK_TOKEN
            ? { "X-Token": process.env.LEAD_WEBHOOK_TOKEN }
            : {}),
        },
        body: JSON.stringify({
          ...lead,
          token: process.env.LEAD_WEBHOOK_TOKEN ?? "",
        }),
        signal: AbortSignal.timeout(6000),
        redirect: "follow",
      });
    } catch {
      /* silencioso de proposito — ver comentario acima */
    }
  } else if (process.env.NODE_ENV !== "production") {
    console.warn("[lead] LEAD_WEBHOOK_URL nao configurada. Lead recebido:", lead);
  }

  return NextResponse.json({ ok: true });
}
