import { motion } from "framer-motion";

const HIGHLIGHTS = ["proteção", "tranquilidade", "segurança"];

function highlightText(text: string) {
  const pattern = new RegExp(`(${HIGHLIGHTS.join("|")})`, "gi");
  const parts = text.split(pattern);
  return parts.map((part, idx) => {
    const isHighlight = HIGHLIGHTS.some(
      (w) => w.toLowerCase() === part.toLowerCase()
    );
    return isHighlight ? (
      <span key={idx} className="font-semibold text-primary">
        {part}
      </span>
    ) : (
      <span key={idx}>{part}</span>
    );
  });
}

export default function EssenceQuote() {
  const phrases = [
    "Dirigir com proteção é dirigir com tranquilidade.",
    "Seu carro merece segurança de verdade.",
    "Proteção veicular é paz de espírito na estrada.",
  ];

  return (
    <section className="relative text-center py-12 bg-[#0d0d0d] text-white">
      <div className="max-w-4xl mx-auto px-4">
        {phrases.map((p, i) => (
          <motion.h2
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className="text-xl md:text-2xl font-light tracking-wide mb-3"
          >
            {highlightText(p)}
          </motion.h2>
        ))}
      </div>
    </section>
  );
}
