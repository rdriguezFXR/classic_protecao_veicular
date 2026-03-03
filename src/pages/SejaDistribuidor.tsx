import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Star, Truck, Users, Target, Shield, TrendingUp, Loader2 } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const SejaDistribuidor = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [showHoverText, setShowHoverText] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);


  // Envio do formulário para Google Sheets (Apps Script)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Verifica se aceitou os termos
    if (!acceptedTerms) {
      alert('⚠️ Por favor, aceite os termos e condições para continuar.');
      return;
    }

    const form = e.currentTarget as HTMLFormElement;
    const data = new FormData(form);
    const onlyDigits = (s: string) => s.replace(/\D/g, '');

    // Validações
    const nomeCompleto = String(data.get('nomeCompleto') || '').trim();
    const email = String(data.get('email') || '').trim();
    const celular = onlyDigits(String(data.get('celular') || ''));
    const cpf = onlyDigits(String(data.get('cpf') || ''));
    const dataNascimento = String(data.get('dataNascimento') || '').trim();
    const cep = onlyDigits(String(data.get('cep') || ''));
    const rua = String(data.get('rua') || '').trim();
    const numero = onlyDigits(String(data.get('numero') || ''));
    const complemento = String(data.get('complemento') || '').trim();
    const bairro = String(data.get('bairro') || '').trim();
    const cidade = String(data.get('cidade') || '').trim();
    const uf = String(data.get('uf') || '').trim().toUpperCase();
    const valorInvestimento = String(data.get('valorInvestimento') || '');

    function isValidCPF(v: string) {
      if (!/\d{11}/.test(v) || /^([0-9])\1+$/.test(v)) return false;
      const calc = (base: number) => {
        let sum = 0;
        for (let i = 0; i < base; i++) sum += parseInt(v.charAt(i)) * (base + 1 - i);
        const mod = (sum * 10) % 11;
        return mod === 10 ? 0 : mod;
      };
      return calc(9) === parseInt(v.charAt(9)) && calc(10) === parseInt(v.charAt(10));
    }

    const errors: string[] = [];
    if (nomeCompleto.length < 5) errors.push('Nome completo inválido.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.push('E-mail inválido.');
    if (!(celular.length === 10 || celular.length === 11)) errors.push('Celular deve ter 10 ou 11 dígitos.');
    if (!isValidCPF(cpf)) errors.push('CPF inválido.');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dataNascimento)) errors.push('Data de nascimento inválida.');
    if (cep.length !== 8) errors.push('CEP deve ter 8 dígitos.');
    if (rua.length < 3) errors.push('Rua inválida.');
    if (numero.length < 1 || numero.length > 6) errors.push('Número inválido.');
    if (bairro.length < 2) errors.push('Bairro inválido.');
    if (cidade.length < 2) errors.push('Cidade inválida.');
    if (!/^[A-Z]{2}$/.test(uf)) errors.push('UF deve ter 2 letras.');
    if (!valorInvestimento) errors.push('Selecione o valor disponível para investir.');

    if (errors.length) {
      alert(errors.join('\n'));
      return;
    }

    const payload = {
      nomeCompleto,
      email,
      celular,
      cpf,
      dataNascimento,
      cep,
      rua,
      numero,
      complemento,
      bairro,
      cidade,
      uf,
      valorInvestimento,
    };

    setIsLoading(true);

    try {
      const formBody = new URLSearchParams(payload).toString();

      const response = await fetch('https://script.google.com/macros/s/AKfycbywLThYvSfJgHrk7i_yfIoEARyZSryjjJioF6bNiYFQs1piW1_2-mrCeKwvJ6PQSuM9/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formBody,
        // mode: 'no-cors', // Comentado temporariamente para teste
      });
      
      console.log('Resposta do servidor:', response);

      // Simula um delay para garantir que o loading apareça
      await new Promise(resolve => setTimeout(resolve, 1000));

      setIsLoading(false);
      setShowSuccess(true);
      form.reset();
      setAcceptedTerms(false);

      // Fecha o modal de sucesso após 5 segundos
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);

    } catch (err) {
      console.error(err);
      setIsLoading(false);
      alert('❌ Falha ao enviar. Por favor, tente novamente.');
    }

  };

  // Escolhe o banner baseado no tema
  const bannerImage = "/Assets/imgbaner.png";

  return (
    <div className={`min-h-screen ${isDark ? 'bg-background' : 'bg-white'}`}>
      {/* Banner Hero Section */}
      <div className="relative min-h-[500px] md:min-h-[600px] lg:h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src={bannerImage}
            alt="Banner Quero Ser Consultor"
            className="w-full h-full object-cover"
          />
          {/* Overlay Mobile */}
          <div className={`absolute inset-0 md:hidden ${
            isDark 
              ? 'bg-gradient-to-b from-black/60 via-black/40 to-black/60' 
              : 'bg-gradient-to-b from-black/50 via-black/30 to-black/50'
          }`}></div>
        </div>
        
        {/* Content Overlay */}
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center pt-20 md:pt-16">
          <div className="grid lg:grid-cols-2 gap-4 lg:gap-6 items-center w-full">
            
            {/* Text Content */}
            <div className="text-center md:text-left max-w-3xl mx-auto lg:mx-0 mt-8 md:mt-[140px]">
              

              {/* Main Heading */}
              <h1 className={`text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight drop-shadow-lg ${
                isDark ? 'text-white' : 'text-black'
              }`}>
                Venha ser um Distribuidor 
                <br/> <span className={`${isDark ? "text-purple-800" : "text-gold"}`}>Classic</span>
              </h1>

              {/* Description */}
              <p className={`text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed drop-shadow-md mt-3 md:mt-1 ${
                isDark ? 'text-white/90' : 'text-black/80'
              }`}>
              Construa sua liberdade financeira ajudando pessoas a se sentirem mais bonitas e confiantes.             
               </p>

              {/* CTA Button with Hover */}
              <div className="flex justify-center md:justify-start relative mt-6 md:mt-10">
                <Button 
                  asChild
                  className={`px-5 py-2.5 md:px-6 md:py-3 lg:px-8 lg:py-4 text-sm md:text-base lg:text-lg font-medium rounded-lg flex items-center gap-2 group shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 relative z-10 ${
                    isDark 
                      ? 'bg-purple-900 hover:bg-purple-800 text-white' 
                      : 'bg-gold hover:bg-gold-dark text-white'
                  }`}
                  onMouseEnter={() => setShowHoverText(true)}
                  onMouseLeave={() => setShowHoverText(false)}
                >
                  <a href="#inicio-formulario">
                    SEJA UM DISTRIBUIDOR
                    <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                </Button>

                {/* Hover Text - Desktop Only */}
                {showHoverText && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={`hidden lg:block absolute left-[300px] m-0 top-5 transform -translate-y-1/2 backdrop-blur-sm
                     px-4 py-2 rounded-lg shadow-xl border whitespace-nowrap font-bold text-base z-20 ${
                       isDark 
                         ? 'bg-white/95 text-purple-900 border-purple-200' 
                         : 'bg-black/80 text-white border-black/50 shadow-black/50'
                     }`}
                  >
                    VENHA FAZER PARTE DESSE TIME!
                    <div className={`absolute left-90 top-1/2 transform -translate-y-1/2 -translate-x-2 w-0 h-0 border-t-3 border-b-3 border-r-3 border-transparent ${
                      isDark ? 'border-r-white/95' : 'border-r-black/80'
                    }`}></div>
                  </motion.div>
                )}
              </div>

              
            </div>

            {/* Right Section - Empty for balance */}
            <div className="hidden lg:block"></div>
          </div>
        </div>
      </div>

      <section className={`py-20 ${isDark ? 'bg-gradient-to-r from-purple-950 to-purple-900' : 'bg-gradient-to-r from-amber-50 to-yellow-50'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight ${isDark ? 'text-white' : 'text-[#B8860B]'}`}>
              Abra as portas para um{" "}
              <span className={`${isDark ? 'bg-gradient-to-r from-purple-400 to-purple-600' : 'bg-gradient-to-r from-[#FFD24C] to-[#DAA520]'} bg-clip-text text-transparent font-black`}>
                novo ciclo na Classic
              </span>.
            </h2>
            <p className={`text-lg md:text-xl leading-relaxed ${isDark ? 'text-white/90' : 'text-[#B8860B]'}`}>
              A Classic Proteção Veicular te mostra uma realidade onde seus sonhos não têm limites, e cada dia é uma nova chance de se desenvolver, crescer e transformar a sua vida.
            </p>
          </div>
        </div>
      </section>

      

      {/* Seção Por que ser Distribuidor (imagem esquerda, textos direita) */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 grid gap-6 md:gap-10 lg:grid-cols-2 items-center">
          {/* Imagem à esquerda */}
          <div className="order-1 lg:order-1">
            <div className="relative overflow-hidden rounded-xl md:rounded-2xl border border-gray-200 shadow-lg dark:border-white/10">
              <img
                src="/Assets/ImgCar.png"
                alt="Operação de distribuição Classic"
                className="w-full h-[280px] md:h-[350px] lg:h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-transparent rounded-xl md:rounded-2xl" />
              <span className={`absolute bottom-3 left-3 md:bottom-4 md:left-4 inline-flex items-center rounded-full border px-2 py-0.5 md:px-3 md:py-1 text-[10px] md:text-xs font-medium tracking-wide backdrop-blur ${isDark ? 'border-purple-400/40 bg-purple-400/10 text-purple-300' : 'border-[#FFD24C]/40 bg-[#FFD24C]/10 text-[#FFD24C]'}`}>Rede de Distribuição</span>
            </div>
          </div>
          
          {/* Textos à direita */}
          <div className="order-2 text-center md:text-left">
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight ${isDark ? 'text-white' : 'text-black'}`}>
              Por que ser <span className={`${isDark ? 'text-purple-400' : 'text-[#FFD24C]'}`}>Distribuidor B‑Cosmetic</span> agora?
              </h2>
            <p className={`mt-3 md:mt-4 text-base md:text-lg leading-relaxed ${isDark ? 'text-white/80' : 'text-black'}`}>
              Porque você não precisa apostar — precisa de um <strong className={`${isDark ? 'text-purple-400' : 'text-[#FFD24C]'} font-semibold`}>modelo previsível</strong>, com
              produtos de alto giro, proteção de território e um motor de marketing que já chega pronto.
            </p>

            <ul className={`mt-4 md:mt-6 space-y-2 md:space-y-3 ${isDark ? 'text-white/85' : 'text-black'}`}>
              <li className="flex gap-3">
                <span className={`mt-2 inline-block h-2 w-2 rounded-full ${isDark ? 'bg-purple-400' : 'bg-[#FFD24C]'}`} />
                <div>
                  <strong className="font-semibold">Margens saudáveis + giro constante</strong> — linha profissional com recompra mensal.
                </div>
              </li>
              <li className="flex gap-3">
                <span className={`mt-2 inline-block h-2 w-2 rounded-full ${isDark ? 'bg-purple-400' : 'bg-[#FFD24C]'}`} />
                <div>
                  <strong className="font-semibold">Exclusividade regional</strong> — proteção de território para construir carteira com segurança.
            </div>
              </li>
              <li className="flex gap-3">
                <span className={`mt-2 inline-block h-2 w-2 rounded-full ${isDark ? 'bg-purple-400' : 'bg-[#FFD24C]'}`} />
                <div>
                  <strong className="font-semibold">Suporte real</strong> — materiais, campanhas, treinamentos e captação ativa de novos salões na sua região.
                  </div>
              </li>
              <li className="flex gap-3">
                <span className={`mt-2 inline-block h-2 w-2 rounded-full ${isDark ? 'bg-purple-400' : 'bg-[#FFD24C]'}`} />
                <div>
                  <strong className="font-semibold">Operação ágil</strong> — logística com SLA e fábrica integrada para escalar sem travar o caixa.
                </div>
              </li>
            </ul>

            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-2 md:gap-3">
              <Button asChild className="px-4 py-2.5 md:px-6 md:py-3 text-sm md:text-base font-semibold bg-[#FFD24C] text-black hover:bg-[#e6be43] dark:bg-purple-700 dark:text-white dark:hover:bg-purple-600">
                <a href="#inicio-formulario">QUERO SER DISTRIBUIDOR</a>
              </Button>
              <Button asChild variant="outline" className="px-4 py-2.5 md:px-6 md:py-3 text-sm md:text-base font-semibold border-[#FFD24C] text-current hover:bg-[#FFD24C]/10 dark:border-purple-400 dark:text-purple-200 dark:hover:bg-purple-400/10">
                <a href={`https://wa.me/5521995636020?text=${encodeURIComponent('Quero entender como funciona a distribuição da Classic Proteção Veicular na minha região.')}`} target="_blank" rel="noopener noreferrer">FALAR COM ESPECIALISTA</a>
              </Button>
            </div>

            {/* Prova de credibilidade rápida */}
            <div className="mt-4 md:mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4 text-center">
              {["Exclusividade", "Alto Giro", "Suporte", "Entrega Rápida"].map((kpi) => (
                <div key={kpi} className="rounded-lg md:rounded-xl border border-gray-200 px-2 py-3 md:px-3 md:py-4 dark:border-white/10">
                  <div className={`text-xs md:text-sm ${isDark ? 'text-white/70' : 'text-black'}`}>{kpi}</div>
                </div>
              ))}
              </div>
            </div>
          </div>
        </section>

      {/* New Beginning Section */}


{/* Processo de Distribuição - Tabela Profissional */}
<section className="py-0">
  <div className="container mx-auto px-4 max-w-6xl">
   

    <div className="mb-16">
      <span className={`text-sm font-semibold tracking-wider uppercase ${isDark ? 'text-gray-400' : 'text-black'}`}>
        Como Funciona
      </span>
      <h2 className={`text-3xl md:text-4xl font-bold mt-2 ${isDark ? 'text-white' : 'text-black'}`}>
        Processo de Distribuição
      </h2>
      <div className={`w-16 h-1 mt-4 ${isDark ? 'bg-white' : 'bg-black'}`}></div>
    </div>

    {/* Tabela */}
    <div className={`border ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
      {/* Header */}
      <div className={`grid grid-cols-12 gap-4 p-4 ${isDark ? 'bg-gray-900 border-b border-gray-800' : 'bg-gray-50 border-b border-gray-200'}`}>
        <div className="col-span-1"></div>
        <div className={`col-span-3 text-xs font-semibold tracking-wider uppercase ${isDark ? 'text-gray-400' : 'text-black'}`}>
          Etapa
        </div>
        <div className={`col-span-5 text-xs font-semibold tracking-wider uppercase ${isDark ? 'text-gray-400' : 'text-black'}`}>
          Descrição
        </div>
        <div className={`col-span-3 text-xs font-semibold tracking-wider uppercase ${isDark ? 'text-gray-400' : 'text-black'}`}>
          Responsável
        </div>
      </div>

      {/* Linhas */}
      {[
        { num: "01", fase: "Anúncio de Territórios", desc: "Mapeamento e divulgação de regiões disponíveis com análise de mercado", resp: "Classic" },
        { num: "02", fase: "Qualificação", desc: "Avaliação de perfil, capacidade financeira e fit comercial", resp: "Classic" },
        { num: "03", fase: "Contratação", desc: "Assinatura de exclusividade regional e onboarding", resp: "Ambos" },
        { num: "04", fase: "Primeira Compra", desc: "Pedido inicial com condições comerciais de distribuidor", resp: "Distribuidor" },
        { num: "05", fase: "Estruturação", desc: "Montagem de equipe de distribuidores e revendedores", resp: "Distribuidor" },
        { num: "06", fase: "Operação B2B", desc: "Vendas e entregas recorrentes para salões da região", resp: "Distribuidor" }
      ].map((linha, i) => (
        <div key={i} className={`grid grid-cols-12 gap-4 p-4 ${
          isDark ? 'border-b border-gray-800 hover:bg-gray-900/50' : 'border-b border-gray-200 hover:bg-gray-50'
        } transition-colors`}>
          <div className={`col-span-1 text-sm font-mono ${isDark ? 'text-gray-500' : 'text-black'}`}>
            {linha.num}
          </div>
          <div className={`col-span-3 text-sm font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
            {linha.fase}
          </div>
          <div className={`col-span-5 text-sm ${isDark ? 'text-gray-400' : 'text-black'}`}>
            {linha.desc}
          </div>
          <div className={`col-span-3 text-xs ${isDark ? 'text-gray-500' : 'text-black'}`}>
            {linha.resp}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
      

        {/* Seção 3: Processo de Distribuição Classic */}
        <section className="py-0 bg-background">
    

            {/* Animação Classic */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mt-16"
            >
              <div className="flex justify-center items-center gap-1 text-6xl md:text-8xl font-black">
                  {['C', 'O', 'S', 'M', 'E', 'T', 'I', 'C'].map((letter, index) => (
                    <motion.span
                      key={index}
                      initial={{ 
                        opacity: 0, 
                        scale: 0.5, 
                        rotateY: 90
                      }}
                      whileInView={{ 
                        opacity: 1, 
                        scale: 1, 
                        rotateY: 0
                      }}
                      transition={{ 
                        duration: 1.2, 
                        delay: index * 0.25,
                        type: "spring",
                        stiffness: 80,
                        damping: 15
                      }}
                      whileHover={{
                        scale: 1.15,
                        rotateY: 360,
                        transition: { duration: 1 }
                      }}
                      className="relative cursor-pointer"
                      style={{
                        WebkitTextStroke: isDark ? '1.5px rgba(255, 255, 255, 0.3)' : '1.5px #FFD24C',
                        color: 'transparent'
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </div>
            </motion.div>
          
        </section>

        {/* Formulário de Cadastro Classic */}
      <section id="cadastro-distribuidor" className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
              Cadastre-se para ser <span className={`${isDark ? 'text-purple-400' : 'text-[#FFD24C]'}`}>Parceiro Classic</span>
            </h2>
            <p className={`${isDark ? 'text-white/80' : 'text-black'} mt-2 text-sm`}>
              Preencha seus dados e escolha como deseja começar. Nossa equipe fará o primeiro contato.
            </p>
          </div>
          
          {/* Âncora para scroll */}
          <div id="inicio-formulario" className="scroll-mt-24"></div>
          
          {/* Form Grid */}
          <form id="formulario-distribuidor" onSubmit={handleSubmit} className={`rounded-2xl border p-4 md:p-6 shadow-sm max-w-5xl mx-auto ${isDark ? 'border-white/10 bg-gray-900/40' : 'border-gray-200 bg-white'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <div className="col-span-1 md:col-span-2">
                <label className={`text-xs font-medium opacity-80 ${isDark ? 'text-white' : 'text-black'}`}>Nome completo *</label>
                <input name="nomeCompleto" className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white" placeholder="Ex: João da Silva" required />
              </div>
              <div>
                <label className={`text-xs font-medium opacity-80 ${isDark ? 'text-white' : 'text-black'}`}>E-mail *</label>
                <input name="email" type="email" className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white" placeholder="seu@email.com" required />
              </div>
              <div>
                <label className={`text-xs font-medium opacity-80 ${isDark ? 'text-white' : 'text-black'}`}>Celular *</label>
                <input name="celular" type="tel" className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white" placeholder="(00) 99999-9999" required />
              </div>
              <div>
                <label className={`text-xs font-medium opacity-80 ${isDark ? 'text-white' : 'text-black'}`}>CPF *</label>
                <input name="cpf" className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white" placeholder="000.000.000-00" required />
              </div>
              <div>
                <label className={`text-xs font-medium opacity-80 ${isDark ? 'text-white' : 'text-black'}`}>Data de Nascimento *</label>
                <input name="dataNascimento" type="date" className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white" required />
              </div>
              <div>
                <label className={`text-xs font-medium opacity-80 ${isDark ? 'text-white' : 'text-black'}`}>CEP *</label>
                <input name="cep" className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white" placeholder="00000-000" required />
              </div>
              <div>
                <label className={`text-xs font-medium opacity-80 ${isDark ? 'text-white' : 'text-black'}`}>Rua *</label>
                <input name="rua" className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white" placeholder="Ex: Avenida Exemplo" required />
              </div>
              <div>
                <label className={`text-xs font-medium opacity-80 ${isDark ? 'text-white' : 'text-black'}`}>Número *</label>
                <input name="numero" className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white" placeholder="Ex: 123" required />
              </div>
              <div>
                <label className={`text-xs font-medium opacity-80 ${isDark ? 'text-white' : 'text-black'}`}>Complemento</label>
                <input name="complemento" className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white" placeholder="Apto / Bloco" />
              </div>
              <div>
                <label className={`text-xs font-medium opacity-80 ${isDark ? 'text-white' : 'text-black'}`}>Bairro *</label>
                <input name="bairro" className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white" placeholder="Ex: Centro" required />
              </div>
              <div>
                <label className={`text-xs font-medium opacity-80 ${isDark ? 'text-white' : 'text-black'}`}>Cidade *</label>
                <input name="cidade" className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white" placeholder="Ex: Rio de Janeiro" required />
              </div>
              <div>
                <label className={`text-xs font-medium opacity-80 ${isDark ? 'text-white' : 'text-black'}`}>UF *</label>
                <input name="uf" className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white" placeholder="Ex: RJ" maxLength={2} required />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className={`text-xs font-medium opacity-80 ${isDark ? 'text-white' : 'text-black'}`}>Valor disponível para investir *</label>
                <select name="valorInvestimento" className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white" required>
                  <option value="">Selecione uma faixa</option>
                  <option value="1-5k">R$ 1.000 a R$ 5.000</option>
                  <option value="5-10k">R$ 5.001 a R$ 10.000</option>
                  <option value="10-20k">R$ 10.001 a R$ 20.000</option>
                  <option value=">20k">Acima de R$ 20.000</option>
                    </select>
                  </div>
            </div>

            {/* Termos e CTA */}
            <div className="mt-6 space-y-3">
              <label className={`flex items-start gap-2 text-xs cursor-pointer ${isDark ? 'text-white/80' : 'text-black'}`}>
                <input 
                  type="checkbox" 
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 cursor-pointer accent-[#FFD24C] dark:accent-purple-600" 
                />
                <span>
                  Declaro que li e concordo com a política de privacidade e termos da Classic Proteção Veicular.
                </span>
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button 
                  type="submit" 
                  disabled={isLoading || !acceptedTerms}
                  className={`px-5 py-2.5 text-sm font-semibold transition-all ${
                    !acceptedTerms 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400' 
                      : 'bg-[#FFD24C] text-black hover:bg-[#e6be43] dark:bg-purple-700 dark:text-white dark:hover:bg-purple-600'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ENVIANDO...
                    </>
                  ) : (
                    'ENVIAR CADASTRO'
                  )}
                </Button>
                <Button asChild variant="outline" className="px-5 py-2.5 text-sm font-semibold border-[#FFD24C] text-current hover:bg-[#FFD24C]/10 dark:border-purple-400 dark:text-purple-200 dark:hover:bg-purple-400/10">
                  <a href={`https://wa.me/5521995636020?text=${encodeURIComponent('Olá! Quero ser Parceiro Classic. Acabei de iniciar meu cadastro no site.')}`} target="_blank" rel="noopener noreferrer">FALAR NO WHATSAPP</a>
                </Button>
              </div>
            </div>
          </form>
          </div>
        </section>
      
      {/* Modal de Sucesso */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={() => setShowSuccess(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", duration: 0.5 }}
              className={`relative max-w-lg w-full rounded-3xl p-8 shadow-2xl ${
                isDark 
                  ? 'bg-gradient-to-br from-purple-900 via-purple-800 to-purple-950 border border-purple-600/30' 
                  : 'bg-gradient-to-br from-white via-[#FFF6DA] to-[#FFE8A8] border border-[#FFD24C]/30'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Ícone de Sucesso Animado */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="flex justify-center mb-6"
              >
                <div className={`rounded-full p-4 ${
                  isDark 
                    ? 'bg-purple-600/20 ring-4 ring-purple-500/30' 
                    : 'bg-[#FFD24C]/20 ring-4 ring-[#FFD24C]/30'
                }`}>
                  <CheckCircle className={`w-16 h-16 ${
                    isDark ? 'text-purple-300' : 'text-[#FFD24C]'
                  }`} />
                </div>
              </motion.div>

              {/* Título */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`text-3xl font-bold text-center mb-4 ${
                  isDark ? 'text-white' : 'text-black'
                }`}
              >
                🎉 Cadastro Enviado!
              </motion.h2>

              {/* Mensagem */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className={`text-center space-y-3 mb-6 ${
                  isDark ? 'text-white/90' : 'text-gray-800'
                }`}
              >
                <p className="text-lg font-medium">
                  Obrigado por seu interesse em ser um Parceiro Classic!
                </p>
                <p className="text-base">
                  Nossa equipe comercial já recebeu seus dados e entrará em contato 
                  em até <strong className={isDark ? 'text-purple-300' : 'text-[#FFD24C]'}>24 horas úteis</strong> para 
                  apresentar as condições exclusivas da sua região.
                </p>
                <p className="text-sm opacity-80">
                  Enquanto isso, fique à vontade para conhecer mais sobre a Classic Proteção Veicular.
                </p>
              </motion.div>

              {/* Botão de Fechar */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={() => setShowSuccess(false)}
                className={`w-full py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                  isDark 
                    ? 'bg-purple-600 hover:bg-purple-500 text-white' 
                    : 'bg-[#FFD24C] hover:bg-[#e6be43] text-black'
                }`}
              >
                ENTENDIDO
              </motion.button>

              {/* Botão de fechar (X) no canto */}
              <button
                onClick={() => setShowSuccess(false)}
                className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                  isDark 
                    ? 'hover:bg-purple-600/30 text-white/70 hover:text-white' 
                    : 'hover:bg-black/10 text-gray-600 hover:text-black'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Confete decorativo */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-3xl pointer-events-none">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ 
                      y: [0, Math.random() * 400 + 200],
                      x: [0, (Math.random() - 0.5) * 200],
                      opacity: [1, 0],
                      rotate: Math.random() * 360
                    }}
                    transition={{ 
                      duration: Math.random() * 2 + 2,
                      delay: Math.random() * 0.5,
                      ease: "easeOut"
                    }}
                    className={`absolute w-2 h-2 rounded-full ${
                      isDark 
                        ? 'bg-purple-400' 
                        : 'bg-[#FFD24C]'
                    }`}
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: '-10px'
                    }}
                  />
                ))}
      </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

