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
  { id: 6, nome: "Fabiola Christine", imagem: "/Assets/consultora - Fabiola Christine.png", cargo: "Consultora", contato: "5521991842968" },
  { id: 7, nome: "Cristiane Carvalho", imagem: "/Assets/Cristiane Carvalho- consultora.png", cargo: "Consultora", contato: "5521994483228" },
  { id: 8, nome: "Débora Regina", imagem: "/Assets/Financeiro - DEBORA REGINA .png", cargo: "Financeiro", contato: "5521992749337" },
  { id: 9, nome: "Nathalia Penna", imagem: "/Assets/Gestora administrativa - Nathalia Penna .png", cargo: "Gestora Administrativa", contato: "5521978953704" },
  { id: 10, nome: "Jéssica Helena", imagem: "/Assets/Marketing cadastro - Jéssica Helena.png", cargo: "Marketing Cadastro", contato: "5521992722117" },
  { id: 11, nome: "Rafaela Cláudia", imagem: "/Assets/Monitoramento - Rafaela Cláudia.png", cargo: "Monitoramento", contato: "5521978961695" },
];

export default function ClassicProtecaoGaleriaSection() {
  return (
    <section
      id="galeria"
      className="relative isolate py-16 md:py-24 overflow-hidden bg-gradient-to-b from-white via-emerald-50/80 to-primary/10"
    >
      <div className="container mx-auto px-4">
        <div className="-mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 py-12 bg-[#0d0d0d]/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/5">
          <div className="text-center mb-8">
            <h3 className="text-white font-bold text-lg md:text-xl uppercase tracking-wider mb-2">
              Fale com Nossa Equipe
            </h3>
            <p className="text-white/70 text-sm md:text-base max-w-2xl mx-auto">
              Entre em contato com nossos especialistas e tire todas as suas dúvidas sobre proteção veicular
            </p>
          </div>
          <Carousel opts={{ loop: true, align: "start" }} className="w-full max-w-full mx-auto">
            <CarouselContent className="-ml-2 md:-ml-3">
              {CONSULTORAS.map((consultora) => (
                <CarouselItem
                  key={consultora.id}
                  className="pl-2 md:pl-3 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/6"
                >
                  <div className="group rounded-md overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 hover:border-primary/60 hover:bg-white/10 transition-all duration-300 hover:shadow-sm hover:shadow-primary/20 max-w-[180px] mx-auto">
                    {/* Imagem retangular */}
                    <div className="relative w-full aspect-[2/3] overflow-hidden bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d]">
                      <img
                        src={consultora.imagem}
                        alt={consultora.nome}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    {/* Informações embaixo */}
                    <div className="p-1.5 text-center space-y-1">
                      <div>
                        <p className="text-white font-medium text-[10px] md:text-xs mb-0.5 leading-tight">{consultora.nome}</p>
                        <p className="text-primary/80 text-[9px] font-medium leading-tight">{consultora.cargo}</p>
                      </div>
                      <Button
                        asChild
                        size="sm"
                        className="w-full bg-primary hover:bg-primary/90 text-white border-0 text-[9px] font-semibold py-1 px-1.5 h-auto shadow-sm shadow-primary/30 hover:shadow-sm hover:shadow-primary/40 transition-all duration-300"
                      >
                        <a
                          href={`https://wa.me/${consultora.contato}?text=${encodeURIComponent(`Olá ${consultora.nome}! Gostaria de entrar em contato.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageCircle className="w-2 h-2 mr-0.5" />
                          Contato
                        </a>
                      </Button>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 md:left-4 -translate-y-1/2 border-primary/50 bg-[#1a1a1a]/90 backdrop-blur-sm text-primary hover:bg-primary hover:text-white hover:border-primary shadow-lg transition-all lg:hidden" />
            <CarouselNext className="right-2 md:right-4 -translate-y-1/2 border-primary/50 bg-[#1a1a1a]/90 backdrop-blur-sm text-primary hover:bg-primary hover:text-white hover:border-primary shadow-lg transition-all lg:hidden" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
