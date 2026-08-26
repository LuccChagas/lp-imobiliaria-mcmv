import Image from "next/image";
import { CtaPrincipal } from "./ui/CtaPrincipal";
import { Reveal } from "./ui/Reveal";
import { IconeCheck } from "./ui/Icones";
import { hero, pessoa, selos, sobre } from "@/lib/site";

export function Hero() {
  return (
    <section id="topo" className="relative isolate overflow-hidden bg-azul-950">
      {/* Render do empreendimento ocupando a dobra inteira */}
      <Image
        src={hero.imagem.src}
        alt={hero.imagem.alt}
        width={hero.imagem.largura}
        height={hero.imagem.altura}
        priority
        sizes="100vw"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />

      {/* Duas camadas de escurecimento: vertical no celular, lateral no desktop.
          A legibilidade aqui nao e detalhe — muita gente le isso no sol. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-azul-950 via-azul-950/92 to-azul-950/55 lg:bg-gradient-to-r lg:from-azul-950 lg:via-azul-950/88 lg:to-azul-950/25"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-ouro-500/70 to-transparent"
      />

      <div className="mx-auto max-w-6xl px-4 pt-12 pb-14 sm:px-6 sm:pt-16 sm:pb-20 lg:pt-24 lg:pb-28">
        <div className="max-w-2xl">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-ouro-500/45 bg-azul-950/60 px-3.5 py-1.5 text-[0.75rem] font-semibold tracking-[0.1em] text-ouro-300 uppercase backdrop-blur-sm">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ouro-400" />
              {hero.selo}
            </p>
          </Reveal>

          <Reveal atraso={60}>
            <div className="mt-6">
              <p className="font-titulo text-[clamp(1.5rem,1.1rem+1.8vw,2.25rem)] leading-none font-extrabold tracking-[-0.01em] text-white">
                {hero.empreendimento}
              </p>
              <p className="font-titulo mt-1.5 text-[clamp(1rem,0.9rem+0.6vw,1.25rem)] font-bold text-ouro-300">
                {hero.empreendimentoComplemento}
              </p>
              <span aria-hidden="true" className="mt-4 block h-px w-16 bg-ouro-500" />
            </div>
          </Reveal>

          <Reveal atraso={110}>
            <h1 className="mt-6 font-titulo text-[clamp(1.75rem,1.15rem+2.6vw,3rem)] leading-[1.1] font-extrabold tracking-[-0.025em] text-white text-balance">
              {hero.titulo}{" "}
              <span className="text-ouro-300">{hero.tituloDestaque}</span>
            </h1>
          </Reveal>

          <Reveal atraso={160}>
            <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-azul-100 text-pretty">
              {hero.subtitulo}
            </p>
          </Reveal>

          {/* O numero mais importante da pagina */}
          <Reveal atraso={200}>
            <div className="mt-7 inline-flex flex-wrap items-end gap-x-4 gap-y-2 rounded-2xl border border-ouro-500/40 bg-azul-950/55 px-5 py-4 backdrop-blur-sm">
              <div>
                <p className="text-[0.75rem] font-semibold tracking-[0.12em] text-ouro-300 uppercase">
                  {hero.destaqueRotulo}
                </p>
                <p className="numerico font-titulo mt-0.5 text-[clamp(2.25rem,1.6rem+2.4vw,3.25rem)] leading-none font-extrabold text-white">
                  {hero.destaqueValor}
                </p>
              </div>
              <p className="pb-1 text-[0.9375rem] font-medium text-azul-100">
                {hero.destaqueApoio}
              </p>
            </div>
          </Reveal>

          <Reveal atraso={240}>
            <ul className="mt-7 grid gap-2.5">
              {hero.itens.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ouro-500/25 text-ouro-300"
                  >
                    <IconeCheck className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-[0.9375rem] font-medium text-azul-100 sm:text-base">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal atraso={280}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <CtaPrincipal origem="hero">{hero.ctaPrimario}</CtaPrincipal>
              <a
                href="#empreendimento"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/35 bg-white/8 px-6 py-4 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/16 active:bg-white/24"
              >
                {hero.ctaSecundario}
              </a>
            </div>
          </Reveal>

          {/* Quem atende — presente ja na dobra, mas sem roubar o empreendimento */}
          <Reveal atraso={320}>
            <div className="mt-9 flex items-center gap-4 border-t border-white/15 pt-6 sm:gap-5">
              <Image
                src={sobre.fotoRetrato.src}
                alt={sobre.fotoRetrato.alt}
                width={sobre.fotoRetrato.largura}
                height={sobre.fotoRetrato.altura}
                sizes="(min-width: 640px) 112px, 88px"
                className="h-22 w-22 shrink-0 rounded-2xl border-2 border-ouro-500/70 object-cover object-[center_22%] shadow-[0_14px_32px_-14px_rgb(6_25_49_/_0.85)] sm:h-28 sm:w-28"
              />
              <p className="text-[0.9375rem] leading-snug text-azul-100">
                {hero.atendimento.prefixo}{" "}
                <span className="font-semibold text-white">
                  {hero.atendimento.destaque}
                </span>
                <br />
                <span className="text-azul-200">{pessoa.credencial}</span>
                <br />
                <span className="mt-1.5 inline-block font-semibold text-ouro-300">
                  {hero.atendimento.conquista}
                </span>
              </p>
            </div>
          </Reveal>

          {/* Selos institucionais entram na propria dobra: eram uma secao de
              123px so para tres logos. */}
          <Reveal atraso={360}>
            <ul className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/15 pt-6">
              {selos.itens.map((selo) => (
                <li key={selo.src}>
                  <Image
                    src={selo.src}
                    alt={selo.alt}
                    width={selo.largura}
                    height={selo.altura}
                    sizes="130px"
                    className="h-6 w-auto rounded bg-white/95 px-2 py-1 sm:h-7"
                  />
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
