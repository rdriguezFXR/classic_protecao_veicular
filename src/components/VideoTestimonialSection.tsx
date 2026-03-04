import { motion } from "framer-motion";
import { Play } from "lucide-react";

export default function VideoTestimonialSection() {
  return (
    <section
      id="video-depoimento"
      className="relative isolate py-16 md:py-24 overflow-hidden bg-[#0d0d0d]"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
          {/* Vídeo - Lado Esquerdo (Desktop) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1 flex justify-center lg:justify-start"
          >
            <div className="relative rounded-lg overflow-hidden shadow-2xl bg-[#0d0d0d] w-full max-w-[270px] h-[480px] md:w-[360px] md:h-[640px] border-2 border-primary mx-auto lg:mx-0">
              <video
                src="/Assets/depoimentoclassic.mp4"
                controls
                className="w-full h-full object-cover"
                poster=""
              >
                Seu navegador não suporta o elemento de vídeo.
              </video>
            </div>
          </motion.div>

          {/* Depoimento em Texto - Lado Direito (Desktop) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <div className="text-white">
              <div className="flex items-center gap-2 mb-6">
                <Play className="w-5 h-5 text-primary" />
                <p className="text-primary font-bold text-sm uppercase tracking-wider">
                  Depoimento em Vídeo
                </p>
              </div>
              
              <h2 className="text-2xl md:text-3xl lg:text-5xl font-black uppercase leading-tight mb-4 md:mb-6">
                Associado Satisfeito com o{" "}
                <span className="text-primary">Atendimento</span>
              </h2>
              
              <div className="space-y-4 md:space-y-6 text-white/90 text-sm md:text-base lg:text-lg leading-relaxed">
                <p className="text-base md:text-lg lg:text-xl">
                  "A Classic Proteção Veicular superou todas as minhas expectativas! O atendimento foi impecável desde o primeiro contato até a resolução do meu caso."
                </p>
                
                <ul className="space-y-2 md:space-y-3">
                  <li className="flex items-start gap-2 md:gap-3">
                    <span className="text-primary mt-1 flex-shrink-0">•</span>
                    <span>Atendimento personalizado e humanizado</span>
                  </li>
                  <li className="flex items-start gap-2 md:gap-3">
                    <span className="text-primary mt-1 flex-shrink-0">•</span>
                    <span>Agilidade na resolução de sinistros</span>
                  </li>
                  <li className="flex items-start gap-2 md:gap-3">
                    <span className="text-primary mt-1 flex-shrink-0">•</span>
                    <span>Suporte completo em cada etapa do processo</span>
                  </li>
                </ul>
                
                <p className="font-semibold text-white text-base md:text-lg">
                  Veja no vídeo <span className="lg:hidden">abaixo</span><span className="hidden lg:inline">ao lado</span> como nossos associados avaliam o atendimento da Classic Proteção Veicular.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
