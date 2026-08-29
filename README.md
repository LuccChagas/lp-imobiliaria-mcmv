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

## Todo CTA leva ao formulário. Nenhum vai direto ao WhatsApp

Decisão do cliente: **o formulário é a única porta**. Não existe um único link
`wa.me` clicável na página — os 12 CTAs, incluindo o do cabeçalho e o botão flutuante,
rolam até o formulário mais próximo. O contato acontece depois, quando um consultor
retorna.

Por que assim: quem ia direto para o WhatsApp não deixava rastro na planilha. Agora todo
lead é capturado antes de virar conversa.

### Como o CTA escolhe o formulário

A página tem duas instâncias. O `CtaPrincipal` procura, em tempo de clique, a instância
**mais próxima abaixo** da posição atual; se a pessoa já passou das duas, volta para a
última. Assim o botão nunca joga o visitante para o outro extremo da página — um CTA no FAQ
desce para o formulário final, e um na dobra desce para o antecipado.

Depois de rolar, o foco vai para o campo "nome" com `preventScroll`, para leitor de tela e
teclado acompanharem sem um segundo pulo.

### O envio: planilha e WhatsApp, nessa ordem

Ao enviar, o lead vai para a planilha **e** o WhatsApp abre com a mensagem montada. Nenhum
contato acontece sem passar pelo registro — era esse o ponto de mandar todos os CTAs para o
formulário.

O `fetch` sai **sem `await`**, com `keepalive: true`. Não é descuido: travar ali faria o
navegador tratar a abertura do WhatsApp como pop-up e bloquear, porque o `window.open`
precisa acontecer no mesmo gesto do toque. O `keepalive` mantém a requisição viva mesmo com
a aba mudando. Se o pop-up for bloqueado mesmo assim, a tela de sucesso mostra o link
manual.

### Todos os campos são obrigatórios

Por decisão do cliente, os cinco campos são exigidos: nome, WhatsApp, dormitórios, renda e
FGTS. Vale saber do trade-off — cada campo a mais derruba a taxa de preenchimento — mas o
lead que chega é bem mais qualificado.

- **Dormitórios**: select de 1 a 4. Não dá para digitar.
- **Renda**: aceita **apenas dígitos**, formatados como moeda enquanto se digita. Colar
  texto não passa: `"abc350000xyz"` vira `R$ 3.500,00`.
- **WhatsApp**: máscara BR, valida 10 ou 11 dígitos.

### Nenhum link para fora

Sem Instagram, sem site, sem e-mail. Os perfis seguem em `contato` no `site.ts` mas são
usados **só no JSON-LD** (`sameAs`), que é invisível ao visitante. Sobram dois links do
Google Maps em "A região", que são utilidade para achar o stand, não canal de contato.

### Trocar o número do WhatsApp

Um lugar só: `contato.whatsapp` em [`src/lib/site.ts`](./src/lib/site.ts). Só dígitos, com o
55 na frente. Todos os 12 CTAs e as mensagens pré-preenchidas saem dali.

---

## Compliance legal: resolvido

O **CRECI da Tayná é o CRECI-SP 254570-F**, e aparece em dois lugares da página: no rodapé,
ao lado do CRECI da Central de Vendas da Cury (23.670-J), e na faixa de credencial dentro da
prova social. Era o item que impedia a publicação — publicidade imobiliária sem o número
visível infringe a Lei 6.530/78.

> O site antigo dela, o apartamentofacilitado.net, continua sem exibir CRECI nenhum. Vale
> corrigir lá também.

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

  Os renders publicados têm apenas **565px de largura**. Por isso os cards são pequenos —
  três por linha no desktop, dois no celular, nenhum passando de ~355px na tela. Numa
  coluna só a imagem era esticada para mais de 1.100px e ficava visivelmente serrilhada.

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

Seis seções. A versão anterior tinha treze e o cliente devolveu com "muito mais curto e
direto, menos poluído" — a página caiu de **19,6 para 10,8 telas de celular (−45%)** sem
perder nenhum argumento de venda.

1. **Hero** — render das torres, nome, **R$ 800**, a Tayná com foto e "+500 vendidos", e os selos Caixa/MCMV/FGTS na própria dobra
2. **Formulário antecipado** (`#simulacao`) — para quem chega de anúncio já decidido
3. **O empreendimento** — ficha, selo de incorporação registrada, galeria, lazer em etiquetas, proximidades e os dois endereços
4. **Condições** — 4 cards de objeção + as duas faixas de renda reais
5. **Prova social** — prints de conversa, vídeos, fotos de clientes e a faixa de credencial da Tayná
6. **Faixa de fechamento** — uma linha e um botão que devolve ao formulário

Rodapé com o obrigatório: CRECI, selos e os avisos legais.

### Só existe um formulário

A segunda instância saiu. Ela custava 1.157px repetindo os mesmos campos, e a faixa de
fechamento resolve o mesmo problema por 274px: quem leu a página inteira está no pico de
intenção e não deveria terminar no texto legal.

Sobra uma consequência aceita de propósito: os CTAs abaixo do formulário rolam **para cima**
até ele. O `CtaPrincipal` já lida com isso — procura a instância mais próxima abaixo e, não
achando nenhuma, volta para a última. Com um formulário só, todos convergem para ele.

### O que foi fundido, e por quê

| Saiu | Para onde foi |
| --- | --- |
| Seção "Selos" (123px só para 3 logos) | Dentro da dobra |
| Seção "Lazer" | Etiquetas dentro do empreendimento |
| Seção "A região" | Três linhas de proximidade + os endereços, no empreendimento |
| Seção "Como funciona" | Cortada — condições e formulário já respondem |
| Seção "Sobre a Tayná" | Faixa de credencial dentro da prova social |
| Seções "Depoimentos" e "Prova social" | Fundidas em uma |
| FAQ (8 perguntas) | Cortado — as 4 objeções que carregavam o peso viraram os cards de "Condições" |
| Navegação do rodapé | Cortada |

O FAQ era o corte mais arriscado, porque respondia as objeções reais (nome sujo, autônomo,
FGTS, entrada). Elas não se perderam: já existiam em formato de card na seção "Condições",
que era redundante com o FAQ. O que sobrou de fato lá — documentos, prazo de obra, custo da
simulação — passa a ser conversa no WhatsApp, que é onde essas perguntas realmente se
resolvem.

**Consequência técnica:** o `FAQPage` saiu do JSON-LD junto. Manter esse schema sem o
conteúdo visível na página é motivo de penalização pelo Google.

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

### O formulário vem cedo, de propósito

Com o formulário só no fim, ele ficava a cerca de 15 mil pixels do topo no celular — quase
ninguém rolava até lá. Hoje ele fica logo depois da dobra:

| Onde | Âncora | Para quem |
| --- | --- | --- |
| Logo depois da dobra | `#simulacao` | Único formulário da página. Todos os CTAs apontam para ele. |

Usa a variante compacta (`<SecaoFormulario id="simulacao" compacto />`).

Ele não vem **antes** do produto de propósito: diferente de uma página de oferta genérica,
aqui o visitante chega sem saber o que é o Atlântica. A dobra apresenta o empreendimento, o
preço e a região; só então a página pede os dados.

---

## Como medir o desempenho desta página

Três camadas, cada uma com ferramenta padrão. Serve tanto para acompanhar quanto para
defender decisões diante do cliente sem discutir por gosto.

### 1. Técnico — Lighthouse

Rodar contra o build de produção (`npm run build && npx next start`), não contra o `dev`:

```bash
npx lighthouse http://127.0.0.1:3000/ --view              # mobile
npx lighthouse http://127.0.0.1:3000/ --preset=desktop --view
```

Medido depois do enxugamento:

| | Mobile | Desktop |
| --- | --- | --- |
| Performance | **91** | **100** |
| Acessibilidade | **100** | **100** |
| Boas práticas | **100** | **100** |
| SEO | **100** | **100** |
| LCP | 3,4 s | 0,7 s |
| CLS | **0** | **0** |
| Peso | 466 KB | 724 KB |

CLS zero quer dizer que nada pula na tela durante o carregamento. O LCP mobile de 3,4s
(era 4,1s) é o ponto que ainda dá para melhorar: é a imagem da dobra, que no celular fica
sob um degradê de 92% de opacidade — paga-se o peso inteiro de algo que quase não se vê.

Para dados de campo, com usuários reais, use o **PageSpeed Insights** na URL de produção ou
ative o **Vercel Speed Insights**.

### 2. Conteúdo — profundidade de rolagem

`RastreioRolagem` dispara um evento `Rolagem` em **25, 50, 75 e 100%**, uma vez por sessão,
para GA4, Meta e `dataLayer`. É o dado que responde "a página está longa demais?" sem
depender de opinião: se a maioria para nos 50%, tudo abaixo disso é peso morto.

### 3. Conversão — por seção

Cada CTA carrega uma `origem` distinta e dispara `IntencaoFormulario`; o envio dispara
`Lead`. Depois do tráfego, monta-se a tabela seção → cliques → leads, e corta-se o que não
paga o próprio espaço.

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
