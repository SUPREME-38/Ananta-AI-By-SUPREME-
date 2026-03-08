import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Gamepad2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  role: "user" | "assistant";
  content: string;
}

function getGamingResponse(msg: string): string {
  const lower = msg.toLowerCase();

  if (lower.includes("call of duty") || lower.includes("cod") || lower.includes("warzone")) {
    return `🎮 **Call of Duty — Complete Guide**

🔫 **Best Loadouts:**
• M4A1 + Ghost + Cold Blooded — *Best stealth class*
• MP5 + Overkill + Amped — *Aggressive rushdown*
• AX-50 + Double Time + Tracker — *Sniper class*

⚔️ **Top Strategies:**
• Control high ground positions in every engagement
• Use tactical equipment (heartbeat, stun) to gather intel
• Rotate with the circle early in Warzone
• Pre-aim common angles and head glitches

💡 **Pro Tips:**
1. Practice recoil control in firing range daily
2. Learn spawn patterns on each map
3. Use quality headphones — sound cues win gunfights
4. Play with a consistent squad for callouts
5. Watch kill cams to learn enemy positions

🏆 **Current Meta:** AR + SMG combo with Ghost perk. Want loadout details for a specific mode (Ranked, Warzone, Search)?`;
  }

  if (lower.includes("pubg")) {
    return `🎮 **PUBG — Complete Guide**

🔫 **Best Loadouts:**
• M416 + 6x Scope + Vertical Grip — *Best all-rounder*
• AWM + 8x + Cheek Pad — *One-shot sniper king*
• Beryl M762 + Red Dot + Compensator — *Close-range beast*

⚔️ **Top Strategies:**
• Drop in less contested areas for safe looting
• Use vehicles for rotations in open maps (Erangel, Miramar)
• Hold compound positions in final circles
• Third-party fights when possible — let others weaken each other

💡 **Pro Tips:**
1. Practice spray transfer between targets in training
2. Always carry 2-3 smoke grenades for revives
3. Use lean peek advantage (right peek is stronger)
4. Manage inventory — drop unnecessary attachments
5. Play zone edges, not zone center

🏆 **Hot Drop Spots:** Pochinki, School, Military Base, Bootcamp. Want tips for a specific map?`;
  }

  if (lower.includes("fortnite")) {
    return `🎮 **Fortnite — Complete Guide**

🔫 **Best Loadouts:**
• AR + Shotgun + SMG + Heals + Utility — *Standard competitive*
• Sniper + AR + Shotgun + Meds + Mobility — *Hybrid aggression*
• Shotgun + AR + Rocket + Heals + Shield — *Endgame pressure*

⚔️ **Top Strategies:**
• Build high ground in every fight — it's the #1 advantage
• Box fight when low on materials — conserve and trade
• Use editing for quick peeks and surprise angles
• Storm surge management is crucial in competitive

💡 **Pro Tips:**
1. Practice 90s and tunneling in Creative daily
2. Edit course training dramatically improves speed
3. Learn piece control — floor, wall, cone combos
4. Watch pros like Bugha, Mongraal for positioning
5. Master the "right-hand peek" building technique

🏆 **Current Meta:** Shotgun-SMG close range with strong builds. Want tips for Zero Build or Competitive?`;
  }

  if (lower.includes("valorant")) {
    return `🎮 **Valorant — Complete Guide**

🔫 **Best Loadouts:**
• Phantom + Classic (eco) — *Versatile, no tracers*
• Vandal + Ghost (bonus round) — *One-tap potential*
• Operator + Sheriff (AWP role) — *Long-range dominance*

⚔️ **Top Strategies:**
• Default setups before committing to a site
• Trade kills with teammates — never peek alone
• Use utility to clear common angles before peeking
• Play post-plant positions — crossfire setups win rounds

💡 **Pro Tips:**
1. Crosshair placement at HEAD LEVEL — always
2. Learn one-way smoke positions for each map
3. Practice in Deathmatch daily (aim training)
4. Communicate enemy positions clearly and concisely
5. Learn 2-3 agents deeply rather than all of them

🏆 **Agent Tier List:** Jett, Omen, Sova, Killjoy top picks. Want agent-specific tips?`;
  }

  if (lower.includes("apex") || lower.includes("apex legends")) {
    return `🎮 **Apex Legends — Complete Guide**

🔫 **Best Loadouts:**
• R-301 + Peacekeeper — *Reliable at all ranges*
• Wingman + R-99 — *High skill ceiling, high reward*
• Flatline + Mastiff — *Aggressive push setup*

⚔️ **Top Strategies:**
• Always rotate as a team — solo pushes get punished
• Use high ground and natural cover in fights
• Third-party intelligently — listen for nearby gunfights
• Loot fast, rotate early, position for endgame

💡 **Pro Tips:**
1. Master movement — slide jumps, wall bounces, zip-line tricks
2. Ping system is your best friend for communication
3. Learn to armor swap mid-fight from deathboxes
4. Pick legends that complement your squad
5. Practice in firing range with movement drills

🏆 **Legend Picks:** Wraith, Pathfinder, Bangalore, Bloodhound. Want tips for a specific legend?`;
  }

  if (lower.includes("minecraft")) {
    return `🎮 **Minecraft — Complete Guide**

🏗️ **Survival Essentials:**
• First day: Punch trees → craft table → wooden tools → shelter
• Mine at Y=-59 for diamonds (deepslate level)
• Always carry: Pickaxe, sword, food, torches, water bucket

⚔️ **Combat Tips:**
• Shield + axe combo for PvE efficiency
• Strafe and jump-hit for critical damage in PvP
• Use beds to fight the Ender Dragon

💡 **Pro Tips:**
1. Water bucket MLG saves you from any fall
2. Build iron farm early for unlimited iron
3. Villager trading is the fastest way to get enchanted gear
4. Use coordinates (F3) to never get lost
5. Nether highways for fast travel (1:8 ratio)

🏆 Want tips for Survival, Creative, PvP, or Redstone?`;
  }

  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
    return `👋 Hey gamer! I'm your **Gaming Assistant**! I can help with:

🎯 **Game Strategies** — Winning tactics for any game
🔫 **Best Loadouts** — Optimized weapon & perk setups
💡 **Pro Tips** — Level up your gameplay fast
🏆 **Meta Analysis** — Current competitive meta breakdowns

Try asking: *"PUBG strategies"*, *"Valorant tips"*, or *"Best Fortnite loadout"*

**Games I cover:** COD, PUBG, Fortnite, Valorant, Apex Legends, Minecraft & more!`;
  }

  if (lower.includes("tips") || lower.includes("improve") || lower.includes("better")) {
    return `🎯 **Universal Gaming Tips to Improve Fast:**

1. **Warm Up** — Spend 10-15 min in aim trainers before ranked
2. **Review Deaths** — Watch kill cams, understand what went wrong
3. **Consistent Sensitivity** — Pick one and stick with it
4. **Crosshair Placement** — Pre-aim where enemies will be
5. **Map Knowledge** — Learn callouts, timings, and angles
6. **Communication** — Give clear, concise info to teammates
7. **Mental Game** — Take breaks after losses, avoid tilt
8. **Record & Review** — Watch your own gameplay for mistakes

💡 Which game do you want specific improvement tips for?`;
  }

  return `🎮 I'm your **Gaming Assistant**! Ask me about any game:

🔥 **Popular Games I Cover:**
• **Call of Duty** — Loadouts, strategies, Warzone tips
• **PUBG** — Drop spots, weapon guides, rotation tactics  
• **Fortnite** — Building tips, loadouts, competitive strats
• **Valorant** — Agent guides, aim tips, map strategies
• **Apex Legends** — Legend picks, movement guides, ranked tips
• **Minecraft** — Survival, redstone, PvP, speedrun tips

Just type a game name or ask a question!`;
}

export default function GamingPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "🎮 Welcome to **Gaming Assistant**! I'm your personal gaming coach. Ask me about any game for strategies, loadouts, and pro tips.\n\nTry: *\"Call of Duty loadouts\"*, *\"PUBG tips\"*, or *\"How to improve at Valorant\"*" },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input };
    const aiMsg: Message = { role: "assistant", content: getGamingResponse(input) };
    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-7rem)]">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
        <div className="flex items-center gap-3">
          <motion.div
            className="h-10 w-10 rounded-xl bg-gradient-to-br from-destructive/80 to-secondary flex items-center justify-center"
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 5 }}
          >
            <Gamepad2 className="h-5 w-5 text-primary-foreground" />
          </motion.div>
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">Gaming Assistant</h1>
            <p className="text-xs text-muted-foreground">AI-powered strategies, loadouts & pro tips</p>
          </div>
          <motion.div
            className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-panel"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-xs text-muted-foreground">Online</span>
          </motion.div>
        </div>
      </motion.div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4 scrollbar-thin">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
            >
              {msg.role === "assistant" && (
                <motion.div
                  className="h-8 w-8 rounded-xl bg-gradient-to-br from-destructive/20 to-secondary/20 flex items-center justify-center shrink-0 mt-1 border border-secondary/20"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Gamepad2 className="h-4 w-4 text-secondary" />
                </motion.div>
              )}
              <div className={`max-w-[75%] rounded-2xl px-5 py-4 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-gradient-to-br from-secondary to-primary text-primary-foreground shadow-lg shadow-secondary/20"
                  : "glass-panel text-foreground border border-border/50"
              }`}>
                <div className="whitespace-pre-line">{msg.content}</div>
              </div>
              {msg.role === "user" && (
                <motion.div
                  className="h-8 w-8 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center shrink-0 mt-1 border border-secondary/20"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                >
                  <User className="h-4 w-4 text-secondary" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-3"
      >
        <div className="relative flex-1">
          <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask about any game... e.g. 'PUBG strategies'"
            className="w-full h-12 rounded-xl bg-muted border border-border pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/50 transition-all duration-300"
          />
        </div>
        <Button onClick={sendMessage} variant="hero" size="icon" className="h-12 w-12 rounded-xl">
          <Send className="h-5 w-5" />
        </Button>
      </motion.div>
    </div>
  );
}
