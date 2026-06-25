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
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Shield,
  Smartphone,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import "./App.css";
import { ContactForm } from "./components/form/contact-forms";
import { ShaderBackground } from "@/components/ui/shader-background.jsx";
import { DottedSurface } from "@/components/ui/dotted-surface.jsx";
import { DeltaCube } from "@/components/ui/delta-cube.jsx";

const GoogleMapsIcon = ({ size = 20, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    role="img"
    aria-label="Google Maps"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M12.833 8.337l5.868-6.977-0.059-0.015c-0.792-0.217-1.701-0.341-2.64-0.341-0.007 0-0.014 0-0.022 0h0.001c-3.055 0.030-5.794 1.353-7.701 3.448l-0.008 0.008-0.020 0.022zM19.325 1.549l-4.796 5.702 0.034-0.013c0.421-0.146 0.906-0.23 1.41-0.23 1.65 0 3.090 0.902 3.852 2.241l0.011 0.022c0.22 0.376 0.384 0.815 0.468 1.282l0.004 0.024c0.047 0.242 0.074 0.521 0.074 0.805 0 0.254-0.021 0.503-0.062 0.745l0.004-0.026-0.004 0.020 4.794-5.7c-1.262-2.27-3.278-3.992-5.702-4.846l-0.073-0.023zM7.867 4.939l-0.004 0.005c-1.402 1.839-2.246 4.169-2.246 6.697 0 1.538 0.313 3.003 0.878 4.335l-0.027-0.073 5.98-7.109-0.072-0.063zM11.682 10.633l-4.947 5.882c1.057 1.985 2.248 3.698 3.614 5.254l-0.027-0.031c0.309 0.387 0.617 0.777 0.921 1.17l6.228-7.404-0.036 0.012c-0.419 0.145-0.903 0.229-1.405 0.229-1.826 0-3.394-1.105-4.072-2.683l-0.011-0.029c-0.11-0.257-0.201-0.557-0.257-0.869l-0.004-0.026c-0.042-0.229-0.066-0.493-0.066-0.763 0-0.259 0.022-0.513 0.065-0.76l-0.004 0.026zM25.406 7.001c0.605 1.354 0.958 2.934 0.958 4.596 0 2.063-0.543 3.999-1.493 5.674l0.030-0.057c-1.693 2.658-3.379 4.947-5.203 7.116l0.082-0.1c-0.768 0.99-1.463 2.108-2.037 3.296l-0.049 0.112c-0.176 0.406-0.329 0.822-0.479 1.24-0.151 0.416-0.28 0.841-0.425 1.26-0.136 0.392-0.295 0.855-0.784 0.858h-0.009c-0.582-0.001-0.724-0.662-0.869-1.108-0.371-1.22-0.803-2.265-1.322-3.258l0.049 0.103c-0.725-1.274-1.465-2.364-2.279-3.393l0.042 0.056z" />
  </svg>
);

const WazeIcon = ({ size = 20, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 14 14"
    role="img"
    aria-label="Waze"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="m 12.937649,5.689685 c -0.11625,-0.68661 -0.388914,-1.33016 -0.810638,-1.91282 -0.476314,-0.65811 -1.127922,-1.20761 -1.884324,-1.58903 -0.7645339,-0.38552 -1.6178829,-0.58938 -2.4678369,-0.58938 -0.239783,0 -0.481475,0.0163 -0.71843,0.0482 -0.992367,0.13407 -1.968118,0.54689 -2.747572,1.16243 -0.878239,0.69354 -1.444993,1.58521 -1.638884,2.57878 -0.05777,0.29537 -0.08238,0.62212 -0.106209,0.93806 -0.03734,0.49456 -0.07594,1.00595 -0.233207,1.34013 -0.107482,0.2284 -0.267856,0.3805 -0.701389,0.3805 -0.238581,0 -0.456585,0.13492 -0.563077,0.34847 -0.10642098,0.21355 -0.08294,0.46889 0.0606,0.65931 0.653164,0.8665 1.505522,1.39133 2.402923,1.70755 -0.04087,0.12346 -0.06385,0.25491 -0.06385,0.39209 0,0.68902 0.558551,1.24757 1.247566,1.24757 0.671972,0 1.218291,-0.53161 1.244949,-1.19701 0.292534,0.0159 1.685483,0.0197 1.840836,0.0153 0.03444,0.65825 0.577502,1.18166 1.244243,1.18166 0.688943,0 1.2474949,-0.55848 1.2474949,-1.24757 0,-0.15705 -0.03026,-0.30674 -0.08316,-0.44513 0.489183,-0.23794 0.95093,-0.55904 1.353845,-0.94576 0.561875,-0.53918 0.974265,-1.1753 1.192764,-1.83964 0.245865,-0.7477 0.307667,-1.4993 0.183355,-2.23378 m -8.2243299,5.876 c -0.227338,0 -0.411684,-0.18421 -0.411684,-0.41169 0,-0.22733 0.184346,-0.41168 0.411684,-0.41168 0.227408,0 0.411683,0.18435 0.411683,0.41168 0,0.22748 -0.184275,0.41169 -0.411683,0.41169 m 4.330028,0 c -0.227409,0 -0.411754,-0.18421 -0.411754,-0.41169 0,-0.22733 0.184345,-0.41168 0.411754,-0.41168 0.227408,0 0.411683,0.18435 0.411683,0.41168 7.1e-5,0.22748 -0.184275,0.41169 -0.411683,0.41169 m 3.1132919,-3.83873 c -0.360276,1.09533 -1.309862,1.9998 -2.3218169,2.46289 -0.215458,-0.17706 -0.490951,-0.28327 -0.791405,-0.28327 -0.484233,0 -0.903058,0.2762 -1.109748,0.67933 -0.210438,0.009 -1.777338,0.003 -2.120219,-0.0202 -0.210155,-0.39223 -0.623818,-0.65917 -1.100061,-0.65917 -0.316788,0 -0.605221,0.11894 -0.825134,0.31354 -0.852358,-0.27543 -1.65734,-0.74608 -2.259025,-1.54449 1.779176,0 1.428092,-1.98827 1.658259,-3.16731 0.350659,-1.79693 2.12835,-3.00518 3.853148,-3.23817 0.212135,-0.0286 0.42427,-0.0426 0.634213,-0.0426 2.8347599,7e-5 5.3581049,2.53098 4.3817889,5.49938 m -4.4056189,0.87435 c -1.023692,0 -1.945914,-0.67119 -2.115056,-1.54978 -0.03281,-0.17056 0.07891,-0.33553 0.249471,-0.36834 0.170627,-0.0329 0.335527,0.0789 0.368337,0.24947 0.09942,0.51648 0.717865,1.06039 1.542221,1.03882 0.858722,-0.0225 1.4259,-0.53599 1.542433,-1.03154 0.03981,-0.16907 0.209378,-0.27379 0.378308,-0.23419 0.169213,0.0398 0.274007,0.20916 0.234197,0.37823 -0.09518,0.40454 -0.35568,0.77932 -0.733634,1.05545 -0.393652,0.28779 -0.879511,0.44718 -1.404757,0.46104 -0.02051,6.3e-4 -0.04108,8.4e-4 -0.06152,8.4e-4 m 2.037132,-3.23958 c 0,0.33369 -0.270542,0.60423 -0.604231,0.60423 -0.333617,0 -0.60416,-0.27054 -0.60416,-0.60423 0,-0.33369 0.270543,-0.60409 0.60416,-0.60409 0.333689,0 0.604231,0.27033 0.604231,0.60409 m -2.822597,0 c 0,0.33369 -0.270472,0.60423 -0.60416,0.60423 -0.333618,0 -0.60416,-0.27054 -0.60416,-0.60423 0,-0.33369 0.270542,-0.60409 0.60416,-0.60409 0.333688,0 0.60416,0.27033 0.60416,0.60409" />
  </svg>
);

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const contactEmail =
    import.meta.env.VITE_CONTACT_EMAIL || "contato@armbuilds.com";
  const contactPhone =
    import.meta.env.VITE_CONTACT_PHONE || "+55 (41) 99815-7368";
  const whatsappNumber =
    import.meta.env.VITE_CONTACT_WHATSAPP_NUMBER || "5541998157368";
  const whatsappMessage =
    import.meta.env.VITE_CONTACT_WHATSAPP_MESSAGE ||
    "Olá! Vim pelo site da Arm Builds e gostaria de conversar sobre um projeto.";
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

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
              <a href="#home" className="flex items-center gap-3">
                <DeltaCube size={34} stroke="var(--foreground)" />
                <div className="flex flex-col leading-none">
                  <span className="font-display text-2xl font-black tracking-tight">
                    ARM
                  </span>
                  <span className="brand-label mt-1 text-[0.55rem]">
                    Advanced Resource Mgmt
                  </span>
                </div>
              </a>
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
      <section
        id="home"
        className="relative isolate overflow-hidden pt-34 pb-16 px-4 min-h-[100svh] flex items-center"
      >
        {/* Animated WebGL shader field — ARM monochrome "anomalous matter" */}
        <div className="absolute inset-0 -z-10">
          <ShaderBackground className="absolute inset-0" />
          {/* fade the shader into Ink at the top (under the header) and bottom,
              keeping the centre band bright behind the wordmark */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,var(--background)_100%)]" />
          {/* soft scrim directly behind the centred type for legibility */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-72 bg-background/35 blur-3xl" />
        </div>

        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="brand-label mb-6 flex items-center justify-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="h-px w-8 bg-border" />
              Full-Cycle Engineering · AI · Web3
              <span className="h-px w-8 bg-border" />
            </motion.div>
            <motion.h1
              className="font-display text-6xl md:text-8xl font-black text-foreground mb-6 leading-[0.92]"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              We build systems
              <motion.span
                className="block bg-gradient-to-r from-foreground via-secondary to-foreground bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                end-to-end
              </motion.span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Da arquitetura à IA e à web descentralizada — engenharia
              full-cycle, construída ponta a ponta com geometria exata.
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
                  Descubra Nossas Soluções Mobile, Web3 e de IA
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
            <div className="brand-label mb-4">01 — Serviços</div>
            <h2 className="font-display text-4xl md:text-5xl font-black text-foreground mb-4">
              Nossos Serviços
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Oferecemos soluções tecnológicas de ponta para impulsionar a
              inovação e otimizar operações
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 xl:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {/* Agentes Verticais */}
            <motion.div variants={fadeInUp} whileHover="hover">
              <Card className="bg-card/70 border-border backdrop-blur-sm transition-all duration-300 group h-full relative overflow-hidden hover:border-foreground/25 hover:bg-card">
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
              <Card className="bg-card/70 border-border backdrop-blur-sm transition-all duration-300 group h-full relative overflow-hidden hover:border-foreground/25 hover:bg-card">
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
              <Card className="bg-card/70 border-border backdrop-blur-sm transition-all duration-300 group h-full relative overflow-hidden hover:border-foreground/25 hover:bg-card">
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
                    Infraestrutura Blockchain para o Mercado Real
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Tecnologia que Conecta Ativos, Dados e Energia
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-muted-foreground relative z-10">
                  <p className="mb-4">
                    Construímos a camada de software por trás de operações
                    tokenizadas, dados verificáveis via IoT e infraestrutura
                    inteligente para o mercado financeiro e energético.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle
                        className="text-accent-foreground mr-2"
                        size={16}
                      />
                      Plataformas White-Label de Tokenização
                    </li>
                    <li className="flex items-center">
                      <CheckCircle
                        className="text-accent-foreground mr-2"
                        size={16}
                      />
                      Smart Contracts & Auditoria
                    </li>
                    <li className="flex items-center">
                      <CheckCircle
                        className="text-accent-foreground mr-2"
                        size={16}
                      />
                      Integração IoT com Registro On-Chain
                    </li>
                    <li className="flex items-center">
                      <CheckCircle
                        className="text-accent-foreground mr-2"
                        size={16}
                      />
                      Monitoramento Energético para IA
                    </li>
                    <li className="flex items-center">
                      <CheckCircle
                        className="text-accent-foreground mr-2"
                        size={16}
                      />
                      Compliance e Infraestrutura DeFi
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* LLMs e RAG */}
            <motion.div variants={fadeInUp} whileHover="hover">
              <Card className="bg-card/70 border-border backdrop-blur-sm transition-all duration-300 group h-full relative overflow-hidden hover:border-foreground/25 hover:bg-card">
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
                    <Zap className="text-primary-foreground" size={24} />
                  </motion.div>
                  <CardTitle className="text-foreground text-2xl">
                    LLMs e Esteiras de IA
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Orquestração, contexto e segurança para aplicações com IA
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-muted-foreground relative z-10">
                  <p className="mb-4">
                    Projetamos esteiras de LLMs com LangChain, RAG e deploys
                    automatizados, conectando bases como vaults.fyi com foco em
                    observabilidade, segurança da informação e escala.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle
                        className="text-accent-foreground mr-2"
                        size={16}
                      />
                      LLMs, prompts e chains com LangChain
                    </li>
                    <li className="flex items-center">
                      <CheckCircle
                        className="text-accent-foreground mr-2"
                        size={16}
                      />
                      RAG com bases privadas e integrações como vaults.fyi
                    </li>
                    <li className="flex items-center">
                      <CheckCircle
                        className="text-accent-foreground mr-2"
                        size={16}
                      />
                      Deploy automatizado, guardrails e segurança da informação
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="relative isolate overflow-hidden py-16 px-4 bg-card/20"
      >
        {/* Dotted wave field — raw WebGL gl.POINTS, ARM monochrome */}
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-50">
          <DottedSurface className="absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        </div>
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="brand-label mb-4">02 — Sobre</div>
              <h2 className="font-display text-4xl md:text-5xl font-black text-foreground mb-6">
                Sobre a Arm Company Development
              </h2>
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                Na Arm, nossa missão é impulsionar a inovação e a transformação
                digital, fornecendo soluções tecnológicas de ponta que capacitam
                nossos clientes a alcançar seus objetivos.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Somos um time multidisciplinar de engenheiros, desenvolvedores,
                designers e estrategistas apaixonados por tecnologia e inovação,
                com grande experiência em inteligência artificial,
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
                    20+
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
                    Projetos dinâmicos e transparentes descomplicando os
                    processos
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
            <div className="brand-label mb-4">03 — Portfólio</div>
            <h2 className="font-display text-4xl md:text-5xl font-black text-foreground mb-4">
              Nosso Portfólio
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Casos de sucesso que demonstram nossa expertise em IA, aplicativos
              e Web3
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 xl:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {/* Elamor */}
            <motion.div variants={fadeInUp} whileHover="hover">
              <Card className="bg-card/70 border-border backdrop-blur-sm transition-all duration-300 group h-full relative overflow-hidden hover:border-foreground/25 hover:bg-card">
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
                    Elamor
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Marketplace high-ticket de beleza e bem-estar
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-muted-foreground relative z-10">
                  <p className="mb-4">
                    Plataforma mobile que conecta clientes aos melhores
                    profissionais de beleza premium, com agendamento
                    inteligente, pagamento integrado e curadoria de prestadores
                    high-ticket.
                  </p>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium text-foreground">
                        Plataforma:
                      </span>{" "}
                      <span className="text-accent-foreground">
                        React Native
                      </span>
                    </p>
                    <p>
                      <span className="font-medium text-foreground">
                        Distribuição:
                      </span>{" "}
                      <span className="text-accent-foreground">
                        iOS &amp; Android
                      </span>
                    </p>
                    <p>
                      <span className="font-medium text-foreground">Site:</span>{" "}
                      <a
                        href="https://elamor.com.br"
                        target="_blank"
                        rel="noreferrer"
                        className="text-accent-foreground underline underline-offset-2 hover:text-primary"
                      >
                        elamor.com.br
                      </a>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* ARMbidding */}
            <motion.div variants={fadeInUp} whileHover="hover">
              <Card className="bg-card/70 border-border backdrop-blur-sm transition-all duration-300 group h-full relative overflow-hidden hover:border-foreground/25 hover:bg-card">
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
                    InBidding
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Inteligência de licitações públicas em escala nacional
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-muted-foreground relative z-10">
                  <p className="mb-4">
                    Coleta e organiza todas as publicações de licitação do
                    Brasil em um único painel. Modelos de IA treinam sobre o
                    histórico para entregar os editais mais relevantes para cada
                    filtro aplicado pelo usuário.
                  </p>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium text-foreground">
                        Cobertura:
                      </span>{" "}
                      <span className="text-accent-foreground">Nacional</span>
                    </p>
                    <p>
                      <span className="font-medium text-foreground">
                        Stack:
                      </span>{" "}
                      <span className="text-accent-foreground">IA + RAG</span>
                    </p>
                    <p>
                      <span className="font-medium text-foreground">
                        Output:
                      </span>{" "}
                      <span className="text-accent-foreground">
                        Editais ranqueados
                      </span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Lyndus */}
            <motion.div variants={fadeInUp} whileHover="hover">
              <Card className="bg-card/70 border-border backdrop-blur-sm transition-all duration-300 group h-full relative overflow-hidden hover:border-foreground/25 hover:bg-card">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                ></motion.div>
                <CardHeader className="relative z-10">
                  <Badge className="w-fit bg-secondary/20 text-secondary border-secondary/30">
                    Fintech
                  </Badge>
                  <CardTitle className="text-foreground text-xl">
                    Lyndus
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Ecossistema fintech para autônomos e patrocinadores
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-muted-foreground relative z-10">
                  <p className="mb-4">
                    Aplicativo e infraestrutura financeira que conecta clientes,
                    usuários, patrocinadores e profissionais autônomos. Permite
                    antecipação de pagamentos com base no rendimento real de
                    cada autônomo dentro da plataforma.
                  </p>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium text-foreground">
                        Modelo:
                      </span>{" "}
                      <span className="text-accent-foreground">
                        App + Fintech
                      </span>
                    </p>
                    <p>
                      <span className="font-medium text-foreground">
                        Diferencial:
                      </span>{" "}
                      <span className="text-accent-foreground">
                        Antecipação inteligente
                      </span>
                    </p>
                    <p>
                      <span className="font-medium text-foreground">Site:</span>{" "}
                      <a
                        href="https://lyndus.com.br"
                        target="_blank"
                        rel="noreferrer"
                        className="text-accent-foreground underline underline-offset-2 hover:text-primary"
                      >
                        lyndus.com.br
                      </a>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* LiveWave */}
            <motion.div variants={fadeInUp} whileHover="hover">
              <Card className="bg-card/70 border-border backdrop-blur-sm transition-all duration-300 group h-full relative overflow-hidden hover:border-foreground/25 hover:bg-card">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                ></motion.div>
                <CardHeader className="relative z-10">
                  <Badge className="w-fit bg-primary/20 text-primary border-primary/30">
                    Em Desenvolvimento
                  </Badge>
                  <CardTitle className="text-foreground text-xl">
                    LiveWave
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Copiloto multilíngue de IA para reuniões e entrevistas
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-muted-foreground relative z-10">
                  <p className="mb-4">
                    Um copiloto em tempo real que unifica qualquer idioma
                    durante reuniões, eliminando a barreira da linguagem e o
                    nervosismo em entrevistas. Tradução, contexto e sugestões
                    instantâneas direto na call.
                  </p>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium text-foreground">
                        Status:
                      </span>{" "}
                      <span className="text-accent-foreground">
                        Em andamento
                      </span>
                    </p>
                    <p>
                      <span className="font-medium text-foreground">Foco:</span>{" "}
                      <span className="text-accent-foreground">
                        IA em tempo real
                      </span>
                    </p>
                    <p>
                      <span className="font-medium text-foreground">
                        Aplicação:
                      </span>{" "}
                      <span className="text-accent-foreground">
                        Reuniões &amp; entrevistas
                      </span>
                    </p>
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
            <div className="brand-label mb-4">04 — Contato</div>
            <h2 className="font-display text-4xl md:text-5xl font-black text-foreground mb-4">
              Entre em Contato
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Pronto para transformar suas ideias em realidade? Vamos construir
              o futuro digital juntos.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <ContactForm />

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
                        {contactEmail}
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
                        {contactPhone}
                      </div>
                    </div>
                  </motion.div>
                  <motion.a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-4 rounded-xl border border-foreground bg-background p-4 transition-colors hover:bg-foreground hover:text-background"
                    variants={fadeInRight}
                    whileHover={{ x: 10 }}
                  >
                    <div className="w-12 h-12 rounded-lg bg-foreground flex items-center justify-start">
                      <MessageCircle className="text-background" size={20} />
                    </div>
                    <div>
                      <div className="text-foreground font-semibold">
                        WhatsApp
                      </div>
                      <div className="text-muted-foreground">
                        Conversar agora
                      </div>
                    </div>
                  </motion.a>
                  <motion.div
                    className="flex items-start space-x-4"
                    variants={fadeInRight}
                    whileHover={{ x: 10 }}
                  >
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center shrink-0">
                      <MapPin className="text-primary-foreground" size={20} />
                    </div>
                    <div>
                      <div className="text-foreground font-semibold">
                        Endereço
                      </div>
                      <div className="text-sm text-foreground font-medium leading-relaxed">
                        Rua Grã Nicco 113, Mossunguê, Bloco 3 Sl 101
                        <br />
                        CEP 82400-100 – Curitiba/PR, Brasil
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            "Rua Grã Nicco 113, Mossunguê, Curitiba - PR, 82400-100",
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          title="Abrir no Google Maps"
                          className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium text-foreground shadow-sm hover:border-foreground hover:shadow-md transition-all"
                        >
                          <GoogleMapsIcon size={18} />
                          Google Maps
                        </a>
                        <a
                          href={`https://waze.com/ul?q=${encodeURIComponent(
                            "Rua Grã Nicco 113, Mossunguê, Curitiba - PR, 82400-100",
                          )}&navigate=yes`}
                          target="_blank"
                          rel="noreferrer"
                          title="Abrir no Waze"
                          className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium text-foreground shadow-sm hover:border-foreground hover:shadow-md transition-all"
                        >
                          <WazeIcon size={18} />
                          Waze
                        </a>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              {/* <div>
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
              </div> */}
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
              <DeltaCube size={40} stroke="var(--foreground)" />
              <div className="flex flex-col leading-none">
                <span className="font-display text-foreground text-lg font-black">
                  ARM
                </span>
                <span className="brand-label mt-1 text-[0.55rem]">
                  Advanced Resource Management
                </span>
              </div>
            </motion.div>
            <motion.div
              className="text-muted-foreground text-sm"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              © 2025 Arm Company Development. Todos os direitos reservados.
            </motion.div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}

export default App;
