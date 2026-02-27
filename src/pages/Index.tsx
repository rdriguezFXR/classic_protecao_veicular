import Hero from "@/components/Hero";
import EssenceQuote from "@/components/EssenceQuote";
import AboutSection from "@/components/AboutSection";
import ClassicBeneficiosSection from "@/components/ClassicBeneficiosSection";
import ClassicCtaSection from "@/components/ClassicCtaSection";
import ClassicProtecaoGaleriaSection from "@/components/ClassicProtecaoGaleriaSection";
import AppSection from "@/components/AppSection";
import MapSection from "@/components/MapSection";

const Index = () => {
  return (
    <>
      <Hero />
      <EssenceQuote />
      <AboutSection />
      <ClassicBeneficiosSection />
      <AppSection />
      <ClassicProtecaoGaleriaSection />
      <ClassicCtaSection />
      <MapSection />
    </>
  );
};

export default Index;
