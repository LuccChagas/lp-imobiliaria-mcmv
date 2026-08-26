import { SecaoTitulo } from "./ui/SecaoTitulo";
import { Reveal } from "./ui/Reveal";
import { CtaPrincipal } from "./ui/CtaPrincipal";
import { Galeria } from "./ui/Galeria";
import { IconeCheck, IconeLocal, IconeSeta } from "./ui/Icones";
import { empreendimento } from "@/lib/site";

function mapa(...partes: string[]) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(partes.join(", "))}`;
}

/**
 * Secao unica do produto: ficha, registro, fotos, lazer e endereco.
 * Antes isso eram tres secoes (empreendimento, lazer e regiao) — a pagina
 * ficava longa demais e o argumento se diluia.
 */
export function Empreendimento() {
  const { enderecos } = empreendimento;

  return (
    <section id="empreendimento" className="bg-fundo">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
        <SecaoTitulo
          sobretitulo={empreendimento.sobretitulo}
          titulo={empreendimento.nome}
          descricao={empreendimento.descricao}
        />

        <Reveal atraso={70} className="mt-7">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center rounded-full bg-azul-900 px-3.5 py-1.5 text-[0.6875rem] font-semibold tracking-[0.1em] text-white uppercase">
              {empreendimento.status}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-tinta-200 bg-superficie px-3.5 py-1.5 text-[0.8125rem] text-tinta-600">
              <IconeLocal className="h-4 w-4 shrink-0 text-ouro-700" />
              {empreendimento.bairro} · {empreendimento.zona}
            </span>
          </div>
        </Reveal>

        <Reveal atraso={100} className="mt-8">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-tinta-200 bg-tinta-200 lg:grid-cols-4">
            {empreendimento.fichaTecnica.map((linha) => (
              <div key={linha.rotulo} className="bg-superficie px-4 py-4 sm:px-5">
                <dt className="text-[0.6875rem] font-semibold tracking-[0.12em] text-ouro-700 uppercase">
                  {linha.rotulo}
                </dt>
                <dd className="font-titulo mt-1 text-[1rem] leading-snug font-bold text-azul-900">
                  {linha.valor}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Incorporacao registrada e seguranca juridica de verdade para quem
            compra na planta — merece aparecer, nao ficar so na letra miuda. */}
        <Reveal atraso={130} className="mt-4">
          <div className="flex flex-col items-start gap-3 rounded-2xl border border-verde-500/35 bg-verde-50 px-5 py-4 sm:flex-row sm:items-center">
            <span
              aria-hidden="true"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-verde-600 text-white"
            >
              <IconeCheck className="h-5 w-5" />
            </span>
            <div>
              <p className="font-titulo text-[0.9375rem] font-bold text-verde-700">
                {empreendimento.registro.rotulo} · {empreendimento.registro.valor}
              </p>
              <p className="mt-0.5 text-[0.8125rem] leading-snug text-tinta-600">
                {empreendimento.registro.detalhe}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal atraso={160} className="mt-8">
          <Galeria
            itens={empreendimento.galeria}
            modo="carrossel"
            proporcao="aspect-[4/3]"
            larguraCartao="w-56 sm:w-72"
            duracao="55s"
            sizes="(min-width: 640px) 18rem, 14rem"
          />
        </Reveal>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1.1fr_1fr]">
          {/* Lazer virou etiqueta: a Cury nao publicou render das areas
              internas, e inventar foto de outro condominio nao e opcao. */}
          <Reveal atraso={190}>
            <div className="h-full rounded-2xl border border-tinta-200 bg-superficie p-5">
              <p className="text-[0.6875rem] font-semibold tracking-[0.12em] text-ouro-700 uppercase">
                {empreendimento.lazer.titulo}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {empreendimento.lazer.itens.map((item) => (
                  <li
                    key={item}
                    className="inline-flex items-center gap-1.5 rounded-full border border-tinta-200 bg-fundo px-3 py-1.5 text-[0.8125rem] font-medium text-tinta-700"
                  >
                    <IconeCheck className="h-3.5 w-3.5 text-verde-600" />
                    {item}
                  </li>
                ))}
              </ul>
              <ul className="mt-5 grid gap-2 border-t border-tinta-200 pt-4">
                {empreendimento.proximidades.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <IconeLocal className="mt-[3px] h-4 w-4 shrink-0 text-ouro-700" />
                    <span className="text-[0.875rem] leading-snug text-tinta-700">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal atraso={220}>
            <div className="grid h-full gap-3">
              {[enderecos.empreendimento, enderecos.stand].map((e, indice) => (
                <div
                  key={e.rotulo}
                  className={
                    indice === 1
                      ? "rounded-2xl border border-ouro-500/45 bg-ouro-50 p-5"
                      : "rounded-2xl border border-tinta-200 bg-superficie p-5"
                  }
                >
                  <p className="flex items-center gap-2 text-[0.6875rem] font-semibold tracking-[0.12em] text-ouro-700 uppercase">
                    <IconeLocal className="h-4 w-4" />
                    {e.rotulo}
                  </p>
                  <p className="font-titulo mt-2 text-[1rem] leading-snug font-bold text-azul-900">
                    {e.linha1}
                  </p>
                  <p className="mt-0.5 text-[0.875rem] text-tinta-600">{e.linha2}</p>
                  <a
                    href={mapa(e.linha1, e.linha2)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-[0.875rem] font-semibold text-azul-700 underline underline-offset-4 hover:text-azul-800"
                  >
                    Ver no Google Maps
                    <IconeSeta className="h-4 w-4" />
                  </a>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal atraso={250} className="mt-6">
          <p className="text-center text-xs text-tinta-500">
            {empreendimento.avisoIlustrativa}
          </p>
        </Reveal>

        <Reveal atraso={280} className="mt-8 text-center">
          <CtaPrincipal origem="empreendimento">
            Quero receber os valores
          </CtaPrincipal>
        </Reveal>
      </div>
    </section>
  );
}

