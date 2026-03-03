import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const CONSULTORAS = [
  
  { id: 6, nome: "Fabiola Christine", imagem: "/Assets/consultora - Fabiola Christine.png", cargo: "Consultora", contato: "5521999999999" },
  { id: 7, nome: "Cristiane Carvalho", imagem: "/Assets/Cristiane Carvalho- consultora.png", cargo: "Consultora", contato: "5521999999999" },
  { id: 8, nome: "Débora Regina", imagem: "/Assets/Financeiro - DEBORA REGINA .png", cargo: "Financeiro", contato: "5521999999999" },
  { id: 9, nome: "Nathalia Penna", imagem: "/Assets/Gestora administrativa - Nathalia Penna .png", cargo: "Gestora Administrativa", contato: "5521999999999" },
  { id: 10, nome: "Jéssica Helena", imagem: "/Assets/Marketing cadastro - Jéssica Helena.png", cargo: "Marketing Cadastro", contato: "5521999999999" },
  { id: 11, nome: "Rafaela Cláudia", imagem: "/Assets/Monitoramento - Rafaela Cláudia.png", cargo: "Monitoramento", contato: "5521999999999" },
];

export default function ClassicProtecaoGaleriaSection() {
  return (
    <section
      id="galeria"
      className="relative isolate py-16 md:py-24 overflow-hidden bg-gradient-to-b from-white via-emerald-50/80 to-primary/10"
    >
      <div className="container mx-auto px-4">
        <div className="-mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 py-12 bg-[#0d0d0d] rounded-2xl shadow-xl">
          <h3 className="text-center text-white font-bold text-lg md:text-xl uppercase tracking-wider mb-8">
            Nossa Equipe
          </h3>
          <Carousel opts={{ loop: true, align: "start" }} className="w-full max-w-6xl mx-auto">
            <CarouselContent className="-ml-3 md:-ml-4">
              {CONSULTORAS.map((consultora) => (
                <CarouselItem
                  key={consultora.id}
                  className="pl-3 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <div className="group rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 hover:border-primary/60 hover:bg-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1">
                    {/* Imagem retangular */}
                    <div className="relative w-full aspect-[4/5] overflow-hidden bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d]">
                      <img
                        src={consultora.imagem}
                        alt={consultora.nome}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    {/* Informações embaixo */}
                    <div className="p-3 md:p-4 text-center space-y-2">
                      <div>
                        <p className="text-white font-semibold text-sm md:text-base mb-1">{consultora.nome}</p>
                        <p className="text-primary/80 text-xs font-medium">{consultora.cargo}</p>
                      </div>
                      <Button
                        asChild
                        size="sm"
                        className="w-full bg-primary hover:bg-primary/90 text-white border-0 text-xs font-semibold py-2 shadow-md shadow-primary/30 hover:shadow-lg hover:shadow-primary/40 transition-all duration-300"
                      >
                        <a
                          href={`https://wa.me/${consultora.contato}?text=${encodeURIComponent(`Olá ${consultora.nome}! Gostaria de entrar em contato.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageCircle className="w-3 h-3 mr-1.5" />
                          Entrar em Contato
                        </a>
                      </Button>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 md:left-4 -translate-y-1/2 border-primary/50 bg-[#1a1a1a]/90 backdrop-blur-sm text-primary hover:bg-primary hover:text-white hover:border-primary shadow-lg transition-all" />
            <CarouselNext className="right-2 md:right-4 -translate-y-1/2 border-primary/50 bg-[#1a1a1a]/90 backdrop-blur-sm text-primary hover:bg-primary hover:text-white hover:border-primary shadow-lg transition-all" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
