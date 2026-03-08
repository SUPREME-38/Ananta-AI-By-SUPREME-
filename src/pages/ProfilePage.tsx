import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Calendar, Shield, Sparkles } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl space-y-6">
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="font-heading text-2xl font-bold text-foreground mb-1">Profile</h1>
        <p className="text-sm text-muted-foreground mb-4">Manage your account information.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="glass-panel rounded-2xl p-8 space-y-6 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary" />

        <div className="flex items-center gap-5">
          <motion.div
            className="h-20 w-20 rounded-2xl bg-gradient-primary flex items-center justify-center text-3xl font-bold text-primary-foreground shadow-lg shadow-primary/20"
            whileHover={{ scale: 1.05, rotate: 3 }}
          >
            {user?.name[0].toUpperCase()}
          </motion.div>
          <div>
            <h2 className="font-heading text-xl font-semibold text-foreground">{user?.name}</h2>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
            <div className="flex items-center gap-1.5 mt-1">
              <Shield className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs text-primary font-medium">Verified Account</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-muted-foreground"><User className="h-4 w-4" /> Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} className="bg-muted border-border focus:ring-2 focus:ring-primary/50" />
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-muted-foreground"><Mail className="h-4 w-4" /> Email</Label>
            <Input value={user?.email} disabled className="bg-muted border-border opacity-50" />
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-muted-foreground"><Calendar className="h-4 w-4" /> Joined</Label>
            <Input value={user?.joinedDate ? new Date(user.joinedDate).toLocaleDateString() : ""} disabled className="bg-muted border-border opacity-50" />
          </div>
        </div>

        <Button onClick={handleSave} variant="hero" size="lg">
          {saved ? "✓ Saved Successfully" : "Save Changes"}
        </Button>
      </motion.div>
    </div>
  );
}
