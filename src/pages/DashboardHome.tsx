import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MessageSquare, ShoppingCart, GraduationCap, Gamepad2, ArrowRight, Sparkles, TrendingUp, Zap, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import anantaLogo from "@/assets/ananta-logo-new.png";

const quickActions = [
  { icon: MessageSquare, label: "Chat Assistant", to: "/dashboard/chat", gradient: "from-primary to-[hsl(210,100%,60%)]" },
  { icon: ShoppingCart, label: "Shopping", to: "/dashboard/shopping", gradient: "from-secondary to-[hsl(280,80%,65%)]" },
  { icon: GraduationCap, label: "Skills", to: "/dashboard/skills", gradient: "from-[hsl(150,80%,45%)] to-[hsl(170,90%,50%)]" },
  { icon: Gamepad2, label: "Gaming", to: "/dashboard/gaming", gradient: "from-[hsl(340,80%,55%)] to-[hsl(20,90%,55%)]" },
];

const trendingSkills = ["React.js", "AI/ML", "Python", "Web3", "UI/UX Design"];
const popularGames = ["Fortnite", "PUBG", "Call of Duty", "Valorant", "Apex Legends"];
const trendingProducts = ["RTX 5090", "MacBook Pro M4", "Sony WH-1000XM6", "Steam Deck 2"];

const card = "glass-panel rounded-2xl p-6 hover-glow transition-all duration-500 group relative overflow-hidden";

export default function DashboardHome() {
  return (
    <div className="space-y-8">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-panel rounded-2xl p-8 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="relative z-10 flex items-center gap-5">
          <motion.img
            src={anantaLogo}
            alt="ANANTA AI"
            className="h-16 w-16 object-contain drop-shadow-[0_0_20px_hsl(192,100%,50%,0.4)]"
            animate={{ y: [0, -5, 0], rotate: [0, 3, 0, -3, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground mb-1">Welcome to <span className="text-gradient">ANANTA AI</span></h1>
            <p className="text-muted-foreground">What would you like to explore today?</p>
          </div>
        </div>
      </motion.div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((a, i) => (
          <motion.div
            key={a.label}
            initial={{ opacity: 0, y: 20, rotateX: 15 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <Link to={a.to} className={`${card} flex flex-col items-center gap-4 text-center`}>
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }} />
              <motion.div
                className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${a.gradient} flex items-center justify-center shadow-lg`}
                whileHover={{ scale: 1.15, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <a.icon className="h-7 w-7 text-primary-foreground" />
              </motion.div>
              <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{a.label}</span>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* AI Quick Chat */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`${card} md:col-span-2 lg:col-span-1`}
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="flex items-center gap-2 mb-4">
            <motion.div animate={{ rotate: [0, 180, 360] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
              <Sparkles className="h-5 w-5 text-primary" />
            </motion.div>
            <h3 className="font-heading font-semibold text-foreground">AI Quick Chat</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Ask anything — technology, coding, business, or learning.</p>
          <Button variant="hero" size="sm" className="group/btn" asChild>
            <Link to="/dashboard/chat">Start Chat <ArrowRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" /></Link>
          </Button>
        </motion.div>

        {/* Trending Skills */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className={card}>
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[hsl(150,80%,45%)] to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h3 className="font-heading font-semibold text-foreground">Trending Skills</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {trendingSkills.map((s, i) => (
              <motion.span
                key={s}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                whileHover={{ scale: 1.1 }}
                className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 cursor-default"
              >
                {s}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Popular Games */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className={card}>
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary to-[hsl(340,80%,55%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="flex items-center gap-2 mb-4">
            <Gamepad2 className="h-5 w-5 text-secondary" />
            <h3 className="font-heading font-semibold text-foreground">Popular Games</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {popularGames.map((g, i) => (
              <motion.span
                key={g}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.45 + i * 0.05 }}
                whileHover={{ scale: 1.1 }}
                className="text-xs px-3 py-1.5 rounded-full bg-secondary/10 text-secondary border border-secondary/20 cursor-default"
              >
                {g}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Trending Products */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className={`${card} md:col-span-2 lg:col-span-3`}>
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-5 w-5 text-primary" />
            <h3 className="font-heading font-semibold text-foreground">Trending Tech Products</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {trendingProducts.map((p, i) => (
              <motion.div
                key={p}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.08 }}
                whileHover={{ y: -3, scale: 1.02 }}
                className="rounded-xl bg-muted/50 border border-border p-4 text-center hover:border-primary/30 transition-all duration-300 cursor-default"
              >
                <motion.div
                  className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3"
                  whileHover={{ rotate: 10 }}
                >
                  <ShoppingCart className="h-5 w-5 text-primary" />
                </motion.div>
                <span className="text-sm font-medium text-foreground">{p}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
