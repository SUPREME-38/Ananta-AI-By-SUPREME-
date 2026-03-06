import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Bot, ShoppingCart, Gamepad2, GraduationCap, Sparkles, ArrowRight, Zap, Shield, Globe } from "lucide-react";

const features = [
  { icon: Bot, title: "Chat Assistant", desc: "Get intelligent answers on technology, coding, business, and more." },
  { icon: ShoppingCart, title: "Shopping Assistance", desc: "Compare products, find the best deals, and make smart purchases." },
  { icon: GraduationCap, title: "Skill Unlocking", desc: "Learn new skills with AI-generated roadmaps and step-by-step guidance." },
  { icon: Gamepad2, title: "Gaming Assistance", desc: "Master any game with loadouts, strategies, and tactical analysis." },
];

const stats = [
  { icon: Zap, label: "Lightning Fast", value: "< 1s Response" },
  { icon: Shield, label: "Secure", value: "End-to-end" },
  { icon: Globe, label: "Always Available", value: "24/7 Online" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 glass-panel border-b">
        <div className="container mx-auto flex items-center justify-between h-16 px-6">
          <Link to="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
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
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center grid-bg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[100px]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-4xl mx-auto px-6 pt-20"
        >
          <div className="inline-flex items-center gap-2 glass-panel rounded-full px-4 py-2 mb-8">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">Powered by Advanced AI</span>
          </div>
          <h1 className="font-heading text-5xl md:text-7xl font-bold leading-tight mb-6">
            <span className="text-gradient">ANANTA AI</span>
            <br />
            <span className="text-foreground">Intelligent Guidance for</span>
            <br />
            <span className="text-foreground">Learning, Gaming & Smart Decisions</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Your AI companion for skill growth, smarter purchases, and gaming mastery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <Link to="/signup">
                Start Using ANANTA AI <ArrowRight className="ml-1 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="glass" size="lg" asChild>
              <Link to="#features">Explore Features</Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 justify-center"
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <s.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-xl font-heading font-bold text-foreground">{s.value}</div>
                  <div className="text-sm text-muted-foreground">{s.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Four Powerful Modules</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Each module is designed to elevate a different aspect of your digital life.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass-panel rounded-xl p-8 hover-glow transition-all duration-300 group"
              >
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <f.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-panel rounded-2xl p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-primary/5" />
            <div className="relative z-10">
              <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
                Join ANANTA AI and unlock intelligent guidance for every aspect of your digital life.
              </p>
              <Button variant="hero" size="lg" asChild>
                <Link to="/signup">Start Free <ArrowRight className="ml-1" /></Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="font-heading font-bold text-gradient">ANANTA AI</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 ANANTA AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
