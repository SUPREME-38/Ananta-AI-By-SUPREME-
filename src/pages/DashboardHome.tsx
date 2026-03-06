import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MessageSquare, ShoppingCart, GraduationCap, Gamepad2, ArrowRight, Sparkles, TrendingUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const quickActions = [
  { icon: MessageSquare, label: "Chat Assistant", to: "/dashboard/chat", color: "text-primary" },
  { icon: ShoppingCart, label: "Shopping", to: "/dashboard/shopping", color: "text-neon-purple" },
  { icon: GraduationCap, label: "Skills", to: "/dashboard/skills", color: "text-primary" },
  { icon: Gamepad2, label: "Gaming", to: "/dashboard/gaming", color: "text-neon-purple" },
];

const trendingSkills = ["React.js", "AI/ML", "Python", "Web3", "UI/UX Design"];
const popularGames = ["Fortnite", "PUBG", "Call of Duty", "Valorant", "Apex Legends"];
const trendingProducts = ["RTX 5090", "MacBook Pro M4", "Sony WH-1000XM6", "Steam Deck 2"];

const card = "glass-panel rounded-xl p-6 hover-glow transition-all duration-300";

export default function DashboardHome() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading text-3xl font-bold text-foreground mb-1">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back. What would you like to explore today?</p>
      </motion.div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((a, i) => (
          <motion.div key={a.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Link to={a.to} className={`${card} flex flex-col items-center gap-3 text-center group`}>
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <a.icon className={`h-6 w-6 ${a.color}`} />
              </div>
              <span className="text-sm font-medium text-foreground">{a.label}</span>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* AI Quick Chat */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className={`${card} md:col-span-2 lg:col-span-1`}>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-primary" />
            <h3 className="font-heading font-semibold text-foreground">AI Quick Chat</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Ask anything — technology, coding, business, or learning.</p>
          <Button variant="hero" size="sm" asChild>
            <Link to="/dashboard/chat">Start Chat <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </motion.div>

        {/* Recommended Skills */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className={card}>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h3 className="font-heading font-semibold text-foreground">Trending Skills</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {trendingSkills.map(s => (
              <span key={s} className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20">{s}</span>
            ))}
          </div>
        </motion.div>

        {/* Popular Games */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className={card}>
          <div className="flex items-center gap-2 mb-4">
            <Gamepad2 className="h-5 w-5 text-neon-purple" />
            <h3 className="font-heading font-semibold text-foreground">Popular Games</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {popularGames.map(g => (
              <span key={g} className="text-xs px-3 py-1.5 rounded-full bg-secondary/10 text-secondary border border-secondary/20">{g}</span>
            ))}
          </div>
        </motion.div>

        {/* Trending Products */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className={`${card} md:col-span-2 lg:col-span-3`}>
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-5 w-5 text-primary" />
            <h3 className="font-heading font-semibold text-foreground">Trending Tech Products</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {trendingProducts.map(p => (
              <div key={p} className="rounded-lg bg-muted/50 border border-border p-4 text-center">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <ShoppingCart className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">{p}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
