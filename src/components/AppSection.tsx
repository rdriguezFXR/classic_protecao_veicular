import { Smartphone, User, FileCheck, CreditCard } from "lucide-react";

export default function AppSection() {
  return (
    <section id="app" className="py-8 md:py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="flex justify-center lg:justify-end order-2 lg:order-1">
            <div className="relative w-[280px] md:w-[320px]">
              <div className="aspect-[9/19] rounded-[2.5rem] border-[14px] border-gray-800 bg-gray-100 shadow-2xl overflow-hidden">
                <div className="h-full flex flex-col bg-white p-4 pt-8">
                  <p className="text-center text-gray-500 text-sm font-medium mb-6">Serviços</p>
                  <div className="space-y-4">
                    <p className="font-bold text-gray-800 text-sm">Proteção veicular</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col items-center text-center gap-2">
                        <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center">
                          <Smartphone className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-xs font-medium text-gray-700">Solicitar cotação</span>
                      </div>
                      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col items-center text-center gap-2">
                        <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-xs font-medium text-gray-700">Minha proteção</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 space-y-2">
                    <p className="font-bold text-gray-800 text-sm">Outros serviços</p>
                    <div className="space-y-1.5">
                      {["Meu perfil", "Fale conosco", "Central de ajuda"].map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between bg-white rounded-lg px-3 py-2.5 border border-gray-100 text-xs text-gray-700"
                        >
                          {item}
                          <span className="text-gray-400">›</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-2xl md:text-4xl font-black text-[#0d0d0d] tracking-tight leading-tight">
              Entenda como contratar proteção veicular na{" "}
              <span className="text-primary">Classic</span>
            </h2>
            <div className="mt-4 p-4 rounded-xl bg-gray-100 text-gray-700 text-sm md:text-base">
              É só se cadastrar para ter acesso a ofertas com a melhor proteção para seu carro.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center mb-3">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Crie sua conta ou faça login na Classic para acessar os serviços de proteção
                  veicular.
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center mb-3">
                  <FileCheck className="w-6 h-6 text-primary" />
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Escolha o plano ideal, veja os detalhes da cobertura e clique em Contratar.
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center mb-3">
                  <CreditCard className="w-6 h-6 text-primary" />
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Preencha seus dados e finalize o pagamento. Tudo pronto para você rodar protegido.
                </p>
              </div>
            </div>

            <div className="mt-8 p-5 rounded-xl bg-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="font-bold text-gray-800">Não perca tempo e solicite agora</p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="https://wa.me/5521995636020?text=Olá!%20Gostaria%20de%20solicitar%20uma%20cotação."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-colors"
                >
                  Solicitar cotação
                </a>
                <a
                  href="#beneficios"
                  className="text-gray-700 font-medium text-sm hover:text-primary transition-colors"
                >
                  Saiba mais ›
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
