import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Calendar } from "lucide-react";

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
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading text-2xl font-bold text-foreground mb-1">Profile</h1>
        <p className="text-sm text-muted-foreground mb-4">Manage your account information.</p>
      </motion.div>

      <div className="glass-panel rounded-xl p-8 space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-gradient-primary flex items-center justify-center text-2xl font-bold text-primary-foreground">
            {user?.name[0].toUpperCase()}
          </div>
          <div>
            <h2 className="font-heading text-lg font-semibold text-foreground">{user?.name}</h2>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2"><User className="h-4 w-4" /> Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} className="bg-muted border-border" />
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2"><Mail className="h-4 w-4" /> Email</Label>
            <Input value={user?.email} disabled className="bg-muted border-border opacity-50" />
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2"><Calendar className="h-4 w-4" /> Joined</Label>
            <Input value={user?.joinedDate ? new Date(user.joinedDate).toLocaleDateString() : ""} disabled className="bg-muted border-border opacity-50" />
          </div>
        </div>

        <Button onClick={handleSave} variant="hero">
          {saved ? "Saved ✓" : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
