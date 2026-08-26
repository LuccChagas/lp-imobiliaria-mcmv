import { CtaPrincipal } from "./ui/CtaPrincipal";
import { navegacao, pessoa } from "@/lib/site";

export function Cabecalho() {
  return (
    <header className="sticky top-0 z-40 border-b border-tinta-200/80 bg-fundo/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a
          href="#topo"
          className="flex min-w-0 flex-col justify-center leading-none"
        >
          <span className="font-titulo truncate text-[0.875rem] font-extrabold tracking-[0.07em] text-azul-900 uppercase sm:text-base sm:tracking-[0.08em]">
            {pessoa.nome}
          </span>
          <span aria-hidden="true" className="mt-1 h-px w-8 shrink-0 bg-ouro-500" />
          <span className="mt-1 truncate text-[0.6875rem] font-medium tracking-wide whitespace-nowrap text-tinta-600">
            <span className="sm:hidden">{pessoa.credencialCurta}</span>
            <span className="hidden sm:inline">{pessoa.credencial}</span>
          </span>
        </a>

        <nav aria-label="Seções da página" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {navegacao.map((item) => (
              <li key={item.ancora}>
                <a
                  href={item.ancora}
                  className="text-sm font-medium text-tinta-700 transition-colors hover:text-azul-700"
                >
                  {item.rotulo}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <CtaPrincipal origem="cabecalho" tamanho="medio" className="shrink-0">
          <span className="hidden sm:inline">Simular agora</span>
          <span className="sm:hidden">Simular</span>
        </CtaPrincipal>
      </div>
    </header>
  );
}
