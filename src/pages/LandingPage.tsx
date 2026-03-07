import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShoppingCart, Gamepad2, GraduationCap, ArrowRight, Zap, Shield, Globe, MessageSquare } from "lucide-react";
import anantaLogo from "@/assets/ananta-logo.png";
import supremeTechLogo from "@/assets/supreme-tech-logo.png";
import { useRef, useEffect, useState } from "react";

const features = [
  { icon: MessageSquare, title: "Chat Assistant", desc: "Get intelligent answers on technology, coding, business, and more.", color: "from-[hsl(192,100%,50%)] to-[hsl(210,100%,60%)]" },
  { icon: ShoppingCart, title: "Shopping Assistance", desc: "Compare products, find the best deals, and make smart purchases.", color: "from-[hsl(263,70%,58%)] to-[hsl(280,80%,65%)]" },
  { icon: GraduationCap, title: "Skill Unlocking", desc: "Learn new skills with AI-generated roadmaps and step-by-step guidance.", color: "from-[hsl(150,80%,45%)] to-[hsl(170,90%,50%)]" },
  { icon: Gamepad2, title: "Gaming Assistance", desc: "Master any game with loadouts, strategies, and tactical analysis.", color: "from-[hsl(340,80%,55%)] to-[hsl(20,90%,55%)]" },
];

const stats = [
  { icon: Zap, label: "Lightning Fast", value: "< 1s Response" },
  { icon: Shield, label: "Secure", value: "End-to-end" },
  { icon: Globe, label: "Always Available", value: "24/7 Online" },
];

// Particle component
function Particles() {
  const [particles] = useState(() =>
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary/30"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Floating orbs
function FloatingOrbs() {
  return (
    <>
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(192 100% 50% / 0.08) 0%, transparent 70%)",
          top: "10%",
          left: "20%",
        }}
        animate={{ x: [0, 50, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(263 70% 58% / 0.08) 0%, transparent 70%)",
          top: "30%",
          right: "10%",
        }}
        animate={{ x: [0, -40, 0], y: [0, 40, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(192 100% 50% / 0.05) 0%, transparent 70%)",
          bottom: "20%",
          left: "50%",
        }}
        animate={{ x: [0, 30, 0], y: [0, -50, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
}

// Glowing line
function GlowLine() {
  return (
    <div className="relative w-full h-px my-16">
      <div className="absolute inset-0 bg-border" />
      <motion.div
        className="absolute top-0 h-px w-32 bg-gradient-to-r from-transparent via-primary to-transparent"
        animate={{ left: ["-10%", "110%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div ref={containerRef} className="min-h-screen bg-background overflow-hidden">
      {/* Nav */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 w-full z-50 glass-panel border-b"
      >
        <div className="container mx-auto flex items-center justify-between h-16 px-6">
          <Link to="/" className="flex items-center gap-3">
            <img src={anantaLogo} alt="ANANTA AI" className="h-10 w-10 object-contain" />
            <span className="font-heading text-xl font-bold text-gradient">ANANTA AI</span>
          </Link>
          <div className="flex gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/login">Log In</Link>
            </Button>
            <Button variant="hero" size="sm" asChild>
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <Particles />
        <FloatingOrbs />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

        {/* Animated rings around logo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <motion.div
            className="w-[600px] h-[600px] rounded-full border border-primary/10"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-8 rounded-full border border-secondary/10"
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-16 rounded-full border border-primary/5"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 text-center max-w-5xl mx-auto px-6 pt-20"
        >
          {/* Animated logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mx-auto mb-8"
          >
            <motion.img
              src={anantaLogo}
              alt="ANANTA AI"
              className="h-28 w-28 mx-auto object-contain drop-shadow-[0_0_30px_hsl(192,100%,50%,0.4)]"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="inline-flex items-center gap-2 glass-panel rounded-full px-5 py-2.5 mb-8"
          >
            <motion.span
              className="h-2 w-2 rounded-full bg-primary"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm text-muted-foreground">Powered by Advanced AI • A Supreme Tech Product</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6"
          >
            <span className="text-gradient">ANANTA AI</span>
            <br />
            <motion.span
              className="text-foreground text-3xl md:text-5xl lg:text-5xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              Intelligent Guidance for
            </motion.span>
            <br />
            <motion.span
              className="text-foreground text-3xl md:text-5xl lg:text-5xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.8 }}
            >
              Learning, Gaming & Smart Decisions
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Your AI companion for skill growth, smarter purchases, and gaming mastery.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button variant="hero" size="lg" className="group" asChild>
              <Link to="/signup">
                Start Using ANANTA AI
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="ml-1 h-5 w-5" />
                </motion.span>
              </Link>
            </Button>
            <Button variant="glass" size="lg" asChild>
              <Link to="#features">Explore Features</Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
            <div className="w-1 h-2 rounded-full bg-primary" />
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-20 border-y border-border relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />
        <div className="container mx-auto px-6 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-4 justify-center glass-panel rounded-xl p-6"
              >
                <motion.div
                  className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <s.icon className="h-7 w-7 text-primary" />
                </motion.div>
                <div>
                  <div className="text-2xl font-heading font-bold text-foreground">{s.value}</div>
                  <div className="text-sm text-muted-foreground">{s.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <GlowLine />

      {/* Features */}
      <section id="features" className="py-24 relative">
        <Particles />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.span
              className="inline-block text-primary text-sm font-semibold tracking-widest uppercase mb-4"
              initial={{ opacity: 0, letterSpacing: "0.1em" }}
              whileInView={{ opacity: 1, letterSpacing: "0.2em" }}
              viewport={{ once: true }}
            >
              Core Modules
            </motion.span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Four Powerful <span className="text-gradient">AI Modules</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Each module is designed to elevate a different aspect of your digital life.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30, rotateX: 10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass-panel rounded-2xl p-8 hover-glow transition-all duration-500 group relative overflow-hidden"
              >
                {/* Gradient accent */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${f.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <motion.div
                  className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-6 shadow-lg`}
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <f.icon className="h-8 w-8 text-foreground" />
                </motion.div>
                <h3 className="font-heading text-2xl font-semibold text-foreground mb-3">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.desc}</p>

                <motion.div
                  className="mt-6 flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  Learn more <ArrowRight className="h-4 w-4" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <GlowLine />

      {/* CTA */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-panel rounded-3xl p-16 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
            <FloatingOrbs />
            <div className="relative z-10">
              <motion.img
                src={anantaLogo}
                alt="ANANTA AI"
                className="h-20 w-20 mx-auto mb-8 object-contain"
                animate={{ y: [0, -5, 0], rotate: [0, 2, 0, -2, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
                Ready to Get <span className="text-gradient">Started?</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-10 max-w-lg mx-auto">
                Join ANANTA AI and unlock intelligent guidance for every aspect of your digital life.
              </p>
              <Button variant="hero" size="lg" className="text-lg px-10" asChild>
                <Link to="/signup">
                  Start Free <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src={anantaLogo} alt="ANANTA AI" className="h-8 w-8 object-contain" />
              <span className="font-heading font-bold text-gradient text-lg">ANANTA AI</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">A product of</span>
              <div className="flex items-center gap-2 glass-panel rounded-full px-4 py-2">
                <img src={supremeTechLogo} alt="Supreme Tech" className="h-6 w-6 object-contain" />
                <span className="font-heading font-semibold text-foreground text-sm">SUPREME TECH</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">© 2026 Supreme Tech. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
