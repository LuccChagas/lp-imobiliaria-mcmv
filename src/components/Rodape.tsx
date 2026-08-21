import Image from "next/image";
import Link from "next/link";
import { CtaWhatsApp } from "./ui/CtaWhatsApp";
import {
  contato,
  empreendimento,
  navegacao,
  pessoa,
  rodape,
  selos,
} from "@/lib/site";

export function Rodape() {
  const ano = 2026;

  return (
    <footer className="bg-azul-950 text-azul-100">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="font-titulo text-lg font-extrabold tracking-[0.08em] text-white uppercase">
              {pessoa.nome}
            </p>
            <span aria-hidden="true" className="mt-2.5 block h-px w-12 bg-ouro-500" />
            <p className="mt-2.5 text-sm font-medium text-azul-200">
              {pessoa.credencial}
            </p>
            <p className="mt-4 max-w-sm text-[0.9375rem] leading-relaxed text-azul-200">
              {rodape.descricao}
            </p>

            {/* CRECI — obrigatorio em publicidade imobiliaria (Lei 6.530/78) */}
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="numerico inline-block rounded-lg border border-ouro-500/40 bg-ouro-500/10 px-3.5 py-2 text-sm font-semibold text-ouro-200">
                {contato.creci}
              </span>
              <span className="numerico inline-block rounded-lg border border-white/15 bg-white/5 px-3.5 py-2 text-sm font-medium text-azul-200">
                Central de Vendas Cury · {contato.creciCentralCury}
              </span>
            </div>
          </div>

          <nav aria-label="Rodapé">
            <p className="text-[0.8125rem] font-semibold tracking-[0.12em] text-ouro-300 uppercase">
              Nesta página
            </p>
            <ul className="mt-4 grid gap-2.5">
              {navegacao.map((item) => (
                <li key={item.ancora}>
                  <a
                    href={item.ancora}
                    className="text-[0.9375rem] text-azul-200 transition-colors hover:text-white"
                  >
                    {item.rotulo}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#formulario"
                  className="text-[0.9375rem] text-azul-200 transition-colors hover:text-white"
                >
                  Fazer minha simulação
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <p className="text-[0.8125rem] font-semibold tracking-[0.12em] text-ouro-300 uppercase">
              Contato
            </p>
            {/* So dois canais, por decisao do cliente. */}
            <p className="mt-4 max-w-xs text-[0.9375rem] leading-relaxed text-azul-200">
              O atendimento acontece pelo WhatsApp ou pelo formulário desta
              página. É por ali que eu respondo.
            </p>
            <div className="mt-5 flex flex-col gap-3">
              <CtaWhatsApp origem="rodape" tamanho="medio" variante="ouro">
                Falar no WhatsApp
              </CtaWhatsApp>
              <a
                href="#formulario"
                className="inline-flex items-center justify-center rounded-xl border border-white/25 px-5 py-3 text-[0.9375rem] font-semibold text-white transition-colors hover:bg-white/10"
              >
                Deixar meus dados
              </a>
            </div>
          </div>
        </div>

        {/* Selos institucionais em versao clara sobre o fundo escuro */}
        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/10 pt-8">
          {selos.itens.map((selo) => (
            <Image
              key={selo.src}
              src={selo.src}
              alt={selo.alt}
              width={selo.largura}
              height={selo.altura}
              sizes="130px"
              className="h-6 w-auto rounded bg-white/95 px-2 py-1"
            />
          ))}
        </div>

        {/* Avisos legais. O primeiro e exigido pela Lei 4.591/64 — nao remova. */}
        <div className="mt-8 grid gap-4 border-t border-white/10 pt-8">
          <p className="text-[0.6875rem] leading-relaxed text-azul-300">
            {rodape.avisoLegal}
          </p>
          <p className="text-[0.6875rem] leading-relaxed text-azul-300">
            {rodape.avisoIlustrativo}
          </p>
          <p className="text-[0.6875rem] leading-relaxed text-azul-300">
            {rodape.avisoNaoOficial} {empreendimento.nome} é um empreendimento da
            Cury Construtora e Incorporadora S/A.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-azul-300">
            © {ano} {pessoa.nome}. Todos os direitos reservados.
          </p>
          <Link
            href="/politica-de-privacidade"
            className="text-xs font-medium text-azul-200 underline underline-offset-4 transition-colors hover:text-white"
          >
            {rodape.linkPrivacidade}
          </Link>
        </div>
      </div>

      <div aria-hidden="true" className="h-20 lg:hidden" />
    </footer>
  );
}
