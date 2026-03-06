import { useState } from "react";
import { motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [privacy, setPrivacy] = useState(false);

  return (
    <div className="max-w-2xl space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading text-2xl font-bold text-foreground mb-1">Settings</h1>
        <p className="text-sm text-muted-foreground mb-4">Configure your preferences.</p>
      </motion.div>

      <div className="glass-panel rounded-xl p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-foreground font-medium">Dark Theme</Label>
            <p className="text-xs text-muted-foreground mt-1">Use dark futuristic theme</p>
          </div>
          <Switch checked={darkMode} onCheckedChange={setDarkMode} />
        </div>
        <div className="h-px bg-border" />
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-foreground font-medium">Notifications</Label>
            <p className="text-xs text-muted-foreground mt-1">Receive platform notifications</p>
          </div>
          <Switch checked={notifications} onCheckedChange={setNotifications} />
        </div>
        <div className="h-px bg-border" />
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-foreground font-medium">Private Profile</Label>
            <p className="text-xs text-muted-foreground mt-1">Hide your profile from other users</p>
          </div>
          <Switch checked={privacy} onCheckedChange={setPrivacy} />
        </div>
      </div>
    </div>
  );
}
