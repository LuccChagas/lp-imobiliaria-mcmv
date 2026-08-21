import { SecaoTitulo } from "./ui/SecaoTitulo";
import { Reveal } from "./ui/Reveal";
import { CtaWhatsApp } from "./ui/CtaWhatsApp";
import { CtaFormulario } from "./ui/CtaFormulario";
import { Galeria } from "./ui/Galeria";
import { IconeLocal } from "./ui/Icones";
import { empreendimento } from "@/lib/site";

export function Empreendimento() {
  return (
    <section id="empreendimento" className="bg-fundo">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <SecaoTitulo
          sobretitulo={empreendimento.sobretitulo}
          titulo={empreendimento.nome}
          descricao={empreendimento.descricao}
        />

        <Reveal atraso={80} className="mt-8">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center rounded-full bg-azul-900 px-3.5 py-1.5 text-[0.6875rem] font-semibold tracking-[0.1em] text-white uppercase">
              {empreendimento.status}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-tinta-200 bg-superficie px-3.5 py-1.5 text-[0.8125rem] text-tinta-600">
              <IconeLocal className="h-4 w-4 shrink-0 text-ouro-700" />
              <span className="text-left">
                {empreendimento.bairro} · {empreendimento.zona}
              </span>
            </span>
          </div>
        </Reveal>

        {/* Ficha tecnica */}
        <Reveal atraso={120} className="mt-10">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-tinta-200 bg-tinta-200 lg:grid-cols-4">
            {empreendimento.fichaTecnica.map((linha) => (
              <div key={linha.rotulo} className="bg-superficie px-5 py-5">
                <dt className="text-[0.6875rem] font-semibold tracking-[0.12em] text-ouro-700 uppercase">
                  {linha.rotulo}
                </dt>
                <dd className="font-titulo mt-1.5 text-[1.0625rem] leading-snug font-bold text-azul-900">
                  {linha.valor}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal atraso={160} className="mt-10">
          <Galeria
            itens={empreendimento.galeria}
            modo="carrossel"
            proporcao="aspect-[4/3]"
            larguraCartao="w-64 sm:w-80"
            duracao="60s"
            sizes="(min-width: 640px) 20rem, 16rem"
          />
        </Reveal>

        <Reveal atraso={200} className="mt-6">
          <p className="text-center text-xs text-tinta-500">
            {empreendimento.avisoIlustrativa}
          </p>
        </Reveal>

        <Reveal atraso={240} className="mt-9">
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CtaFormulario origem="empreendimento">
              Quero receber os valores
            </CtaFormulario>
            <CtaWhatsApp origem="empreendimento" className="min-h-14">
              Prefiro falar no WhatsApp
            </CtaWhatsApp>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
