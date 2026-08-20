/**
 * Disparo de conversao para Meta Pixel, GA4 e dataLayer ao mesmo tempo.
 * Cada bloco tem try/catch proprio: se um script nao carregou (bloqueador,
 * conta ainda nao criada, 4G ruim), os outros continuam funcionando e a
 * pagina nunca quebra.
 */

type Parametros = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

function metaPixel(evento: string, parametros: Parametros) {
  try {
    window.fbq?.("track", evento, parametros);
  } catch {
    /* silencioso de proposito */
  }
}

function ga4(evento: string, parametros: Parametros) {
  try {
    window.gtag?.("event", evento, parametros);
  } catch {
    /* silencioso de proposito */
  }
}

function camadaDeDados(evento: string, parametros: Parametros) {
  try {
    window.dataLayer?.push({ event: evento, ...parametros });
  } catch {
    /* silencioso de proposito */
  }
}

function disparar(evento: string, parametros: Parametros = {}) {
  if (typeof window === "undefined") return;
  metaPixel(evento, parametros);
  ga4(evento, parametros);
  camadaDeDados(evento, parametros);
}

/** Clique em qualquer CTA de WhatsApp. */
export function rastrearContato(origem: string) {
  disparar("Contact", { origem, canal: "whatsapp" });
}

/** Clique num CTA que leva ao formulario, e nao ao WhatsApp.
 *  Evento proprio para dar pra comparar depois qual canal converte melhor. */
export function rastrearIntencaoFormulario(origem: string) {
  disparar("IntencaoFormulario", { origem, canal: "formulario" });
}

/** Envio do formulario de simulacao. */
export function rastrearLead(origem: string, extras: Parametros = {}) {
  disparar("Lead", { origem, ...extras });
}
