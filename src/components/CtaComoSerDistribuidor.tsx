// components/BellysDistributorSection.tsx
import React from "react";
import { motion } from "framer-motion";

type Benefit = {
  title: string;
  desc: string;
  icon?: React.ReactNode;
  image?: string; // opcional: usa uma foto em vez do ícone
};

type Props = {
  id?: string;
  ctaHref?: string;          // ex.: "/seja-distribuidor"
  ctaLabel?: string;         // ex.: "Quero ser Distribuidor"
  videoUrl?: string;         // YouTube ou .mp4
  videoPoster?: string;      // thumbnail do vídeo
};

const benefits: Benefit[] = [
  {
    title: "Margem de até 200%",
    desc: "Modelo comercial com excelente rentabilidade e previsibilidade.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 3v18h18" />
        <path d="M7 15l4-4 4 3 5-7" />
      </svg>
    ),
  },
  {
    title: "Exclusividade regional",
    desc: "Proteção de território para valorizar seu investimento e relacionamento local.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 21s7-4.35 7-10a7 7 0 1 0-14 0c0 5.65 7 10 7 10Z" />
        <circle cx="12" cy="11" r="2" />
      </svg>
    ),
  },
  {
    title: "Suporte em marketing e vendas",
    desc: "Materiais, campanhas, treinamento e playbooks para acelerar resultados.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 11V5l8 3 8-3v6l-8 3-8-3Z" />
        <path d="M11 14v7M13 14v7" />
      </svg>
    ),
  },
  {
    title: "Produtos profissionais de alto giro",
    desc: "Linha técnica com demanda recorrente e ticket saudável.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 3h8v6H8z" />
        <path d="M6 9h12v12H6z" />
      </svg>
    ),
  },
  {
    title: "Marca em expansão no Brasil",
    desc: "Estratégia de crescimento consistente e reputação construída com qualidade.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 12a9 9 0 1 0 18 0" />
        <path d="M12 3v18M3 12h18" />
      </svg>
    ),
  }
];

// util simples para YouTube
function toYouTubeEmbed(url: string) {
  try {
    if (!url) return null;
    const isYT = url.includes("youtube.com") || url.includes("youtu.be");
    if (!isYT) return null;
    const id = url
      .replace("https://youtu.be/", "")
      .replace("https://www.youtube.com/watch?v=", "")
      .split("&")[0];
    return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`;
  } catch {
    return null;
  }
}

export default function BellysDistributorSection({
  id = "distribuidor",
  ctaHref = "/seja-distribuidor",
  ctaLabel = "Quero ser Distribuidor",
  videoUrl = "/videos/VideoB-cosmectic.mp4",
  videoPoster = "/src/assets/video-poster.jpg",
}: Props) {
  const embed = toYouTubeEmbed(videoUrl);

  return (
    <section id={id} className="relative isolate scroll-mt-28">
      <div className="absolute inset-0 -z-10 bg-white dark:bg-[#171717]" />

      <div className="mx-auto w-full max-w-7xl px-6 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-10"
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium tracking-wide border-[#FFD24C]/40 bg-[#FFD24C]/10 text-black dark:border-purple-400/40 dark:bg-purple-400/10 dark:text-purple-400">
              Distribuidores B-Cosmetic
            </span>
            <span className="text-xs text-gray-600 dark:text-white/60">Parcerias com propósito</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight text-black dark:text-white">
            Por que ser <span className="text-[#FFD24C] dark:text-purple-400 font-bold">Distribuidor B-Cosmetic</span>?
          </h2>
          <p className="mt-3 max-w-3xl text-gray-700 dark:text-white/80 ">
            Vantagens exclusivas, suporte real e um portfólio profissional de alto giro — para você crescer com
            segurança, transparência e resultado na sua região.
          </p>
        </motion.div>

        {/* Grid: vídeo à esquerda e vantagens à direita */}
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          {/* Vídeo institucional */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative overflow-hidden rounded-2xl  bg-white  dark:bg-[#171717]"
          >
            <div className="absolute -inset-20 -z-10 bg-black/10 blur-2xl" />
            <div className="aspect-video w-full relative group">
              {embed ? (
                <iframe
                  className="h-full w-full rounded-2xl"
                  src={embed}
                  title="B-Cosmetic — Vídeo Institucional"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <>
                  <video
                    className="h-full w-full rounded-2xl"
                    src={videoUrl}
                    poster={videoPoster}
                    controls
                    playsInline
                  />
                  {/* Capa personalizada que desaparece ao clicar */}
                  <div className="absolute inset-0 rounded-2xl flex items-center justify-center cursor-pointer group-hover:scale-[1.02] transition-all duration-300 overflow-hidden" 
                       onClick={(e) => {
                         e.currentTarget.style.display = 'none';
                         const video = e.currentTarget.previousElementSibling as HTMLVideoElement;
                         if (video) {
                           video.play();
                         }
                       }}>
                    {/* Imagem de fundo */}
                    <img 
                      src="/leandro2.png" 
                      alt="B-Cosmetic" 
                      className="absolute inset-0 w-full h-full object-cover rounded-2xl dark:block hidden"
                    />
                    <img 
                      src="/leandro2-temaclaro.png" 
                      alt="B-Cosmetic" 
                      className="absolute inset-0 w-full h-full object-cover rounded-2xl dark:hidden block"
                    />
                    
                    {/* Overlay escuro para contraste */}
                    <div className="absolute inset-0 bg-black/40 rounded-2xl" />
                    
                    {/* Conteúdo da capa */}
                    <div className="relative z-10 text-center text-white">
                      {/* Botão Play com animação */}
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-white/40 rounded-full backdrop-blur-sm shadow-2xl group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-8 h-8 text-[#FFD24C] dark:text-white " fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                    
                    {/* Efeito de brilho */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                  </div>
                </>
              )}
            </div>
            <div className="p-5 bg-[#FFD24C]/70 dark:bg-purple-600/20 rounded-2xl mt-2  ">
              <h4 className="text-base font-bold text-black dark:text-white">B-Cosmetic</h4>
              <p className="mt-1 text-sm text-gray-700 dark:text-white/75">
              Você que chegou até aqui e deseja ter lucro acima de 200% com a sua revenda de produtos de alta qualidade e aceitação no mercado, treinamento, suporte, marketing,
              oportunidade em negócio real e escalável, benefícios que só a Becosmetic pode oferecer, responda o formulário abaixo que eu pessoalmente vou entrar em contato com você.
  </p>
            </div>
          </motion.div>

          {/* Benefícios em coluna vertical */}
          <div className="grid grid-cols-1 gap-5 ">
          {benefits.map((b) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
              className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-4 shadow-sm backdrop-blur dark:border-gray-600 dark:bg-black/20"
            >
              <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-transparent group-hover:ring-[#FFD24C] dark:group-hover:ring-purple-400 transition" />
              <h3 className="text-base font-semibold text-black dark:text-white">{b.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-gray-700 dark:text-white/80">{b.desc}</p>
            </motion.div>
          ))}
          </div>
        </div>

        
      </div>
    </section>
  );
}
