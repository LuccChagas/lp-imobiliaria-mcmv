import { Cabecalho } from "@/components/Cabecalho";
import { Hero } from "@/components/Hero";
import { Selos } from "@/components/Selos";
import { Empreendimento } from "@/components/Empreendimento";
import { Lazer } from "@/components/Lazer";
import { Plantas } from "@/components/Plantas";
import { Localizacao } from "@/components/Localizacao";
import { Condicoes } from "@/components/Condicoes";
import { ComoFunciona } from "@/components/ComoFunciona";
import { Sobre } from "@/components/Sobre";
import { Depoimentos } from "@/components/Depoimentos";
import { Provas } from "@/components/Provas";
import { Faq } from "@/components/Faq";
import { SecaoFormulario } from "@/components/FormularioLead";
import { Rodape } from "@/components/Rodape";
import { BotaoFlutuante } from "@/components/BotaoFlutuante";
import {
  contato,
  empreendimento,
  faq,
  hero,
  lazer,
  localizacao,
  meta,
  pessoa,
  resolverUrl,
  sobre,
} from "@/lib/site";

function dadosEstruturados() {
  const url = resolverUrl();

  return [
    {
      "@context": "https://schema.org",
      "@type": "ApartmentComplex",
      "@id": `${url}/#empreendimento`,
      name: empreendimento.nome,
      description: empreendimento.descricao,
      url,
      image: `${url}${hero.imagem.src}`,
      numberOfBedrooms: "1-2",
      amenityFeature: lazer.listaCompleta.map((item) => ({
        "@type": "LocationFeatureSpecification",
        name: item,
        value: true,
      })),
      address: {
        "@type": "PostalAddress",
        streetAddress: localizacao.enderecoEmpreendimento.linha1,
        addressLocality: "São Paulo",
        addressRegion: "SP",
        addressCountry: "BR",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      "@id": `${url}/#agente`,
      name: pessoa.nome,
      jobTitle: pessoa.cargo,
      worksFor: { "@type": "Organization", name: pessoa.empresa },
      url,
      image: `${url}${sobre.fotoRetrato.src}`,
      description: meta.descricao,
      areaServed: { "@type": "City", name: "São Paulo" },
      telephone: `+${contato.whatsapp}`,
      sameAs: [
        `https://instagram.com/${contato.instagram}`,
        contato.siteDela,
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.itens.map((item) => ({
        "@type": "Question",
        name: item.pergunta,
        acceptedAnswer: { "@type": "Answer", text: item.resposta },
      })),
    },
  ];
}

export default function Pagina() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dadosEstruturados()) }}
      />

      <Cabecalho />

      <main className="flex-1">
        <Hero />
        <Selos />
        <Empreendimento />
        <Lazer />
        <Plantas />
        <Localizacao />
        <Condicoes />
        <ComoFunciona />
        <Sobre />
        <Depoimentos />
        <Provas />
        <Faq />
        <SecaoFormulario />
      </main>

      <Rodape />
      <BotaoFlutuante />
    </>
  );
}
