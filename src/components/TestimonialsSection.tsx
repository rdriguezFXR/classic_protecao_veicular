import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const DEPOIMENTOS = [
  {
    id: 1,
    nome: "Carlos Silva",
    texto: "Excelente atendimento! A Classic Proteção Veicular salvou meu carro após um acidente. O processo foi rápido e eficiente.",
    nota: 5,
    veiculo: "Honda Civic 2020"
  },
  {
    id: 2,
    nome: "Maria Santos",
    texto: "Recomendo muito! A cobertura 100% FIPE me deu total tranquilidade. Atendimento impecável da equipe.",
    nota: 5,
    veiculo: "Toyota Corolla 2021"
  },
  {
    id: 3,
    nome: "João Oliveira",
    texto: "Melhor proteção veicular que já contratei. Assistência 24h sempre disponível e profissionais muito competentes.",
    nota: 5,
    veiculo: "Volkswagen Gol 2019"
  },
  {
    id: 4,
    nome: "Ana Costa",
    texto: "Fiquei impressionada com a rapidez na aprovação e no pagamento. A Classic realmente cumpre o que promete!",
    nota: 5,
    veiculo: "Fiat Uno 2020"
  }
];

export default function TestimonialsSection() {
  return (
    <section
      id="depoimentos"
      className="relative isolate py-16 md:py-24 overflow-hidden bg-gradient-to-b from-primary/10 via-white to-emerald-50/80"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-primary font-bold text-sm uppercase tracking-wider mb-2">
            O que nossos associados dizem
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase leading-tight text-[#0d0d0d] mb-4">
            Depoimentos
          </h2>
          <p className="text-white text-base md:text-lg max-w-2xl mx-auto">
            Veja o que nossos associados falam sobre a Classic Proteção Veicular
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DEPOIMENTOS.map((depoimento, index) => (
            <motion.div
              key={depoimento.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(depoimento.nota)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              
              <Quote className="w-8 h-8 text-primary/30 mb-4" />
              
              <p className="text-[#555] text-sm leading-relaxed mb-4 italic">
                "{depoimento.texto}"
              </p>
              
              <div className="border-t border-gray-100 pt-4">
                <p className="font-bold text-[#0d0d0d] text-sm">{depoimento.nome}</p>
                <p className="text-[#888] text-xs">{depoimento.veiculo}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
