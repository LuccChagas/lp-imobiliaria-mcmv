"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  src: string;
  poster: string;
  largura: number;
  altura: number;
  titulo: string;
};

/**
 * O video so e baixado quando a pessoa toca no play.
 * Em 4G ruim, 1 MB de video que ninguem pediu e 1 MB desperdicado.
 */
export function VideoDepoimento({ src, poster, largura, altura, titulo }: Props) {
  const [tocando, setTocando] = useState(false);

  if (tocando) {
    return (
      <video
        src={src}
        poster={poster}
        controls
        autoPlay
        playsInline
        className="aspect-[9/16] w-full rounded-2xl bg-azul-950 object-cover"
      >
        {titulo}
      </video>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setTocando(true)}
      aria-label={`Reproduzir vídeo: ${titulo}`}
      className="group relative block aspect-[9/16] w-full overflow-hidden rounded-2xl border border-tinta-200 bg-tinta-100 transition-[border-color,box-shadow] hover:border-ouro-500/60 hover:shadow-[0_14px_32px_-18px_rgb(16_24_40_/_0.5)]"
    >
      <Image
        src={poster}
        alt=""
        width={largura}
        height={altura}
        sizes="(min-width: 640px) 20rem, 80vw"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-azul-950/60 via-transparent to-transparent"
      />
      <span
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-azul-800 shadow-lg transition-transform duration-200 group-hover:scale-110"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-7 w-7">
          <path d="M8 5.14v13.72a1 1 0 0 0 1.54.84l10.3-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14Z" />
        </svg>
      </span>
    </button>
  );
}
