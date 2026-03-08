import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import anantaLogo from "@/assets/ananta-logo-new.png";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background grid-bg flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background orbs */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, hsl(192 100% 50% / 0.06) 0%, transparent 70%)", top: "10%", left: "20%" }}
        animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{ background: "radial-gradient(circle, hsl(263 70% 58% / 0.06) 0%, transparent 70%)", bottom: "10%", right: "20%" }}
        animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-6">
            <motion.img
              src={anantaLogo}
              alt="ANANTA AI"
              className="h-16 w-16 mx-auto object-contain drop-shadow-[0_0_25px_hsl(192,100%,50%,0.4)]"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </Link>
          <h1 className="font-heading text-3xl font-bold text-foreground">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">Sign in to <span className="text-gradient font-semibold">ANANTA AI</span></p>
        </div>
        <form onSubmit={handleSubmit} className="glass-panel rounded-2xl p-8 space-y-5 border border-border/50">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required className="bg-muted border-border focus:ring-2 focus:ring-primary/50" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required className="bg-muted border-border focus:ring-2 focus:ring-primary/50" />
          </div>
          <Button type="submit" variant="hero" className="w-full" size="lg">Log In</Button>
          <p className="text-center text-sm text-muted-foreground">
            Don't have an account? <Link to="/signup" className="text-primary hover:underline font-medium">Sign up</Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
