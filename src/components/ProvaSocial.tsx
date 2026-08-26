import Image from "next/image";
import { SecaoTitulo } from "./ui/SecaoTitulo";
import { Reveal } from "./ui/Reveal";
import { Galeria } from "./ui/Galeria";
import { CtaPrincipal } from "./ui/CtaPrincipal";
import { VideoDepoimento } from "./ui/VideoDepoimento";
import { contato, depoimentos, pessoa, provas, sobre } from "@/lib/site";

/**
 * Uma secao so para toda a prova social: prints de conversa, videos, fotos
 * de clientes e a faixa de credencial da Tayna. Antes eram tres secoes
 * separadas dizendo a mesma coisa de tres jeitos.
 */
export function ProvaSocial() {
  return (
    <section id="prova" className="border-y border-tinta-200 bg-superficie">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
        <SecaoTitulo
          sobretitulo={provas.sobretitulo}
          titulo={provas.titulo}
          descricao={depoimentos.descricao}
        />

        {/* Prints primeiro: e o cliente falando, nao posando. */}
        <Reveal atraso={80} className="mt-10">
          <Galeria
            itens={depoimentos.itens}
            modo="faixa"
            proporcao="aspect-[4/5]"
            larguraCartao="w-56"
            colunasFaixa="sm:grid-cols-3"
            comLegenda
            sizes="(min-width: 640px) 33vw, 14rem"
            larguraDialogo="w-[min(94vw,40rem)]"
          />
        </Reveal>

        <Reveal atraso={110} className="mt-4">
          <ul
            className={[
              "mx-auto flex max-w-2xl snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-2",
              "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
              "sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0",
            ].join(" ")}
          >
            {provas.videos.map((video) => (
              <li key={video.src} className="w-36 shrink-0 snap-center sm:w-auto">
                <VideoDepoimento {...video} />
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal atraso={140} className="mt-4">
          <Galeria
            itens={provas.fotos}
            modo="carrossel"
            proporcao="aspect-square"
            larguraCartao="w-28 sm:w-36"
            duracao="80s"
            sizes="(min-width: 640px) 9rem, 7rem"
            larguraDialogo="w-[min(92vw,32rem)]"
          />
        </Reveal>

        {/* Faixa de credencial: a secao "Sobre" inteira virou isto. */}
        <Reveal atraso={170} className="mt-10">
          <div className="grid gap-5 rounded-2xl border border-tinta-200 bg-fundo p-5 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-6 sm:p-6">
            <Image
              src={sobre.fotoContrato.src}
              alt={sobre.fotoContrato.alt}
              width={sobre.fotoContrato.largura}
              height={sobre.fotoContrato.altura}
              sizes="112px"
              className="h-24 w-24 rounded-2xl border-2 border-ouro-500/60 object-cover object-[58%_16%] sm:h-28 sm:w-28"
            />
            <div>
              <p className="font-titulo text-[1.125rem] leading-snug font-extrabold text-azul-900">
                {sobre.titulo}
              </p>
              <p className="mt-1 text-[0.8125rem] font-medium text-ouro-700">
                {pessoa.credencial} · {contato.creci}
              </p>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-tinta-600">
                {sobre.texto}
              </p>
              <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                {sobre.metricas.map((m) => (
                  <div key={m.rotulo} className="flex items-baseline gap-1.5">
                    <dt className="sr-only">{m.rotulo}</dt>
                    <dd className="numerico font-titulo text-lg font-extrabold text-azul-800">
                      {m.valor}
                    </dd>
                    <dd className="text-[0.8125rem] text-tinta-600">{m.rotulo}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Reveal>

        <Reveal atraso={200} className="mt-8 text-center">
          <CtaPrincipal origem="prova">{sobre.cta}</CtaPrincipal>
        </Reveal>
      </div>
    </section>
  );
}
