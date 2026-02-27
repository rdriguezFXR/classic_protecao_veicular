import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BadgeCheck } from "lucide-react";

const WHATSAPP_NUMBER = "5521995636020";

const ClassicCtaSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/40 mb-6"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <BadgeCheck className="w-5 h-5 text-primary" />
            <span className="text-primary font-bold text-sm uppercase">Cadastrados na SUSEP</span>
          </motion.div>
          <motion.h2
            className="text-3xl md:text-4xl font-black uppercase tracking-tight"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Faça agora sua proteção
          </motion.h2>
          <motion.p
            className="text-white/80 mt-4 text-lg"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Planos completos a partir de <strong className="text-primary">R$ 99,90</strong>.
            <br />
            Para motoristas de app (99, iFood, Uber) e todos os perfis.
          </motion.p>
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white font-bold uppercase text-lg rounded-xl px-10 py-6"
            >
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Gostaria de fazer minha proteção veicular.")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Solicite sua cotação no WhatsApp
              </a>
            </Button>
            <p className="text-white/60 text-sm mt-4">(21) 99563-6020</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ClassicCtaSection;
