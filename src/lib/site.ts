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
  { rotulo: "Condições", ancora: "#condicoes" },
  { rotulo: "Quem já comprou", ancora: "#prova" },
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
  /** Bloco de quem atende, no pe da dobra. */
  atendimento: {
    prefixo: "Atendimento comercial com o",
    destaque: `time ${pessoa.nome}`,
    conquista: "+500 apartamentos vendidos",
  },
  ctaPrimario: "Quero simular agora",
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
   * Este empreendimento JA TEM incorporacao registrada em cartorio. E
   * seguranca juridica real para quem compra na planta — por isso aparece na
   * pagina, e nao so na letra miuda do rodape.
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
  /** Lista oficial da Cury para o Condominio Atlantica. */
  lazer: {
    titulo: "Lazer completo, dentro do condomínio",
    itens: [
      "Piscinas",
      "Beach Tennis",
      "Churrasqueira",
      "Espaço Beleza",
      "Brinquedoteca",
      "Fitness",
      "Sport Bar",
      "Coworking",
    ],
  },
  /** A secao "A regiao" saiu; o essencial dela vive aqui, em tres linhas. */
  proximidades: [
    "Ao lado do Parque da Represa de Guarapiranga",
    "Estações Socorro e Jurubatuba, da Linha 9-Esmeralda",
    "Shopping SP Market e Largo Treze na região",
  ],
  enderecos: {
    empreendimento: {
      rotulo: "Empreendimento",
      linha1: "Rua Olívia Guedes Penteado, s/n",
      linha2: "Socorro · São Paulo — SP",
    },
    stand: {
      rotulo: "Stand de vendas",
      linha1: "Av. Rio Bonito, 41",
      linha2: "Socorro · São Paulo — SP",
    },
  },
  avisoIlustrativa:
    "Imagens meramente ilustrativas. Móveis, equipamentos e paisagismo não fazem parte do contrato.",
} as const;

/* -------------------------------------------------------------------------- */
/* 4. Lazer                                                                    */
/* -------------------------------------------------------------------------- */
/* 6. Localizacao                                                              */
/* -------------------------------------------------------------------------- */
/* 7. Condicoes de pagamento                                                   */
/* -------------------------------------------------------------------------- */

export const condicoes = {
  sobretitulo: "A pergunta que trava todo mundo",
  titulo: "“Será que eu consigo?”",
  descricao:
    "Quem aprova é a Caixa — mas dá para adiantar o que costuma pesar a favor de quem nos procura.",
  /** Quatro cards. Sao as objecoes que mais aparecem; com a saida do FAQ,
   *  sao estas respostas que carregam o trabalho dele. */
  itens: [
    {
      titulo: "Entrada a partir de R$ 800",
      texto:
        "Você não precisa ter o valor guardado. A entrada pode começar em R$ 800 ou ser parcelada no boleto até a entrega.",
    },
    {
      titulo: "FGTS e subsídio do programa",
      texto:
        "Seu saldo de FGTS pode virar entrada ou abater o valor financiado. Dependendo da faixa de renda, parte ainda pode ser coberta por subsídio do Minha Casa Minha Vida.",
    },
    {
      titulo: "Autônomo e MEI conseguem",
      texto:
        "Sem carteira assinada também dá. A renda é comprovada de outro jeito e a gente monta a documentação com você.",
    },
    {
      titulo: "Nome com restrição? Vale tentar",
      texto:
        "Restrição não é uma porta fechada automática. Depende do tipo e do valor — a consulta é gratuita e dá a resposta na hora.",
    },
  ],
  faixasTitulo: "Como as 1.632 unidades se dividem",
  faixasDescricao:
    "A distribuição por faixa de renda consta do registro de incorporação:",
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
/* 9. Tayna                                                                    */
/* -------------------------------------------------------------------------- */

export const sobre = {
  sobretitulo: "Quem vai te atender",
  titulo: "Olá, eu sou a gerente Tayná",
  /** Um paragrafo so: a secao virou faixa dentro da prova social. */
  texto:
    "Sou especialista em imóveis financiados pela Caixa, principalmente pelo Minha Casa Minha Vida. Meu time e eu buscamos a condição que realmente funciona para o seu caso.",
  metricas: [
    { valor: "+500", rotulo: "apartamentos vendidos" },
    { valor: "17 mil", rotulo: "seguidores acompanham" },
    { valor: "Toda SP", rotulo: "capital e Grande SP" },
  ],
  cta: "Falar com especialista agora",
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
/* 12. Formulario                                                              */
/* -------------------------------------------------------------------------- */

export const formulario = {
  /**
   * A pagina tem DUAS instancias do mesmo formulario: uma logo apos a dobra
   * (#simulacao) para quem ja chega decidido, e a completa no fim
   * (#formulario). Sao os mesmos campos; muda so a moldura.
   *
   * FLUXO: nenhum botao da pagina abre o WhatsApp direto — todos levam aqui.
   * Ao enviar, o lead vai para a planilha E o WhatsApp abre com a mensagem
   * montada. Assim nenhum contato acontece sem passar pelo registro.
   */
  antecipado: {
    sobretitulo: "Análise gratuita",
    titulo: "Descubra agora se você consegue financiar",
    descricao:
      "Preencha os campos abaixo e fale com um especialista. Sem custo e sem compromisso.",
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
    "Todos os campos ajudam a chegar na conversa já com a unidade certa para você. Leva menos de um minuto.",
  campos: {
    nome: { rotulo: "Seu nome", placeholder: "Como você quer ser chamado" },
    whatsapp: { rotulo: "WhatsApp", placeholder: "(11) 90000-0000" },
    dormitorios: { rotulo: "Quantos dormitórios?", placeholder: "Escolha" },
    renda: { rotulo: "Renda familiar", placeholder: "R$ 0,00" },
    fgts: { rotulo: "Você tem saldo de FGTS?" },
  },
  /** So numeros — o campo e um select, entao nao ha como digitar texto. */
  opcoesDormitorios: ["1", "2", "3", "4"],
  opcoesFgts: ["Sim", "Não", "Não sei"],
  botao: "Falar com especialista",
  botaoEnviando: "Abrindo o WhatsApp...",
  avisoLgpd:
    "Ao enviar, você concorda que a equipe da Tayná entre em contato pelo WhatsApp sobre a compra do seu imóvel. Seus dados não são vendidos nem repassados para terceiros.",
  /** Todos os campos sao obrigatorios, por decisao do cliente. */
  erros: {
    nome: "Me diz seu nome, por favor.",
    whatsapp: "Preciso de um WhatsApp com DDD para te retornar.",
    dormitorios: "Escolha quantos dormitórios você procura.",
    renda: "Informe a renda familiar aproximada.",
    fgts: "Responda se você tem saldo de FGTS.",
  },
  sucesso: {
    titulo: "Prontinho",
    texto:
      "Abri o WhatsApp com os seus dados já preenchidos. É só apertar enviar que um consultor do time da Tayná te responde.",
    rodape: "Costuma ser rápido — normalmente no mesmo dia.",
    outro: "Enviar outro contato",
    naoAbriu: "Não abriu? Toque aqui",
  },
} as const;

/* -------------------------------------------------------------------------- */
/* 13. Rodape                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Faixa de fechamento. Substitui a segunda instancia do formulario: quem
 * chegou ate aqui leu a pagina inteira e esta no pico de intencao — terminar
 * no texto legal desperdicaria essa pessoa. Custa ~300px em vez de 1.157px.
 */
export const fechamento = {
  titulo: "Pronto para saber se você consegue?",
  texto:
    "A simulação é gratuita, leva menos de um minuto e não te compromete com nada.",
  cta: "Fazer minha simulação",
} as const;

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

/**
 * O unico WhatsApp que sobrou e o do envio do formulario, montado em
 * FormularioLead com os dados preenchidos. Nao ha mais mensagem por secao
 * porque nenhum botao abre conversa direto.
 */

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
