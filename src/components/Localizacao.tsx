import { SecaoTitulo } from "./ui/SecaoTitulo";
import { Reveal } from "./ui/Reveal";
import { CtaWhatsApp } from "./ui/CtaWhatsApp";
import { IconeLocal, IconeSeta } from "./ui/Icones";
import { localizacao } from "@/lib/site";

function mapa(...partes: string[]) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(partes.join(", "))}`;
}

function CartaoEndereco({
  rotulo,
  linha1,
  linha2,
  destaque = false,
}: {
  rotulo: string;
  linha1: string;
  linha2: string;
  destaque?: boolean;
}) {
  return (
    <div
      className={
        destaque
          ? "rounded-2xl border border-ouro-500/45 bg-ouro-50 p-5"
          : "rounded-2xl border border-tinta-200 bg-superficie p-5"
      }
    >
      <p className="flex items-center gap-2 text-[0.6875rem] font-semibold tracking-[0.12em] text-ouro-700 uppercase">
        <IconeLocal className="h-4 w-4" />
        {rotulo}
      </p>
      <p className="font-titulo mt-2.5 text-[1.0625rem] leading-snug font-bold text-azul-900">
        {linha1}
      </p>
      <p className="mt-1 text-[0.875rem] text-tinta-600">{linha2}</p>
      <a
        href={mapa(linha1, linha2)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-1.5 text-[0.875rem] font-semibold text-azul-700 underline underline-offset-4 hover:text-azul-800"
      >
        Ver no Google Maps
        <IconeSeta className="h-4 w-4" />
      </a>
    </div>
  );
}

export function Localizacao() {
  return (
    <section id="localizacao" className="border-y border-tinta-200 bg-superficie">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <SecaoTitulo
          sobretitulo={localizacao.sobretitulo}
          titulo={localizacao.titulo}
          descricao={localizacao.descricao}
        />

        <Reveal atraso={80} className="mt-12">
          <div className="grid gap-4 sm:grid-cols-2">
            <CartaoEndereco {...localizacao.enderecoEmpreendimento} />
            <CartaoEndereco {...localizacao.enderecoStand} destaque />
          </div>
        </Reveal>

        {/* Pontos de interesse, agrupados por tipo */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {localizacao.pontosDeInteresse.map((grupo, indice) => (
            <Reveal key={grupo.grupo} atraso={100 + indice * 60}>
              <div className="h-full rounded-2xl border border-tinta-200 bg-fundo p-4 sm:p-5">
                <p className="flex items-center gap-2 text-[0.6875rem] font-semibold tracking-[0.12em] text-ouro-700 uppercase">
                  <span aria-hidden="true" className="h-px w-4 bg-ouro-500" />
                  {grupo.grupo}
                </p>
                <ul className="mt-3.5 grid gap-3">
                  {grupo.itens.map((item) => (
                    <li key={item.nome}>
                      <p className="font-titulo text-[0.9375rem] leading-snug font-bold text-azul-900">
                        {item.nome}
                      </p>
                      <p className="mt-0.5 text-[0.8125rem] leading-snug text-tinta-600">
                        {item.detalhe}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal atraso={160} className="mt-6">
          <p className="text-center text-xs text-tinta-500">
            {localizacao.avisoPontos}
          </p>
        </Reveal>

        <Reveal atraso={200} className="mt-9 text-center">
          <CtaWhatsApp origem="localizacao">Quero agendar uma visita</CtaWhatsApp>
        </Reveal>
      </div>
    </section>
  );
}
