"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export type ItemGaleria = {
  src: string;
  alt: string;
  largura: number;
  altura: number;
  legenda?: string;
};

type Props = {
  itens: readonly ItemGaleria[];
  /** "grade" = grid estatico. "carrossel" = faixa que rola sozinha. */
  modo?: "grade" | "carrossel";
  className?: string;
  proporcao?: string;
  comLegenda?: boolean;
  sizes?: string;
  /**
   * Largura maxima da imagem ampliada. Imagem de origem pequena nao deve
   * ocupar a tela inteira — ampliar demais so mostra o serrilhado.
   */
  larguraDialogo?: string;
  /** Duracao de uma volta completa do carrossel. */
  duracao?: string;
  /** Largura de cada cartao no modo carrossel. */
  larguraCartao?: string;
};

/**
 * Grid ou carrossel de imagens, com ampliacao em <dialog> nativo.
 * Sem biblioteca: o proprio elemento do HTML ja entrega foco preso,
 * fechar no Esc e leitura correta por leitor de tela.
 */
export function Galeria({
  itens,
  modo = "grade",
  className,
  proporcao = "aspect-[4/3]",
  comLegenda = false,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  larguraDialogo = "w-[min(96vw,72rem)]",
  duracao = "70s",
  larguraCartao = "w-44 sm:w-56",
}: Props) {
  const dialogo = useRef<HTMLDialogElement>(null);
  const [atual, setAtual] = useState<number | null>(null);

  const abrir = useCallback((indice: number) => {
    setAtual(indice);
    dialogo.current?.showModal();
  }, []);

  const fechar = useCallback(() => dialogo.current?.close(), []);

  const navegar = useCallback(
    (passo: number) => {
      setAtual((i) => (i === null ? null : (i + passo + itens.length) % itens.length));
    },
    [itens.length],
  );

  useEffect(() => {
    function aoTeclar(evento: KeyboardEvent) {
      if (!dialogo.current?.open) return;
      if (evento.key === "ArrowRight") navegar(1);
      if (evento.key === "ArrowLeft") navegar(-1);
    }
    document.addEventListener("keydown", aoTeclar);
    return () => document.removeEventListener("keydown", aoTeclar);
  }, [navegar]);

  const item = atual === null ? null : itens[atual];

  function Cartao({ it, indice }: { it: ItemGaleria; indice: number }) {
    return (
      <button
        type="button"
        onClick={() => abrir(indice)}
        aria-label={`Ampliar: ${it.legenda ?? it.alt}`}
        className={cn(
          "group relative block w-full overflow-hidden rounded-xl",
          "border border-tinta-200 bg-tinta-100",
          "transition-[border-color,box-shadow] duration-200",
          "hover:border-ouro-500/60 hover:shadow-[0_12px_28px_-16px_rgb(16_24_40_/_0.45)]",
          proporcao,
        )}
      >
        <Image
          src={it.src}
          alt={it.alt}
          width={it.largura}
          height={it.altura}
          sizes={sizes}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        {comLegenda && it.legenda ? (
          <>
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-azul-950/85 via-azul-950/35 to-transparent"
            />
            <span className="absolute inset-x-0 bottom-0 p-3 text-left">
              <span className="font-titulo block text-[0.9375rem] font-bold text-white drop-shadow-sm">
                {it.legenda}
              </span>
            </span>
          </>
        ) : null}
        <span
          aria-hidden="true"
          className="absolute top-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-azul-950/70 text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100"
        >
          <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
            <path d="M8.5 3v11M3 8.5h11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </span>
      </button>
    );
  }

  return (
    <>
      {modo === "carrossel" ? (
        <div
          className={cn(
            "relative overflow-hidden",
            // esmaece as pontas para a faixa nao "cortar" na borda da tela
            "[mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]",
            className,
          )}
        >
          <div
            className="faixa-rolante flex w-max"
            style={{ "--duracao": duracao } as React.CSSProperties}
          >
            {/* Duas listas identicas: a animacao desloca exatamente uma delas */}
            {[0, 1].map((copia) => (
              <ul key={copia} className="flex shrink-0" aria-hidden={copia === 1}>
                {itens.map((it, indice) => (
                  <li key={`${copia}-${it.src}`} className={cn("shrink-0 pr-3", larguraCartao)}>
                    <Cartao it={it} indice={indice} />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      ) : (
        <ul className={cn("grid gap-3", className)}>
          {itens.map((it, indice) => (
            <li key={it.src + indice}>
              <Cartao it={it} indice={indice} />
            </li>
          ))}
        </ul>
      )}

      <dialog
        ref={dialogo}
        onClose={() => setAtual(null)}
        onClick={(evento) => {
          if (evento.target === dialogo.current) fechar();
        }}
        className={cn(
          "m-auto max-w-none rounded-2xl bg-transparent p-0",
          "backdrop:bg-azul-950/85 backdrop:backdrop-blur-sm",
          larguraDialogo,
        )}
      >
        {item ? (
          <div className="relative">
            <Image
              src={item.src}
              alt={item.alt}
              width={item.largura}
              height={item.altura}
              sizes="96vw"
              className="max-h-[82vh] w-full rounded-2xl bg-superficie object-contain"
            />

            {item.legenda ? (
              <p className="mt-3 text-center text-sm font-medium text-white">
                {item.legenda}
              </p>
            ) : null}

            <button
              type="button"
              onClick={fechar}
              aria-label="Fechar"
              className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-azul-950/75 text-white backdrop-blur-sm transition-colors hover:bg-azul-950"
            >
              <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
                <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            {itens.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={() => navegar(-1)}
                  aria-label="Imagem anterior"
                  className="absolute top-1/2 left-3 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-azul-950/70 text-white backdrop-blur-sm transition-colors hover:bg-azul-950"
                >
                  <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
                    <path d="M12 4l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => navegar(1)}
                  aria-label="Próxima imagem"
                  className="absolute top-1/2 right-3 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-azul-950/70 text-white backdrop-blur-sm transition-colors hover:bg-azul-950"
                >
                  <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
                    <path d="M8 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </>
            ) : null}
          </div>
        ) : null}
      </dialog>
    </>
  );
}
