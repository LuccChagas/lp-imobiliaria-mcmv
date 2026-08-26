import { Reveal } from "./ui/Reveal";
import { CtaPrincipal } from "./ui/CtaPrincipal";
import { fechamento } from "@/lib/site";

/**
 * Faixa curta no lugar do segundo formulario. Nao repete os campos — so
 * devolve o caminho para quem terminou a leitura decidido.
 */
export function Fechamento() {
  return (
    <section
      aria-label={fechamento.titulo}
      className="relative isolate overflow-hidden bg-azul-900"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(70% 60% at 50% 0%, #12437f 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ouro-500/70 to-transparent"
      />

      <div className="mx-auto max-w-4xl px-4 py-10 text-center sm:px-6 sm:py-12">
        <Reveal>
          <h2 className="font-titulo text-[clamp(1.375rem,1.05rem+1.4vw,1.875rem)] leading-[1.2] font-extrabold tracking-[-0.02em] text-white text-balance">
            {fechamento.titulo}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-azul-100 text-pretty">
            {fechamento.texto}
          </p>
          <CtaPrincipal origem="fechamento" variante="ouro" className="mt-6">
            {fechamento.cta}
          </CtaPrincipal>
        </Reveal>
      </div>
    </section>
  );
}
