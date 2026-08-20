import { SecaoTitulo } from "./ui/SecaoTitulo";
import { Reveal } from "./ui/Reveal";
import { CtaWhatsApp } from "./ui/CtaWhatsApp";
import { IconeLocal, IconeSeta } from "./ui/Icones";
import { localizacao } from "@/lib/site";

function mapa(...partes: string[]) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(partes.join(", "))}`;
}

/** Sem iframe de mapa: seria uma requisicao externa pesada e uma chave de API
 *  so para mostrar o que dois links resolvem. */
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
          ? "rounded-2xl border border-ouro-500/45 bg-ouro-50 p-6"
          : "rounded-2xl border border-tinta-200 bg-superficie p-6"
      }
    >
      <p className="flex items-center gap-2 text-[0.6875rem] font-semibold tracking-[0.12em] text-ouro-700 uppercase">
        <IconeLocal className="h-4 w-4" />
        {rotulo}
      </p>
      <p className="font-titulo mt-3 text-lg leading-snug font-bold text-azul-900">
        {linha1}
      </p>
      <p className="mt-1 text-[0.9375rem] text-tinta-600">{linha2}</p>
      <a
        href={mapa(linha1, linha2)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-1.5 text-[0.875rem] font-semibold text-azul-700 underline underline-offset-4 hover:text-azul-800"
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

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <div className="grid gap-4">
              <CartaoEndereco {...localizacao.enderecoEmpreendimento} />
              <CartaoEndereco {...localizacao.enderecoStand} destaque />
            </div>
          </Reveal>

          <Reveal atraso={100}>
            <div className="h-full rounded-2xl border border-tinta-200 bg-fundo p-6">
              <p className="text-[0.6875rem] font-semibold tracking-[0.12em] text-ouro-700 uppercase">
                O que tem em volta
              </p>
              <ul className="mt-5 grid gap-px overflow-hidden rounded-xl bg-tinta-200">
                {localizacao.proximidades.map((item) => (
                  <li
                    key={item.nome}
                    className="flex items-baseline justify-between gap-4 bg-superficie px-4 py-3.5"
                  >
                    <span className="font-titulo text-[0.9375rem] font-bold text-azul-900">
                      {item.nome}
                    </span>
                    <span className="shrink-0 text-right text-[0.8125rem] text-tinta-600">
                      {item.detalhe}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal atraso={140} className="mt-9 text-center">
          <CtaWhatsApp origem="localizacao">Quero agendar uma visita</CtaWhatsApp>
        </Reveal>
      </div>
    </section>
  );
}
