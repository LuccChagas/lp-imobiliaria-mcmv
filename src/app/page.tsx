import { Cabecalho } from "@/components/Cabecalho";
import { Hero } from "@/components/Hero";
import { Empreendimento } from "@/components/Empreendimento";
import { Condicoes } from "@/components/Condicoes";
import { ProvaSocial } from "@/components/ProvaSocial";
import { SecaoFormulario } from "@/components/FormularioLead";
import { Rodape } from "@/components/Rodape";
import { BotaoFlutuante } from "@/components/BotaoFlutuante";
import { RastreioRolagem } from "@/components/RastreioRolagem";
import {
  contato,
  empreendimento,
  hero,
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
      amenityFeature: empreendimento.lazer.itens.map((item) => ({
        "@type": "LocationFeatureSpecification",
        name: item,
        value: true,
      })),
      address: {
        "@type": "PostalAddress",
        streetAddress: empreendimento.enderecos.empreendimento.linha1,
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
      sameAs: [`https://instagram.com/${contato.instagram}`, contato.siteDela],
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
        {/* Formulario logo apos a dobra: quem chega de anuncio ja quer saber
            se consegue, e nao deveria rolar a pagina inteira. */}
        <SecaoFormulario id="simulacao" compacto />
        <Empreendimento />
        <Condicoes />
        <ProvaSocial />
        <SecaoFormulario />
      </main>

      <Rodape />
      <BotaoFlutuante />
      <RastreioRolagem />
    </>
  );
}
