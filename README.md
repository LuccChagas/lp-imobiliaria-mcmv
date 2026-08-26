# LP — Cidade Parque Guarapiranga · Condomínio Atlântica

Landing page satélite de captação para o empreendimento **Cidade Parque Guarapiranga —
Condomínio Atlântica** (Cury Construtora, Socorro, Zona Sul de São Paulo), com atendimento
da gerente de vendas **Tayná Paschoal**.

> O foco anterior era o Parque das Nações — Granja Julieta, que virou estoque. A estrutura
> da página é a mesma; o que mudou foi o empreendimento, os assets e o texto legal.

Foco único: uma conversa no WhatsApp. Sem menu para outros empreendimentos, sem saída que
não seja a conversão.

Stack: Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · fontes auto-hospedadas.
Zero dependência além do que o `create-next-app` traz.

---

## Só existem dois canais de contato

Por decisão do cliente, a página tem **apenas WhatsApp e formulário**. Não há link de
Instagram, de site nem de e-mail em lugar nenhum da interface — nem no rodapé.

O Instagram e o `apartamentofacilitado.net` continuam em `contato` no `site.ts`, mas são
usados **só no JSON-LD** (`sameAs`), que é invisível ao visitante e serve para o Google ligar
as entidades. Não geram nenhum caminho de clique. Se quiser tirar de lá também, é só remover
do `sameAs` em `src/app/page.tsx`.

Sobram dois links externos na página, ambos em Localização: o **Google Maps** do
empreendimento e o do stand. Não são canal de contato, são utilidade para achar o endereço —
mas se o cliente quiser zero saída, avise que eu troco por endereço em texto puro.

### Trocar o número do WhatsApp

Um lugar só: `contato.whatsapp` em [`src/lib/site.ts`](./src/lib/site.ts). Só dígitos, com o
55 na frente. Todos os 12 CTAs e as mensagens pré-preenchidas saem dali.

---

## ⚠️ Falta uma coisa para poder subir

**O CRECI da Tayná.** É o único bloqueio que restou.

Publicidade imobiliária sem o número do CRECI visível infringe a Lei 6.530/78, e a multa
recai sobre ela. Hoje o rodapé e a seção "Sobre" mostram `CRECI-SP 000.000-F`, que é
placeholder. Troque em `contato.creci` no [`src/lib/site.ts`](./src/lib/site.ts).

> O site atual dela (apartamentofacilitado.net) também não exibe CRECI nenhum — vale
> corrigir lá também.

O CRECI da Central de Vendas da Cury (**23.670-J**) já está na página, extraído do material
oficial do empreendimento, mas ele identifica a imobiliária, não a corretora. Os dois
precisam aparecer.

### Duas autorizações que valem confirmar

| O quê | Por quê |
| --- | --- |
| **Uso dos renders da Cury** | As imagens do empreendimento vieram de `cury.net`. Ela é gerente de vendas da Cury, então o uso é natural — mas um "ok" por escrito do marketing evita discussão depois. |
| **Uso de imagem das pessoas nas fotos de prova social** | São clientes reais e identificáveis. As fotos já estão públicas no site dela, o que sugere que o consentimento existe — mas confirme se está registrado. |

---

## O que já é dado real

Nada aqui é número inventado. Tudo veio de fonte verificável:

| Dado | Origem |
| --- | --- |
| WhatsApp `5511991969596` | Link da própria `apartamentofacilitado.net` |
| **+500 apartamentos vendidos** | Texto do site dela |
| **Entrada a partir de R$ 800** | Site dela, confirmado como válido para este empreendimento |
| 1 e 2 dorms, suíte, terraço, vaga | Página oficial do empreendimento na Cury |
| 8 itens de lazer | Lista oficial da Cury para o Atlântica |
| Endereços do empreendimento e do stand | Página oficial da Cury |
| 1.336 HIS-2 e 296 R2V (1.632 unidades) | Texto legal de registro do empreendimento |
| Registro da incorporação (07/07/2026) | Texto legal de registro do empreendimento |
| Pontos de interesse da região | Cury + verificação própria (sem distância inventada) |

### O texto legal do rodapé não pode sair

`rodape.avisoLegal` reproduz o registro de incorporação, a composição de unidades por faixa
de renda e o CNPJ/CRECI da central de vendas. É obrigatório em qualquer peça publicitária
deste empreendimento. Não remova, não resuma.

Diferença importante em relação ao Granja Julieta: **este empreendimento já tem a
incorporação registrada** (07/07/2026, R.6 da matrícula 545.904, 11º Oficial de Registro de
Imóveis de São Paulo/SP). O aviso deixa de ser "a comercialização ocorrerá somente após o
registro" e passa a informar o registro feito — o que é segurança jurídica real para quem
compra na planta. Por isso ele também aparece em destaque na seção do empreendimento, e não
só na letra miúda.

### Não há plantas publicadas

A Cury não publicou nenhuma planta do Condomínio Atlântica, e publicou só 6 renders — nenhum
das áreas internas. Duas consequências:

- A **seção de plantas foi removida**. Seção sem conteúdo real é pior que seção ausente.
  No lugar dela, a seção de região ganhou os pontos de interesse.
- A **seção de lazer** mostra só as 3 fotos que existem de verdade (todas de piscina/deck) e
  lista os 8 diferenciais oficiais como etiqueta. Usar render de outro condomínio da Cury
  para preencher seria propaganda enganosa.

Se ela conseguir o material com a construtora, dá para reativar as duas coisas.

### Sobre os pontos de interesse da região

Nenhuma distância ou tempo de deslocamento é publicado, porque nenhum foi medido. Os pontos
foram verificados como existentes na região: os três primeiros vêm da própria página da Cury,
e as estações Socorro e Jurubatuba (CPTM Linha 9-Esmeralda), o Shopping SP Market e o Largo
Treze foram conferidos à parte. Se o cliente medir e quiser publicar tempo, é só preencher
`detalhe` em `localizacao.pontosDeInteresse`.

---

## Rodando

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
```

---

## Formulário → planilha do Google Drive

Duas pernas independentes, e a segunda nunca depende da primeira:

1. `POST /api/lead` → encaminha para `LEAD_WEBHOOK_URL`
2. Abre o WhatsApp com os dados já montados na mensagem

Se o webhook cair, demorar ou responder erro, **o WhatsApp abre do mesmo jeito**. O `fetch`
sai sem `await` e com `catch` vazio, e o `window.open` acontece no mesmo gesto do toque —
senão o bloqueador de pop-up do celular engole a janela.

Passo a passo da planilha no topo de
[`scripts/planilha-apps-script.gs`](./scripts/planilha-apps-script.gs). A aba `Leads` se cria
sozinha com: data, nome, WhatsApp, dormitórios, renda, FGTS, origem, as cinco UTMs e a
página de entrada.

---

## Variáveis de ambiente

Copie `.env.example` para `.env.local`. Todas opcionais — a página funciona com tudo vazio.

| Variável | Para quê |
| -------- | -------- |
| `NEXT_PUBLIC_SITE_URL` | URL pública. Na Vercel pode deixar vazio: o código resolve sozinho. |
| `LEAD_WEBHOOK_URL` | URL `/exec` do Apps Script. |
| `LEAD_WEBHOOK_TOKEN` | Mesma senha do `TOKEN` no Apps Script. |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel. |
| `NEXT_PUBLIC_GA4_ID` | Google Analytics 4. |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager. |

---

## Estrutura da página

1. **Hero** — render das torres em tela cheia, nome do empreendimento, **R$ 800** em destaque, e a Tayná já presente com foto e "+500 vendidos"
2. **Selos** — Caixa, Minha Casa Minha Vida e FGTS
3. **Formulário antecipado** — para quem chega de anúncio já decidido (ver abaixo)
4. **O empreendimento** — ficha técnica, selo de incorporação registrada e galeria
5. **Lazer** — as 3 fotos que existem + os 8 diferenciais oficiais
6. **A região** — endereços com link para o Maps e os pontos de interesse agrupados
7. **Condições** — entrada, FGTS, subsídio, autônomo, restrição no nome, e as duas faixas reais
8. **Como funciona** — 4 passos
9. **Sobre a Tayná** — a foto dela com o contrato da Caixa em destaque (prova mais forte que retrato posado), com a foto dela a caminho de um atendimento encaixada, métricas e credenciais
10. **Depoimentos** — os prints de conversa que ela publica no Instagram, em seção própria e fundo escuro. É a prova mais forte da página: cliente falando com as próprias palavras
11. **Prova social** — 3 vídeos com play sob demanda e um carrossel contínuo com 12 fotos de clientes reais
12. **FAQ** — 8 objeções
13. **Formulário** — nome, WhatsApp, dormitórios, renda, FGTS
14. **Rodapé** — CRECI, selos e os avisos legais

### `src/lib/site.ts` é a única coisa que você precisa editar

Todo texto, número, foto, item de lazer e pergunta do FAQ mora lá. Os componentes só fazem
`.map()`. Para trocar uma palavra **não é preciso abrir nenhum `.tsx`**.

---

## Assets

Tudo baixado em resolução original e reotimizado. `public/` tem ~10 MB, mas o que a pessoa
baixa é bem menos: o `next/image` serve AVIF/WebP redimensionado por viewport, e os vídeos
só são buscados quando alguém toca no play.

| Pasta | Conteúdo | Origem |
| --- | --- | --- |
| `public/empreendimento/` | 18 renders | cury.net |
| `public/plantas/` | 6 plantas | cury.net |
| `public/tayna/` | retrato, foto a caminho do atendimento, foto do contrato | enviadas pelo cliente |
| `public/depoimentos/` | 3 prints de conversa | Instagram dela |
| `public/provas/` | 12 fotos + 3 vídeos com poster | site dela + cliente |
| `public/logos/` | Caixa, MCMV, FGTS | site dela |

### Três modos de exibição de imagem

O componente `Galeria` faz os três, e a escolha muda muito a altura da página:

- **`grade`** — grid estático. Usado onde a abundância é o argumento (os 12 espaços de lazer).
- **`carrossel`** — faixa que rola sozinha e pausa no hover. Só vale com muitos itens; com
  poucos, a duplicação do ciclo fica visível e parece defeito.
- **`faixa`** — rolagem horizontal com snap no celular, grid no desktop. Para poucos itens.

Trocar as galerias de `empreendimento` e `plantas` de grid para carrossel **encurtou a página
em 2.226px no celular** (−11,4%), o que abriu espaço para a seção de depoimentos entrar sem
deixar a página mais longa do que era.

---

## Identidade visual

Direção **"Autoridade Clara"**: azul profundo estrutura a página, fundo claro domina, e o
dourado aliança aparece em fios, selos e bordas — nunca como massa.

| Token | Valor | Onde |
| ----- | ----- | ---- |
| `azul-950` | `#061931` | Rodapé, overlay do hero |
| `azul-900` | `#0a2647` | Seção de lazer, formulário |
| `azul-500` | `#1570ef` | **Todo CTA** (branco sobre ele = 4,57:1, passa AA) |
| `ouro-500` | `#c9a227` | Fios, bordas, selo do CRECI |
| `ouro-700` | `#7d6119` | Único dourado seguro para texto sobre fundo claro (5,60:1) |
| `verde-600` | `#12805c` | Checks de aprovação |
| `fundo` | `#fbfaf8` | Off-white quente, fundo dominante |

Tipografia: **Manrope** 700/800 nos títulos, **Inter** 400/500/600 no corpo, auto-hospedadas
em `.woff2` subset `latin` (104 KB no total).

Todos os pares de texto passam **WCAG AA (4.5:1)**. O mais apertado é o branco sobre o azul
do CTA, em 4,57:1.

---

## Rastreamento

`src/lib/track.ts` dispara para Meta Pixel, GA4 e `dataLayer` ao mesmo tempo, cada um com
`try/catch` próprio.

- `Contact` — clique em qualquer CTA de WhatsApp
- `Lead` — envio do formulário

- `IntencaoFormulario` — clique num CTA que leva ao formulário em vez do WhatsApp

### Dois caminhos de conversão, de propósito

Se todo CTA levasse ao WhatsApp, a planilha do Drive nunca encheria. A página divide:

| Canal | Onde | Por quê |
| --- | --- | --- |
| **WhatsApp** (11 CTAs) | `cabecalho`, `hero`, `lazer`, `localizacao`, `condicoes`, `sobre`, `provas`, `faq`, `rodape`, `botao-flutuante` | Momentos de alta intenção: quer conversar agora, agendar visita, tirar dúvida. |
| **Formulário** (3 CTAs) | `empreendimento`, `plantas`, `condicoes` | Pedido de informação. Quem quer "receber os valores" está disposto a deixar dados, e é isso que alimenta a planilha. |

O CTA de `condicoes` é o mais importante: a simulação precisa de renda, FGTS e dormitórios
— exatamente os campos do formulário. Ali o formulário vem primeiro e o WhatsApp fica como
alternativa. Como as duas origens são rastreadas separadamente, dá para comparar depois qual
canal converte melhor e reequilibrar.

### O formulário aparece duas vezes, de propósito

Com o formulário só no fim, ele ficava a cerca de 15 mil pixels do topo no celular — quase
ninguém rola até lá. Agora existem **duas instâncias do mesmo formulário**:

| Onde | Âncora | Para quem |
| --- | --- | --- |
| Logo depois da dobra e dos selos | `#simulacao` | Quem chega de anúncio já decidido e só quer saber se consegue financiar |
| No fim, antes do rodapé | `#formulario` | Quem leu a página inteira e se convenceu no caminho |

São os mesmos campos e a mesma rota; muda só a moldura. O antecipado usa uma variante
compacta (`<SecaoFormulario id="simulacao" compacto />`).

Ele não vem **antes** do produto de propósito: diferente de uma página de oferta genérica,
aqui o visitante chega sem saber o que é o Atlântica. A dobra apresenta o empreendimento, o
preço e a região; só então a página pede os dados.

---

## Verificação feita

- `npm run lint` e `npm run build` limpos
- Screenshots conferidos em **390px** e **1440px**, com `prefers-reduced-motion: reduce`
- Zero erro de console, zero requisição 4xx/5xx nos dois viewports
- Zero scroll horizontal em ambos
- Formulário ponta a ponta: validação, máscara BR, `POST /api/lead`, URL do WhatsApp com o
  número real e tela de sucesso — com `window.open` mockado
- OG image gerando em `/opengraph-image`
- Contraste AA conferido numericamente

### O que ainda não foi testado

- Envio real para a planilha (depende da implantação do Apps Script existir)
- Comportamento com Pixel/GA4 reais (depende das contas existirem)

---

## Compliance

- **CRECI** no rodapé e na seção "Sobre" — **pendente o da Tayná**
- **Aviso da Lei 4.591/64** no rodapé, reproduzido do material oficial
- **Nenhuma promessa de aprovação.** A copy diz explicitamente que quem aprova é a Caixa
- **Nenhum valor de subsídio afirmado como certo** — as regras do MCMV mudam por decreto
- **Nenhuma urgência falsa** — nada de "últimas unidades"
- Faixas de renda são as **reais do registro** do empreendimento, não faixas inventadas
- Todas as imagens marcadas como **perspectivas ilustrativas**
- **LGPD**: aviso no formulário + política em `/politica-de-privacidade`
- Rodapé deixa claro que a página **não é canal oficial da Cury**

---

## Direitos sobre os arquivos deste repositório

O **código** deste repositório pode ser lido e estudado livremente. As **imagens e vídeos
não podem** — eles não são livres e não estão licenciados para reuso:

- `public/provas/` — fotos e vídeos de **pessoas reais e identificáveis**, clientes que
  autorizaram o uso no material da corretora. Essa autorização não se estende a terceiros.
- `public/tayna/` — fotos de Tayná Paschoal, incluindo uma com um contrato da Caixa que traz
  dados de terceiros no documento.
- `public/empreendimento/` e `public/plantas/` — material publicitário da **Cury Construtora
  e Incorporadora S/A**, marca de terceiro.
- `public/logos/` — marcas da Caixa Econômica Federal, do FGTS e do Minha Casa Minha Vida.

Se você chegou aqui por um fork ou clone: use o código à vontade, **troque as imagens pelas
suas**. Reutilizar esses arquivos é uso indevido de imagem de pessoa e de marca de terceiro.
