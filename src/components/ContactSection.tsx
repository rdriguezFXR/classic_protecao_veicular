// components/ContactSection.tsx
import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, User, Building2, CheckCircle, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

type ContactInfo = {
  icon: React.ReactNode;
  title: string;
  info: string[];
  link?: string;
};

const contactInfo: ContactInfo[] = [
  {
    icon: <MapPin className="h-6 w-6" />,
    title: "Endereço",
    info: ["Rua Ladeira das Flores, 44", "Sol Nascente - Guarapari, ES", "CEP 29210-505"],
  },
  {
    icon: <Phone className="h-6 w-6" />,
    title: "Telefone",
    info: ["(27) 99880-6772", "WhatsApp disponível"],
    link: "https://wa.me/5527998806772",
  },
  {
    icon: <Mail className="h-6 w-6" />,
    title: "E-mail",
    info: ["contato.bcosmetic@gmail.com", "Atendimento especializado"],
    link: "mailto:contato.bcosmetic@gmail.com",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Horário de Atendimento",
    info: ["Segunda a Sexta: 8h - 18h", "Sábado: 8h - 12h"],
  },
];

export default function ContactSection() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      
      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwhWncGWqzTvdI0O7zpjbTH4ny2RFtfNVKLVSOMPn7O3pDvmiJ4n8WEhGWW-Eq7HR_8/exec';
      
      console.log("📤 Enviando dados para o Google Apps Script...");
      console.log("Dados do formulário:", formData);
      
      // Prepara os dados como URL encoded
      const formDataToSend = new URLSearchParams();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('company', formData.company);
      formDataToSend.append('subject', formData.subject);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('type', 'contato');
      
      console.log("📦 Dados preparados:", formDataToSend.toString());
      
      // Envia para o Google Apps Script
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Necessário para Google Apps Script
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formDataToSend.toString(),
      });
      
      console.log("✅ Requisição enviada com sucesso!");
      console.log("⚠️ Nota: mode 'no-cors' não permite verificar a resposta");
      
      // Mostrar modal de sucesso
      setShowSuccess(true);
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
      });
      
      // Fechar modal após 5 segundos
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
      
    } catch (error) {
      console.error("❌ Erro ao enviar formulário:", error);
      alert("Erro ao enviar mensagem. Tente novamente ou entre em contato diretamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contato" className="relative isolate scroll-mt-28 overflow-hidden">
      {/* Background com gradientes modernos */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#FFFEF9] to-white dark:from-[#0a0a0a] dark:via-[#121212] dark:to-[#0a0a0a]" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FFD24C]/10 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#FFA500]/10 dark:bg-purple-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 py-24 lg:py-[60px]">
        {/* Header melhorado */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-20 text-center relative"
>
          {/* Título principal */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] text-black dark:text-white mb-6"
          >
            Vamos{" "}
            <span className="bg-gradient-to-r from-[#FFD24C] via-[#FFA500] to-[#FFD24C] dark:from-purple-400 dark:via-purple-500 dark:to-purple-400 bg-clip-text text-transparent">
              conversar
            </span>
            ?
          </motion.h2>

          {/* Subtítulo */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Estamos prontos para ouvir você. Entre em contato conosco e descubra como podemos{" "}
            <span className="font-semibold text-black dark:text-white">impulsionar seu negócio</span> com a B-Cosmetic.
          </motion.p>
        </motion.div>

        {/* Grid: Info Cards + Form */}
        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] items-start">
          {/* Cards de Informação - Layout compacto */}
          <div className="space-y-4">
            {/* Cards em grid 2x2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    ease: [0.22, 1, 0.36, 1],
                    delay: index * 0.08 
                  }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="group relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white/70 backdrop-blur-sm p-5 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-[#FFD24C]/40 dark:border-gray-700/50 dark:bg-gray-800/50 dark:hover:border-purple-400/40"
                >
                  {/* Barra lateral decorativa */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#FFD24C] to-[#FFA500] dark:from-purple-400 dark:to-purple-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
                  
                  <div className="flex items-start gap-4">
                    {/* Ícone compacto */}
                    <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#FFD24C]/15 to-[#FFA500]/10 text-[#D4A017] ring-1 ring-[#FFD24C]/20 transition-all duration-300 group-hover:scale-110 group-hover:from-[#FFD24C]/30 group-hover:to-[#FFA500]/20 dark:from-purple-400/15 dark:to-purple-500/10 dark:text-purple-400 dark:ring-purple-400/20 dark:group-hover:from-purple-400/30 dark:group-hover:to-purple-500/20">
                      {item.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Título compacto */}
                      <h3 className="text-sm font-bold text-black dark:text-white mb-2 group-hover:text-[#D4A017] dark:group-hover:text-purple-300 transition-colors duration-300">
                        {item.title}
                      </h3>

                      {/* Informações compactas */}
                      <div className="space-y-1">
                        {item.info.map((line, i) => (
                          <p key={i} className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed truncate">
                            {item.link && i === 0 ? (
                              <a
                                href={item.link}
                                className="font-medium hover:text-[#D4A017] dark:hover:text-purple-300 transition-colors duration-200"
                              >
                                {line}
                              </a>
                            ) : (
                              line
                            )}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mapa interativo do Google Maps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                ease: [0.22, 1, 0.36, 1],
                delay: 0.4 
              }}
              viewport={{ once: true, amount: 0.3 }}
              className="group relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* Header do mapa */}
              <div className="relative p-4 bg-gradient-to-br from-[#FFD24C]/10 via-[#FFA500]/5 to-transparent dark:from-purple-400/10 dark:via-purple-500/5 border-b border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-br from-[#FFD24C] to-[#FFA500] dark:from-purple-400 dark:to-purple-500 shadow-md">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-black dark:text-white">
                      Nossa Localização
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Sol Nascente - Guarapari, ES
                    </p>
                  </div>
                </div>
              </div>

              {/* Google Maps */}
              <div className="relative h-64 bg-gray-100 dark:bg-gray-900">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3744.8!2d-40.4973!3d-20.6567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDM5JzI0LjEiUyA0MMKwMjknNTAuMyJX!5e0!3m2!1spt-BR!2sbr!4v1234567890!5m2!1spt-BR!2sbr&q=Rua+Ladeira+das+Flores,+44,+Sol+Nascente,+Guarapari,+ES,+29210-505"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale-[30%] hover:grayscale-0 transition-all duration-500"
                  title="Localização B-Cosmetic"
                />
                
                {/* Overlay decorativo */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Footer do mapa com botão */}
              <div className="relative p-4 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border-t border-gray-200/50 dark:border-gray-700/50">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Rua+Ladeira+das+Flores,+44,+Sol+Nascente,+Guarapari,+ES,+29210-505"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-gradient-to-r from-[#FFD24C] to-[#FFA500] dark:from-purple-400 dark:to-purple-500 text-black dark:text-white text-xs font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
                >
                  <MapPin className="h-4 w-4" />
                  Abrir no Google Maps
                </a>
              </div>
            </motion.div>

            
          </div>

          {/* Formulário */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative overflow-hidden rounded-3xl border border-gray-200/80 bg-white/80 backdrop-blur-sm p-10 shadow-2xl dark:border-gray-700/50 dark:bg-gray-800/60"
          >
            {/* Gradientes de fundo animados */}
            <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-gradient-to-br from-[#FFD24C]/20 to-[#FFA500]/10 blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-gradient-to-tr from-purple-400/15 to-purple-500/10 blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
            
            {/* Borda decorativa */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#FFD24C]/5 via-transparent to-purple-400/5 pointer-events-none" />

            <div className="relative">
              <div className="mb-8">
                <h3 className="text-3xl font-black text-black dark:text-white mb-2">
                  Envie sua mensagem
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Preencha o formulário abaixo e entraremos em contato em breve.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nome */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
                    Nome completo <span className="text-red-500">*</span>
                  </label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 transition-colors duration-200 group-focus-within:text-[#FFD24C] dark:group-focus-within:text-purple-400" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border-2 border-gray-200 bg-white/50 pl-12 pr-4 py-4 text-gray-900 placeholder-gray-400 transition-all duration-300 focus:border-[#FFD24C] focus:outline-none focus:ring-4 focus:ring-[#FFD24C]/20 focus:bg-white hover:border-gray-300 dark:border-gray-600 dark:bg-gray-700/50 dark:text-white dark:placeholder-gray-500 dark:focus:border-purple-400 dark:focus:ring-purple-400/20 dark:hover:border-gray-500"
                      placeholder="Digite seu nome completo"
                    />
                  </div>
                </motion.div>

                {/* Email e Telefone */}
                <div className="grid gap-6 md:grid-cols-2">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
                      E-mail <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 transition-colors duration-200 group-focus-within:text-[#FFD24C] dark:group-focus-within:text-purple-400" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border-2 border-gray-200 bg-white/50 pl-12 pr-4 py-4 text-gray-900 placeholder-gray-400 transition-all duration-300 focus:border-[#FFD24C] focus:outline-none focus:ring-4 focus:ring-[#FFD24C]/20 focus:bg-white hover:border-gray-300 dark:border-gray-600 dark:bg-gray-700/50 dark:text-white dark:placeholder-gray-500 dark:focus:border-purple-400 dark:focus:ring-purple-400/20 dark:hover:border-gray-500"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    viewport={{ once: true }}
                  >
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
                      Telefone <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 transition-colors duration-200 group-focus-within:text-[#FFD24C] dark:group-focus-within:text-purple-400" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border-2 border-gray-200 bg-white/50 pl-12 pr-4 py-4 text-gray-900 placeholder-gray-400 transition-all duration-300 focus:border-[#FFD24C] focus:outline-none focus:ring-4 focus:ring-[#FFD24C]/20 focus:bg-white hover:border-gray-300 dark:border-gray-600 dark:bg-gray-700/50 dark:text-white dark:placeholder-gray-500 dark:focus:border-purple-400 dark:focus:ring-purple-400/20 dark:hover:border-gray-500"
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Empresa e Assunto */}
                <div className="grid gap-6 md:grid-cols-2">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <label htmlFor="company" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
                      Empresa
                    </label>
                    <div className="relative group">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 transition-colors duration-200 group-focus-within:text-[#FFD24C] dark:group-focus-within:text-purple-400" />
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full rounded-xl border-2 border-gray-200 bg-white/50 pl-12 pr-4 py-4 text-gray-900 placeholder-gray-400 transition-all duration-300 focus:border-[#FFD24C] focus:outline-none focus:ring-4 focus:ring-[#FFD24C]/20 focus:bg-white hover:border-gray-300 dark:border-gray-600 dark:bg-gray-700/50 dark:text-white dark:placeholder-gray-500 dark:focus:border-purple-400 dark:focus:ring-purple-400/20 dark:hover:border-gray-500"
                        placeholder="Nome da empresa"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    viewport={{ once: true }}
                  >
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
                      Assunto <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border-2 border-gray-200 bg-white/50 px-4 py-4 text-gray-900 transition-all duration-300 focus:border-[#FFD24C] focus:outline-none focus:ring-4 focus:ring-[#FFD24C]/20 focus:bg-white hover:border-gray-300 cursor-pointer dark:border-gray-600 dark:bg-gray-700/50 dark:text-white dark:focus:border-purple-400 dark:focus:ring-purple-400/20 dark:hover:border-gray-500"
                    >
                      <option value="">Selecione um assunto</option>
                      <option value="distribuidor">Quero ser Distribuidor</option>
                      <option value="produtos">Informações sobre Produtos</option>
                      <option value="parceria">Parceria Comercial</option>
                      <option value="suporte">Suporte</option>
                      <option value="outro">Outro</option>
                    </select>
                  </motion.div>
                </div>

                {/* Mensagem */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
                    Mensagem <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full rounded-xl border-2 border-gray-200 bg-white/50 px-4 py-4 text-gray-900 placeholder-gray-400 transition-all duration-300 focus:border-[#FFD24C] focus:outline-none focus:ring-4 focus:ring-[#FFD24C]/20 focus:bg-white hover:border-gray-300 dark:border-gray-600 dark:bg-gray-700/50 dark:text-white dark:placeholder-gray-500 dark:focus:border-purple-400 dark:focus:ring-purple-400/20 dark:hover:border-gray-500 resize-none"
                    placeholder="Conte-nos mais sobre o que você precisa..."
                  />
                </motion.div>

                {/* Botão de envio */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  viewport={{ once: true }}
                >
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full bg-gradient-to-r from-[#FFD24C] via-[#FFA500] to-[#FFD24C] text-black font-bold py-6 rounded-xl shadow-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed dark:from-purple-500 dark:via-purple-600 dark:to-purple-500 dark:text-white overflow-hidden"
                  >
                    {/* Efeito de brilho animado */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                    
                    {isSubmitting ? (
                      <span className="relative flex items-center justify-center gap-3">
                        <div className="h-5 w-5 animate-spin rounded-full border-3 border-white/30 border-t-white" />
                        <span className="text-lg">Enviando...</span>
                      </span>
                    ) : (
                      <span className="relative flex items-center justify-center gap-3 group-hover:gap-4 transition-all duration-300">
                        <Send className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                        <span className="text-lg">Enviar Mensagem</span>
                      </span>
                    )}
                  </Button>
                </motion.div>
              </form>
              
              {/* Logo e Branding */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
                className="mt-8 pt-8 border-t border-gray-200/50 dark:border-gray-700/50"
              >
                <div className="flex items-center justify-center gap-3">
                  {/* Logo */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FFD24C]/30 to-[#FFA500]/30 dark:from-purple-400/30 dark:to-purple-500/30 blur-xl" />
                    <img 
                      src="https://github.com/rdriguezFXR/assets-b-cosmetic/blob/main/Assets%20B-Cosmetic/b-dourada.png?raw=true" 
                      alt="B-Cosmetic Logo" 
                      className="relative h-12 w-12 object-contain drop-shadow-lg"
                    />
                  </div>
                  
                  {/* Texto */}
                  <div className="relative">
                    <h3 className="text-2xl font-black bg-gradient-to-r from-[#FFD24C] via-[#FFA500] to-[#FFD24C] dark:from-purple-400 dark:via-purple-500 dark:to-purple-400 bg-clip-text text-transparent">
                      B-Cosmetic
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide">
                      Beleza & Inovação
                    </p>
                  </div>
                </div>
                
                {/* Tagline */}
                <p className="text-center text-xs text-gray-600 dark:text-gray-400 mt-4 italic">
                  "Transformando sonhos em realidade através da beleza"
                </p>
              </motion.div>
            </div>
          </motion.div>
          
        </div>
      </div>

      {/* Modal de Sucesso */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
          onClick={() => setShowSuccess(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.6, bounce: 0.3 }}
            className="relative bg-white dark:bg-gray-900 rounded-3xl p-10 max-w-lg w-full mx-4 shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gradientes decorativos */}
            <div className="absolute -top-24 -right-24 h-48 w-48 bg-[#FFD24C]/20 dark:bg-purple-500/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-48 w-48 bg-green-500/20 dark:bg-green-400/20 rounded-full blur-3xl" />
            
            {/* Botão fechar */}
            <button
              onClick={() => setShowSuccess(false)}
              className="absolute top-5 right-5 p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-200 hover:scale-110 z-10"
            >
              <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>

            {/* Ícone de sucesso animado */}
            <div className="relative flex justify-center mb-8">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                className="h-24 w-24 bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/40 dark:to-green-800/20 rounded-full flex items-center justify-center ring-4 ring-green-500/20 shadow-lg"
              >
                <CheckCircle className="h-14 w-14 text-green-600 dark:text-green-400" />
              </motion.div>
              
              {/* Partículas decorativas */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 border-2 border-green-500/20 rounded-full"
              />
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1.3, opacity: 0 }}
                transition={{ delay: 0.4, duration: 1.5, repeat: Infinity }}
                className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 border-2 border-green-500/30 rounded-full"
              />
            </div>

            {/* Título */}
            <motion.h3 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-black text-center text-black dark:text-white mb-4 relative"
            >
              Mensagem Enviada!
            </motion.h3>

            {/* Mensagem */}
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 dark:text-gray-300 text-center mb-8 leading-relaxed relative"
            >
              Obrigado por entrar em contato conosco! Recebemos sua mensagem e nossa equipe retornará em breve.
            </motion.p>

            {/* Informações de contato */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="relative bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-700/30 rounded-2xl p-6 mb-8 border border-gray-200/50 dark:border-gray-700/50"
            >
              <p className="text-sm text-gray-700 dark:text-gray-200 text-center leading-relaxed">
                <span className="block text-lg font-bold mb-3 text-black dark:text-white">B-Cosmetic</span>
                <span className="block mb-2">
                  <MapPin className="inline h-4 w-4 mr-2 text-[#FFD24C] dark:text-purple-400" />
                  Sol Nascente - Guarapari, ES
                </span>
                <span className="block mb-2">
                  <Mail className="inline h-4 w-4 mr-2 text-[#FFD24C] dark:text-purple-400" />
                  contato.bcosmetic@gmail.com
                </span>
                <span className="block">
                  <Phone className="inline h-4 w-4 mr-2 text-[#FFD24C] dark:text-purple-400" />
                  (27) 99880-6772
                </span>
              </p>
            </motion.div>

            {/* Botão fechar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                onClick={() => setShowSuccess(false)}
                className="relative w-full bg-gradient-to-r from-[#FFD24C] via-[#FFA500] to-[#FFD24C] text-black font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] dark:from-purple-500 dark:via-purple-600 dark:to-purple-500 dark:text-white overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                <span className="relative text-lg">Fechar</span>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}

