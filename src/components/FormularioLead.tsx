"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { Reveal } from "./ui/Reveal";
import { IconeWhatsApp } from "./ui/IconeWhatsApp";
import { IconeCheck } from "./ui/Icones";
import { cn } from "@/lib/cn";
import { empreendimento, formulario, linkWhatsApp, pessoa, rodape } from "@/lib/site";
import { rastrearLead } from "@/lib/track";

/** Mascara BR progressiva: (11) 91234-5678 e (11) 1234-5678. */
function mascararTelefone(valor: string) {
  const digitos = valor.replace(/\D/g, "").slice(0, 11);
  if (digitos.length === 0) return "";
  if (digitos.length <= 2) return `(${digitos}`;
  if (digitos.length <= 6) return `(${digitos.slice(0, 2)}) ${digitos.slice(2)}`;
  if (digitos.length <= 10) {
    return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 6)}-${digitos.slice(6)}`;
  }
  return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 7)}-${digitos.slice(7)}`;
}

type Dados = {
  nome: string;
  whatsapp: string;
  dormitorios: string;
  renda: string;
  fgts: string;
};

const inicial: Dados = { nome: "", whatsapp: "", dormitorios: "", renda: "", fgts: "" };

function montarMensagem(dados: Dados) {
  const linhas = [
    `Oi ${pessoa.primeiroNome}! Vim pelo site do ${empreendimento.nome} e quero fazer a simulação.`,
    "",
    `Nome: ${dados.nome}`,
    `WhatsApp: ${dados.whatsapp}`,
  ];
  if (dados.dormitorios) linhas.push(`Dormitórios: ${dados.dormitorios}`);
  if (dados.renda) linhas.push(`Renda familiar aproximada: ${dados.renda}`);
  if (dados.fgts) linhas.push(`Tem FGTS: ${dados.fgts}`);
  return linhas.join("\n");
}

const classeCampo =
  "w-full rounded-xl border bg-superficie px-4 py-3.5 text-base text-tinta-900 " +
  "placeholder:text-tinta-500 transition-colors focus:outline-none";

export function FormularioLead() {
  const idBase = useId();
  const [dados, setDados] = useState<Dados>(inicial);
  const [erros, setErros] = useState<Partial<Record<keyof Dados, string>>>({});
  const [enviado, setEnviado] = useState(false);
  const [linkManual, setLinkManual] = useState<string | null>(null);

  function alterar<C extends keyof Dados>(campo: C, valor: string) {
    setDados((atual) => ({ ...atual, [campo]: valor }));
    if (erros[campo]) setErros((atual) => ({ ...atual, [campo]: undefined }));
  }

  function validar(valores: Dados) {
    const novos: Partial<Record<keyof Dados, string>> = {};
    if (valores.nome.trim().length < 2) novos.nome = formulario.erroNome;
    const digitos = valores.whatsapp.replace(/\D/g, "");
    if (digitos.length < 10 || digitos.length > 11) {
      novos.whatsapp = formulario.erroWhatsapp;
    }
    return novos;
  }

  function aoEnviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    const novosErros = validar(dados);
    setErros(novosErros);
    if (Object.keys(novosErros).length > 0) return;

    // 1a perna — encaminha o lead. Sem await de proposito: se o webhook cair,
    // demorar ou falhar, o WhatsApp abre do mesmo jeito. Perder um lead por
    // causa de um CRM fora do ar e inaceitavel.
    try {
      void fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...dados,
          origem: "formulario",
          // manda a URL inteira para a rota extrair as UTMs da campanha
          pagina: window.location.href,
        }),
        keepalive: true,
      }).catch(() => {});
    } catch {
      /* silencioso de proposito */
    }

    rastrearLead("formulario", {
      dormitorios: dados.dormitorios || undefined,
      renda: dados.renda || undefined,
      fgts: dados.fgts || undefined,
    });

    // 2a perna — abre o WhatsApp no mesmo gesto do usuario, sem nenhum await
    // antes, senao o bloqueador de pop-up do celular engole a janela.
    const url = linkWhatsApp(montarMensagem(dados));
    const janela = window.open(url, "_blank", "noopener,noreferrer");
    if (!janela) setLinkManual(url);

    setEnviado(true);
  }

  if (enviado) {
    return (
      <div className="rounded-2xl border border-verde-500/40 bg-superficie p-7 text-center sm:p-9">
        <span
          aria-hidden="true"
          className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-verde-50 text-verde-600"
        >
          <IconeCheck className="h-7 w-7" />
        </span>
        <h3 className="font-titulo mt-5 text-2xl font-extrabold text-azul-900">
          Prontinho, {dados.nome.trim().split(" ")[0]}!
        </h3>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-tinta-600">
          Abri o WhatsApp com os seus dados já preenchidos. É só apertar enviar que
          eu te respondo.
        </p>

        {linkManual ? (
          <a
            href={linkManual}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center justify-center gap-2.5 rounded-xl bg-azul-500 px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-azul-600"
          >
            <IconeWhatsApp className="h-5 w-5" />
            Não abriu? Toque aqui
          </a>
        ) : null}

        <button
          type="button"
          onClick={() => {
            setEnviado(false);
            setLinkManual(null);
            setDados(inicial);
          }}
          className="mt-5 block w-full text-sm font-medium text-tinta-600 underline underline-offset-4 hover:text-azul-700"
        >
          Enviar outro contato
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={aoEnviar}
      noValidate
      className="rounded-2xl border border-tinta-200 bg-superficie p-5 shadow-[0_20px_50px_-30px_rgb(6_25_49_/_0.6)] sm:p-7"
    >
      <div className="grid gap-4">
        {/* Nome */}
        <div>
          <label
            htmlFor={`${idBase}-nome`}
            className="mb-1.5 block text-sm font-semibold text-tinta-700"
          >
            {formulario.campos.nome.rotulo}{" "}
            <span className="text-ouro-700">*</span>
          </label>
          <input
            id={`${idBase}-nome`}
            name="nome"
            type="text"
            autoComplete="name"
            enterKeyHint="next"
            placeholder={formulario.campos.nome.placeholder}
            value={dados.nome}
            onChange={(evento) => alterar("nome", evento.target.value)}
            aria-invalid={Boolean(erros.nome)}
            aria-describedby={erros.nome ? `${idBase}-nome-erro` : undefined}
            className={cn(
              classeCampo,
              erros.nome
                ? "border-red-500 focus:border-red-600"
                : "border-tinta-300 focus:border-azul-500",
            )}
          />
          {erros.nome ? (
            <p id={`${idBase}-nome-erro`} className="mt-1.5 text-sm text-red-600">
              {erros.nome}
            </p>
          ) : null}
        </div>

        {/* WhatsApp */}
        <div>
          <label
            htmlFor={`${idBase}-whatsapp`}
            className="mb-1.5 block text-sm font-semibold text-tinta-700"
          >
            {formulario.campos.whatsapp.rotulo}{" "}
            <span className="text-ouro-700">*</span>
          </label>
          <input
            id={`${idBase}-whatsapp`}
            name="whatsapp"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            enterKeyHint="next"
            placeholder={formulario.campos.whatsapp.placeholder}
            value={dados.whatsapp}
            onChange={(evento) =>
              alterar("whatsapp", mascararTelefone(evento.target.value))
            }
            aria-invalid={Boolean(erros.whatsapp)}
            aria-describedby={erros.whatsapp ? `${idBase}-whatsapp-erro` : undefined}
            className={cn(
              "numerico",
              classeCampo,
              erros.whatsapp
                ? "border-red-500 focus:border-red-600"
                : "border-tinta-300 focus:border-azul-500",
            )}
          />
          {erros.whatsapp ? (
            <p id={`${idBase}-whatsapp-erro`} className="mt-1.5 text-sm text-red-600">
              {erros.whatsapp}
            </p>
          ) : null}
        </div>

        {/* Dormitorios */}
        <div>
          <label
            htmlFor={`${idBase}-dormitorios`}
            className="mb-1.5 block text-sm font-semibold text-tinta-700"
          >
            {formulario.campos.dormitorios.rotulo}
          </label>
          <select
            id={`${idBase}-dormitorios`}
            name="dormitorios"
            value={dados.dormitorios}
            onChange={(evento) => alterar("dormitorios", evento.target.value)}
            className={cn(
              classeCampo,
              "appearance-none border-tinta-300 focus:border-azul-500",
              dados.dormitorios ? "text-tinta-900" : "text-tinta-500",
            )}
          >
            <option value="">{formulario.campos.dormitorios.placeholder}</option>
            {formulario.opcoesDormitorios.map((opcao) => (
              <option key={opcao} value={opcao}>
                {opcao}
              </option>
            ))}
          </select>
        </div>

        {/* Renda */}
        <div>
          <label
            htmlFor={`${idBase}-renda`}
            className="mb-1.5 block text-sm font-semibold text-tinta-700"
          >
            {formulario.campos.renda.rotulo}
          </label>
          <select
            id={`${idBase}-renda`}
            name="renda"
            value={dados.renda}
            onChange={(evento) => alterar("renda", evento.target.value)}
            className={cn(
              classeCampo,
              "appearance-none border-tinta-300 focus:border-azul-500",
              dados.renda ? "text-tinta-900" : "text-tinta-500",
            )}
          >
            <option value="">{formulario.campos.renda.placeholder}</option>
            {formulario.faixasRenda.map((faixa) => (
              <option key={faixa} value={faixa}>
                {faixa}
              </option>
            ))}
          </select>
        </div>

        {/* FGTS */}
        <fieldset>
          <legend className="mb-1.5 block text-sm font-semibold text-tinta-700">
            {formulario.campos.fgts.rotulo}
          </legend>
          <div className="grid grid-cols-3 gap-2">
            {formulario.opcoesFgts.map((opcao) => {
              const ativo = dados.fgts === opcao;
              return (
                <button
                  key={opcao}
                  type="button"
                  aria-pressed={ativo}
                  onClick={() => alterar("fgts", ativo ? "" : opcao)}
                  className={cn(
                    "rounded-xl border px-3 py-3 text-[0.9375rem] font-semibold transition-colors",
                    ativo
                      ? "border-azul-500 bg-azul-50 text-azul-700"
                      : "border-tinta-300 bg-superficie text-tinta-600 hover:border-azul-300",
                  )}
                >
                  {opcao}
                </button>
              );
            })}
          </div>
        </fieldset>
      </div>

      <button
        type="submit"
        className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-xl bg-azul-500 px-6 py-4 text-base font-semibold text-white shadow-[0_10px_24px_-10px_rgb(21_112_239_/_0.7)] transition-colors hover:bg-azul-600 active:bg-azul-700 sm:text-[1.0625rem]"
      >
        <IconeWhatsApp className="h-5 w-5 shrink-0" />
        {formulario.botao}
      </button>

      <p className="mt-4 text-center text-xs leading-relaxed text-tinta-600">
        {formulario.avisoLgpd}{" "}
        <Link
          href="/politica-de-privacidade"
          className="font-medium text-azul-700 underline underline-offset-2"
        >
          {rodape.linkPrivacidade}
        </Link>
        .
      </p>
    </form>
  );
}

export function SecaoFormulario({
  id = "formulario",
  compacto = false,
}: {
  id?: string;
  /** Versao que aparece logo depois da dobra, para quem ja chega decidido. */
  compacto?: boolean;
} = {}) {
  const texto = compacto ? formulario.antecipado : formulario;
  const itens = compacto
    ? formulario.antecipado.itens
    : [
        "Resposta pelo WhatsApp, direto comigo",
        "Simulação gratuita e sem compromisso",
        "Seus dados não vão para terceiros",
      ];

  return (
    <section
      id={id}
      className="relative isolate overflow-hidden bg-azul-900"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(80% 55% at 20% 0%, #12437f 0%, transparent 62%), radial-gradient(70% 55% at 100% 100%, #0e3565 0%, transparent 65%)",
        }}
      />

      <div
        className={cn(
          "mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16",
          compacto ? "py-12 sm:py-16" : "py-16 sm:py-24",
        )}
      >
        <Reveal>
          <p className="mb-3 flex items-center gap-2 text-[0.8125rem] font-semibold tracking-[0.14em] text-ouro-300 uppercase">
            <span aria-hidden="true" className="h-px w-6 bg-ouro-400/70" />
            {texto.sobretitulo}
          </p>
          <h2 className="font-titulo text-[clamp(1.75rem,1.15rem+2.5vw,2.75rem)] leading-[1.15] font-extrabold tracking-[-0.02em] text-white text-balance">
            {texto.titulo}
          </h2>
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-azul-100 text-pretty">
            {texto.descricao}
          </p>

          <ul className="mt-7 grid gap-3">
            {itens.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ouro-500/20 text-ouro-300"
                >
                  <IconeCheck className="h-3.5 w-3.5" />
                </span>
                <span className="text-[0.9375rem] text-azul-100">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal atraso={120}>
          <FormularioLead />
        </Reveal>
      </div>
    </section>
  );
}
