import { Button } from "@/components/ui/button";


const CompanyShowcase = () => {
  
  return (
    <section id="solucoes" className="relative py-8 md:py-10">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          src="https://github.com/rdriguezFXR/assets-b-cosmetic/blob/main/Assets%20B-Cosmetic/fundoqueroser.png?raw=true"
          alt="Fundo"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-white/55 dark:bg-white/20" />
      </div>


        {/* Call to Action */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center bg-gold/60 dark:bg-black/80 rounded-xl md:rounded-2xl p-6 md:p-8 shadow-corporate">
          <h3 className="text-2xl sm:text-3xl md:text-3xl font-heading font-bold text-white mb-3 md:mb-4 leading-tight">
            Pronto para fazer parte da B-Cosmetic?
          </h3>
          <p className="mb-6 md:mb-8 max-w-2xl mx-auto font-bold text-sm sm:text-base text-black dark:text-white/80 leading-relaxed">
            Junte-se à nossa rede e atue com produtos de alta performance,
            suporte real e oportunidades de crescimento.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="px-4 py-3 md:px-6 font-semibold text-sm md:text-base bg-[#171717]/80 text-white hover:bg-[#171717] dark:bg-purple-600 dark:text-white dark:hover:bg-purple-500 transition-all"
            >
              <a href="/seja-distribuidor#inicio-formulario">
                QUERO SER UM CONSULTOR
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="px-4 py-3 md:px-6 font-semibold text-sm md:text-base border-2 border-[#C9A227] text-black hover:bg-black/70 hover:text-white dark:border-purple-400 dark:text-white dark:hover:bg-purple-400/50 transition-all"
            >
              <a href="https://wa.me/5527998806772?text=Olá!%20Quero%20falar%20com%20um%20especialista%20da%20B-Cosmetic." target="_blank" rel="noopener noreferrer">
                FALAR COM ESPECIALISTA
              </a>
            </Button>
          </div>
        </div>
      
    </section>
  );
};

export default CompanyShowcase;