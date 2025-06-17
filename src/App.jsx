import { Badge } from "@/components/ui/badge.jsx";
import { Button } from "@/components/ui/button.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  CheckCircle,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  Shield,
  Smartphone,
  TrendingUp,
  Twitter,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import "./App.css";
import { ContactForm } from "./components/form/contact-forms";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleNavClick = (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (link) {
        e.preventDefault();
        const targetId = link.getAttribute("href").substring(1);
        const element = document.getElementById(targetId);

        if (element) {
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - 80;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }
    };

    document.addEventListener("click", handleNavClick);
    return () => document.removeEventListener("click", handleNavClick);
  }, []);

  // Variantes de animação para diferentes elementos
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const fadeInLeft = {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6 },
  };

  const fadeInRight = {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardHover = {
    hover: {
      scale: 1.03, // Levemente menor para não ser exagerado
      y: -5, // Move o card um pouco para cima
      boxShadow: "0 10px 20px rgba(0,0,0,0.1)", // Sombra mais pronunciada
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <motion.header
        className="fixed top-0 w-full bg-card/80 backdrop-blur-md border-b border-border z-50"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-14 h-14flex items-center justify-center">
                <span className="text-primary text-2xl font-extrabold tracking-tight drop-shadow-md">
                  Arm Builds Co.
                </span>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.nav
              className="hidden md:flex space-x-8"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <a
                href="#home"
                className="text-foreground hover:text-primary transition-colors"
              >
                Home
              </a>
              <a
                href="#about"
                className="text-foreground hover:text-primary transition-colors"
              >
                Sobre Nós
              </a>
              <a
                href="#services"
                className="text-foreground hover:text-primary transition-colors"
              >
                Serviços
              </a>
              <a
                href="#portfolio"
                className="text-foreground hover:text-primary transition-colors"
              >
                Portfólio
              </a>
              <a
                href="#contact"
                className="text-foreground hover:text-primary transition-colors"
              >
                Contato
              </a>
            </motion.nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-foreground" onClick={toggleMenu}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.nav
              className="md:hidden mt-4 pb-4 border-t border-border pt-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col space-y-4">
                <a
                  href="#home"
                  className="text-foreground hover:text-primary transition-colors"
                  onClick={toggleMenu}
                >
                  Home
                </a>
                <a
                  href="#about"
                  className="text-foreground hover:text-primary transition-colors"
                  onClick={toggleMenu}
                >
                  Sobre Nós
                </a>
                <a
                  href="#services"
                  className="text-foreground hover:text-primary transition-colors"
                  onClick={toggleMenu}
                >
                  Serviços
                </a>
                <a
                  href="#portfolio"
                  className="text-foreground hover:text-primary transition-colors"
                  onClick={toggleMenu}
                >
                  Portfólio
                </a>
                <a
                  href="#contact"
                  className="text-foreground hover:text-primary transition-colors"
                  onClick={toggleMenu}
                >
                  Contato
                </a>
              </div>
            </motion.nav>
          )}
        </div>
      </motion.header>

      {/* Hero Section */}
      <section id="home" className="pt-34 pb-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Arm Builds Company
              <motion.span
                className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Inovação em IA e Web3
              </motion.span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Fluxos seguros, ideias autônomas, estruturas que se constroem
              sozinhas.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3"
                >
                  Descubra Nossas Soluções Web3 e de IA
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="border-border text-foreground hover:bg-accent px-8 py-3"
                  onClick={() => {
                    const element = document.getElementById("contact");
                    element.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Fale Conosco
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Nossos Serviços
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Oferecemos soluções tecnológicas de ponta para impulsionar a
              inovação e otimizar operações
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {/* Agentes Verticais */}
            <motion.div variants={fadeInUp} whileHover="hover">
              <Card className="bg-card border-border backdrop-blur-sm transition-all duration-300 group h-full relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                ></motion.div>
                <CardHeader className="relative z-10">
                  <motion.div
                    className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Brain className="text-primary-foreground" size={24} />
                  </motion.div>
                  <CardTitle className="text-foreground text-2xl">
                    Agentes Verticais
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Inteligência Artificial para Otimização de Processos
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-muted-foreground relative z-10">
                  <p className="mb-4">
                    Automatize e otimize seus processos com inteligência
                    artificial avançada. Nossos agentes verticais são projetados
                    para aprender, adaptar e executar tarefas complexas.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle
                        className="text-accent-foreground mr-2"
                        size={16}
                      />
                      Atendimento ao Cliente Inteligente
                    </li>
                    <li className="flex items-center">
                      <CheckCircle
                        className="text-accent-foreground mr-2"
                        size={16}
                      />
                      Análise de Dados e Insights
                    </li>
                    <li className="flex items-center">
                      <CheckCircle
                        className="text-accent-foreground mr-2"
                        size={16}
                      />
                      Automação de Processos
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Desenvolvimento de Aplicativos */}
            <motion.div variants={fadeInUp} whileHover="hover">
              <Card className="bg-card border-border backdrop-blur-sm transition-all duration-300 group h-full relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                ></motion.div>
                <CardHeader className="relative z-10">
                  <motion.div
                    className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Smartphone className="text-primary-foreground" size={24} />
                  </motion.div>
                  <CardTitle className="text-foreground text-2xl">
                    Desenvolvimento de Aplicativos
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Soluções Personalizadas para o Seu Negócio
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-muted-foreground relative z-10">
                  <p className="mb-4">
                    Transforme suas ideias em realidade com aplicativos
                    intuitivos e de alto desempenho. Desenvolvemos soluções
                    personalizadas para web e mobile.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle
                        className="text-accent-foreground mr-2"
                        size={16}
                      />
                      Aplicativos Web Personalizados
                    </li>
                    <li className="flex items-center">
                      <CheckCircle
                        className="text-accent-foreground mr-2"
                        size={16}
                      />
                      Aplicativos Mobile (iOS/Android)
                    </li>
                    <li className="flex items-center">
                      <CheckCircle
                        className="text-accent-foreground mr-2"
                        size={16}
                      />
                      UI/UX Design
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Sistemas Web3 */}
            <motion.div variants={fadeInUp} whileHover="hover">
              <Card className="bg-card border-border backdrop-blur-sm transition-all duration-300 group h-full relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                ></motion.div>
                <CardHeader className="relative z-10">
                  <motion.div
                    className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Shield className="text-primary-foreground" size={24} />
                  </motion.div>
                  <CardTitle className="text-foreground text-2xl">
                    Sistemas Web3 Descentralizados
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    O Futuro da Internet ao Seu Alcance
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-muted-foreground relative z-10">
                  <p className="mb-4">
                    Abrace o futuro da internet com a segurança e transparência
                    da tecnologia blockchain. Construímos sistemas Web3
                    descentralizados.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle
                        className="text-accent-foreground mr-2"
                        size={16}
                      />
                      Desenvolvimento de DApps
                    </li>
                    <li className="flex items-center">
                      <CheckCircle
                        className="text-accent-foreground mr-2"
                        size={16}
                      />
                      Soluções de NFT
                    </li>
                    <li className="flex items-center">
                      <CheckCircle
                        className="text-accent-foreground mr-2"
                        size={16}
                      />
                      Finanças Descentralizadas (DeFi)
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 bg-card/20">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Sobre a Arm Builds Company
              </h2>
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                Na Arm Builds Company, nossa missão é impulsionar a inovação e a
                transformação digital, fornecendo soluções tecnológicas de ponta
                que capacitam nossos clientes a alcançar seus objetivos.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Somos um time multidisciplinar de engenheiros, desenvolvedores,
                designers e estrategistas apaixonados por tecnologia e inovação,
                com vasta experiência em inteligência artificial,
                desenvolvimento de software e blockchain.
              </p>
              <motion.div
                className="grid grid-cols-2 gap-6"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <motion.div className="text-center" variants={fadeInUp}>
                  <motion.div
                    className="text-3xl font-bold text-primary mb-2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    50+
                  </motion.div>
                  <div className="text-muted-foreground">
                    Projetos Concluídos
                  </div>
                </motion.div>
                <motion.div className="text-center" variants={fadeInUp}>
                  <motion.div
                    className="text-3xl font-bold text-secondary mb-2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    100%
                  </motion.div>
                  <div className="text-muted-foreground">
                    Satisfação do Cliente
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="space-y-4"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <motion.div
                  className="bg-card p-6 rounded-lg border border-border"
                  variants={fadeInRight}
                  whileHover={{ scale: 1.05 }}
                >
                  <Zap className="text-primary mb-3" size={32} />
                  <h3 className="text-foreground font-semibold mb-2">
                    Inovação
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Exploramos constantemente novas tecnologias
                  </p>
                </motion.div>
                <motion.div
                  className="bg-card p-6 rounded-lg border border-border"
                  variants={fadeInRight}
                  whileHover={{ scale: 1.05 }}
                >
                  <Users className="text-primary mb-3" size={32} />
                  <h3 className="text-foreground font-semibold mb-2">
                    Colaboração
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Parceria próxima com nossos clientes
                  </p>
                </motion.div>
              </motion.div>
              <motion.div
                className="space-y-4 mt-8"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <motion.div
                  className="bg-card p-6 rounded-lg border border-border"
                  variants={fadeInRight}
                  whileHover={{ scale: 1.05 }}
                >
                  <Shield className="text-primary mb-3" size={32} />
                  <h3 className="text-foreground font-semibold mb-2">
                    Segurança
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Priorizamos a segurança em todas as soluções
                  </p>
                </motion.div>
                <motion.div
                  className="bg-card p-6 rounded-lg border border-border"
                  variants={fadeInRight}
                  whileHover={{ scale: 1.05 }}
                >
                  <TrendingUp className="text-primary mb-3" size={32} />
                  <h3 className="text-foreground font-semibold mb-2">
                    Excelência
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Comprometimento com a mais alta qualidade
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Nosso Portfólio
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Casos de sucesso que demonstram nossa expertise em IA, aplicativos
              e Web3
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {/* Case Study 1 */}
            <motion.div variants={fadeInUp} whileHover="hover">
              <Card className="bg-card border-border backdrop-blur-sm transition-all duration-300 group h-full relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                ></motion.div>
                <CardHeader className="relative z-10">
                  <Badge className="w-fit bg-primary/20 text-primary border-primary/30">
                    Agente Vertical
                  </Badge>
                  <CardTitle className="text-foreground text-xl">
                    E-commerce Inteligente
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Otimização de atendimento ao cliente com IA
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-muted-foreground relative z-10">
                  <p className="mb-4">
                    Desenvolvemos um agente vertical de IA que reduziu em 60% o
                    tempo de resposta e aumentou em 40% a satisfação do cliente.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Tempo de Resposta</span>
                      <span className="text-accent-foreground">-60%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Satisfação do Cliente</span>
                      <span className="text-accent-foreground">+40%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Case Study 2 */}
            <motion.div variants={fadeInUp} whileHover="hover">
              <Card className="bg-card border-border backdrop-blur-sm transition-all duration-300 group h-full relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                ></motion.div>
                <CardHeader className="relative z-10">
                  <Badge className="w-fit bg-secondary/20 text-secondary border-secondary/30">
                    Web3
                  </Badge>
                  <CardTitle className="text-foreground text-xl">
                    Galeria de Arte Digital
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Plataforma Web3 para NFTs e arte digital
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-muted-foreground relative z-10">
                  <p className="mb-4">
                    Criamos uma plataforma Web3 que estabeleceu a galeria como
                    pioneira no mercado de arte digital com NFTs.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Pioneirismo</span>
                      <span className="text-accent-foreground">✓ Líder</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Novas Receitas</span>
                      <span className="text-accent-foreground">✓ NFTs</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Case Study 3 */}
            <motion.div variants={fadeInUp} whileHover="hover">
              <Card className="bg-card border-border backdrop-blur-sm transition-all duration-300 group h-full relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                ></motion.div>
                <CardHeader className="relative z-10">
                  <Badge className="w-fit bg-accent/20 text-accent border-accent/30">
                    Aplicativo Mobile
                  </Badge>
                  <CardTitle className="text-foreground text-xl">
                    App de Saúde e Bem-Estar
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Aplicativo com personalização inteligente
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-muted-foreground relative z-10">
                  <p className="mb-4">
                    Desenvolvemos um aplicativo mobile com IA que oferece planos
                    de bem-estar altamente personalizados.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Engajamento</span>
                      <span className="text-accent-foreground">Alto</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Crescimento</span>
                      <span className="text-accent-foreground">Rápido</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 bg-card/20">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Entre em Contato
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Pronto para transformar suas ideias em realidade? Vamos construir
              o futuro digital juntos.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            {ContactForm()}

            {/* Contact Info */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  Informações de Contato
                </h3>
                <motion.div
                  className="space-y-4"
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="flex items-center space-x-4"
                    variants={fadeInRight}
                    whileHover={{ x: 10 }}
                  >
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                      <Mail className="text-primary-foreground" size={20} />
                    </div>
                    <div>
                      <div className="text-foreground font-semibold">
                        E-mail
                      </div>
                      <div className="text-muted-foreground">
                        armbuildscompany@gmail.com
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    className="flex items-center space-x-4"
                    variants={fadeInRight}
                    whileHover={{ x: 10 }}
                  >
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                      <Phone className="text-primary-foreground" size={20} />
                    </div>
                    <div>
                      <div className="text-foreground font-semibold">
                        Telefone
                      </div>
                      <div className="text-muted-foreground">
                        +55 (41) 99815-7368
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    className="flex items-center space-x-4"
                    variants={fadeInRight}
                    whileHover={{ x: 10 }}
                  >
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                      <MapPin className="text-primary-foreground" size={20} />
                    </div>
                    <div>
                      <div className="text-foreground font-semibold">
                        Endereço
                      </div>
                      <div className="text-sm text-foreground font-medium leading-relaxed">
                        Rua Luiz Boza, 488, Santa Felicidade
                        <br />
                        CEP 80010-080 – Curitiba/PR, Brasil
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-foreground mb-4">
                  Siga-nos
                </h3>
                <motion.div
                  className="flex space-x-4"
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                >
                  <motion.a
                    href="#"
                    className="w-10 h-10 bg-card rounded-lg flex items-center justify-center hover:bg-card/80 transition-colors"
                    variants={fadeInUp}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Linkedin className="text-foreground" size={20} />
                  </motion.a>
                  <motion.a
                    href="#"
                    className="w-10 h-10 bg-card rounded-lg flex items-center justify-center hover:bg-card/80 transition-colors"
                    variants={fadeInUp}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Twitter className="text-foreground" size={20} />
                  </motion.a>
                  <motion.a
                    href="#"
                    className="w-10 h-10 bg-card rounded-lg flex items-center justify-center hover:bg-card/80 transition-colors"
                    variants={fadeInUp}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Github className="text-foreground" size={20} />
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        className="py-8 px-4 border-t border-border"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              className="flex items-center space-x-2 mb-4 md:mb-0"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-24 h-24 rounded-full bg-primary p-2 shadow-lg flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="w-full h-full object-contain rounded-full"
                  loading="lazy"
                />
              </div>
              <span className="text-foreground font-bold">Arm Builds Co.</span>
            </motion.div>
            <motion.div
              className="text-muted-foreground text-sm"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              © 2025 Arm Builds Company. Todos os direitos reservados.
            </motion.div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}

export default App;
