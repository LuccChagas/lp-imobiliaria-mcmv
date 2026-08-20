"use client";

import { useEffect, useState } from "react";
import { IconeWhatsApp } from "./ui/IconeWhatsApp";
import { linkWhatsApp, mensagens } from "@/lib/site";
import { rastrearContato } from "@/lib/track";
import { cn } from "@/lib/cn";

/** Aparece depois que a pessoa passa da dobra. */
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

  return (
    <a
      href={linkWhatsApp(mensagens["botao-flutuante"])}
      target="_blank"
      rel="noopener noreferrer"
      data-origem="botao-flutuante"
      onClick={() => rastrearContato("botao-flutuante")}
      aria-label="Falar no WhatsApp com a Tayná"
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
      <IconeWhatsApp className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
      <span className="text-sm sm:text-[0.9375rem]">Falar agora</span>
    </a>
  );
}
