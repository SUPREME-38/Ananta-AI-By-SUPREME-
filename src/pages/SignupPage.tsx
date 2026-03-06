import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles } from "lucide-react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signup(name, email, password);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background grid-bg flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <Sparkles className="h-8 w-8 text-primary" />
            <span className="font-heading text-2xl font-bold text-gradient">ANANTA AI</span>
          </Link>
          <h1 className="font-heading text-3xl font-bold text-foreground">Create Account</h1>
          <p className="text-muted-foreground mt-2">Get started with ANANTA AI</p>
        </div>
        <form onSubmit={handleSubmit} className="glass-panel rounded-xl p-8 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required className="bg-muted border-border" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required className="bg-muted border-border" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required className="bg-muted border-border" />
          </div>
          <Button type="submit" variant="hero" className="w-full" size="lg">Create Account</Button>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account? <Link to="/login" className="text-primary hover:underline">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
