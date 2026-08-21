import { SecaoTitulo } from "./ui/SecaoTitulo";
import { Reveal } from "./ui/Reveal";
import { Galeria } from "./ui/Galeria";
import { CtaFormulario } from "./ui/CtaFormulario";
import { plantas } from "@/lib/site";

export function Plantas() {
  return (
    <section id="plantas" className="bg-fundo">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <SecaoTitulo
          sobretitulo={plantas.sobretitulo}
          titulo={plantas.titulo}
          descricao={plantas.descricao}
        />

        <Reveal atraso={100} className="mt-12">
          <Galeria
            itens={plantas.itens}
            modo="carrossel"
            proporcao="aspect-[4/3]"
            larguraCartao="w-64 sm:w-80"
            duracao="65s"
            sizes="(min-width: 640px) 20rem, 16rem"
            larguraDialogo="w-[min(96vw,64rem)]"
          />
        </Reveal>

        <Reveal atraso={140} className="mt-6">
          <p className="text-center text-xs text-tinta-500">{plantas.aviso}</p>
        </Reveal>

        <Reveal atraso={180} className="mt-9 text-center">
          <CtaFormulario origem="plantas">
            Quero a planta com os valores
          </CtaFormulario>
        </Reveal>
      </div>
    </section>
  );
}
