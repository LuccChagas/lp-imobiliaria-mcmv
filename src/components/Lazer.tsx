import { SecaoTitulo } from "./ui/SecaoTitulo";
import { Reveal } from "./ui/Reveal";
import { Galeria } from "./ui/Galeria";
import { CtaWhatsApp } from "./ui/CtaWhatsApp";
import { IconeCheck } from "./ui/Icones";
import { lazer } from "@/lib/site";

export function Lazer() {
  const itens = lazer.comFoto.map((item) => ({
    src: item.src,
    alt: `Perspectiva ilustrativa: ${item.nome}`,
    largura: item.largura,
    altura: item.altura,
    legenda: item.nome,
  }));

  return (
    <section
      id="lazer"
      className="relative isolate overflow-hidden border-y border-azul-800 bg-azul-900"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: "radial-gradient(75% 50% at 50% 0%, #12437f 0%, transparent 65%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <SecaoTitulo
          sobretitulo={lazer.sobretitulo}
          titulo={lazer.titulo}
          descricao={lazer.descricao}
          escuro
        />

        <Reveal atraso={100} className="mt-12">
          <Galeria
            itens={itens}
            proporcao="aspect-square"
            comLegenda
            sizes="(min-width: 1024px) 25vw, 50vw"
          />
        </Reveal>

        {/* Lista oficial completa, incluindo o que nao tem render publicado */}
        <Reveal atraso={140} className="mt-10">
          <ul className="flex flex-wrap justify-center gap-2">
            {lazer.listaCompleta.map((item) => (
              <li
                key={item}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.07] px-3.5 py-1.5 text-[0.8125rem] font-medium text-azul-100"
              >
                <IconeCheck className="h-3.5 w-3.5 text-ouro-400" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal atraso={180} className="mt-10 text-center">
          <CtaWhatsApp origem="lazer" variante="ouro">
            Quero conhecer o condomínio
          </CtaWhatsApp>
        </Reveal>
      </div>
    </section>
  );
}
