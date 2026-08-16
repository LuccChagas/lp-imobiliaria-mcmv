# CLAUDE.md

Landing page de captação para uma **gerente de vendas** que trabalha com uma imobiliária
especializada em **empreendimentos novos no segmento Minha Casa Minha Vida** (perfil Cury,
MRV, Direcional, Plano&Plano).

Este arquivo define stack, arquitetura e regras do projeto. Leia inteiro antes de escrever
a primeira linha.

---

## 1. Contexto

**Quem vende:** uma gerente/corretora com nome e rosto próprios. Diferente de uma marca
corporativa, aqui **a pessoa é o produto** — o público compra a confiança nela antes de
comprar o imóvel. A página deve soar como alguém que atende, não como uma construtora.

**Quem compra:** família de primeira casa própria, renda dentro das faixas do MCMV. Na
prática isso significa:

- **Mobile é 90%+ do tráfego.** Desktop é secundário. Projete mobile-first de verdade.
- Conexão instável e aparelho modesto são comuns. Peso da página importa mais do que
  animação bonita.
- O medo não é "escolher errado", é **"será que eu sou aprovado?"**. Toda a copy gira em
  torno de tirar esse medo: entrada facilitada, subsídio, uso do FGTS, análise de crédito
  sem compromisso, documentação simples.
- WhatsApp é o canal. Não é "um dos canais" — é o canal.

**Objetivo único da página:** fazer a pessoa iniciar uma conversa no WhatsApp com dados
mínimos (nome, telefone, cidade/região de interesse, renda aproximada).

---

## 2. Stack — não substitua sem motivo

| Camada | Escolha |
| --- | --- |
| Framework | Next.js 16, App Router |
| Linguagem | TypeScript |
| Estilo | Tailwind CSS v4 (tokens em `@theme`, dentro de `globals.css`) |
| Fontes | `next/font/local`, auto-hospedadas em `.woff2` |
| Animação | CSS puro + IntersectionObserver. **Sem** Framer Motion, GSAP ou similar |
| Ícones | SVG inline. **Sem** biblioteca de ícones |
| Hospedagem | Vercel |

Nenhuma dependência além do que o `create-next-app` já traz. Cada pacote extra é peso que o
público-alvo paga em 4G ruim.

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir \
  --import-alias "@/*" --use-npm --no-turbopack --yes
```

---

## 3. Arquitetura

```
src/
  app/
    layout.tsx            metadata, fontes, <Analytics />
    page.tsx              compõe as seções + JSON-LD
    globals.css           @theme com os tokens da marca
    opengraph-image.tsx   OG gerada com ImageResponse
    icon.svg
    api/lead/route.ts     recebe o lead e encaminha ao webhook
  components/
    ui/                   Reveal, SectionHeading, CtaWhatsApp
    <Secao>.tsx           uma seção por arquivo
  lib/
    site.ts               ⭐ FONTE ÚNICA DE VERDADE
    track.ts              eventos de conversão
    cn.ts
  fonts/
```

### `src/lib/site.ts` é inegociável

**Todo** texto, número, contato, depoimento, item de FAQ e empreendimento mora nesse
arquivo, exportado como `const`. Os componentes só fazem `.map()`.

O critério: a pessoa deve conseguir trocar um número, uma pergunta do FAQ ou um
empreendimento **sem abrir nenhum componente**. Se para mudar uma palavra é preciso editar
um `.tsx`, o arquivo está errado.

### Nomes em português

Componentes, variáveis, campos e comentários em português (`dores`, `metricas`,
`FormularioLead`, `resolverUrl`). Quem vai manter isso depois não é dev.

---

## 4. Identidade visual — você vai criar

**Não existe brand kit.** Antes de codar, proponha uma identidade e valide com o usuário.

### Direção recomendada

O erro clássico nesse segmento é copiar estética de alto padrão — preto, dourado, serifada,
foto de apartamento com pé-direito duplo. Isso **afasta** o público MCMV: gera a sensação de
"isso não é pra mim" e, pior, de que os valores anunciados são mentira.

O que funciona:

- **Cores claras, quentes e otimistas.** Azul de confiança, verde de aprovação, um destaque
  quente (laranja/coral) para CTA. Fundo claro dominante.
- **Tipografia sem serifa, alta legibilidade, corpo generoso.** Nada de fonte display
  estilosa e ilegível. Muita gente vai ler isso no sol, num celular de tela pequena.
- **Contraste alto.** Mínimo AA (4.5:1) em texto corrido. Não é preciosismo: é gente lendo
  em condição ruim.
- **Números grandes e claros.** "A partir de R$ 480/mês" tem que ser a coisa mais visível
  da dobra, se esse número for real e verificado.

Proponha 2 ou 3 direções antes de escolher. Não invente logo tipográfico complexo — o nome
dela bem composto resolve.

### Fotos

Este é o ponto mais sensível da página.

- As imagens **precisam representar o produto real**: prédios de MCMV, apartamentos
  compactos, áreas de lazer simples, famílias reais. Não use render de cobertura de luxo.
- **Não use imagem ou marca de Cury, MRV, Direcional etc. sem autorização por escrito.**
  Logo de construtora numa LP de corretora autônoma é uso de marca de terceiro. Se a
  imobiliária tiver material aprovado, use esse. Se não tiver, peça.
- Foto da gerente: opcional, mas se usar, use uma boa. Marca pessoal sem rosto perde
  confiança nesse segmento.
- Enquanto não houver foto real, use placeholder **explicitamente marcado** — nunca stock
  genérico que passe por foto do empreendimento.

---

## 5. Tom de voz — analise o Instagram antes de escrever

O usuário vai fornecer o Instagram dela. **Antes de escrever qualquer copy**, use `WebFetch`
no perfil para extrair bio, e leia as legendas de alguns posts para captar:

- Como ela chama o público (você? amigo? família?)
- Nível de formalidade
- Que argumentos ela já usa e funcionam
- Que empreendimentos e regiões ela trabalha

Depois **profissionalize sem descaracterizar**. Se ela escreve com emoji e exclamação, não
transforme em texto corporativo — só organize. A voz tem que continuar sendo dela, ou a
página não bate com o Instagram de onde o tráfego vem.

### Regras de copy

- Frases curtas. Voz ativa. Zero jargão de mercado ("VGV", "ticket", "cap rate").
- Fale de **parcela e entrada**, não de valor total do imóvel.
- Antecipe as objeções reais: nome sujo, autônomo sem comprovação, FGTS, entrada parcelada,
  primeiro imóvel, documentação.
- Nada de urgência falsa ("últimas 3 unidades!") sem que seja verdade.

---

## 6. Estrutura sugerida

1. **Hero** — nome + credencial + promessa concreta + CTA WhatsApp
2. **Prova rápida** — nº de famílias atendidas, anos de experiência, região
3. **Empreendimentos** — cards com foto, bairro, parcela a partir de, status da obra
4. **Simulação / "Você se encaixa?"** — os critérios em linguagem humana
5. **Como funciona** — 3 ou 4 passos, do primeiro contato à chave na mão
6. **Sobre ela** — foto, CRECI, história curta, por que faz isso
7. **Depoimentos** — de preferência com foto e primeiro nome real
8. **FAQ** — as objeções da seção 5
9. **Formulário + WhatsApp**
10. **Rodapé** — CRECI, contato, política de privacidade

Ajuste conforme o material disponível. Seção sem conteúdo real é pior que seção ausente.

---

## 7. Conversão

### WhatsApp

Componente `CtaWhatsApp` com prop `origem`. Todo CTA leva `origem` diferente (`hero`,
`empreendimentos`, `sobre`, `botao-flutuante`), porque é isso que permite saber depois qual
seção converte.

```ts
export function linkWhatsApp(mensagem: string) {
  return `https://wa.me/${site.contato.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}
```

Mensagem pré-preenchida sempre — reduz o atrito de a pessoa ter que pensar no que escrever.

### Formulário

Fluxo em duas pernas, e a segunda nunca depende da primeira:

1. `POST /api/lead` → encaminha para `LEAD_WEBHOOK_URL` se existir
2. Abre o WhatsApp com os dados montados na mensagem

**Falha no webhook não pode bloquear o lead.** Envolva o `fetch` em `try/catch` vazio e siga
para o WhatsApp de qualquer forma. Perder um lead por causa de um CRM fora do ar é
inaceitável.

Campos: nome, WhatsApp (com máscara BR), cidade/região, renda familiar aproximada (select
por faixa), tem FGTS (sim/não). Só nome e telefone obrigatórios — cada campo a mais derruba
conversão.

### Rastreamento

`src/lib/track.ts` dispara para Meta Pixel, GA4 e `dataLayer` ao mesmo tempo, com `try/catch`
individual. Cada bloco em `Analytics.tsx` só é injetado se o ID existir no ambiente — a
página tem que funcionar antes de as contas serem criadas.

Eventos: `Contact` (clique em WhatsApp) e `Lead` (envio do formulário).

---

## 8. Detalhes que já custaram bug

Aprendizados diretos do projeto anterior. Não repita:

**URL pública se resolve sozinha.** Nunca hardcode o domínio: `canonical`, `og:url` e
`og:image` apontando para um domínio que ainda não existe quebram a prévia de
compartilhamento no WhatsApp — justamente onde o link mais vai circular.

```ts
function resolverUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  const vercel = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
    ?? process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}
```

**Header fixo esconde âncora.** `section[id] { scroll-margin-top: 5rem }` no `globals.css`.

**Fonte com display larga quebra headline.** Meça antes de fixar tamanho: teste a maior
linha em 390px, 768px e 1440px. `clamp()` com teto conservador.

**Acentuação.** Se usar fonte de display, confirme que ela tem Á Ã Ç É Í Ó Õ Ú antes de
adotar. Muita fonte gratuita não tem, e o fallback aparece no meio da palavra.

**`prefers-reduced-motion`** desliga os reveals. Além de acessibilidade, torna o screenshot
determinístico.

---

## 9. Verificação visual — obrigatória antes de entregar

Não entregue sem ter olhado a página renderizada. Use o Chrome do sistema via
`puppeteer-core` (instale no diretório temporário, não no projeto):

```js
const puppeteer = require("puppeteer-core");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const page = await browser.newPage();
await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await page.goto(url, { waitUntil: "networkidle0" });
// capture rolando por viewport — NÃO use captureBeyondViewport com clip,
// que produz artefato com elementos fixos
```

Capture em **390px e 1440px**, e confira: erros de console, requisições 4xx/5xx, fontes
carregadas (`document.fonts`), e o formulário ponta a ponta (mock do `window.open` para não
abrir o WhatsApp de verdade).

Rode `npm run lint` e `npm run build` antes de dizer que terminou.

---

## 10. Regras inegociáveis

**CRECI é obrigatório.** Toda publicidade imobiliária no Brasil exige o número do CRECI
visível (Lei 6.530/78 e resoluções do COFECI). Se ela é gerente vinculada a uma imobiliária,
peça o CRECI dela e/ou o da imobiliária e coloque no rodapé e na seção "sobre". Não suba a
página sem isso.

**Não prometa aprovação nem invente subsídio.** As regras e faixas do MCMV mudam por decreto
e as condições dependem de análise da Caixa. Nada de "aprovação garantida", "sem consulta ao
SPC" ou valor de subsídio afirmado como certo. Use "simulação sem compromisso", "consulte as
condições". Promessa falsa aqui é infração ao CDC — e o problema volta pra ela, não pra você.

**Número inventado não sobe.** Se não tiver o dado real (famílias atendidas, parcela a
partir de, tempo de mercado), use placeholder marcado com `TODO` em `site.ts`, liste no
README e **avise o usuário explicitamente** de que aqueles números não podem ir pro ar. Rodar
tráfego pago com número falso é propaganda enganosa.

**LGPD.** Aviso curto no formulário sobre o uso dos dados e link de política de privacidade
no rodapé.

**Nada de dependência não solicitada.** Se achar que precisa de uma, justifique antes.

---

## 11. Checklist antes de entregar

- [ ] `npm run lint` e `npm run build` limpos
- [ ] Screenshots conferidos em 390px e 1440px
- [ ] Zero erro de console, zero requisição falhando
- [ ] Formulário testado ponta a ponta, com máscara e validação
- [ ] Todo CTA de WhatsApp com `origem` distinta
- [ ] CRECI no rodapé
- [ ] Contraste AA no texto corrido
- [ ] OG image gerando e acessível na URL absoluta
- [ ] `TODO`s listados no README, com aviso do que não pode ir pro ar
- [ ] `.env.example` com todas as variáveis, valores vazios
- [ ] `.gitignore` cobrindo `.env*` (exceto `.env.example`) e assets pesados de origem
