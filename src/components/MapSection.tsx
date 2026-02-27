/**
 * Seção de localização com mapa.
 * Para usar seu endereço: abra o local no Google Maps → Compartilhar → Incorporar um mapa → copie o src do iframe.
 */
const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.350744440614!2d-43.1728969!3d-22.9064195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x997f58a6a00a9d%3A0x3f251d85272f76f7!2sRio%20de%20Janeiro%2C%20RJ!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr";

export default function MapSection() {
  return (
    <section id="localizacao" className="bg-[#0d0d0d] text-white py-12 md:py-16">
      <div className="container mx-auto px-4 mb-8">
        <div className="text-center">
          <p className="text-primary font-bold text-sm uppercase tracking-wider mb-1">
            Onde estamos
          </p>
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
            Localização
          </h2>
        </div>
      </div>
      {/* Mapa de ponta a ponta na tela - proporção 1920 x 500 */}
      <div className="w-full aspect-[1920/500] border-y border-white/10">
        <iframe
          src={MAP_EMBED_SRC}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Localização Classic Proteção Veicular"
          className="w-full h-full block"
        />
      </div>
      <div className="container mx-auto px-4 pt-6">
        <p className="text-center text-white/60 text-sm">
          Atendemos toda a região. Solicite sua cotação pelo WhatsApp.
        </p>
      </div>
    </section>
  );
}
