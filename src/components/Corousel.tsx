"use client";

import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Slide = {
    id: string | number;
    image: string;       // imagem do card
    bg: string;          // imagem do fundo sincronizado
    title: string;
    subtitle?: string;
    description?: string;
    ctaLabel?: string;
    ctaHref?: string;
};

interface CardsCarouselSectionProps {
    slides: Slide[];
    className?: string;
    height?: number; // altura do carrossel em px (desktop)
}

export default function CardsCarouselSection({
    slides,
    className,
    height = 410,
}: CardsCarouselSectionProps) {
    const [api, setApi] = useState<CarouselApi | null>(null);
    const [current, setCurrent] = useState(0);
    const total = slides.length;

    // controla index atual quando o usuário troca manualmente/auto
    useEffect(() => {
        if (!api) return;
        const onSelect = () => setCurrent(api.selectedScrollSnap());
        onSelect();
        api.on("select", onSelect);
        return () => {
            api.off("select", onSelect);
        };
    }, [api]);

    // helpers p/ classes
    const containerH = useMemo(() => {
        // alturas responsivas similares ao CSS original
        // md: ~active-height, base: heights menores
        return `
      h-[320px] md:h-[${height - 90}px] lg:h-[${height}px]
    `;
    }, [height]);

    return (
        <section
            className={[
                "relative isolate overflow-hidden",
                "min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh]",
                "rounded-2xl",
                className ?? "",
            ].join(" ")}
        >
            {/* BACKGROUND SLIDESHOW SINCRONIZADO */}
            <div className="absolute inset-0 -z-10">
                <AnimatePresence initial={false} mode="wait">
                    {slides.length > 0 && (
                        <motion.div
                            key={slides[current]?.bg ?? `bg-${current}`}
                            className="absolute inset-0"
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            style={{
                                backgroundImage: `linear-gradient(20deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 100%), url(${slides[current]?.bg})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        />
                    )}
                </AnimatePresence>

                {/* Overlay extra para contraste do conteúdo */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/40" />
            </div>

            {/* CONTEÚDO */}
            <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-10 md:py-14 lg:py-16">
                <div className="grid gap-10 md:grid-cols-2 md:items-center">
                    {/* LADO ESQUERDO: TÍTULOS/TEXTOS (as-changing-widget) */}
                    <div className="relative">
                        <AnimatePresence mode="wait">
                            {slides.length > 0 && (
                                <motion.div
                                    key={`text-${slides[current]?.id ?? current}`}
                                    initial={{ opacity: 0, y: 24 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -24 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    className="space-y-4"
                                >
                                    {slides[current]?.subtitle ? (
                                        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/90 ring-1 ring-white/15 backdrop-blur">
                                            {slides[current].subtitle}
                                        </div>
                                    ) : null}

                                    <h2 className="text-3xl font-extrabold leading-tight text-white md:text-4xl lg:text-5xl">
                                        {slides[current]?.title}
                                    </h2>

                                    {slides[current]?.description ? (
                                        <p className="max-w-prose text-base text-white/85 md:text-lg">
                                            {slides[current].description}
                                        </p>
                                    ) : null}

                                    {slides[current]?.ctaLabel && slides[current]?.ctaHref ? (
                                        <div className="pt-2">
                                            <a
                                                href={slides[current].ctaHref}
                                                className="inline-flex items-center gap-2 rounded-2xl bg-white/90 px-5 py-3 text-sm font-semibold text-neutral-900 shadow-lg ring-1 ring-black/5 transition hover:bg-white"
                                            >
                                                {slides[current].ctaLabel}
                                            </a>
                                        </div>
                                    ) : null}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* BARRA CENTRAL DE DOTS (as-bar) - mobile adapta para linha */}
                        <div className="pointer-events-auto mt-8 flex w-full items-center justify-center gap-3">
                            <Dots
                                total={total}
                                current={current}
                                onSelect={(i) => api?.scrollTo(i)}
                            />
                        </div>
                    </div>

                    {/* LADO DIREITO: CARDS CAROUSEL (as-side-slider) */}
                    <div className="relative">
                        <Carousel
                            setApi={setApi}
                            opts={{
                                loop: true,
                                align: "center",
                                inViewThreshold: 0.75,
                            }}
                            className="w-full"
                        >
                            <CarouselContent
                                className={[
                                    "items-end",
                                    "transition-[height,transform] duration-300 ease-in-out",
                                ].join(" ")}
                                style={{ height: undefined }}
                            >
                                {slides.map((s, i) => (
                                    <CarouselItem
                                        key={s.id ?? i}
                                        className={[
                                            "basis-4/5 sm:basis-3/4 md:basis-2/3 lg:basis-1/2",
                                            "px-4",
                                        ].join(" ")}
                                    >
                                        {/* CARD */}
                                        <motion.article
                                            className={[
                                                "relative w-full overflow-hidden rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.15)]",
                                                containerH,
                                            ].join(" ")}
                                            initial={false}
                                            animate={{
                                                height:
                                                    i === current
                                                        ? height
                                                        : Math.max(180, height - 120),
                                            }}
                                            transition={{ type: "spring", stiffness: 140, damping: 20 }}
                                        >
                                            {/* overlay gradiente diagonal como no modelo */}
                                            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-tr from-black/60 via-black/20 to-transparent" />

                                            {/* imagem do card */}
                                            <img
                                                src={s.image}
                                                alt={s.title}
                                                className="absolute inset-0 h-full w-full object-cover"
                                            />

                                            {/* rodapé com nome/autor/etc */}
                                            <div className="relative z-20 p-4 text-white drop-shadow">
                                                <h3 className="text-lg font-semibold">{s.title}</h3>
                                                {s.subtitle ? (
                                                    <p className="text-white/80 text-sm">{s.subtitle}</p>
                                                ) : null}
                                            </div>
                                        </motion.article>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>

                            {/* SETAS (as-slider-left/right) */}
                            <div className="pointer-events-none absolute inset-x-0 -top-6 flex items-center justify-between px-2 md:-top-8">
                                <div className="pointer-events-auto">
                                    <CarouselPrevious
                                        className="h-11 w-11 rounded-full bg-white/90 shadow-lg ring-1 ring-black/5 hover:bg-white"
                                        aria-label="Anterior"
                                    >
                                        <ChevronLeft className="h-5 w-5" />
                                    </CarouselPrevious>
                                </div>
                                <div className="pointer-events-auto">
                                    <CarouselNext
                                        className="h-11 w-11 rounded-full bg-white/90 shadow-lg ring-1 ring-black/5 hover:bg-white"
                                        aria-label="Próximo"
                                    >
                                        <ChevronRight className="h-5 w-5" />
                                    </CarouselNext>
                                </div>
                            </div>
                        </Carousel>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* --------------------------- Dots Component --------------------------- */

function Dots({
    total,
    current,
    onSelect,
}: {
    total: number;
    current: number;
    onSelect: (index: number) => void;
}) {
    if (total <= 1) return null;

    return (
        <div
            className={[
                "relative flex flex-wrap items-center justify-center gap-3",
                "before:absolute before:left-1/2 before:top-1/2 before:h-[1px] before:w-[calc(100%-20px)] before:-translate-x-1/2 before:-translate-y-1/2 before:bg-white/25",
                "md:flex-nowrap",
            ].join(" ")}
            style={
                {
                    // variáveis inspiradas no seu CSS
                    ["--dot-size" as any]: "20px",
                } as React.CSSProperties
            }
        >
            {Array.from({ length: total }).map((_, i) => {
                const active = i === current;
                return (
                    <button
                        key={i}
                        onClick={() => onSelect(i)}
                        className={[
                            "relative z-10 grid place-items-center rounded-full transition",
                            "size-5",
                            active ? "scale-100 bg-white/80" : "scale-75 bg-white/30 hover:bg-white/50",
                        ].join(" ")}
                        aria-label={`Ir para slide ${i + 1}`}
                    >
                        <span
                            className={[
                                "text-[10px] font-bold leading-none transition-opacity",
                                active ? "opacity-100 text-neutral-900" : "opacity-0 text-white",
                            ].join(" ")}
                        >
                            {i + 1}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}

/* --------------------------- Exemplo de uso --------------------------- */
// Passe este array de fora (ex.: página/parent):
// const slides: Slide[] = [
//   {
//     id: 1,
//     image: "/images/cards/card-01.jpg",
//     bg: "/images/backgrounds/bg-01.jpg",
//     title: "Linha Ozonizada",
//     subtitle: "Dermocosméticos",
//     description: "Tecnologia de ozonização para pele saudável e radiante.",
//     ctaLabel: "Conhecer produtos",
//     ctaHref: "/categoria/dermocosmeticos",
//   },
//   {
//     id: 2,
//     image: "/images/cards/card-02.jpg",
//     bg: "/images/backgrounds/bg-02.jpg",
//     title: "Like Sense For Men",
//     subtitle: "Perfumaria",
//     description: "Fragrâncias marcantes com alta fixação.",
//     ctaLabel: "Ver fragrâncias",
//     ctaHref: "/categoria/perfumaria",
//   },
//   {
//     id: 3,
//     image: "/images/cards/card-03.jpg",
//     bg: "/images/backgrounds/bg-03.jpg",
//     title: "Nutracêuticos",
//     subtitle: "Saúde integral",
//     description: "Suplementos de performance e bem-estar.",
//     ctaLabel: "Explorar linha",
//     ctaHref: "/categoria/nutraceuticos",
//   },
// ];
// <CardsCarouselSection slides={slides} height={410}/>
