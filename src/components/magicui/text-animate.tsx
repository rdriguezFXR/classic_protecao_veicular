"use client";

import { motion, Variants } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TextAnimateProps {
    children: string;
    className?: string;
    by?: "character" | "word";
    duration?: number;
    animation?: "blurInUp" | "fadeIn" | "slideUp" | "zoomIn";
}

export function TextAnimate({
    children,
    className = "",
    by = "character",
    duration = 5,
    animation = "blurInUp",
}: TextAnimateProps) {
    const baseDelay = 0.04;
    const split = by === "word" ? children.split(" ") : children.split("");

    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.3 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, []);

    const getVariants = (index: number): Variants => {
        const delay = index * baseDelay;
        const transition = {
            delay,
            duration: duration * 0.1,
            ease: "easeOut",
        };

        switch (animation) {
            case "fadeIn":
                return {
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition },
                };
            case "slideUp":
                return {
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0, transition },
                };
            case "zoomIn":
                return {
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1, transition },
                };
            case "blurInUp":
            default:
                return {
                    hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
                    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition },
                };
        }
    };

    return (
        <motion.div ref={ref} className={`inline-block overflow-hidden ${className}`}>
            {split.map((part, index) => (
                <motion.span
                    key={index}
                    variants={getVariants(index)}
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                    style={{ display: "inline-block", whiteSpace: "pre" }}
                >
                    {by === "word" ? part + " " : part}
                </motion.span>
            ))}
        </motion.div>
    );
}