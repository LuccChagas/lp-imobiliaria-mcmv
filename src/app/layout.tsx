import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@/components/Analytics";
import { meta, resolverUrl } from "@/lib/site";

const fonteTitulo = localFont({
  variable: "--fonte-titulo",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
  src: [
    { path: "../fonts/Manrope-Bold.woff2", weight: "700", style: "normal" },
    { path: "../fonts/Manrope-ExtraBold.woff2", weight: "800", style: "normal" },
  ],
});

const fonteTexto = localFont({
  variable: "--fonte-texto",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
  src: [
    { path: "../fonts/Inter-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Inter-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/Inter-SemiBold.woff2", weight: "600", style: "normal" },
  ],
});

const url = resolverUrl();

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: meta.titulo,
  description: meta.descricao,
  keywords: [...meta.palavras],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: meta.titulo,
    title: meta.titulo,
    description: meta.descricao,
  },
  twitter: {
    card: "summary_large_image",
    title: meta.titulo,
    description: meta.descricao,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a2647",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${fonteTitulo.variable} ${fonteTexto.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
