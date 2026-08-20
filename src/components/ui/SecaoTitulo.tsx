import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

type Props = {
  sobretitulo?: string;
  titulo: string;
  descricao?: string;
  /** Sobre fundo escuro inverte as cores do bloco. */
  escuro?: boolean;
  centralizado?: boolean;
  className?: string;
};

export function SecaoTitulo({
  sobretitulo,
  titulo,
  descricao,
  escuro = false,
  centralizado = true,
  className,
}: Props) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        centralizado && "mx-auto text-center",
        className,
      )}
    >
      {sobretitulo ? (
        <p
          className={cn(
            "mb-3 flex items-center gap-2 text-[0.8125rem] font-semibold tracking-[0.14em] uppercase",
            centralizado && "justify-center",
            escuro ? "text-ouro-300" : "text-ouro-700",
          )}
        >
          <span
            aria-hidden="true"
            className={cn("h-px w-6", escuro ? "bg-ouro-400/70" : "bg-ouro-500/70")}
          />
          {sobretitulo}
        </p>
      ) : null}

      <h2
        className={cn(
          "font-titulo text-[clamp(1.75rem,1.15rem+2.5vw,2.75rem)] leading-[1.15] font-extrabold tracking-[-0.02em] text-balance",
          escuro ? "text-white" : "text-azul-900",
        )}
      >
        {titulo}
      </h2>

      {descricao ? (
        <p
          className={cn(
            "mt-4 text-[1.0625rem] leading-relaxed text-pretty",
            escuro ? "text-azul-100" : "text-tinta-600",
          )}
        >
          {descricao}
        </p>
      ) : null}
    </Reveal>
  );
}
