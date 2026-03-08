import { useState } from "react";
import { motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Moon, Bell, Eye, Palette } from "lucide-react";

const settingItems = [
  { key: "darkMode", icon: Moon, label: "Dark Theme", desc: "Use dark futuristic theme", default: true },
  { key: "notifications", icon: Bell, label: "Notifications", desc: "Receive platform notifications", default: true },
  { key: "privacy", icon: Eye, label: "Private Profile", desc: "Hide your profile from other users", default: false },
];

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, boolean>>(
    Object.fromEntries(settingItems.map(s => [s.key, s.default]))
  );

  const toggle = (key: string) => setSettings(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="max-w-2xl space-y-6">
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="font-heading text-2xl font-bold text-foreground mb-1">Settings</h1>
        <p className="text-sm text-muted-foreground mb-4">Configure your preferences.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="glass-panel rounded-2xl p-8 space-y-1 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary" />

        {settingItems.map((item, i) => (
          <motion.div
            key={item.key}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.08 }}
          >
            {i > 0 && <div className="h-px bg-border my-5" />}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-4">
                <motion.div
                  className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <item.icon className="h-5 w-5 text-primary" />
                </motion.div>
                <div>
                  <Label className="text-foreground font-medium text-base">{item.label}</Label>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
              </div>
              <Switch checked={settings[item.key]} onCheckedChange={() => toggle(item.key)} />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
