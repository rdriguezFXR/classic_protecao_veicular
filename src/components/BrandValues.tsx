import { motion } from "framer-motion";
import { Sparkles, Droplets, Leaf, Heart } from "lucide-react";

const values = [
  { icon: <Sparkles />, title: "Inovação", desc: "Fórmulas exclusivas e resultados visíveis." },
  { icon: <Droplets />, title: "Pureza", desc: "Ingredientes naturais e tecnologia limpa." },
  { icon: <Leaf />, title: "Sustentabilidade", desc: "Respeito à natureza em cada etapa." },
  { icon: <Heart />, title: "Cuidado", desc: "Beleza com empatia, para todos os estilos." },
];

export default function BrandValues() {
  return (
    <section className="bg-gradient-to-b from-[#1E082F] to-[#10061C] py-20 text-white">
      <h2 className="text-center text-3xl font-bold mb-12">Essência B-Cosmetic</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-6">
        {values.map((v, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.7 }}
            className="flex flex-col items-center text-center bg-white/5 rounded-2xl p-8 backdrop-blur border border-purple-600/20 hover:border-purple-400/50 transition"
          >
            <div className="text-purple-300 mb-4">{v.icon}</div>
            <h3 className="font-semibold text-xl mb-2">{v.title}</h3>
            <p className="text-sm text-purple-100/80">{v.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
