import { ImageResponse } from "next/og";
import { hero, pessoa } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${hero.empreendimento} ${hero.empreendimentoComplemento}`;

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "58px 68px",
          background:
            "linear-gradient(130deg, #061931 0%, #12437f 58%, #0e3565 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              border: "1px solid rgba(201,162,39,0.55)",
              borderRadius: 999,
              padding: "8px 18px",
              fontSize: 19,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#e2c874",
              fontWeight: 700,
            }}
          >
            {hero.selo}
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 30,
              fontSize: 52,
              fontWeight: 800,
              letterSpacing: -1,
            }}
          >
            {hero.empreendimento}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 6,
              fontSize: 34,
              fontWeight: 700,
              color: "#e2c874",
            }}
          >
            {hero.empreendimentoComplemento}
          </div>
          <div
            style={{
              display: "flex",
              width: 90,
              height: 3,
              background: "#c9a227",
              marginTop: 22,
            }}
          />
          <div
            style={{
              display: "flex",
              marginTop: 22,
              fontSize: 27,
              color: "#dcebf9",
              maxWidth: 780,
            }}
          >
            1 e 2 dormitórios ao lado da Estação Granja Julieta · Zona Sul de SP
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(201,162,39,0.4)",
            paddingTop: 24,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 19, color: "#bcd8f3", letterSpacing: 2, textTransform: "uppercase" }}>
              {hero.destaqueRotulo}
            </div>
            <div style={{ display: "flex", fontSize: 64, fontWeight: 800, lineHeight: 1.05 }}>
              {hero.destaqueValor}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              fontSize: 21,
              color: "#dcebf9",
            }}
          >
            <div style={{ display: "flex", color: "#e2c874", fontWeight: 700 }}>
              {pessoa.nome}
            </div>
            <div style={{ display: "flex", marginTop: 4 }}>{pessoa.credencial}</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
