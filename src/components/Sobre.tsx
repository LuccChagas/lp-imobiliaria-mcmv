import Image from "next/image";
import { Reveal } from "./ui/Reveal";
import { CtaWhatsApp } from "./ui/CtaWhatsApp";
import { IconeCheck, IconeInstagramColorido } from "./ui/Icones";
import { contato, pessoa, sobre } from "@/lib/site";

export function Sobre() {
  return (
    <section id="sobre" className="border-y border-tinta-200 bg-superficie">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16">
        {/* Foto institucional com a foto do contrato encaixada no canto */}
        <Reveal className="relative">
          <div className="relative mx-auto w-full max-w-md">
            {/* A foto do contrato e a principal: assinatura na mao vale mais
                como prova do que retrato posado. */}
            <div className="overflow-hidden rounded-2xl border border-ouro-500/35 bg-tinta-100">
              <Image
                src={sobre.fotoContrato.src}
                alt={sobre.fotoContrato.alt}
                width={sobre.fotoContrato.largura}
                height={sobre.fotoContrato.altura}
                sizes="(min-width: 1024px) 28rem, 100vw"
                className="aspect-square w-full object-cover object-center"
              />
            </div>

            <div className="absolute -right-3 -bottom-10 w-32 overflow-hidden rounded-2xl border-4 border-superficie bg-tinta-100 shadow-[0_18px_40px_-20px_rgb(6_25_49_/_0.55)] sm:-right-5 sm:w-40">
              <Image
                src={sobre.fotoInstitucional.src}
                alt={sobre.fotoInstitucional.alt}
                width={sobre.fotoInstitucional.largura}
                height={sobre.fotoInstitucional.altura}
                sizes="160px"
                className="aspect-[3/4] w-full object-cover object-center"
              />
            </div>
          </div>
        </Reveal>

        <div className="mt-12 lg:mt-0">
          <Reveal atraso={60}>
            <p className="mb-3 flex items-center gap-2 text-[0.8125rem] font-semibold tracking-[0.14em] text-ouro-700 uppercase">
              <span aria-hidden="true" className="h-px w-6 bg-ouro-500/70" />
              {sobre.sobretitulo}
            </p>
            <h2 className="font-titulo text-[clamp(1.75rem,1.15rem+2.5vw,2.75rem)] leading-[1.15] font-extrabold tracking-[-0.02em] text-azul-900 text-balance">
              {sobre.titulo}
            </h2>
          </Reveal>

          <Reveal atraso={110}>
            <div className="mt-5 grid gap-4">
              {sobre.paragrafos.map((paragrafo) => (
                <p
                  key={paragrafo.slice(0, 24)}
                  className="text-[1.0625rem] leading-relaxed text-tinta-700 text-pretty"
                >
                  {paragrafo}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal atraso={150}>
            <dl className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-tinta-200 bg-tinta-200">
              {sobre.metricas.map((metrica) => (
                <div key={metrica.rotulo} className="bg-fundo px-4 py-5 text-center">
                  <dt className="sr-only">{metrica.rotulo}</dt>
                  <dd>
                    <span className="numerico font-titulo block text-[clamp(1.375rem,1.1rem+1.2vw,1.875rem)] leading-none font-extrabold text-azul-800">
                      {metrica.valor}
                    </span>
                    <span className="mt-2 block text-[0.75rem] leading-snug text-tinta-600">
                      {metrica.rotulo}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal atraso={190}>
            <ul className="mt-7 grid gap-2.5 border-t border-ouro-500/30 pt-6">
              {sobre.itensCredencial.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <IconeCheck className="mt-[3px] h-4 w-4 shrink-0 text-verde-600" />
                  <span className="text-[0.9375rem] font-medium text-tinta-700">
                    {item}
                  </span>
                </li>
              ))}
              <li className="flex items-start gap-2.5">
                <IconeCheck className="mt-[3px] h-4 w-4 shrink-0 text-verde-600" />
                <span className="numerico text-[0.9375rem] font-semibold text-tinta-700">
                  {contato.creci}
                </span>
              </li>
            </ul>
          </Reveal>

          <Reveal atraso={230}>
            {/* Mesma altura nos dois e nenhum quebra em duas linhas.
                Se nao couberem lado a lado, o do Instagram desce inteiro. */}
            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <CtaWhatsApp
                origem="sobre"
                className="min-h-[3.625rem] w-full whitespace-nowrap sm:w-auto lg:w-full xl:w-auto"
              >
                {sobre.cta}
              </CtaWhatsApp>
              <a
                href={`https://instagram.com/${contato.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram de ${pessoa.nome}: @${contato.instagram}`}
                className="inline-flex min-h-[3.625rem] w-full items-center justify-center gap-2 rounded-xl border border-tinta-300 bg-superficie px-4 text-[0.875rem] font-semibold whitespace-nowrap text-azul-800 transition-colors hover:border-azul-300 hover:bg-azul-50 sm:w-auto lg:w-full xl:w-auto"
              >
                <IconeInstagramColorido className="h-5 w-5 shrink-0" />
                @{contato.instagram}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
