import { Check } from "lucide-react";

const ITENS = [
  "Veículos de passeio",
  "Motos",
  "Caminhonetes pesadas",
  "Caminhões pesados / Agregados",
  "Caminhões leves / Vans / Micro-ônibus",
  "Rastreamento com Assistência 24h",
];

const AboutSection = () => {
  return (
    <section
      id="planos"
      className="py-8 md:py-12 bg-white text-[#1a1a1a] overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Lado esquerdo - texto */}
          <div className="space-y-6 order-2 lg:order-1">
            <p className="text-primary font-bold text-sm uppercase tracking-wider">
              Não corra riscos desnecessários
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase leading-tight text-[#0d0d0d]">
              Planos que
              <br />
              cabem no seu bolso
            </h2>
            <p className="text-[#555] text-base md:text-lg leading-relaxed max-w-xl">
              Ter a proteção da Classic é a melhor opção para quem busca qualidade a preço justo.
              Nossos planos são completos, com tudo o que você precisa para ficar tranquilo todos
              os dias, onde estiver.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ITENS.map((item) => (
                <li key={item} className="flex items-center gap-2 text-[#0d0d0d] font-medium">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Lado direito - imagem com moldura em L */}
          <div className="relative order-1 lg:order-2">
            <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[380px] rounded-lg overflow-hidden">
              <img
                src="/Assets/imgbaner.png"
                alt="Proteção veicular Classic - colisão e assistência"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
