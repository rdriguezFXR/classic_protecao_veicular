import { motion } from "framer-motion";
import { Shield, Car, CloudLightning, Wrench, Users, Clock } from "lucide-react";

const BENEFICIOS = [
  {
    icon: Car,
    titulo: "100% DA FIPE",
    desc: "Cobertura com base na tabela FIPE do seu veículo.",
  },
  {
    icon: Shield,
    titulo: "ROUBO E FURTO",
    desc: "Proteção completa em caso de roubo ou furto.",
  },
  {
    icon: CloudLightning,
    titulo: "FENÔMENOS DA NATUREZA",
    desc: "Danos por enchentes, granizo, vendavais e outros.",
  },
  {
    icon: Car,
    titulo: "COLISÃO",
    desc: "Cobertura para colisão e danos ao veículo.",
  },
  {
    icon: Users,
    titulo: "DANOS A TERCEIROS",
    desc: "Proteção em acidentes envolvendo terceiros.",
  },
  {
    icon: Clock,
    titulo: "MONITORAMENTO E ASSISTÊNCIA 24H",
    desc: "Suporte e assistência a qualquer hora.",
  },
];

const ClassicBeneficiosSection = () => {
  return (
    <section id="beneficios" className="py-16 md:py-24 bg-[#0d0d0d] text-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-primary font-bold text-sm uppercase tracking-wider">
            Coberturas
          </span>
          <h2 className="text-3xl md:text-4xl font-black uppercase mt-2 tracking-tight">
            Tudo que seu carro precisa
          </h2>
          <p className="text-white/70 mt-4 max-w-2xl mx-auto">
            Planos completos com as principais coberturas para você dirigir com segurança.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {BENEFICIOS.map((item, i) => (
            <motion.div
              key={item.titulo}
              className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-primary/50 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-primary uppercase text-sm tracking-wider">
                {item.titulo}
              </h3>
              <p className="text-white/80 text-sm mt-2">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClassicBeneficiosSection;
