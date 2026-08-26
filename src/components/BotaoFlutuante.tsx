"use client";

import { useEffect, useState } from "react";
import { rastrearIntencaoFormulario } from "@/lib/track";
import { cn } from "@/lib/cn";

/**
 * Aparece depois que a pessoa passa da dobra e leva ao formulario mais
 * proximo — nunca direto ao WhatsApp. O contato vem depois, pelo consultor.
 */
export function BotaoFlutuante() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    function aoRolar() {
      setVisivel(window.scrollY > 600);
    }
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  function aoClicar(evento: React.MouseEvent<HTMLAnchorElement>) {
    rastrearIntencaoFormulario("botao-flutuante");
    const alvos = Array.from(
      document.querySelectorAll<HTMLElement>("[data-formulario]"),
    );
    if (alvos.length === 0) return;
    evento.preventDefault();
    const y = window.scrollY;
    const abaixo = alvos.filter(
      (el) => el.getBoundingClientRect().top + y > y + 120,
    );
    const destino = abaixo[0] ?? alvos[alvos.length - 1];
    destino.scrollIntoView({ behavior: "smooth", block: "start" });
    const campo = destino.querySelector<HTMLInputElement>("input[name='nome']");
    if (campo) window.setTimeout(() => campo.focus({ preventScroll: true }), 600);
  }

  return (
    <a
      href="#simulacao"
      data-origem-formulario="botao-flutuante"
      onClick={aoClicar}
      aria-label="Ir para o formulário de simulação"
      className={cn(
        "fixed right-4 bottom-4 z-50 flex items-center gap-2 rounded-full",
        "bg-azul-500 py-2.5 pr-4 pl-3 font-semibold text-white",
        "sm:gap-2.5 sm:py-3.5 sm:pr-5 sm:pl-4",
        "shadow-[0_14px_32px_-10px_rgb(6_25_49_/_0.75)]",
        "transition-all duration-300 hover:bg-azul-600",
        visivel
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <svg
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
        className="h-5 w-5 shrink-0 sm:h-6 sm:w-6"
      >
        <path
          d="M4 5.5h12M4 10h12M4 14.5h7"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
      <span className="text-sm sm:text-[0.9375rem]">Simular agora</span>
    </a>
  );
}
