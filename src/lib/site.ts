/**
 * FONTE UNICA DE VERDADE
 * ----------------------------------------------------------------------------
 * Landing page focada em UM empreendimento: Cidade Parque Guarapiranga —
 * Condominio Atlantica (Cury), com a gerente Tayna Paschoal como quem atende.
 *
 * Todo texto, numero, foto, item de lazer e pergunta do FAQ mora aqui.
 * Para mudar qualquer palavra da pagina voce NAO precisa abrir nenhum .tsx.
 *
 * Origem dos dados:
 *   - cury.net/imovel/SP/zona-sul/cidade-parque-guarapiranga-condominio-atlantica
 *   - apartamentofacilitado.net (site da Tayna)
 * O que ainda for provisorio esta listado em `PENDENCIAS`, no fim do arquivo.
 */

/* -------------------------------------------------------------------------- */
/* URL publica — se resolve sozinha, nunca hardcode o dominio                  */
/* -------------------------------------------------------------------------- */

export function resolverUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  const vercel =
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

/* -------------------------------------------------------------------------- */
/* Tipos                                                                       */
/* -------------------------------------------------------------------------- */

export type Foto = {
  src: string;
  largura: number;
  altura: number;
  alt: string;
};

/* -------------------------------------------------------------------------- */
/* Contato                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * ATENCAO — a pagina tem apenas DOIS canais de contato, por decisao do cliente:
 * o WhatsApp e o formulario. Nao ha link de Instagram, de site nem de e-mail
 * em lugar nenhum da interface. Se for adicionar algum, confirme antes.
 */
export const contato = {
  /**
   * TROQUE AQUI quando o cliente passar o numero definitivo.
   * So digitos, com DDI 55. E o unico lugar do projeto onde o numero aparece:
   * todos os CTAs e a mensagem pre-preenchida saem daqui.
   */
  whatsapp: "5511991969596",
  /** TODO: CRECI da Tayna. Obrigatorio por lei (6.530/78) e ainda nao temos. */
  creci: "CRECI-SP 000.000-F",
  /** CRECI da Central de Vendas da Cury, publicado na pagina do empreendimento. */
  creciCentralCury: "CRECI 23.670-J",
  /** Usados so no JSON-LD (sameAs), para o Google ligar as entidades.
   *  NAO viram link visivel na pagina. */
  instagram: "tayna_apartamentofacilitado",
  siteDela: "https://www.apartamentofacilitado.net",
} as const;

export const pessoa = {
  nome: "Tayná Paschoal",
  primeiroNome: "Tayná",
  cargo: "Gerente de Vendas",
  empresa: "Cury Construtora",
  credencial: "Gerente de Vendas · Cury Construtora",
  credencialCurta: "Gerente de Vendas · Cury",
} as const;

/* -------------------------------------------------------------------------- */
/* Navegacao — LP satelite: so ancoras desta pagina, nenhuma saida             */
/* -------------------------------------------------------------------------- */

export const navegacao = [
  { rotulo: "O empreendimento", ancora: "#empreendimento" },
  { rotulo: "Lazer", ancora: "#lazer" },
  { rotulo: "A região", ancora: "#localizacao" },
  { rotulo: "Condições", ancora: "#condicoes" },
  { rotulo: "Dúvidas", ancora: "#faq" },
] as const;

/* -------------------------------------------------------------------------- */
/* 1. Hero                                                                     */
/* -------------------------------------------------------------------------- */

export const hero = {
  selo: "Lançamento · Zona Sul de São Paulo",
  empreendimento: "Cidade Parque Guarapiranga",
  empreendimentoComplemento: "Condomínio Atlântica",
  titulo: "Apartamento de 1 e 2 dormitórios pertinho da",
  tituloDestaque: "Represa de Guarapiranga",
  subtitulo:
    "Com opção de suíte, terraço e vaga. Lazer completo com piscinas, beach tennis, coworking e sport bar. Financiamento pela Caixa com Minha Casa Minha Vida.",
  destaqueValor: "R$ 800",
  destaqueRotulo: "entrada a partir de",
  destaqueApoio: "ou entrada parcelada no boleto",
  itens: [
    "Ao lado do Parque da Represa de Guarapiranga",
    "1 e 2 dormitórios com opção de suíte",
    "Terraço, vaga e lazer completo",
  ],
  ctaPrimario: "Quero simular pelo WhatsApp",
  ctaSecundario: "Ver o empreendimento",
  imagem: {
    src: "/empreendimento/fachada.jpg",
    largura: 1440,
    altura: 900,
    alt: "Perspectiva ilustrativa das torres do Cidade Parque Guarapiranga Condomínio Atlântica",
  } satisfies Foto,
} as const;

/* -------------------------------------------------------------------------- */
/* 2. Selos institucionais                                                     */
/* -------------------------------------------------------------------------- */

export const selos = {
  titulo: "Financiamento com quem você já conhece",
  itens: [
    { src: "/logos/caixa.png", alt: "Caixa Econômica Federal", largura: 502, altura: 139 },
    { src: "/logos/minha-casa-minha-vida.png", alt: "Minha Casa Minha Vida", largura: 502, altura: 139 },
    { src: "/logos/fgts.png", alt: "FGTS — Fundo de Garantia do Tempo de Serviço", largura: 352, altura: 139 },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* 3. O empreendimento                                                         */
/* -------------------------------------------------------------------------- */

export const empreendimento = {
  sobretitulo: "O empreendimento",
  nome: "Cidade Parque Guarapiranga — Condomínio Atlântica",
  status: "Lançamento",
  bairro: "Socorro",
  zona: "Zona Sul de São Paulo",
  descricao:
    "Apartamentos de 1 e 2 dormitórios com opção de suíte, terraço e vaga, a poucos passos do Parque da Barragem da Represa de Guarapiranga.",
  fichaTecnica: [
    { rotulo: "Dormitórios", valor: "1 e 2 dormitórios" },
    { rotulo: "Opcionais", valor: "Suíte, terraço e vaga" },
    { rotulo: "Situação", valor: "Lançamento — na planta" },
    { rotulo: "Total de unidades", valor: "1.632 unidades" },
  ],
  /**
   * Diferente do lancamento anterior, este JA TEM incorporacao registrada em
   * cartorio. E seguranca juridica real para quem compra na planta — por isso
   * aparece na pagina, e nao so na letra miuda do rodape.
   */
  registro: {
    rotulo: "Incorporação já registrada em cartório",
    valor: "Registrada em 07/07/2026",
    detalhe:
      "R.6 da matrícula 545.904, no 11º Oficial de Registro de Imóveis de São Paulo/SP.",
  },
  galeria: [
    { src: "/empreendimento/fachada-entardecer.jpg", alt: "Perspectiva ilustrativa das torres ao entardecer", largura: 565, altura: 475 },
    { src: "/empreendimento/piscina-deck.jpg", alt: "Perspectiva ilustrativa da piscina com deck e paisagismo", largura: 1400, altura: 486 },
    { src: "/empreendimento/piscina-solarium.jpg", alt: "Perspectiva ilustrativa da piscina com solário e espreguiçadeiras", largura: 565, altura: 475 },
    { src: "/empreendimento/portaria.jpg", alt: "Perspectiva ilustrativa da portaria e do acesso ao condomínio", largura: 1200, altura: 750 },
    { src: "/empreendimento/piscina-lazer.jpg", alt: "Perspectiva ilustrativa da área de lazer com piscina", largura: 565, altura: 475 },
  ],
  avisoIlustrativa:
    "Imagens meramente ilustrativas. Móveis, equipamentos e paisagismo não fazem parte do contrato.",
} as const;

/* -------------------------------------------------------------------------- */
/* 4. Lazer                                                                    */
/* -------------------------------------------------------------------------- */

export const lazer = {
  sobretitulo: "Lazer completo",
  titulo: "Oito espaços para usar sem sair de casa",
  descricao:
    "Da piscina ao coworking. Tudo dentro do condomínio, incluso no seu apartamento.",
  /**
   * A Cury publicou poucos renders deste empreendimento e nenhum das areas
   * internas. Entao aqui entram so as fotos que existem de verdade, e a lista
   * oficial completa aparece como etiqueta. Usar render de outro condominio
   * para preencher seria propaganda enganosa.
   */
  comFoto: [
    { nome: "Piscinas", src: "/empreendimento/piscina-solarium.jpg", largura: 565, altura: 475 },
    { nome: "Deck e paisagismo", src: "/empreendimento/piscina-deck.jpg", largura: 1400, altura: 486 },
    { nome: "Área de lazer", src: "/empreendimento/piscina-lazer.jpg", largura: 565, altura: 475 },
  ],
  /** Lista oficial da Cury para o Condominio Atlantica. */
  listaCompleta: [
    "Piscinas",
    "Beach Tennis",
    "Churrasqueira",
    "Espaço Beleza",
    "Brinquedoteca",
    "Fitness",
    "Sport Bar",
    "Coworking",
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* 6. Localizacao                                                              */
/* -------------------------------------------------------------------------- */

export const localizacao = {
  sobretitulo: "A região",
  titulo: "Zona Sul, do lado da represa",
  descricao:
    "Socorro fica entre a Represa de Guarapiranga e o eixo de Santo Amaro: comércio, trem e parque, tudo na mesma região.",
  enderecoEmpreendimento: {
    rotulo: "Empreendimento",
    linha1: "Rua Olívia Guedes Penteado, s/n",
    linha2: "Socorro · São Paulo — SP",
  },
  enderecoStand: {
    rotulo: "Stand de vendas",
    linha1: "Av. Rio Bonito, 41",
    linha2: "Socorro · São Paulo — SP",
  },
  /**
   * Pontos de interesse da regiao. Todos verificados: os tres primeiros
   * constam da propria pagina do empreendimento na Cury; os demais foram
   * conferidos como existentes na regiao.
   *
   * NAO ha distancia nem tempo aqui de proposito — nenhum numero desses foi
   * medido. Se o cliente medir e quiser publicar, e so preencher `detalhe`.
   */
  pontosDeInteresse: [
    {
      grupo: "Parques e lazer",
      itens: [
        { nome: "Parque da Barragem da Represa de Guarapiranga", detalhe: "Orla, ciclovia e área de lazer" },
        { nome: "Represa de Guarapiranga", detalhe: "Um dos maiores espelhos d'água da cidade" },
      ],
    },
    {
      grupo: "Trem e mobilidade",
      itens: [
        { nome: "Estação Socorro", detalhe: "CPTM Linha 9-Esmeralda" },
        { nome: "Estação Jurubatuba", detalhe: "CPTM Linha 9-Esmeralda" },
        { nome: "Av. Atlântica e Av. Rio Bonito", detalhe: "Acesso direto pelo bairro" },
      ],
    },
    {
      grupo: "Compras e serviços",
      itens: [
        { nome: "Shopping SP Market", detalhe: "Na região" },
        { nome: "Largo Treze · Santo Amaro", detalhe: "Polo de comércio da Zona Sul" },
        { nome: "Tenda Atacadista", detalhe: "Nas proximidades" },
      ],
    },
    {
      grupo: "Aeroporto",
      itens: [
        { nome: "Aeroporto de Congonhas", detalhe: "O mais próximo, na própria Zona Sul" },
      ],
    },
  ],
  avisoPontos:
    "Pontos de referência da região, informados sem distância ou tempo de deslocamento.",
} as const;

/* -------------------------------------------------------------------------- */
/* 7. Condicoes de pagamento                                                   */
/* -------------------------------------------------------------------------- */

export const condicoes = {
  sobretitulo: "A pergunta que trava todo mundo",
  titulo: "“Será que eu consigo?”",
  descricao:
    "Essa é a dúvida que mais chega aqui. Quem aprova é a Caixa — mas dá para adiantar o que costuma pesar a favor de quem me procura.",
  itens: [
    {
      titulo: "Entrada a partir de R$ 800",
      texto:
        "Você não precisa ter o valor da entrada guardado. Ela pode começar em R$ 800 ou ser parcelada no boleto até a entrega.",
    },
    {
      titulo: "Seu FGTS pode entrar",
      texto:
        "Se você já trabalhou de carteira assinada, o saldo pode virar entrada ou abater o valor financiado.",
    },
    {
      titulo: "Subsídio do Minha Casa Minha Vida",
      texto:
        "Dependendo da sua faixa de renda, parte do valor pode ser coberta por subsídio do programa. O quanto, só a análise da Caixa diz.",
    },
    {
      titulo: "Autônomo e MEI conseguem",
      texto:
        "Sem carteira assinada também dá. A renda é comprovada de outro jeito e eu monto a documentação com você.",
    },
    {
      titulo: "Nome com restrição? Vale tentar",
      texto:
        "Restrição não é uma porta fechada automática. Depende do tipo e do valor — a consulta te dá a resposta na hora.",
    },
    {
      titulo: "É o seu primeiro imóvel",
      texto:
        "É exatamente o perfil do programa. Quem nunca teve imóvel próprio costuma entrar nas melhores condições.",
    },
  ],
  faixasTitulo: "Como as 1.632 unidades se dividem",
  faixasDescricao:
    "A distribuição por faixa de renda consta do registro de incorporação do empreendimento:",
  faixas: [
    { unidades: "1.336", tipo: "unidades HIS-2", renda: "famílias de 3 a 6 salários mínimos" },
    { unidades: "296", tipo: "unidades R2V", renda: "sem limite de renda" },
  ],
  aviso:
    "Condições sujeitas à análise de crédito da Caixa Econômica Federal e às regras vigentes do Minha Casa Minha Vida. Valores e disponibilidade podem mudar sem aviso. Nenhuma aprovação é garantida antes da análise.",
  cta: "Quero fazer minha simulação",
} as const;

/* -------------------------------------------------------------------------- */
/* 8. Como funciona                                                            */
/* -------------------------------------------------------------------------- */

export const passos = {
  sobretitulo: "Do primeiro contato à chave",
  titulo: "Como funciona, em 4 passos",
  itens: [
    {
      numero: "01",
      titulo: "Você me chama no WhatsApp",
      texto: "Me diz quantos dormitórios você quer e mais ou menos quanto a família ganha. Só isso.",
    },
    {
      numero: "02",
      titulo: "Eu faço a simulação",
      texto:
        "Levanto quanto você consegue financiar, quanto de FGTS dá para usar e como fica a parcela. Sem custo e sem compromisso.",
    },
    {
      numero: "03",
      titulo: "A gente visita o stand",
      texto:
        "Você conhece o decorado, vê a planta ao vivo e escolhe a unidade. Fica na Av. Rio Bonito, 41, no Socorro.",
    },
    {
      numero: "04",
      titulo: "Assinatura e acompanhamento",
      texto:
        "Organizo a documentação, acompanho a análise na Caixa e sigo com você até a entrega das chaves.",
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* 9. Tayna                                                                    */
/* -------------------------------------------------------------------------- */

export const sobre = {
  sobretitulo: "Quem vai te atender",
  titulo: "Olá, eu sou a gerente Tayná",
  paragrafos: [
    "Sou especialista em imóveis financiados pela Caixa Econômica Federal, principalmente pelo Minha Casa Minha Vida. Meu foco é oferecer a condição mais facilitada possível para você conquistar o seu apartamento.",
    "Como sou gerente, consigo olhar a sua simulação junto com a equipe e buscar a condição que realmente funciona para o seu caso — em vez de te empurrar a unidade da vez.",
  ],
  metricas: [
    { valor: "+500", rotulo: "apartamentos vendidos" },
    { valor: "17 mil", rotulo: "seguidores acompanham o trabalho" },
    { valor: "Toda SP", rotulo: "atendimento na capital e Grande SP" },
  ],
  itensCredencial: [
    "Gerente de Vendas · Cury Construtora",
    "Especialista em financiamento Caixa e MCMV",
    "Atendimento em toda a Grande São Paulo",
  ],
  cta: "Falar direto comigo",
  fotoCaminhando: {
    src: "/tayna/caminhando.jpg",
    largura: 1000,
    altura: 1500,
    alt: "Tayná Paschoal a caminho de um atendimento, ao telefone",
  } satisfies Foto,
  fotoContrato: {
    src: "/tayna/contrato.jpg",
    largura: 657,
    altura: 657,
    alt: "Tayná Paschoal segurando um contrato de financiamento da Caixa",
  } satisfies Foto,
  fotoRetrato: {
    src: "/tayna/retrato.jpg",
    largura: 1000,
    altura: 1500,
    alt: "Tayná Paschoal, Gerente de Vendas na Cury Construtora",
  } satisfies Foto,
} as const;

/* -------------------------------------------------------------------------- */
/* 10. Prova social                                                            */
/* -------------------------------------------------------------------------- */

export const provas = {
  sobretitulo: "Clientes satisfeitos",
  titulo: "Famílias que já assinaram comigo",
  descricao:
    "Fotos e vídeos reais de quem fechou o apartamento comigo, nos stands da Cury em São Paulo.",
  fotos: [
    ...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((n) => ({
      src: `/provas/prova-${String(n).padStart(2, "0")}.jpg`,
      alt: "Cliente que comprou o apartamento com a gerente Tayná",
      largura: 500,
      altura: 500,
    })),
    {
      src: "/provas/prova-12.jpg",
      alt: "Família recebendo a pasta do apartamento no stand da Cury, ao lado da gerente Tayná",
      largura: 600,
      altura: 800,
    },
  ],
  videos: [1, 2, 3].map((n) => ({
    src: `/provas/videos/depoimento-${n}.mp4`,
    poster: `/provas/videos/depoimento-${n}.jpg`,
    largura: 480,
    altura: 848,
    titulo: `Entrega de chaves — vídeo ${n}`,
  })),
} as const;

/* -------------------------------------------------------------------------- */
/* 10b. Depoimentos em print                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Prints de conversa que ela publica no Instagram. E a prova mais forte da
 * pagina: nao e foto posada, e cliente falando com as proprias palavras.
 * O alt descreve o conteudo porque a imagem E texto — leitor de tela precisa.
 */
export const depoimentos = {
  sobretitulo: "Nas palavras deles",
  titulo: "O que chega no WhatsApp depois da chave na mão",
  descricao:
    "Mensagens reais de quem comprou comigo. Toque para ler por inteiro.",
  itens: [
    {
      src: "/depoimentos/print-1.jpg",
      largura: 1080,
      altura: 1308,
      alt: "Print de conversa: cliente conta que pegou as chaves e agradece — “pra mim não foi só uma venda, você realmente me ajudou e incentivou”.",
      legenda: "“Não foi só uma venda”",
    },
    {
      src: "/depoimentos/print-2.jpg",
      largura: 1080,
      altura: 1090,
      alt: "Print de conversa: cliente avisa que foi fazer a vistoria e receber a chave do apartamento no Cidade Jaguaré Vila Pinheiros, e agradece pelo atendimento no dia da venda.",
      legenda: "Entrega de chaves · Cidade Jaguaré",
    },
    {
      src: "/depoimentos/print-3.jpg",
      largura: 1080,
      altura: 1007,
      alt: "Depoimento de cliente com cinco estrelas: conta que a obra foi entregue no prazo, que recebeu informações durante toda a construção e recomenda o atendimento.",
      legenda: "Cinco estrelas · obra entregue no prazo",
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* 11. FAQ                                                                     */
/* -------------------------------------------------------------------------- */

export const faq = {
  sobretitulo: "Dúvidas frequentes",
  titulo: "O que todo mundo me pergunta antes de começar",
  itens: [
    {
      pergunta: "A entrada é mesmo a partir de R$ 800?",
      resposta:
        "Sim. Neste empreendimento a entrada pode começar em R$ 800, e o restante ser parcelado no boleto até a entrega. O valor exato da sua entrada depende da unidade escolhida e do resultado da sua análise de crédito.",
    },
    {
      pergunta: "Meu nome está negativado. Consigo comprar?",
      resposta:
        "Vale tentar. Restrição no nome não é uma recusa automática: depende do tipo de pendência, do valor e de quem registrou. A consulta é rápida e te dá a resposta real. Eu não prometo aprovação — quem aprova é a Caixa.",
    },
    {
      pergunta: "Sou autônomo e não tenho carteira assinada. Dá certo?",
      resposta:
        "Dá. Autônomo, MEI e trabalhador informal conseguem financiar. A comprovação de renda é feita de outro jeito e eu te oriento sobre quais documentos juntar.",
    },
    {
      pergunta: "Como funciona o uso do FGTS?",
      resposta:
        "Se você tem saldo e cumpre os requisitos da Caixa, ele pode ser usado como entrada ou para abater o valor financiado. Na simulação eu já verifico quanto do seu saldo dá para usar.",
    },
    {
      pergunta: "Qual renda eu preciso ter?",
      resposta:
        "O empreendimento tem unidades para três faixas: até 3 salários mínimos, de 3 a 6 salários mínimos, e unidades sem limite de renda. Ou seja: tem opção para uma faixa bem ampla. Me diga sua renda familiar e eu te digo qual unidade se encaixa.",
    },
    {
      pergunta: "O apartamento já está pronto?",
      resposta:
        "Não. É lançamento, ou seja, compra na planta. É justamente por isso que a condição de entrada é tão facilitada. O cronograma de obra vai por escrito antes de você assinar qualquer coisa.",
    },
    {
      pergunta: "A simulação tem algum custo?",
      resposta:
        "Nenhum. A simulação é gratuita e não te compromete com nada. Você só segue em frente se as condições fizerem sentido para você.",
    },
    {
      pergunta: "Quais documentos eu preciso separar?",
      resposta:
        "Para a simulação inicial, nenhum — só os dados que você me passa na conversa. Se você decidir seguir, o básico costuma ser RG, CPF, comprovante de renda, comprovante de residência e certidão de estado civil. Eu te mando a lista completa na hora certa.",
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* 12. Formulario                                                              */
/* -------------------------------------------------------------------------- */

export const formulario = {
  /**
   * A pagina tem DUAS instancias do mesmo formulario: uma logo apos a dobra
   * (#simulacao) para quem ja chega decidido, e a completa no fim
   * (#formulario). Sao os mesmos campos; muda so a moldura.
   */
  antecipado: {
    sobretitulo: "Análise gratuita",
    titulo: "Descubra agora se você consegue financiar",
    descricao:
      "Dois campos e eu já te digo o que dá para fazer no seu caso. Sem custo e sem compromisso.",
    itens: [
      "Parcelas que cabem no seu bolso",
      "Use o FGTS como entrada",
      "Subsídio do Minha Casa Minha Vida",
      "Autônomo e MEI também conseguem",
      "Nome com restrição? Vale tentar",
    ],
  },
  sobretitulo: "Simulação sem compromisso",
  titulo: "Me manda seus dados que eu te chamo",
  descricao:
    "São dois campos obrigatórios. O resto é só para eu já chegar na conversa com a unidade certa para você.",
  campos: {
    nome: { rotulo: "Seu nome", placeholder: "Como você quer ser chamado" },
    whatsapp: { rotulo: "WhatsApp", placeholder: "(11) 90000-0000" },
    dormitorios: { rotulo: "Quantos dormitórios?", placeholder: "Tanto faz, quero ver as opções" },
    renda: { rotulo: "Renda familiar aproximada", placeholder: "Prefiro não informar agora" },
    fgts: { rotulo: "Você tem saldo de FGTS?" },
  },
  opcoesDormitorios: ["1 dormitório", "2 dormitórios", "2 dormitórios com suíte"],
  /** Faixas do proprio registro do empreendimento (HIS-1, HIS-2 e R2V). */
  faixasRenda: [
    "Até 3 salários mínimos",
    "De 3 a 6 salários mínimos",
    "Acima de 6 salários mínimos",
  ],
  opcoesFgts: ["Sim", "Não", "Não sei"],
  botao: "Enviar e falar no WhatsApp",
  avisoLgpd:
    "Ao enviar, você concorda que a Tayná entre em contato pelo WhatsApp sobre a compra do seu imóvel. Seus dados não são vendidos nem repassados para terceiros.",
  erroNome: "Me diz seu nome, por favor.",
  erroWhatsapp: "Preciso de um WhatsApp com DDD para te retornar.",
} as const;

/* -------------------------------------------------------------------------- */
/* 13. Rodape                                                                  */
/* -------------------------------------------------------------------------- */

export const rodape = {
  descricao:
    "Atendimento a famílias que querem sair do aluguel e comprar o primeiro apartamento em São Paulo.",
  linkPrivacidade: "Política de privacidade",
  /**
   * Texto legal obrigatorio, reproduzido da pagina oficial do empreendimento.
   * NAO REMOVA: a Lei 4.591/64 exige o aviso de registro de incorporacao em
   * qualquer publicidade de empreendimento ainda nao registrado.
   */
  avisoLegal:
    "CCISA 209 INCORPORADORA LTDA. (CIDADE PARQUE GUARAPIRANGA — CONDOMÍNIO ATLÂNTICA). Incorporação registrada em 07/07/2026, R.6 da matrícula 545.904 do 11º Oficial de Registro de Imóveis da Comarca de São Paulo/SP. Com 1.336 unidades HIS-2 para famílias de 3 a 6 salários mínimos e 296 unidades R2V sem limite de renda. Compradores com renda mensal acima dos limites mencionados podem adquirir as unidades para investimento nos termos do Decreto Municipal 63.130/2024. Para mais informações, consulte a Central de Vendas da Cury (CNPJ 14.055.045/0001-78 — CCISA 08 Consultoria Imobiliária Ltda. — CRECI 23.670-J).",
  avisoIlustrativo:
    "Todas as imagens desta página são perspectivas artísticas ilustrativas. Móveis, equipamentos, decoração e paisagismo não fazem parte do contrato. Valores, condições de pagamento e disponibilidade de unidades estão sujeitos a alteração sem aviso prévio e dependem de análise de crédito.",
  avisoNaoOficial:
    "Esta é uma página de atendimento da corretora Tayná Paschoal e não é um canal oficial da Cury Construtora.",
} as const;

/* -------------------------------------------------------------------------- */
/* Metadados                                                                   */
/* -------------------------------------------------------------------------- */

export const meta = {
  titulo:
    "Cidade Parque Guarapiranga Atlântica · Apartamentos com entrada a partir de R$ 800",
  descricao:
    "Apartamentos de 1 e 2 dormitórios no Socorro, Zona Sul de SP, ao lado do Parque da Represa de Guarapiranga. Entrada a partir de R$ 800 ou parcelada, financiamento Caixa e Minha Casa Minha Vida. Atendimento com a gerente Tayná Paschoal.",
  palavras: [
    "cidade parque guarapiranga",
    "condomínio atlântica cury",
    "apartamento socorro são paulo",
    "apartamento guarapiranga minha casa minha vida",
    "entrada parcelada apartamento zona sul sp",
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* WhatsApp                                                                    */
/* -------------------------------------------------------------------------- */

export function linkWhatsApp(mensagem: string) {
  return `https://wa.me/${contato.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}

const NOME_CURTO = "Cidade Parque Guarapiranga — Atlântica";

/** Mensagem pre-preenchida por origem — reduz o atrito de ter que pensar. */
export const mensagens = {
  cabecalho: `Oi Tayná! Vim pelo site e quero saber mais sobre o ${NOME_CURTO}.`,
  hero: `Oi Tayná! Quero simular meu apartamento no ${NOME_CURTO}. Pode me ajudar?`,
  empreendimento: `Oi Tayná! Vi as fotos do ${NOME_CURTO} e queria saber mais sobre as unidades.`,
  lazer: `Oi Tayná! Vi a área de lazer do ${NOME_CURTO} e queria mais informações.`,
  localizacao: `Oi Tayná! Queria visitar o stand do ${NOME_CURTO}. Como funciona?`,
  condicoes: `Oi Tayná! Queria fazer a simulação para saber se eu consigo ser aprovado.`,
  sobre: `Oi Tayná! Vim pelo site e gostaria de falar com você sobre o ${NOME_CURTO}.`,
  provas: `Oi Tayná! Vi os depoimentos no seu site e quero fazer minha simulação também.`,
  depoimentos: `Oi Tayná! Li os depoimentos dos seus clientes e quero fazer minha simulação.`,
  faq: "Oi Tayná! Fiquei com uma dúvida depois de ler seu site. Pode me ajudar?",
  rodape: `Oi Tayná! Vim pelo site e quero mais informações sobre o ${NOME_CURTO}.`,
  "botao-flutuante": `Oi Tayná! Quero falar sobre o ${NOME_CURTO}.`,
} as const;

export type Origem = keyof typeof mensagens;

/* -------------------------------------------------------------------------- */
/* PENDENCIAS                                                                  */
/* -------------------------------------------------------------------------- */

export const PENDENCIAS = [
  "contato.creci — CRECI da Tayna. UNICO bloqueio que sobrou. Obrigatorio por lei (6.530/78).",
  "contato.whatsapp — trocar pelo numero definitivo quando o cliente passar.",
  "hero.destaqueValor — 'entrada a partir de R$ 800' veio do site dela como condicao geral. CONFIRMAR se vale para o Condominio Atlantica antes de rodar trafego.",
  "A Cury nao publicou plantas deste empreendimento. Se ela conseguir o material, da para reativar a secao.",
  "Autorizacao por escrito da Cury para usar os renders do empreendimento nesta pagina.",
  "Autorizacao de uso de imagem das pessoas que aparecem nas fotos de prova social.",
] as const;
