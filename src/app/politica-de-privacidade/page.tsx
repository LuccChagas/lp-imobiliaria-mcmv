import type { Metadata } from "next";
import Link from "next/link";
import { Cabecalho } from "@/components/Cabecalho";
import { Rodape } from "@/components/Rodape";
import { contato, pessoa } from "@/lib/site";

export const metadata: Metadata = {
  title: `Política de privacidade · ${pessoa.nome}`,
  description:
    "Como os dados enviados no formulário desta página são coletados, usados e armazenados.",
  robots: { index: false, follow: true },
};

const secoes = [
  {
    titulo: "1. Quem trata os seus dados",
    paragrafos: [
      `Os dados enviados nesta página são tratados por ${pessoa.nome}, ${pessoa.credencial}, ${contato.creci}, na condição de controladora, nos termos da Lei nº 13.709/2018 (LGPD).`,
    ],
  },
  {
    titulo: "2. Quais dados são coletados",
    paragrafos: [
      "Apenas o que você digita no formulário: nome, número de WhatsApp e, quando você escolhe informar, região de interesse, faixa de renda familiar aproximada e se possui saldo de FGTS.",
      "Também são registrados dados técnicos do acesso, como a página de origem e os parâmetros de campanha (UTM), usados só para entender de qual anúncio ou publicação o contato veio.",
      "Não são coletados documentos, dados bancários, número de CPF nem qualquer dado sensível por meio desta página.",
    ],
  },
  {
    titulo: "3. Para que os dados são usados",
    paragrafos: [
      "Para entrar em contato com você pelo WhatsApp e conduzir a simulação de financiamento que você solicitou, e para medir o desempenho das campanhas de divulgação.",
      "A base legal é o seu consentimento, manifestado ao enviar o formulário, e o interesse legítimo em responder a um contato comercial iniciado por você.",
    ],
  },
  {
    titulo: "4. Com quem os dados são compartilhados",
    paragrafos: [
      "Os dados ficam registrados em uma planilha do Google Workspace de uso da corretora. Quando a simulação avança, as informações necessárias podem ser compartilhadas com a construtora e com a instituição financeira responsável pela análise de crédito, exclusivamente para viabilizar a negociação que você pediu.",
      "Seus dados não são vendidos, alugados nem cedidos para terceiros com finalidade publicitária.",
    ],
  },
  {
    titulo: "5. Por quanto tempo ficam armazenados",
    paragrafos: [
      "Pelo tempo necessário ao atendimento e, depois disso, pelo prazo exigido para cumprimento de obrigações legais e regulatórias. Encerrada a finalidade, os dados são eliminados.",
    ],
  },
  {
    titulo: "6. Cookies e medição",
    paragrafos: [
      "Esta página pode usar cookies e tecnologias equivalentes de Meta Pixel, Google Analytics e Google Tag Manager para medir visitas e conversões de campanhas. Você pode bloquear esses cookies nas configurações do seu navegador sem prejudicar o uso da página nem o envio do formulário.",
    ],
  },
  {
    titulo: "7. Os seus direitos",
    paragrafos: [
      "Você pode, a qualquer momento, pedir confirmação do tratamento, acesso, correção, anonimização, portabilidade ou eliminação dos seus dados, além de revogar o consentimento.",
      "Para exercer qualquer um desses direitos, basta enviar uma mensagem pelo mesmo WhatsApp de atendimento informado nesta página. O pedido é atendido sem custo.",
    ],
  },
  {
    titulo: "8. Segurança",
    paragrafos: [
      "São adotadas medidas técnicas e administrativas razoáveis para proteger os dados contra acesso não autorizado, perda ou divulgação indevida. Nenhum sistema é totalmente imune a incidentes; em caso de incidente relevante, os titulares e a ANPD serão comunicados na forma da lei.",
    ],
  },
  {
    titulo: "9. Alterações",
    paragrafos: [
      "Esta política pode ser atualizada. A versão vigente é sempre a publicada nesta página.",
    ],
  },
];

export default function PoliticaDePrivacidade() {
  return (
    <>
      <Cabecalho />

      <main className="flex-1 bg-fundo">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
          <p className="mb-3 flex items-center gap-2 text-[0.8125rem] font-semibold tracking-[0.14em] text-ouro-700 uppercase">
            <span aria-hidden="true" className="h-px w-6 bg-ouro-500/70" />
            LGPD
          </p>
          <h1 className="font-titulo text-[clamp(1.875rem,1.2rem+2.6vw,2.75rem)] leading-[1.15] font-extrabold tracking-[-0.02em] text-azul-900">
            Política de privacidade
          </h1>
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-tinta-600">
            Esta página explica quais dados são coletados no formulário, para que
            servem e como você pode pedir a exclusão deles.
          </p>

          <div className="mt-10 grid gap-8">
            {secoes.map((secao) => (
              <section key={secao.titulo}>
                <h2 className="font-titulo text-xl font-bold text-azul-900">
                  {secao.titulo}
                </h2>
                <div className="mt-3 grid gap-3">
                  {secao.paragrafos.map((paragrafo) => (
                    <p
                      key={paragrafo.slice(0, 24)}
                      className="text-[0.9375rem] leading-relaxed text-tinta-700"
                    >
                      {paragrafo}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-tinta-200 bg-superficie px-5 py-4">
            <p className="text-[0.8125rem] leading-relaxed text-tinta-600">
              Dúvidas sobre o tratamento dos seus dados? Fale pelo WhatsApp de
              atendimento informado nesta página.
            </p>
          </div>

          <Link
            href="/"
            className="mt-10 inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-azul-700 underline underline-offset-4 hover:text-azul-800"
          >
            ← Voltar para a página inicial
          </Link>
        </div>
      </main>

      <Rodape />
    </>
  );
}
