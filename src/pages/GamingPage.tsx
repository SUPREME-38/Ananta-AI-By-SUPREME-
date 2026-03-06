import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Crosshair, Shield, Swords, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GameData {
  name: string;
  loadouts: string[];
  strategies: string[];
  tips: string[];
}

const games: Record<string, GameData> = {
  "call of duty": {
    name: "Call of Duty",
    loadouts: ["M4A1 + Ghost + Cold Blooded", "MP5 + Overkill + Amped", "AX-50 + Double Time + Tracker"],
    strategies: ["Control high ground positions", "Use tactical equipment to gather intel", "Rotate with the circle in Warzone", "Pre-aim common angles"],
    tips: ["Practice recoil control in firing range", "Learn spawn patterns on each map", "Use sound cues — headphones are essential", "Play with a consistent squad for better coordination"],
  },
  pubg: {
    name: "PUBG",
    loadouts: ["M416 + 6x Scope + Vertical Grip", "AWM + 8x + Cheek Pad", "Beryl M762 + Red Dot + Comp"],
    strategies: ["Drop in less contested areas for safe looting", "Use vehicles for rotations in open maps", "Hold compound positions in final circles", "Third-party fights when possible"],
    tips: ["Practice spray transfer between targets", "Always carry smoke grenades", "Use lean peek advantage", "Manage your inventory — drop unnecessary items"],
  },
  fortnite: {
    name: "Fortnite",
    loadouts: ["AR + Shotgun + SMG + Heals + Utility", "Sniper + AR + Shotgun + Meds + Mobility", "Shotgun + AR + Rocket + Heals + Shield"],
    strategies: ["Build high ground in every fight", "Box fight when low on materials", "Use editing for quick peeks", "Storm surge management in competitive"],
    tips: ["Practice 90s and tunneling daily", "Edit course training improves speed", "Learn piece control techniques", "Watch pro players' VODs for positioning"],
  },
  valorant: {
    name: "Valorant",
    loadouts: ["Phantom + Classic (eco)", "Vandal + Ghost (bonus)", "Operator + Sheriff (AWP role)"],
    strategies: ["Default setups before committing to a site", "Trade kills with teammates", "Use utility to clear angles", "Play post-plant positions"],
    tips: ["Crosshair placement at head level always", "Learn one-way smoke positions", "Practice in Deathmatch daily", "Communicate enemy positions clearly"],
  },
};

function findGame(query: string): GameData | null {
  const lower = query.toLowerCase();
  for (const [key, data] of Object.entries(games)) {
    if (lower.includes(key)) return data;
  }
  return null;
}

export default function GamingPage() {
  const [query, setQuery] = useState("");
  const [game, setGame] = useState<GameData | null>(null);

  const handleSearch = () => {
    if (!query.trim()) return;
    setGame(findGame(query));
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading text-2xl font-bold text-foreground mb-1">Gaming Assistance</h1>
        <p className="text-sm text-muted-foreground mb-4">Search for a game to get strategies, loadouts, and tips.</p>
      </motion.div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search a game... e.g. 'Call of Duty', 'PUBG', 'Fortnite'"
            className="w-full h-12 rounded-xl bg-muted border border-border pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <Button onClick={handleSearch} variant="hero" size="lg">Search</Button>
      </div>

      {/* Quick picks */}
      {!game && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.values(games).map((g, i) => (
            <motion.button
              key={g.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => setGame(g)}
              className="glass-panel rounded-xl p-6 text-center hover-glow transition-all duration-300"
            >
              <h3 className="font-heading font-semibold text-foreground">{g.name}</h3>
            </motion.button>
          ))}
        </div>
      )}

      {game && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-xl font-bold text-foreground">{game.name}</h2>
            <Button variant="ghost" size="sm" onClick={() => setGame(null)}>← Back</Button>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="glass-panel rounded-xl p-6 hover-glow">
              <div className="flex items-center gap-2 mb-4">
                <Crosshair className="h-5 w-5 text-primary" />
                <h3 className="font-heading font-semibold text-foreground">Best Loadouts</h3>
              </div>
              <div className="space-y-2">
                {game.loadouts.map((l, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50 border border-border text-sm text-foreground">
                    <Shield className="h-4 w-4 text-primary shrink-0" />
                    {l}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-panel rounded-xl p-6 hover-glow">
              <div className="flex items-center gap-2 mb-4">
                <Swords className="h-5 w-5 text-neon-purple" />
                <h3 className="font-heading font-semibold text-foreground">Strategies</h3>
              </div>
              <div className="space-y-2">
                {game.strategies.map((s, i) => (
                  <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-muted/50 border border-border text-sm text-foreground">
                    <Target className="h-4 w-4 text-neon-purple shrink-0 mt-0.5" />
                    {s}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-panel rounded-xl p-6 hover-glow">
              <div className="flex items-center gap-2 mb-4">
                <Target className="h-5 w-5 text-primary" />
                <h3 className="font-heading font-semibold text-foreground">Pro Tips</h3>
              </div>
              <div className="space-y-2">
                {game.tips.map((t, i) => (
                  <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-muted/50 border border-border text-sm text-foreground">
                    <span className="text-primary font-bold text-xs mt-0.5">{i + 1}.</span>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}
