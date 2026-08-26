import { SecaoTitulo } from "./ui/SecaoTitulo";
import { Reveal } from "./ui/Reveal";
import { Galeria } from "./ui/Galeria";
import { CtaPrincipal } from "./ui/CtaPrincipal";
import { depoimentos } from "@/lib/site";

/**
 * Prints de conversa. Ganharam secao propria porque sao a prova mais forte
 * da pagina — cliente falando com as proprias palavras, nao foto posada.
 * Fundo escuro: os cards ja sao escuros e assim eles se destacam.
 */
export function Depoimentos() {
  return (
    <section
      id="depoimentos"
      className="relative isolate overflow-hidden border-y border-azul-800 bg-azul-900"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: "radial-gradient(70% 55% at 50% 0%, #12437f 0%, transparent 68%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <SecaoTitulo
          sobretitulo={depoimentos.sobretitulo}
          titulo={depoimentos.titulo}
          descricao={depoimentos.descricao}
          escuro
        />

        <Reveal atraso={100} className="mt-10">
          <Galeria
            itens={depoimentos.itens}
            modo="faixa"
            proporcao="aspect-[4/5]"
            larguraCartao="w-60"
            colunasFaixa="sm:grid-cols-3"
            comLegenda
            sizes="(min-width: 640px) 33vw, 15rem"
            larguraDialogo="w-[min(94vw,40rem)]"
          />
        </Reveal>

        <Reveal atraso={140} className="mt-8 text-center">
          <CtaPrincipal origem="depoimentos" variante="ouro">
            Quero fazer minha simulação
          </CtaPrincipal>
        </Reveal>
      </div>
    </section>
  );
}
