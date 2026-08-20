import { SecaoTitulo } from "./ui/SecaoTitulo";
import { Reveal } from "./ui/Reveal";
import { CtaWhatsApp } from "./ui/CtaWhatsApp";
import { faq } from "@/lib/site";

/** <details>/<summary>: acessivel e sem uma linha de JavaScript. */
export function Faq() {
  return (
    <section id="faq" className="border-t border-tinta-200 bg-fundo">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <SecaoTitulo sobretitulo={faq.sobretitulo} titulo={faq.titulo} />

        <div className="mt-12 grid gap-3">
          {faq.itens.map((item, indice) => (
            <Reveal key={item.pergunta} atraso={indice * 50}>
              <details className="group rounded-2xl border border-tinta-200 bg-superficie open:border-ouro-500/45">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
                  <h3 className="font-titulo text-[1.0625rem] leading-snug font-bold text-azul-900">
                    {item.pergunta}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-tinta-300 text-tinta-600 transition-transform duration-200 group-open:rotate-45 group-open:border-ouro-500 group-open:text-ouro-700"
                  >
                    <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5">
                      <path
                        d="M10 4v12M4 10h12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </summary>
                <p className="px-5 pb-5 text-[0.9375rem] leading-relaxed text-tinta-600">
                  {item.resposta}
                </p>
              </details>
            </Reveal>
          ))}
        </div>

        <Reveal atraso={100} className="mt-10 text-center">
          <p className="text-[0.9375rem] text-tinta-600">
            Ficou com outra dúvida?
          </p>
          <CtaWhatsApp origem="faq" className="mt-4">
            Perguntar no WhatsApp
          </CtaWhatsApp>
        </Reveal>
      </div>
    </section>
  );
}
