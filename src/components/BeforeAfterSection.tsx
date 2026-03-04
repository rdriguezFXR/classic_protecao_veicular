import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const CASOS = [
  {
    id: 1,
    antes: "/Assets/Antes - RENAUT.jpeg",
    depois: "/Assets/Depois- RENAUT.jpeg",
    titulo: "Renault - Restauração Completa",
    descricao: "Veículo restaurado após acidente com cobertura 100% FIPE"
  },
  {
    id: 2,
    antes: "/Assets/Antes-Nissan.jpeg",
    depois: "/Assets/Depois-Nissan.jpeg",
    titulo: "Nissan - Recuperação Total",
    descricao: "Danos reparados com qualidade e agilidade pela Classic"
  }
];

export default function BeforeAfterSection() {
  return (
    <section
      id="antes-depois"
      className="relative isolate py-16 md:py-24 overflow-hidden bg-gradient-to-b from-emerald-50/80 via-white to-primary/10"
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
            Resultados reais
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase leading-tight text-[#0d0d0d] mb-4">
            Antes e Depois
          </h2>
          <p className="text-[#555] text-base md:text-lg max-w-2xl mx-auto">
            Veja casos reais de veículos restaurados com nossa proteção
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <Carousel opts={{ loop: true, align: "start" }} className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {CASOS.map((caso, index) => (
                <CarouselItem key={caso.id} className="pl-2 md:pl-4 basis-full">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
                  >
                    {/* Imagens lado a lado */}
                    <div className="grid grid-cols-2 gap-0">
                      <div className="relative group overflow-hidden">
                        <div className="absolute top-4 left-4 z-10 bg-red-500 text-white px-3 py-1 rounded-md text-xs font-bold uppercase">
                          Antes
                        </div>
                        <img
                          src={caso.antes}
                          alt={`${caso.titulo} - Antes`}
                          className="w-full h-[300px] md:h-[400px] object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="relative group overflow-hidden">
                        <div className="absolute top-4 right-4 z-10 bg-primary text-white px-3 py-1 rounded-md text-xs font-bold uppercase">
                          Depois
                        </div>
                        <img
                          src={caso.depois}
                          alt={`${caso.titulo} - Depois`}
                          className="w-full h-[300px] md:h-[400px] object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    </div>

                    {/* Informações */}
                    <div className="p-6">
                      <h3 className="text-xl font-black text-[#0d0d0d] mb-2 uppercase">
                        {caso.titulo}
                      </h3>
                      <p className="text-[#555] text-sm">
                        {caso.descricao}
                      </p>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 md:left-4 -translate-y-1/2 border-primary/50 bg-white/90 backdrop-blur-sm text-primary hover:bg-primary hover:text-white hover:border-primary shadow-lg transition-all" />
            <CarouselNext className="right-2 md:right-4 -translate-y-1/2 border-primary/50 bg-white/90 backdrop-blur-sm text-primary hover:bg-primary hover:text-white hover:border-primary shadow-lg transition-all" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
