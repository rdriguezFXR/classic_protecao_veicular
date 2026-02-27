import { motion } from "framer-motion";
import { Phone, AlertTriangle } from "lucide-react";

const EMERGENCY_NUMBER = "0800 000 1677";
const SERVICOS = [
  "ROUBO/FURTO",
  "COLISÃO",
  "PANE ELÉTRICA OU MECÂNICA",
  "PANE SECA",
  "SOCORRO CHAVEIRO",
  "SOCORRO BORRACHEIRO",
];

const ClassicEmergenciaSection = () => {
  return (
    <section id="emergencia" className="py-16 md:py-24 bg-[#0d0d0d] text-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-2xl mx-auto bg-white/5 border-2 border-primary/40 rounded-2xl p-8 md:p-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/20 mb-6">
            <AlertTriangle className="w-5 h-5 text-primary" />
            <span className="text-primary font-bold text-sm uppercase">Atenção associados</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-4">
            Em caso de emergência
          </h2>
          <a
            href="tel:08000001677"
            className="inline-flex items-center gap-3 text-primary font-black text-3xl md:text-4xl hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded-lg"
          >
            <Phone className="w-10 h-10" />
            {EMERGENCY_NUMBER}
          </a>
          <ul className="mt-8 text-left space-y-2 max-w-sm mx-auto">
            {SERVICOS.map((s) => (
              <li key={s} className="flex items-center gap-2 text-white/90 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default ClassicEmergenciaSection;
