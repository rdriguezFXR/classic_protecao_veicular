import { Button } from "@/components/ui/button";
import { Instagram, Phone } from "lucide-react";

const WHATSAPP_NUMBER = "5521995636020";
const PHONE_DISPLAY = "(21) 99563-6020";
const EMERGENCY_0800 = "0800 000 1677";
const INSTAGRAM = "https://www.instagram.com/classicprotecaoveicular/";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1a1a1a] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,_hsl(120_100%_50%_/_0.15),_transparent_50%)]" />
      <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo + descrição */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <img
                src="/Assets/LOGO-CAR1.png"
                alt="Classic Proteção Veicular"
                className="h-[200px] md:h-[200px] w-auto object-contain"
              />
            </div>
            <p className="text-white/80 text-sm max-w-md mb-6">
              Proteção veicular com cobertura 100% FIPE. Roubo e furto, colisão, danos a terceiros e
              assistência 24h. Cadastrados na SUSEP.
            </p>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/20 border border-primary/40 inline-flex">
              <span className="text-primary font-bold text-sm uppercase">Cadastrados na SUSEP</span>
            </div>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-bold text-primary text-sm uppercase tracking-wider mb-4">
              Solicite sua cotação
            </h4>
            <a
              href={`tel:+55${WHATSAPP_NUMBER.replace(/\D/g, "")}`}
              className="flex items-center gap-2 text-white font-bold text-lg hover:text-primary transition-colors mb-2"
            >
              <Phone className="w-5 h-5 text-primary" />
              {PHONE_DISPLAY}
            </a>
            <Button
              asChild
              className="mt-2 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg"
            >
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Gostaria de solicitar uma cotação.")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </Button>
          </div>

          {/* Emergência */}
          <div>
            <h4 className="font-bold text-primary text-sm uppercase tracking-wider mb-4">
              Em caso de emergência
            </h4>
            <a
              href="tel:08000001677"
              className="flex items-center gap-2 text-white font-bold text-xl hover:text-primary transition-colors"
            >
              <Phone className="w-5 h-5 text-primary" />
              {EMERGENCY_0800}
            </a>
            <p className="text-white/70 text-xs mt-2">
              Roubo/furto, colisão, pane, socorro chaveiro e borracheiro.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <a
            href={INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/80 hover:text-primary transition-colors font-medium"
          >
            <Instagram className="w-5 h-5" />
            @CLASSICPROTECAOVEICULAR
          </a>
          <p className="text-white/50 text-sm">
            © {currentYear} Classic Proteção Veicular. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
