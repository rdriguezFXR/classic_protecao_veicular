import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const CONSULTORAS = [
  { id: 1, nome: "Andressa Aleixo", imagem: "/Assets/Consultora-ANDRESSA-ALEIXO.png", cargo: "Consultora" },
  { id: 2, nome: "Bruna Maia", imagem: "/Assets/Consultora-BRUNA-MAIA.png", cargo: "Consultora" },
  { id: 3, nome: "Daiane Costa", imagem: "/Assets/Consultora-DAIANE-COSTA.png", cargo: "Consultora" },
  { id: 4, nome: "Ellen Martins", imagem: "/Assets/Consultora-ELLEN_MARTINS.png", cargo: "Consultora" },
  { id: 5, nome: "Gabriela Silvério", imagem: "/Assets/Consultora-GABRIELA-SILVERIO.png", cargo: "Consultora" },
];

export default function ClassicProtecaoGaleriaSection() {
  return (
    <section
      id="galeria"
      className="relative isolate py-16 md:py-24 overflow-hidden bg-gradient-to-b from-white via-emerald-50/80 to-primary/10"
    >
      <div className="container mx-auto px-4">
        <div className="-mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 py-12 bg-[#0d0d0d] rounded-2xl">
          <h3 className="text-center text-white font-bold text-lg uppercase tracking-wide mb-8">
            Nossas consultoras
          </h3>
          <Carousel opts={{ loop: true, align: "start" }} className="w-full max-w-4xl mx-auto">
            <CarouselContent className="-ml-2 md:-ml-4">
              {CONSULTORAS.map((consultora) => (
                <CarouselItem
                  key={consultora.id}
                  className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                >
               <div className="rounded-xl overflow-hidden bg-white/5 border border-white/10 p-5 text-center">
  <div className="w-28 h-28 mx-auto mb-4 flex-shrink-0 rounded-full p-[3px] bg-primary">
    <div className="w-full h-full rounded-full p-[3px] bg-[#0d0d0d]">
      <div className="relative w-full h-full rounded-full overflow-hidden">
        <img
          src={consultora.imagem}
          alt={consultora.nome}
          className="absolute inset-0 block w-full h-full object-cover object-center scale-[1.7]"
        />
      </div>
    </div>
  </div>

  <p className="text-white font-semibold text-sm">{consultora.nome}</p>
  <p className="text-primary/90 text-xs mt-0.5">{consultora.cargo}</p>
</div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 -translate-y-1/2 border-primary/50 bg-[#1a1a1a] text-primary hover:bg-primary hover:text-white" />
            <CarouselNext className="right-0 -translate-y-1/2 border-primary/50 bg-[#1a1a1a] text-primary hover:bg-primary hover:text-white" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
