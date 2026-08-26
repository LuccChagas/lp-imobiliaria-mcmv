"use client";

import { useEffect } from "react";
import { rastrearRolagem } from "@/lib/track";

const MARCOS = [25, 50, 75, 100] as const;

/**
 * Dispara um evento a cada marco de profundidade alcancado, uma vez por
 * sessao. Sem estado React de proposito: isso roda no evento de scroll e
 * um setState aqui causaria render a cada quadro.
 */
export function RastreioRolagem() {
  useEffect(() => {
    const vistos = new Set<number>();
    let agendado = false;

    function medir() {
      agendado = false;
      const rolavel =
        document.documentElement.scrollHeight - window.innerHeight;
      if (rolavel <= 0) return;
      const percentual = Math.min(
        100,
        Math.round((window.scrollY / rolavel) * 100),
      );
      for (const marco of MARCOS) {
        if (percentual >= marco && !vistos.has(marco)) {
          vistos.add(marco);
          rastrearRolagem(marco);
        }
      }
      if (vistos.size === MARCOS.length) {
        window.removeEventListener("scroll", aoRolar);
      }
    }

    function aoRolar() {
      if (agendado) return;
      agendado = true;
      window.requestAnimationFrame(medir);
    }

    window.addEventListener("scroll", aoRolar, { passive: true });
    medir(); // conta quem ja abre a pagina com ela toda visivel
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  return null;
}
