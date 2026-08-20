import Image from "next/image";
import { Reveal } from "./ui/Reveal";
import { selos } from "@/lib/site";

/** Faixa com Caixa, Minha Casa Minha Vida e FGTS — os tres nomes que o
 *  publico ja confia. Vale mais que qualquer adjetivo de copy. */
export function Selos() {
  return (
    <section
      aria-label={selos.titulo}
      className="border-b border-tinta-200 bg-superficie"
    >
      <div className="mx-auto max-w-6xl px-4 py-7 sm:px-6 sm:py-9">
        <Reveal>
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-center sm:gap-10">
            <p className="text-center text-[0.75rem] font-semibold tracking-[0.14em] text-tinta-500 uppercase sm:text-left">
              {selos.titulo}
            </p>
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-10">
              {selos.itens.map((selo) => (
                <li key={selo.src}>
                  <Image
                    src={selo.src}
                    alt={selo.alt}
                    width={selo.largura}
                    height={selo.altura}
                    sizes="140px"
                    className="h-7 w-auto opacity-90 sm:h-8"
                  />
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
