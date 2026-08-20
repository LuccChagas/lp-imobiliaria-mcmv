"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  /** Atraso em ms para escalonar itens de uma mesma lista. */
  atraso?: number;
  className?: string;
  /** Elemento renderizado. Padrao: div. */
  como?: "div" | "li" | "article" | "section";
};

/**
 * Anima a entrada com CSS puro + IntersectionObserver.
 * Com prefers-reduced-motion o CSS ja neutraliza tudo (ver globals.css),
 * entao aqui so marcamos o estado.
 */
export function Reveal({ children, atraso = 0, className, como = "div" }: Props) {
  const referencia = useRef<HTMLElement>(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const elemento = referencia.current;
    if (!elemento) return;

    // Navegador sem IntersectionObserver: revela na hora escrevendo direto no
    // DOM. Atualizar um sistema externo e exatamente o papel de um efeito —
    // setState aqui causaria render em cascata.
    if (typeof IntersectionObserver === "undefined") {
      elemento.dataset.visivel = "true";
      return;
    }

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) {
            setVisivel(true);
            observador.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );

    observador.observe(elemento);
    return () => observador.disconnect();
  }, []);

  const Tag = como as "div";

  return (
    <Tag
      ref={referencia as React.Ref<HTMLDivElement>}
      className={cn("reveal", className)}
      data-visivel={visivel}
      style={atraso ? ({ "--atraso": `${atraso}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
