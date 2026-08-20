import { SecaoTitulo } from "./ui/SecaoTitulo";
import { Reveal } from "./ui/Reveal";
import { CtaWhatsApp } from "./ui/CtaWhatsApp";
import { CtaFormulario } from "./ui/CtaFormulario";
import { IconeCheck } from "./ui/Icones";
import { condicoes } from "@/lib/site";

export function Condicoes() {
  return (
    <section id="condicoes" className="bg-fundo">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <SecaoTitulo
          sobretitulo={condicoes.sobretitulo}
          titulo={condicoes.titulo}
          descricao={condicoes.descricao}
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {condicoes.itens.map((item, indice) => (
            <Reveal key={item.titulo} como="li" atraso={indice * 60}>
              <div className="h-full rounded-2xl border border-tinta-200 bg-superficie p-5 transition-colors hover:border-ouro-500/50">
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-verde-50 text-verde-600"
                >
                  <IconeCheck className="h-5 w-5" />
                </span>
                <h3 className="font-titulo mt-4 text-[1.0625rem] leading-snug font-bold text-azul-900">
                  {item.titulo}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-tinta-600">
                  {item.texto}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>

        {/* Faixas reais do registro do empreendimento */}
        <Reveal atraso={120} className="mt-12">
          <div className="rounded-2xl border border-ouro-500/35 bg-ouro-50 p-6 sm:p-8">
            <h3 className="font-titulo text-xl font-extrabold text-azul-900">
              {condicoes.faixasTitulo}
            </h3>
            <p className="mt-2 text-[0.9375rem] text-tinta-600">
              {condicoes.faixasDescricao}
            </p>
            <ul className="mt-6 grid gap-4 sm:grid-cols-3">
              {condicoes.faixas.map((faixa) => (
                <li
                  key={faixa.tipo}
                  className="rounded-xl border border-ouro-500/30 bg-superficie px-5 py-4"
                >
                  <p className="numerico font-titulo text-3xl leading-none font-extrabold text-azul-800">
                    {faixa.unidades}
                  </p>
                  <p className="mt-1.5 text-[0.8125rem] font-semibold tracking-wide text-ouro-700 uppercase">
                    {faixa.tipo}
                  </p>
                  <p className="mt-2 text-[0.875rem] leading-snug text-tinta-600">
                    {faixa.renda}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal atraso={160} className="mt-8">
          <div className="mx-auto max-w-3xl rounded-2xl border border-tinta-200 bg-tinta-100 px-5 py-4">
            <p className="text-[0.8125rem] leading-relaxed text-tinta-600">
              <span className="font-semibold text-tinta-700">Importante: </span>
              {condicoes.aviso}
            </p>
          </div>
        </Reveal>

        {/* A simulacao pede renda, FGTS e dormitorios — que sao exatamente os
            campos do formulario. Por isso aqui ele vem antes do WhatsApp. */}
        <Reveal atraso={200} className="mt-8">
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CtaFormulario origem="condicoes">{condicoes.cta}</CtaFormulario>
            <CtaWhatsApp origem="condicoes" className="min-h-14">
              Prefiro falar no WhatsApp
            </CtaWhatsApp>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
