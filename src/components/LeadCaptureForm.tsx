import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";
import { User, Mail, Phone, MessageSquare, Send, CheckCircle } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const LeadCaptureForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { theme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Aqui você precisará configurar o Google Apps Script
      // Substitua 'SEU_SCRIPT_URL' pela URL do seu Google Apps Script
      const response = await fetch('SEU_SCRIPT_URL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: 'Bellys Website'
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: ""
        });
        
        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 3000);
      } else {
        throw new Error('Erro ao enviar formulário');
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      alert('Erro ao enviar formulário. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className={cn(
            "border-2 shadow-xl",
            isDark 
              ? "bg-card border-primary/20" 
              : "bg-white border-gold/30"
          )}>
            <CardHeader className="text-center space-y-4">
              <CardTitle className={cn(
                "text-3xl md:text-4xl font-bold",
                isDark ? "text-foreground" : "text-gold"
              )}>
                Entre em Contato Conosco
              </CardTitle>
              <CardDescription className={cn(
                "text-lg",
                isDark ? "text-muted-foreground" : "text-gold/80"
              )}>
                Quer saber mais sobre nossos produtos ou se tornar um distribuidor exclusivo? 
                Preencha o formulário abaixo e entraremos em contato!
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <CheckCircle className={cn(
                    "w-16 h-16 mx-auto mb-4",
                    isDark ? "text-primary" : "text-gold"
                  )} />
                  <h3 className={cn(
                    "text-2xl font-bold mb-2",
                    isDark ? "text-foreground" : "text-gold"
                  )}>
                    Obrigado pelo seu interesse!
                  </h3>
                  <p className={cn(
                    "text-lg",
                    isDark ? "text-muted-foreground" : "text-gold/80"
                  )}>
                    Entraremos em contato em breve.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className={cn(
                        "text-sm font-medium flex items-center gap-2",
                        isDark ? "text-foreground" : "text-gold"
                      )}>
                        <User className="w-4 h-4" />
                        Nome Completo *
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Seu nome completo"
                        required
                        className={cn(
                          "border-2",
                          isDark 
                            ? "border-primary/30 focus:border-primary" 
                            : "border-gold/30 focus:border-gold"
                        )}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className={cn(
                        "text-sm font-medium flex items-center gap-2",
                        isDark ? "text-foreground" : "text-gold"
                      )}>
                        <Mail className="w-4 h-4" />
                        E-mail *
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="seu@email.com"
                        required
                        className={cn(
                          "border-2",
                          isDark 
                            ? "border-primary/30 focus:border-primary" 
                            : "border-gold/30 focus:border-gold"
                        )}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className={cn(
                      "text-sm font-medium flex items-center gap-2",
                      isDark ? "text-foreground" : "text-gold"
                    )}>
                      <Phone className="w-4 h-4" />
                      Telefone/WhatsApp
                    </label>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(11) 99999-9999"
                      className={cn(
                        "border-2",
                        isDark 
                          ? "border-primary/30 focus:border-primary" 
                          : "border-gold/30 focus:border-gold"
                      )}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className={cn(
                      "text-sm font-medium flex items-center gap-2",
                      isDark ? "text-foreground" : "text-gold"
                    )}>
                      <MessageSquare className="w-4 h-4" />
                      Mensagem
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Conte-nos sobre seu interesse em nossos produtos ou como podemos ajudá-lo..."
                      rows={4}
                      className={cn(
                        "border-2 resize-none",
                        isDark 
                          ? "border-primary/30 focus:border-primary" 
                          : "border-gold/30 focus:border-gold"
                      )}
                    />
                  </div>
                  
                  <div className="text-center">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className={cn(
                        "px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105",
                        isDark
                          ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                          : "bg-gradient-to-r from-gold-dark to-gold hover:from-gold hover:to-gold-light text-gold-foreground"
                      )}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Enviar Mensagem
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default LeadCaptureForm;
