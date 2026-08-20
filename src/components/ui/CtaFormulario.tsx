"use client";

import { cn } from "@/lib/cn";
import { rastrearIntencaoFormulario } from "@/lib/track";

type Variante = "primario" | "contorno";
type Tamanho = "medio" | "grande";

type Props = {
  /** Mesma logica das origens do WhatsApp: da para comparar canal a canal. */
  origem: string;
  children: React.ReactNode;
  variante?: Variante;
  tamanho?: Tamanho;
  className?: string;
};

const variantes: Record<Variante, string> = {
  primario:
    "bg-azul-800 text-white shadow-[0_10px_24px_-12px_rgb(10_38_71_/_0.6)] hover:bg-azul-900 active:bg-azul-950",
  contorno:
    "border border-tinta-300 bg-superficie text-azul-800 hover:border-azul-300 hover:bg-azul-50",
};

const tamanhos: Record<Tamanho, string> = {
  medio: "px-5 py-3 text-[0.9375rem]",
  grande: "px-6 py-4 text-base sm:text-[1.0625rem]",
};

/** Leva ao formulario da propria pagina. Existe porque nem todo mundo quer
 *  abrir conversa na hora — e e o formulario que alimenta a planilha. */
export function CtaFormulario({
  origem,
  children,
  variante = "primario",
  tamanho = "grande",
  className,
}: Props) {
  return (
    <a
      href="#formulario"
      data-origem-formulario={origem}
      onClick={() => rastrearIntencaoFormulario(origem)}
      className={cn(
        "inline-flex min-h-14 items-center justify-center gap-2.5 rounded-xl font-semibold whitespace-nowrap",
        "transition-colors duration-150 select-none",
        variantes[variante],
        tamanhos[tamanho],
        className,
      )}
    >
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-5 w-5 shrink-0">
        <path
          d="M4 5.5h12M4 10h12M4 14.5h7"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
      <span>{children}</span>
    </a>
  );
}
