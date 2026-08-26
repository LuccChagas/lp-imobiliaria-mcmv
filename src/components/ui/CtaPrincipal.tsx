"use client";

import { cn } from "@/lib/cn";
import { rastrearIntencaoFormulario } from "@/lib/track";

type Variante = "primario" | "claro" | "contorno" | "ouro";
type Tamanho = "medio" | "grande";

type Props = {
  /** Continua existindo para medir qual secao gera lead. */
  origem: string;
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

/**
 * Todo CTA da pagina leva ao formulario — nunca direto ao WhatsApp.
 * O contato acontece depois, quando um consultor retorna.
 *
 * Rola para o formulario MAIS PROXIMO abaixo da posicao atual; se ja passou
 * dos dois, volta para o ultimo. Assim o botao nunca joga a pessoa para o
 * outro extremo da pagina.
 */
export function CtaPrincipal({
  origem,
  children,
  variante = "primario",
  tamanho = "grande",
  comIcone = true,
  className,
}: Props) {
  function aoClicar(evento: React.MouseEvent<HTMLAnchorElement>) {
    rastrearIntencaoFormulario(origem);

    const alvos = Array.from(
      document.querySelectorAll<HTMLElement>("[data-formulario]"),
    );
    if (alvos.length === 0) return; // deixa o href resolver

    evento.preventDefault();
    const y = window.scrollY;
    const abaixo = alvos.filter(
      (el) => el.getBoundingClientRect().top + y > y + 120,
    );
    const destino = abaixo[0] ?? alvos[alvos.length - 1];
    destino.scrollIntoView({ behavior: "smooth", block: "start" });

    // leva o foco para o primeiro campo, sem roubar a rolagem
    const campo = destino.querySelector<HTMLInputElement>("input[name='nome']");
    if (campo) window.setTimeout(() => campo.focus({ preventScroll: true }), 600);
  }

  return (
    <a
      href="#simulacao"
      data-origem-formulario={origem}
      onClick={aoClicar}
      className={cn(
        "inline-flex items-center justify-center gap-2.5 rounded-xl font-semibold",
        "transition-colors duration-150 select-none",
        variantes[variante],
        tamanhos[tamanho],
        className,
      )}
    >
      {comIcone ? (
        <svg
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
          className="h-5 w-5 shrink-0"
        >
          <path
            d="M4 5.5h12M4 10h12M4 14.5h7"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      ) : null}
      <span>{children}</span>
    </a>
  );
}
