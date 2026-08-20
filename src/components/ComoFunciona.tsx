import { SecaoTitulo } from "./ui/SecaoTitulo";
import { Reveal } from "./ui/Reveal";
import { passos } from "@/lib/site";

export function ComoFunciona() {
  return (
    <section id="como-funciona" className="relative isolate overflow-hidden bg-azul-900">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(70% 50% at 50% 0%, #12437f 0%, transparent 65%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <SecaoTitulo
          sobretitulo={passos.sobretitulo}
          titulo={passos.titulo}
          escuro
        />

        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {passos.itens.map((passo, indice) => (
            <Reveal key={passo.numero} como="li" atraso={indice * 80}>
              <div className="relative h-full rounded-2xl border border-white/12 bg-white/[0.055] p-5">
                <span className="numerico font-titulo block text-3xl leading-none font-extrabold text-ouro-400">
                  {passo.numero}
                </span>
                <span aria-hidden="true" className="mt-3 block h-px w-10 bg-ouro-500/60" />
                <h3 className="font-titulo mt-4 text-[1.0625rem] leading-snug font-bold text-white">
                  {passo.titulo}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-azul-100">
                  {passo.texto}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
