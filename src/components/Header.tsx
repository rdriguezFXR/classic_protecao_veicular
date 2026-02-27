import { useState, useEffect } from "react";
import { Menu, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";

const WHATSAPP_NUMBER = "5521995636020";
const PHONE_DISPLAY = "(21) 99563-6020";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigation = [
    { name: "Início", href: "/#home", scrollTo: "home" },
    { name: "Benefícios", href: "/#beneficios", scrollTo: "beneficios" },
    { name: "App", href: "/#app", scrollTo: "app" },
    { name: "Localização", href: "/#localizacao", scrollTo: "localizacao" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, scrollTo: string) => {
    if (scrollTo === "home") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      e.preventDefault();
      const element = document.getElementById(scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMenuOpen) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  return (
    <header
      className={cn(
        "w-full z-50 fixed top-0 left-0 right-0 transition-all duration-300",
        scrolled ? "bg-gray-900/80 backdrop-blur-md shadow-lg" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-2 md:px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center justify-center hover:opacity-90 transition-opacity">
          <img
            src="/Assets/LOGO-CAR1.png"
            alt="Classic Proteção Veicular"
            className="h-[80px] md:h-[120px] lg:h-[140px] w-auto object-contain mt-2"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={(e) => handleNavClick(e, item.scrollTo)}
              className="text-white/90 hover:text-primary font-medium text-sm uppercase tracking-wide transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Button
            asChild
            className="bg-primary hover:bg-primary/90 text-white font-bold uppercase text-sm rounded-lg border-0"
          >
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Gostaria de solicitar uma cotação de proteção veicular.")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-white font-bold uppercase text-sm rounded-lg"
          >
            <a href={`tel:+55${WHATSAPP_NUMBER.replace(/\D/g, "")}`}>
              <Phone className="w-4 h-4 mr-1" />
              {PHONE_DISPLAY}
            </a>
          </Button>
        </div>

        <div className="lg:hidden flex items-center gap-2">
          <Button
            variant="ghost"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
            className="text-white hover:bg-white/10 h-16 w-16 p-0"
          >
            <Menu className="w-7 h-7" style={{ width: '28px', height: '28px' }} />
          </Button>
        </div>
      </div>

      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetContent side="right" className="w-[300px] bg-[#1a1a1a] border-white/10">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2 text-white">
              <img
                src="/Assets/LOGO-CAR1.png"
                alt="Classic"
                className="h-9 w-auto object-contain"
              />
              <span>Classic</span>
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-4 mt-8">
            {navigation.map((item) => (
              <SheetClose asChild key={item.name}>
                <Link
                  to={item.href}
                  onClick={(e) => handleNavClick(e, item.scrollTo)}
                  className="block text-white/90 hover:text-primary font-medium uppercase text-sm py-2"
                >
                  {item.name}
                </Link>
              </SheetClose>
            ))}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white font-bold rounded-lg">
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </Button>
              <a
                href={`tel:+55${WHATSAPP_NUMBER.replace(/\D/g, "")}`}
                className="flex items-center justify-center gap-2 text-primary font-bold text-sm"
              >
                <Phone className="w-4 h-4" />
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Header;
