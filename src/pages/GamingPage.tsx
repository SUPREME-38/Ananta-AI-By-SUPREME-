import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Gamepad2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import anantaLogo from "@/assets/ananta-logo-new.png";
import { loadChatHistory, saveChatMessages } from "@/lib/chat-history";

interface Message { role: "user" | "assistant"; content: string; }

const WELCOME = "🎮 Welcome to **ANANTA Gaming Assistant**!\n\nI can help you with:\n🔹 Game strategies & tips\n🔹 Loadout recommendations\n🔹 Rank-up guides\n🔹 Hardware optimization\n\nWhat game do you need help with?";

function getGamingResponse(msg: string): string {
  const lower = msg.toLowerCase();
  if (lower.includes("call of duty") || lower.includes("cod") || lower.includes("warzone")) return `🎮 **Call of Duty — Complete Guide**\n\n🔫 **Best Loadouts:**\n• M4A1 + Ghost + Cold Blooded — *Stealth class*\n• MP5 + Overkill + Amped — *Aggressive rush*\n• AX-50 + Double Time — *Sniper class*\n\n⚔️ **Strategies:**\n• Control high ground\n• Use heartbeat sensor\n• Rotate early in Warzone\n• Pre-aim common angles\n\n💡 Want loadout details for Ranked, Warzone, or Search?`;
  if (lower.includes("pubg")) return `🎮 **PUBG — Complete Guide**\n\n🔫 **Best Loadouts:**\n• M416 + 6x + Vertical Grip — *Best all-rounder*\n• AWM + 8x + Cheek Pad — *One-shot king*\n• Beryl M762 + Red Dot — *Close-range beast*\n\n⚔️ **Strategies:**\n• Drop safe for rank push\n• Use vehicles for rotations\n• Carry 2-3 smokes always\n• Play zone edges\n\n💡 Want tips for a specific map?`;
  if (lower.includes("valorant")) return `🎮 **Valorant — Complete Guide**\n\n🔫 **Best Loadouts:**\n• Phantom + Classic — *Versatile, no tracers*\n• Vandal + Ghost — *One-tap potential*\n• Operator + Sheriff — *Long-range dominance*\n\n💡 **Pro Tips:**\n1. Crosshair at HEAD LEVEL always\n2. Learn one-way smokes\n3. Practice in Deathmatch daily\n4. Master 2-3 agents deeply\n\n🏆 Agent picks: Jett, Omen, Sova, Killjoy`;
  if (lower.includes("fortnite")) return `🎮 **Fortnite — Complete Guide**\n\n🏗️ **Building:**\n• 90s for height advantage\n• Box fighting is essential\n• Edit plays win fights\n\n🔫 **Current Meta:**\n• AR + Shotgun + SMG + Heals\n• High ground wins late game\n• Storm surge management\n\n💡 Practice 90s and editing in Creative daily!`;
  if (lower.includes("hello") || lower.includes("hi")) return `👋 Hey gamer! I'm your **Gaming Assistant**!\n\n🎯 Game Strategies\n🔫 Best Loadouts\n💡 Pro Tips\n🏆 Meta Analysis\n\nGames I cover: COD, PUBG, Fortnite, Valorant, Apex & more!`;
  return `🎮 I'm your **Gaming Assistant**! Ask about:\n\n🔥 **COD** — Loadouts, strategies, Warzone tips\n🔥 **PUBG** — Drop spots, weapons, rotations\n🔥 **Fortnite** — Building, loadouts, competitive\n🔥 **Valorant** — Agent guides, aim, map strategies\n🔥 **Apex** — Legend picks, movement, ranked\n\nJust type a game name!`;
}

export default function GamingPage() {
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", content: WELCOME }]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadChatHistory("gaming").then((h) => { if (h.length > 0) setMessages(h); });
  }, []);

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const u: Message = { role: "user", content: input };
    const a: Message = { role: "assistant", content: getGamingResponse(input) };
    setMessages((p) => [...p, u, a]);
    saveChatMessages("gaming", [u, a]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-7rem)]">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
        <div className="flex items-center gap-3">
          <motion.div className="h-10 w-10 rounded-xl bg-gradient-to-br from-destructive/80 to-secondary flex items-center justify-center" animate={{ rotateY: [0, 360] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 5 }}>
            <Gamepad2 className="h-5 w-5 text-primary-foreground" />
          </motion.div>
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">Gaming Assistant</h1>
            <p className="text-xs text-muted-foreground">AI-powered strategies, loadouts & pro tips</p>
          </div>
          <motion.div className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-panel" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-xs text-muted-foreground">Online</span>
          </motion.div>
        </div>
      </motion.div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4 scrollbar-thin">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 15, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.4 }} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
              {msg.role === "assistant" && (
                <motion.div className="h-8 w-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-1 border border-primary/20 overflow-hidden" whileHover={{ scale: 1.1, rotate: 5 }}>
                  <img src={anantaLogo} alt="" className="h-6 w-6 object-contain" />
                </motion.div>
              )}
              <div className={`max-w-[75%] rounded-2xl px-5 py-4 text-sm leading-relaxed ${msg.role === "user" ? "bg-gradient-to-br from-secondary to-primary text-primary-foreground shadow-lg shadow-secondary/20" : "glass-panel text-foreground border border-border/50"}`}>
                <div className="whitespace-pre-line">{msg.content}</div>
              </div>
              {msg.role === "user" && (
                <motion.div className="h-8 w-8 rounded-xl bg-secondary/20 flex items-center justify-center shrink-0 mt-1 border border-secondary/20" whileHover={{ scale: 1.1, rotate: -5 }}>
                  <User className="h-4 w-4 text-secondary" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3">
        <div className="relative flex-1">
          <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} placeholder="Ask about any game..." className="w-full h-12 rounded-xl bg-muted border border-border pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/50 transition-all duration-300" />
        </div>
        <Button onClick={sendMessage} variant="hero" size="icon" className="h-12 w-12 rounded-xl"><Send className="h-5 w-5" /></Button>
      </motion.div>
    </div>
  );
}
