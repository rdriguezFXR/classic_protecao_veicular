"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

type CarouselItem = {
    id: string | number;
    title: string;
    subtitle?: string;
    image?: string; // full URL or /public path
    ctaLabel?: string;
    ctaHref?: string;
};

// -- Utility helpers ---------------------------------------------------------
const mod = (n: number, m: number) => ((n % m) + m) % m;
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

// -- Demo data (use your own) -----------------------------------------------
const demoItems: CarouselItem[] = [
    {
        id: 1,
        title: "Like Brasil — Perfumaria",
        subtitle: "Fragrâncias icônicas com alta fixação.",
        image: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?q=80&w=1200&auto=format&fit=crop",
        ctaLabel: "Conhecer",
        ctaHref: "#",
    },
    {
        id: 2,
        title: "Dermocosméticos Ozônio",
        subtitle: "Tecnologia e cuidado para a pele.",
        image: "https://images.unsplash.com/photo-1556228453-efd1a73ffca4?q=80&w=1200&auto=format&fit=crop",
        ctaLabel: "Saiba mais",
        ctaHref: "#",
    },
    {
        id: 3,
        title: "Nutracêuticos Premium",
        subtitle: "Resultados consistentes e bem-estar.",
        image: "https://images.unsplash.com/photo-1495546968767-f0573cca821e?q=80&w=1200&auto=format&fit=crop",
        ctaLabel: "Ver linha",
        ctaHref: "#",
    },
    {
        id: 4,
        title: "Like Diamond Experience",
        subtitle: "Exclusividade e reconhecimento.",
        image: "https://images.unsplash.com/photo-1516637090014-cb1ab0d08fc7?q=80&w=1200&auto=format&fit=crop",
        ctaLabel: "Explorar",
        ctaHref: "#",
    },
    {
        id: 5,
        title: "Like Drive",
        subtitle: "Mobilidade que impulsiona vendas.",
        image: "https://images.unsplash.com/photo-1520975764746-1a1b82a742fd?q=80&w=1200&auto=format&fit=crop",
        ctaLabel: "Ver projeto",
        ctaHref: "#",
    },
];

// -- Glowing Card ------------------------------------------------------------
function GlowingCard({
    item,
    isActive,
    onPointerEnter,
    onPointerLeave,
}: {
    item: CarouselItem;
    isActive: boolean;
    onPointerEnter: () => void;
    onPointerLeave: () => void;
}) {
    const ref = useRef<HTMLDivElement | null>(null);
    const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
    const [spot, setSpot] = useState({ x: 50, y: 50 });
    const rectRef = useRef<DOMRect | null>(null);
    const rafRef = useRef<number | null>(null);

    // Cache do getBoundingClientRect para evitar forced reflow
    const updateRect = () => {
        if (ref.current) {
            rectRef.current = ref.current.getBoundingClientRect();
        }
    };

    // Atualiza rect quando o componente monta ou a janela redimensiona
    useEffect(() => {
        updateRect();
        window.addEventListener('resize', updateRect, { passive: true });
        return () => window.removeEventListener('resize', updateRect);
    }, []);

    const handleMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
        const rect = rectRef.current;
        if (!rect) return;
        
        // Cancela frame anterior se ainda estiver pendente
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
        }

        // Usa requestAnimationFrame para otimizar performance
        rafRef.current = requestAnimationFrame(() => {
            const px = (e.clientX - rect.left) / rect.width; // 0..1
            const py = (e.clientY - rect.top) / rect.height; // 0..1
            const rx = clamp((px - 0.5) * 18, -18, 18); // rotateY
            const ry = clamp((0.5 - py) * 12, -12, 12); // rotateX
            setTilt({ rx, ry });
            setSpot({ x: px * 100, y: py * 100 });
        });
    };

    const resetTilt = () => {
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
        }
        setTilt({ rx: 0, ry: 0 });
    };

    return (
        <motion.div
            ref={ref}
            onPointerMove={handleMove}
            onPointerEnter={onPointerEnter}
            onPointerLeave={() => {
                onPointerLeave();
                resetTilt();
            }}
            style={{
                transformStyle: "preserve-3d",
                // Glow spotlight position
                // @ts-expect-error CSS var for inline radial gradient
                "--spot-x": `${spot.x}%`,
                "--spot-y": `${spot.y}%`,
            }}
            animate={{ rotateY: tilt.rx, rotateX: tilt.ry }}
            transition={{ type: "spring", stiffness: 220, damping: 18, mass: 0.6 }}
            className={[
                "group relative aspect-[4/5] w-[76vw] max-w-[420px] select-none",
                "rounded-3xl p-[1px]",
                "bg-gradient-to-r from-emerald-400 via-cyan-300 to-emerald-400",
                "shadow-[0_0_30px_rgba(16,185,129,0.35)]",
            ].join(" ")}
        >
            {/* Card body */}
            <div
                className={[
                    "relative h-full w-full overflow-hidden rounded-3xl",
                    "bg-neutral-900/70 backdrop-blur-xl",
                    "ring-1 ring-white/10",
                ].join(" ")}
            >
                {/* Background image */}
                <div className="absolute inset-0">
                    {item.image ? (
                        // Standard img to keep it framework-agnostic
                        <img
                            src={item.image}
                            alt={item.title}
                            className={[
                                "h-full w-full object-cover",
                                isActive ? "scale-105" : "scale-100",
                                "transition-transform duration-700 ease-out",
                            ].join(" ")}
                            draggable={false}
                        />
                    ) : (
                        <div className="h-full w-full bg-gradient-to-br from-emerald-700 to-emerald-900" />
                    )}
                    {/* Vignette */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/60" />
                </div>

                {/* Glow spotlight that follows the cursor */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                        background:
                            "radial-gradient(360px 360px at var(--spot-x) var(--spot-y), rgba(16,185,129,0.28), transparent 60%)",
                        mixBlendMode: "screen",
                    }}
                />

                {/* Content */}
                <div
                    className={[
                        "relative z-10 flex h-full flex-col justify-end",
                        "p-6 md:p-7 lg:p-8",
                        "text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]",
                    ].join(" ")}
                >
                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-2.5 py-1 text-xs font-medium text-emerald-200 ring-1 ring-inset ring-emerald-300/30">
                            Destaque
                        </span>
                    </div>
                    <h3 className="mt-3 text-2xl font-semibold leading-tight md:text-3xl">
                        {item.title}
                    </h3>
                    {item.subtitle && (
                        <p className="mt-2 max-w-[40ch] text-sm text-neutral-200/90 md:text-base">
                            {item.subtitle}
                        </p>
                    )}

                    {(item.ctaLabel || item.ctaHref) && (
                        <div className="mt-5">
                            <a
                                href={item.ctaHref || "#"}
                                className={[
                                    "inline-flex items-center gap-2",
                                    "rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold text-white",
                                    "ring-1 ring-inset ring-white/20 backdrop-blur",
                                    "transition-all hover:-translate-y-0.5 hover:bg-white/15 hover:ring-white/30",
                                ].join(" ")}
                            >
                                {item.ctaLabel || "Saiba mais"}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="h-4 w-4"
                                >
                                    <path d="M13.5 4.5a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0V7.914l-8.793 8.793a1 1 0 0 1-1.414-1.414L17.086 6.5H14.5a1 1 0 0 1-1-1z" />
                                </svg>
                            </a>
                        </div>
                    )}
                </div>

                {/* Subtle inner border glow */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />
            </div>
        </motion.div>
    );
}

// -- Main Carousel -----------------------------------------------------------
export default function GlowingCardCarousel({
    items = demoItems,
    autoPlay = true,
    autoPlayMs = 4000,
}: {
    items?: CarouselItem[];
    autoPlay?: boolean;
    autoPlayMs?: number;
}) {
    const count = items.length;
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const hovering = useRef(false);

    // Autoplay loop
    useEffect(() => {
        if (!autoPlay || paused || count <= 1) return;
        const id = setInterval(() => setIndex((i) => mod(i + 1, count)), autoPlayMs);
        return () => clearInterval(id);
    }, [autoPlay, autoPlayMs, paused, count]);

    // Swipe / drag support
    const dragState = useRef<{ startX: number; dx: number; dragging: boolean } | null>(null);

    const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        dragState.current = { startX: e.clientX, dx: 0, dragging: true };
        setPaused(true);
    };
    const onPointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
        if (!dragState.current?.dragging) return;
        dragState.current.dx = e.clientX - dragState.current.startX;
    };
    const onPointerUp: React.PointerEventHandler<HTMLDivElement> = (e) => {
        if (!dragState.current) return;
        const { dx } = dragState.current;
        dragState.current.dragging = false;
        if (dx > 60) setIndex((i) => mod(i - 1, count));
        else if (dx < -60) setIndex((i) => mod(i + 1, count));
        dragState.current = null;
        if (!hovering.current) setPaused(false);
    };

    const goNext = () => setIndex((i) => mod(i + 1, count));
    const goPrev = () => setIndex((i) => mod(i - 1, count));

    const handleWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
        if (Math.abs(e.deltaX) < 40 && Math.abs(e.deltaY) < 40) return;
        setPaused(true);
        if (e.deltaY > 0 || e.deltaX > 0) goNext();
        else goPrev();
        window.setTimeout(() => !hovering.current && setPaused(false), 250);
    };

    // Precompute card transforms (depth, offset, opacity)
    const positions = useMemo(() => {
        return items.map((_, i) => {
            let d = i - index; // can be negative or positive
            // wrap to the shortest path in the circular list
            if (d > count / 2) d -= count;
            if (d < -count / 2) d += count;
            const ad = Math.abs(d);
            const translateX = d * 260; // px
            const translateZ = -ad * 120; // depth
            const rotateY = d * -12; // deg
            const scale = 1 - ad * 0.08;
            const opacity = clamp(1 - ad * 0.12, 0.35, 1);
            const zIndex = 100 - Math.round(ad * 10);
            const blur = ad >= 2 ? 2 : 0;
            return { translateX, translateZ, rotateY, scale, opacity, zIndex, blur, d, ad };
        });
    }, [items, index, count]);

    return (
        <section
            className={[
                "relative mx-auto w-full max-w-7xl",
                "py-10 md:py-14 lg:py-16",
            ].join(" ")}
        >
            {/* Decorative background glow */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute left-1/2 top-8 h-56 w-[56rem] -translate-x-1/2 rounded-full blur-3xl opacity-60 bg-gradient-to-r from-emerald-500/20 via-cyan-400/20 to-emerald-500/20" />
            </div>

            <div className="mb-6 flex items-end justify-between gap-4 px-4 md:px-6">
                <div>
                    <h2 className="text-balance text-2xl font-semibold tracking-tight text-white md:text-3xl">
                        3D Glowing Card Carousel
                    </h2>
                    <p className="mt-1 text-sm text-neutral-300/90">
                        Passe o mouse, arraste, use as setas ou aguarde o autoplay.
                    </p>
                </div>
                {/* Controls (desktop) */}
                <div className="hidden items-center gap-2 md:flex">
                    <button
                        onClick={goPrev}
                        aria-label="Anterior"
                        className="rounded-xl bg-white/5 px-3 py-2 text-white ring-1 ring-white/10 transition hover:bg-white/10"
                    >
                        ←
                    </button>
                    <button
                        onClick={goNext}
                        aria-label="Próximo"
                        className="rounded-xl bg-white/5 px-3 py-2 text-white ring-1 ring-white/10 transition hover:bg-white/10"
                    >
                        →
                    </button>
                </div>
            </div>

            {/* Carousel viewport */}
            <div
                role="listbox"
                aria-label="3D Glowing Carousel"
                className={[
                    "relative h-[460px] md:h-[520px] lg:h-[560px]",
                    "px-4 md:px-6",
                ].join(" ")}
                style={{ perspective: "1200px" }}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onWheel={handleWheel}
                onMouseEnter={() => {
                    hovering.current = true;
                    setPaused(true);
                }}
                onMouseLeave={() => {
                    hovering.current = false;
                    setPaused(false);
                }}
            >
                <div className="relative mx-auto h-full w-full">
                    {items.map((item, i) => {
                        const p = positions[i];
                        const active = p.ad < 0.5;
                        return (
                            <div
                                key={item.id}
                                aria-selected={active}
                                className="absolute left-1/2 top-1/2 will-change-transform"
                                style={{
                                    transform:
                                        `translate3d(${p.translateX}px, -50%, ${p.translateZ}px)` +
                                        ` rotateY(${p.rotateY}deg)` +
                                        ` scale(${p.scale})`,
                                    zIndex: p.zIndex,
                                    filter: p.blur ? `blur(${p.blur}px)` : undefined,
                                    transition:
                                        "transform 600ms cubic-bezier(.22,.61,.36,1), filter 600ms, opacity 600ms",
                                }}
                            >
                                <div style={{ transformStyle: "preserve-3d" }}>
                                    <GlowingCard
                                        item={item}
                                        isActive={active}
                                        onPointerEnter={() => setPaused(true)}
                                        onPointerLeave={() => setPaused(false)}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Mobile controls */}
                <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-2 md:hidden">
                    <button
                        onClick={goPrev}
                        aria-label="Anterior"
                        className="rounded-xl bg-white/5 px-3 py-2 text-white ring-1 ring-white/10 backdrop-blur transition hover:bg-white/10"
                    >
                        ←
                    </button>
                    <button
                        onClick={goNext}
                        aria-label="Próximo"
                        className="rounded-xl bg-white/5 px-3 py-2 text-white ring-1 ring-white/10 backdrop-blur transition hover:bg-white/10"
                    >
                        →
                    </button>
                </div>
            </div>

            {/* Dots */}
            <div className="mt-6 flex justify-center gap-2">
                {items.map((_, i) => {
                    const isActive = i === index;
                    return (
                        <button
                            key={i}
                            onClick={() => setIndex(i)}
                            aria-label={`Ir ao slide ${i + 1}`}
                            className={[
                                "h-2.5 w-2.5 rounded-full",
                                isActive ? "bg-emerald-400" : "bg-white/25",
                                "ring-1 ring-inset ring-white/20 transition",
                            ].join(" ")}
                        />
                    );
                })}
            </div>
        </section>
    );
}
