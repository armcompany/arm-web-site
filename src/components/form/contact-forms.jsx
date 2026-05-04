import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useState } from "react";

const Loader = ({ className = "", size = 16 }) => (
  <svg
    className={`animate-spin ${className}`}
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

function ContactForm() {
  const rawApiBaseUrl = (import.meta.env.VITE_API_BASE_URL || "").trim();
  const normalizedApiBaseUrl = rawApiBaseUrl
    ? /^(https?:)?\/\//i.test(rawApiBaseUrl)
      ? rawApiBaseUrl
      : rawApiBaseUrl.startsWith("localhost") ||
          rawApiBaseUrl.startsWith("127.0.0.1")
        ? `http://${rawApiBaseUrl}`
        : `https://${rawApiBaseUrl}`
    : "";
  const apiBaseUrl = normalizedApiBaseUrl.replace(/\/$/, "");
  const sendEmailUrl = `${apiBaseUrl}/api/send-email`;
  const whatsappNumber =
    import.meta.env.VITE_CONTACT_WHATSAPP_NUMBER || "5541998157368";
  const whatsappMessage =
    import.meta.env.VITE_CONTACT_WHATSAPP_MESSAGE ||
    "Olá! Vim pelo site da Arm Builds e gostaria de conversar sobre um projeto.";
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    assunto: "",
    mensagem: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.nome ||
      !formData.email ||
      !formData.assunto ||
      !formData.mensagem
    ) {
      setSubmitStatus({
        type: "error",
        message: "Por favor, preencha todos os campos obrigatórios.",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus({
        type: "error",
        message: "Por favor, insira um email válido.",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(sendEmailUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const rawResponse = await response.text();
      let result = {};

      if (rawResponse) {
        try {
          result = JSON.parse(rawResponse);
        } catch {
          result = { message: rawResponse };
        }
      }

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message:
            "Mensagem enviada com sucesso! Entraremos em contato em breve.",
        });
        setFormData({
          nome: "",
          email: "",
          assunto: "",
          mensagem: "",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message:
            result.message || "Erro ao enviar mensagem. Tente novamente.",
        });
      }
    } catch (error) {
      console.error("Erro:", error);
      setSubmitStatus({
        type: "error",
        message:
          "Nao foi possivel conectar ao servico de envio. Verifique a configuracao da API e tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <Card className="bg-card border-border backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-foreground text-2xl">
            Envie uma Mensagem
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Preencha o formulário e entraremos em contato em breve
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {submitStatus && (
              <div
                className={`p-4 rounded-lg ${
                  submitStatus.type === "success"
                    ? "bg-green-50 border border-green-200 text-green-800"
                    : "bg-red-50 border border-red-200 text-red-800"
                }`}
              >
                {submitStatus.message}
              </div>
            )}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                name="nome"
                placeholder="Nome"
                value={formData.nome}
                onChange={handleInputChange}
                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
              />
              <Input
                name="email"
                placeholder="E-mail"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <Input
              name="assunto"
              placeholder="Assunto"
              value={formData.assunto}
              onChange={handleInputChange}
              className="bg-input border-border text-foreground placeholder:text-muted-foreground"
            />
            <Textarea
              name="mensagem"
              placeholder="Sua mensagem..."
              rows={5}
              value={formData.mensagem}
              onChange={handleInputChange}
              className="bg-input border-border text-foreground placeholder:text-muted-foreground"
            />
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isSubmitting ? (
                  <>
                    <Loader size={16} />
                    Enviando...
                  </>
                ) : (
                  <>
                    Enviar Mensagem
                    <ArrowRight className="ml-2" size={16} />
                  </>
                )}
              </Button>
            </motion.div>
            <div className="rounded-lg border border-border bg-card/60 p-4">
              <p className="mb-3 text-sm text-muted-foreground">
                Prefere falar direto? Abra uma conversa no WhatsApp.
              </p>
              <Button
                asChild
                variant="outline"
                className="w-full border-foreground text-foreground hover:bg-foreground hover:text-background"
              >
                <a href={whatsappHref} target="_blank" rel="noreferrer">
                  Conversar no WhatsApp
                  <MessageCircle className="ml-2" size={16} />
                </a>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export { ContactForm };
