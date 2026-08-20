import { SecaoTitulo } from "./ui/SecaoTitulo";
import { Reveal } from "./ui/Reveal";
import { Galeria } from "./ui/Galeria";
import { CtaWhatsApp } from "./ui/CtaWhatsApp";
import { VideoDepoimento } from "./ui/VideoDepoimento";
import { provas } from "@/lib/site";

export function Provas() {
  return (
    <section id="provas" className="bg-fundo">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <SecaoTitulo
          sobretitulo={provas.sobretitulo}
          titulo={provas.titulo}
          descricao={provas.descricao}
        />

        {/* Videos primeiro: rosto e voz convencem mais que foto parada */}
        <Reveal atraso={80} className="mt-12">
          {/* No celular, 3 videos num grid de 2 colunas deixam o terceiro
              sozinho na segunda linha. Rolagem horizontal com snap resolve. */}
          <ul
            className={[
              "mx-auto flex max-w-3xl snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-2",
              "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
              "sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0",
            ].join(" ")}
          >
            {provas.videos.map((video) => (
              <li key={video.src} className="w-44 shrink-0 snap-center sm:w-auto">
                <VideoDepoimento {...video} />
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal atraso={120} className="mt-10">
          <Galeria
            itens={provas.fotos}
            modo="carrossel"
            proporcao="aspect-square"
            larguraCartao="w-40 sm:w-52"
            duracao="80s"
            sizes="(min-width: 640px) 13rem, 10rem"
            /* origem tem 500x500 — ampliar alem disso so mostra serrilhado */
            larguraDialogo="w-[min(92vw,32rem)]"
          />
        </Reveal>

        <Reveal atraso={140} className="mt-4">
          <p className="text-center text-xs text-tinta-500">
            Toque em qualquer foto para ampliar. Passe o cursor para pausar.
          </p>
        </Reveal>

        <Reveal atraso={160} className="mt-10 text-center">
          <CtaWhatsApp origem="provas">Quero ser o próximo</CtaWhatsApp>
        </Reveal>
      </div>
    </section>
  );
}
