import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

const WHATSAPP_NUMBER = "5521995636020";
const PHONE_DISPLAY = "(21) 99563-6020";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-32"
    >
      {/* Background: gradiente escuro + imagem de carro (placeholder) */}
      <div className="absolute inset-0 bg-[#0d0d0d]" />
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 -scale-x-100"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />

      {/* Linhas decorativas verdes (estilo posts) */}
      <div className="absolute top-24 left-8 w-24 h-px bg-primary/60" />
      <div className="absolute top-24 left-8 w-px h-24 bg-primary/60" />
      <div className="absolute top-24 right-8 w-32 h-px bg-primary/40" />

      <div className="container mx-auto px-4 relative z-10 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex justify-end md:justify-start mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-black/60 border border-primary/40">
                <span className="text-primary font-bold text-sm uppercase">Associação de Proteção Veicular</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase leading-tight tracking-tight">
              Seu carro{" "}
              <span className="text-primary">protegido</span>
            </h1>
            <p className="text-white/90 text-lg mt-4 max-w-lg">
              Cobertura 100% FIPE, roubo e furto, colisão e assistência 24h. Trabalhe e viaje com tranquilidade.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white font-bold uppercase text-base rounded-lg px-8"
              >
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Gostaria de contratar a proteção veicular.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contrate já!
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-black font-bold uppercase rounded-lg px-8"
              >
                <a href={`tel:+55${WHATSAPP_NUMBER.replace(/\D/g, "")}`}>
                  <Phone className="w-5 h-5 mr-2" />
                  {PHONE_DISPLAY}
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="hidden lg:flex items-center justify-center ml-20 xl:ml-28"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <img
              src="/Assets/HeaderImage.png"
              alt="Proteção veicular - app no celular"
              className="w-full max-w-lg h-auto object-contain rounded-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
