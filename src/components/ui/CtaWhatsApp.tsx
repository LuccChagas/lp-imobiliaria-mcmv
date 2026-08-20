"use client";

import { cn } from "@/lib/cn";
import { linkWhatsApp, mensagens, type Origem } from "@/lib/site";
import { rastrearContato } from "@/lib/track";
import { IconeWhatsApp } from "./IconeWhatsApp";

type Variante = "primario" | "claro" | "contorno" | "ouro";
type Tamanho = "medio" | "grande";

type Props = {
  /** Toda CTA leva uma origem diferente — e isso que permite saber
   *  depois qual secao da pagina realmente converte. */
  origem: Origem;
  children: React.ReactNode;
  variante?: Variante;
  tamanho?: Tamanho;
  comIcone?: boolean;
  className?: string;
};

const variantes: Record<Variante, string> = {
  primario:
    "bg-azul-500 text-white shadow-[0_10px_24px_-10px_rgb(21_112_239_/_0.7)] hover:bg-azul-600 active:bg-azul-700",
  claro:
    "bg-white text-azul-800 shadow-[0_10px_24px_-12px_rgb(10_38_71_/_0.45)] hover:bg-azul-50 active:bg-azul-100",
  contorno:
    "border border-white/35 bg-white/5 text-white hover:bg-white/12 active:bg-white/20",
  ouro: "bg-ouro-500 text-azul-950 hover:bg-ouro-400 active:bg-ouro-600",
};

const tamanhos: Record<Tamanho, string> = {
  medio: "px-5 py-3 text-[0.9375rem]",
  grande: "px-6 py-4 text-base sm:text-[1.0625rem]",
};

export function CtaWhatsApp({
  origem,
  children,
  variante = "primario",
  tamanho = "grande",
  comIcone = true,
  className,
}: Props) {
  return (
    <a
      href={linkWhatsApp(mensagens[origem])}
      target="_blank"
      rel="noopener noreferrer"
      data-origem={origem}
      onClick={() => rastrearContato(origem)}
      className={cn(
        "inline-flex items-center justify-center gap-2.5 rounded-xl font-semibold",
        "transition-colors duration-150 select-none",
        variantes[variante],
        tamanhos[tamanho],
        className,
      )}
    >
      {comIcone ? <IconeWhatsApp className="h-5 w-5 shrink-0" /> : null}
      <span>{children}</span>
    </a>
  );
}
