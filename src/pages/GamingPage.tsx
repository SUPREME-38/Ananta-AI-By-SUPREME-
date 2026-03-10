import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Gamepad2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import anantaLogo from "@/assets/ananta-logo-new.png";
import { loadChatHistory, saveChatMessages } from "@/lib/chat-history";

interface Message { role: "user" | "assistant"; content: string; }

const WELCOME = "🎮 Welcome to **ANANTA Gaming Assistant**!\n\nI can help you with:\n🔹 Game strategies by playstyle (Aggressive, Supportive, Long-range)\n🔹 Best gun loadouts & attachments\n🔹 Rank-up guides & pro tips\n🔹 Hardware optimization\n\nGames: **COD, PUBG, Valorant, Fortnite, Apex Legends, Free Fire, BGMI**\n\nWhat game do you need help with?";

function getGamingResponse(msg: string): string {
  const lower = msg.toLowerCase();

  // ─── PLAYSTYLE DETECTION ───
  const isAggressive = lower.includes("aggressive") || lower.includes("rush") || lower.includes("aggro") || lower.includes("push");
  const isSupport = lower.includes("support") || lower.includes("team") || lower.includes("heal") || lower.includes("anchor");
  const isLongRange = lower.includes("long range") || lower.includes("sniper") || lower.includes("camp") || lower.includes("distance") || lower.includes("scope");

  // ─── COD / WARZONE ───
  if (lower.includes("call of duty") || lower.includes("cod") || lower.includes("warzone")) {
    if (isAggressive) {
      return `🎮🔥 **COD — Aggressive Player Guide**\n\n🔫 **Best Guns:**\n• **MCW** — Fast ADS, great hipfire\n• **Striker SMG** — Run-and-gun king\n• **Rival-9** — Fastest TTK close range\n• **WSP Swarm** — Pocket laser\n\n🔧 **Attachments (MCW):**\n• Muzzle: Shadowstrike Suppressor\n• Barrel: 16.5" Shorten Barrel (mobility)\n• Underbarrel: DR-6 Handstop\n• Magazine: 40 Round Mag\n• Rear Grip: RB Talon Grip\n\n⚔️ **Aggressive Tips:**\n1. Pre-aim corners while sprinting\n2. Use Tac Sprint to close gaps fast\n3. Slide-cancel into gunfights\n4. Use Dead Silence frequently\n5. Rush spawns after kills\n6. Always flank — never take obvious routes\n7. Use stun grenades before entering rooms\n8. Keep moving — stationary = dead\n\n🏆 **Perks:** Double Time + Scavenger + Fast Hands + Quick Fix`;
    }
    if (isSupport) {
      return `🎮🛡️ **COD — Support Player Guide**\n\n🔫 **Best Guns:**\n• **Holger 556** — LMG accuracy, suppressive fire\n• **DG-58 LSW** — Long-range support\n• **Pulemyot 762** — Area denial\n• **MTZ Interceptor** — Marksman support\n\n🔧 **Attachments (Holger 556):**\n• Muzzle: VT-7 Spiritfire Suppressor\n• Barrel: Princeps Long Barrel\n• Optic: Corio Eagleseye 2.5x\n• Underbarrel: Bruen Heavy Support Grip\n• Magazine: 100 Round Drum\n\n⚔️ **Support Tips:**\n1. Hold angles and cover teammates\n2. Use Trophy System to protect objectives\n3. Call UAVs and Counter-UAVs\n4. Provide covering fire during pushes\n5. Watch flanks for your team\n6. Use smoke grenades for revives\n7. Ping enemy positions constantly\n8. Stay behind aggressive players\n\n🏆 **Perks:** Bomb Squad + Resupply + Spotter + Overclock`;
    }
    if (isLongRange) {
      return `🎮🎯 **COD — Long Range Player Guide**\n\n🔫 **Best Guns:**\n• **KATT-AMR** — One-shot sniper\n• **Longbow** — Fast rechamber\n• **MCW 6.8** — Long-range AR\n• **MTZ-762** — Battle rifle, 2-shot kill\n\n🔧 **Attachments (KATT-AMR):**\n• Muzzle: Sonic Suppressor XL\n• Barrel: Perdition 24" Long Barrel\n• Optic: SZ Lonewolf Optic\n• Stock: FSS OV-R Stock\n• Rear Grip: Crux Grip V2\n\n⚔️ **Sniper Tips:**\n1. Hold power positions with sightlines\n2. Relocate after 2-3 kills\n3. Use claymores to protect your back\n4. Quick-scope at medium range\n5. Pre-aim common headglitch spots\n6. Use Heartbeat Sensor for awareness\n7. Play elevated positions\n8. Pair with SMG secondary for CQB\n\n🏆 **Perks:** Ghost + Overkill + Focus + Stalker Boots`;
    }
    return `🎮 **Call of Duty — Complete Guide**\n\n🔫 **Best Loadouts by Style:**\n\n🔥 **Aggressive:** MCW + Striker SMG\n🛡️ **Support:** Holger 556 + Trophy System\n🎯 **Long Range:** KATT-AMR + MTZ-762\n\n⚔️ **General Pro Tips:**\n• Map knowledge wins 70% of gunfights\n• Learn spawn logic\n• Pre-aim common angles\n• Use minimap constantly\n• Control high ground\n\n💡 Ask me about a specific playstyle:\n• *"COD aggressive tips"*\n• *"COD support loadout"*\n• *"COD sniper guide"*`;
  }

  // ─── PUBG / BGMI ───
  if (lower.includes("pubg") || lower.includes("bgmi") || lower.includes("battlegrounds")) {
    if (isAggressive) {
      return `🎮🔥 **PUBG/BGMI — Aggressive Player Guide**\n\n🔫 **Best Guns:**\n• **M416** — Best all-rounder, easy recoil\n• **Beryl M762** — Highest DPS AR\n• **Groza** — CQB monster (airdrop)\n• **UZI/MP5K** — Room clearing kings\n• **DP-28** — Spray machine\n\n🔧 **M416 Attachments:**\n• Muzzle: Compensator\n• Grip: Half Grip (recoil + recovery)\n• Magazine: Extended QuickDraw\n• Stock: Tactical Stock\n• Scope: Red Dot / 3x\n\n🔧 **Beryl M762 Attachments:**\n• Muzzle: Compensator (must have)\n• Grip: Vertical Grip\n• Magazine: Extended QuickDraw\n• Scope: Red Dot / 2x\n\n⚔️ **Aggressive Tips:**\n1. Hot drop every game to improve\n2. Always carry 5+ grenades\n3. Peek and pre-fire\n4. Use vehicles for aggressive rotations\n5. Jiggle peek to bait shots\n6. Close distance fast with smokes\n7. Master the Beryl spray at 50m\n8. Always have level 3 helmet if possible\n9. Push immediately after knocking one\n10. Use molotovs to flush campers`;
    }
    if (isSupport) {
      return `🎮🛡️ **PUBG/BGMI — Support Player Guide**\n\n🔫 **Best Guns:**\n• **M416** — Versatile, all ranges\n• **Mini 14** — Long-range spammer\n• **SKS** — High damage DMR\n• **M249** — Suppressive fire (airdrop)\n• **SLR** — 2-shot level 2 vest\n\n🔧 **Support Attachments (M416):**\n• Muzzle: Suppressor (stealth support)\n• Grip: Vertical Grip (stability)\n• Magazine: Extended QuickDraw\n• Scope: 6x (adjustable to 3x)\n\n⚔️ **Support Tips:**\n1. Always carry first aid + med kits\n2. Share ammo and attachments with team\n3. Use DMR to cover pushing teammates\n4. Smoke teammates for revives\n5. Drive vehicles for team rotations\n6. Mark enemy positions on map\n7. Hold compound while team loots\n8. Carry pan for back protection\n9. Use suppressors to stay hidden\n10. Be the last to push, first to cover`;
    }
    if (isLongRange) {
      return `🎮🎯 **PUBG/BGMI — Long Range Player Guide**\n\n🔫 **Best Guns:**\n• **AWM** — One-shot any helmet (airdrop)\n• **M24** — One-shot level 2 helmet\n• **Kar98k** — Classic bolt-action\n• **Mini 14** — Spam at 200m+\n• **SLR** — Heavy DMR\n\n🔧 **Kar98k Attachments:**\n• Muzzle: Suppressor\n• Scope: 8x (preferred) or 6x\n• Cheek Pad: Bullet Loop\n\n🔧 **Mini 14 Attachments:**\n• Muzzle: Compensator\n• Magazine: Extended QuickDraw\n• Scope: 6x\n\n⚔️ **Sniper Tips:**\n1. Lead your shots (bullet travel time)\n2. Calculate bullet drop at 300m+\n3. Hold hills and ridgelines\n4. Shoot, relocate, shoot again\n5. Use rocks as natural cover\n6. Zero your scope (Page Up/Down)\n7. Carry 8x + 4x for flexibility\n8. Pair sniper with M416 for close range\n9. Always aim for headshots\n10. Use ghillie suit when available`;
    }
    return `🎮 **PUBG/BGMI — Complete Guide**\n\n🔫 **Best Loadouts by Style:**\n\n🔥 **Aggressive:** Beryl M762 + UZI\n🛡️ **Support:** M416 + Mini 14\n🎯 **Long Range:** Kar98k + M416\n\n⚔️ **General Tips:**\n• Land safe for rank, hot for practice\n• Always carry smokes (3+)\n• Use vehicles for rotations\n• Play zone edges in late game\n• Master spray transfer\n\n💡 Ask: *"PUBG aggressive"*, *"PUBG sniper"*, *"PUBG support"*`;
  }

  // ─── VALORANT ───
  if (lower.includes("valorant")) {
    if (isAggressive) {
      return `🎮🔥 **Valorant — Aggressive Player Guide**\n\n🎯 **Best Agents:** Jett, Reyna, Raze, Neon, Yoru\n\n🔫 **Best Guns:**\n• **Vandal** — One-tap headshots at any range\n• **Spectre** — Eco rush weapon\n• **Judge** — Close-range shotgun rush\n• **Stinger** — Ultra-cheap rush buy\n\n⚔️ **Aggressive Tips:**\n1. Entry frag — be the first in\n2. Use Jett dash to take space\n3. Wide swing common angles\n4. Trade kills with teammates\n5. Use Reyna dismiss to escape\n6. Flash before entering sites\n7. Dry peek off-angles\n8. Play for opening picks\n9. Shoulder peek for info\n10. Never repeat the same play twice\n\n🎯 **Aim Tips:**\n• Crosshair ALWAYS at head level\n• Pre-aim common angles\n• Counter-strafe before shooting\n• Practice in Deathmatch 30min daily`;
    }
    if (isSupport) {
      return `🎮🛡️ **Valorant — Support Player Guide**\n\n🎯 **Best Agents:** Sage, Killjoy, Cypher, Omen, Astra\n\n🔫 **Best Guns:**\n• **Phantom** — No tracers, spray-friendly\n• **Guardian** — Budget marksman\n• **Ares** — Wall-bang spammer\n\n⚔️ **Support Tips:**\n1. Play for trades, not entries\n2. Use util to slow pushes\n3. Sage wall to block choke points\n4. Place Killjoy turret for info\n5. Smoke for teammates' pushes\n6. Play retake — don't overextend\n7. Heal/revive teammates with Sage\n8. Use Cypher cam for intel\n9. Anchor sites with utility\n10. Call enemy positions for team\n\n🧠 **Game Sense:**\n• Watch minimap constantly\n• Track enemy utility usage\n• Economy management is key\n• Know when to save vs force buy`;
    }
    if (isLongRange) {
      return `🎮🎯 **Valorant — Long Range Player Guide**\n\n🎯 **Best Agents:** Chamber, Jett (Op), Sova, Fade\n\n🔫 **Best Guns:**\n• **Operator** — One-shot body kill\n• **Marshal** — Budget sniper\n• **Guardian** — Semi-auto precision\n• **Vandal** — Long-range one-tap potential\n\n⚔️ **Sniper Tips:**\n1. Hold long angles with Operator\n2. Reposition after every kill\n3. Use Chamber teleport for escape\n4. Jett dash away after Op shot\n5. Off-angle with Marshal eco rounds\n6. Use Sova recon for pre-aim\n7. Never re-peek the same angle\n8. Play elevated positions\n9. Double zoom for ultra-long range\n10. Pair Op with Classic secondary\n\n💡 **Economy:** Op costs 4700 — save when needed`;
    }
    return `🎮 **Valorant — Complete Guide**\n\n🔫 **Loadouts by Style:**\n🔥 **Aggressive:** Jett/Reyna + Vandal\n🛡️ **Support:** Sage/Killjoy + Phantom\n🎯 **Long Range:** Chamber + Operator\n\n⚔️ **General Tips:**\n• Crosshair placement is everything\n• Learn 2-3 agents deeply\n• Economy wins games\n• Communicate constantly\n\n💡 Ask: *"Valorant aggressive"*, *"Valorant support"*, *"Valorant sniper"*`;
  }

  // ─── FORTNITE ───
  if (lower.includes("fortnite")) {
    if (isAggressive) {
      return `🎮🔥 **Fortnite — Aggressive Player Guide**\n\n🏗️ **Build Fights:**\n• Master 90s for height\n• Ramp-wall-floor rush\n• Edit plays: window edits, floor edits\n• Triple edit for instant kills\n\n🔫 **Best Loadout:**\n• AR + Pump Shotgun + SMG + Minis + Medkit\n\n⚔️ **Aggressive Tips:**\n1. W-key every fight\n2. Box fight — master piece control\n3. High ground = advantage\n4. Edit pump, reset wall, repeat\n5. Use shockwaves to engage\n6. Always carry movement items\n7. Rush builds, don't wait\n8. Aim for headshots with pump\n9. Practice in Creative daily\n10. Don't over-build — edit and shoot`;
    }
    if (isSupport) {
      return `🎮🛡️ **Fortnite — Support Player Guide**\n\n🔫 **Best Loadout:**\n• AR + Shotgun + Heals + Heals + Utility\n\n⚔️ **Support Tips:**\n1. Carry extra heals for teammates\n2. Build cover for downed teammates\n3. Use reboot cards immediately\n4. Share shield potions\n5. Watch for third parties\n6. Call out enemy positions\n7. Revive in boxes with edits\n8. Carry utility: launch pads, campfires\n9. Play for late game, not early kills\n10. Focus on zone management`;
    }
    return `🎮 **Fortnite — Complete Guide**\n\n🏗️ **Building:** 90s, box fights, edit plays\n🔫 **Meta:** AR + Pump + SMG + Heals\n\n⚔️ **By Playstyle:**\n🔥 **Aggressive:** W-key, build fights\n🛡️ **Support:** Heals, revives, callouts\n🎯 **Long Range:** AR spray, sniper picks\n\n💡 Ask: *"Fortnite aggressive"*, *"Fortnite support"*`;
  }

  // ─── APEX LEGENDS ───
  if (lower.includes("apex")) {
    if (isAggressive) {
      return `🎮🔥 **Apex — Aggressive Player Guide**\n\n🎯 **Best Legends:** Octane, Wraith, Pathfinder, Horizon, Ash\n\n🔫 **Best Guns:**\n• **R-99** — Fastest TTK SMG\n• **Wingman** — High skill, high reward\n• **Peacekeeper** — Devastating shotgun\n• **R-301** — Best overall AR\n• **Volt** — Consistent SMG\n\n⚔️ **Aggressive Tips:**\n1. Use Octane pad to push fast\n2. Wraith phase for safe re-peeks\n3. Armor swap immediately after kills\n4. Push after cracking shields\n5. Use movement abilities mid-fight\n6. Hipfire R-99 in close range\n7. Always carry batteries\n8. Third-party fights for easy kills\n9. Master slide-jumping\n10. Wall-bounce for unpredictability`;
    }
    if (isSupport) {
      return `🎮🛡️ **Apex — Support Player Guide**\n\n🎯 **Best Legends:** Lifeline, Gibraltar, Newcastle, Loba, Catalyst\n\n🔫 **Best Guns:**\n• **R-301** — Reliable at all ranges\n• **Flatline** — High damage AR\n• **Havoc** — Turbocharger = beast\n\n⚔️ **Support Tips:**\n1. Lifeline drone heals save meds\n2. Gibraltar dome for safe revives\n3. Newcastle shield for mobile cover\n4. Loba ult for team loot\n5. Carry extra syringes and batts\n6. Ping everything for team\n7. Hold positions while team pushes\n8. Cover fire with R-301\n9. Use defensive abilities in end circle\n10. Be the last alive — you're the anchor`;
    }
    return `🎮 **Apex Legends — Complete Guide**\n\n🔫 **By Playstyle:**\n🔥 **Aggressive:** Octane/Wraith + R-99/PK\n🛡️ **Support:** Lifeline/Gibraltar + R-301\n🎯 **Long Range:** Pathfinder + Triple Take/Charge Rifle\n\n💡 Ask: *"Apex aggressive"*, *"Apex support"*`;
  }

  // ─── FREE FIRE ───
  if (lower.includes("free fire") || lower.includes("freefire") || lower.includes("ff")) {
    return `🎮 **Free Fire — Complete Guide**\n\n🔫 **Best Guns by Style:**\n\n🔥 **Aggressive:**\n• MP40 — Best SMG, fastest fire rate\n• M1887 — One-shot shotgun\n• UMP — Accurate SMG\n\n🛡️ **Support:**\n• AK — High damage at range\n• M4A1 — Stable, team-friendly\n• FAMAS — Burst damage\n\n🎯 **Long Range:**\n• AWM — One-shot sniper\n• Kar98k — Headshot machine\n• SVD — Semi-auto spam\n\n⚔️ **Pro Tips:**\n1. Use gloo walls for cover\n2. One-tap with M1887 + dash\n3. Drag headshots with crosshair\n4. Use characters with rush abilities\n5. Master prone-peek trick\n6. Auto pickup settings = faster loot\n\n💡 Ask about specific playstyle for more tips!`;
  }

  // ─── PLAYSTYLE GENERAL ───
  if (isAggressive && !lower.includes("cod") && !lower.includes("pubg") && !lower.includes("valorant") && !lower.includes("fortnite") && !lower.includes("apex")) {
    return `🔥 **General Aggressive Player Tips:**\n\n1. Always be the first to engage\n2. Master close-range weapons\n3. Use movement to your advantage\n4. Pre-aim corners and quick-peek\n5. Trade kills with teammates\n6. Push immediately after a knock\n7. Carry grenades/utility for flushing\n8. Flank enemies, avoid obvious routes\n9. Practice aim training daily\n10. Stay unpredictable — vary your approach\n\n💡 Tell me a specific game for detailed loadouts!`;
  }
  if (isSupport) {
    return `🛡️ **General Support Player Tips:**\n\n1. Stay behind your aggressive players\n2. Provide covering fire and callouts\n3. Carry extra healing items for team\n4. Use defensive utilities effectively\n5. Anchor sites and hold positions\n6. Revive and heal teammates ASAP\n7. Track enemy positions and callout\n8. Manage economy/resources for team\n9. Use smokes/walls for safe revives\n10. Be the last alive — clutch factor\n\n💡 Tell me a specific game for detailed tips!`;
  }
  if (isLongRange) {
    return `🎯 **General Long Range Player Tips:**\n\n1. Hold elevated positions with sightlines\n2. Relocate after 2-3 kills\n3. Lead targets and account for bullet drop\n4. Pair sniper with close-range secondary\n5. Use cover between shots\n6. Protect your back with traps/mines\n7. Pre-aim popular crossing points\n8. Zero/adjust scope for distance\n9. Patience — wait for the right shot\n10. Master quick-scoping for medium range\n\n💡 Tell me a specific game for detailed loadouts!`;
  }

  // ─── TIPS ───
  if (lower.includes("tip") || lower.includes("trick") || lower.includes("improve") || lower.includes("get better")) {
    return `💡 **Universal Gaming Tips & Tricks:**\n\n🎯 **Aim:**\n1. Lower sensitivity = better precision\n2. Practice aim trainers (Aim Lab, Kovaak's)\n3. Crosshair at head level always\n4. Pre-aim common positions\n5. Counter-strafe before shooting\n\n🧠 **Game Sense:**\n6. Watch pro players and learn rotations\n7. Minimap awareness every 3 seconds\n8. Learn spawn logic and timings\n9. Communicate with your team\n10. Review your deaths — learn from mistakes\n\n⚙️ **Settings:**\n11. Low graphics = higher FPS = smoother\n12. Use wired connection over WiFi\n13. Gaming mouse with <5ms response\n14. 144Hz monitor if possible\n15. Optimize keybinds for comfort\n\n💡 Want tips for a specific game or playstyle?`;
  }

  // ─── GREETINGS ───
  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) return `👋 Hey gamer! I'm your **Gaming Assistant**!\n\n🎯 I can help with:\n🔫 Gun loadouts & attachments\n⚔️ Playstyle guides (Aggressive, Support, Sniper)\n💡 Pro tips & tricks\n🏆 Rank-up strategies\n\nGames: **COD, PUBG/BGMI, Valorant, Fortnite, Apex, Free Fire**\n\nTry: *"COD aggressive loadout"* or *"PUBG sniper tips"*`;

  return `🎮 I'm your **Gaming Assistant**! Ask about:\n\n🔥 **COD** — Loadouts, attachments, playstyle guides\n🔥 **PUBG/BGMI** — Weapons, drops, strategies\n🔥 **Valorant** — Agents, guns, aim tips\n🔥 **Fortnite** — Building, edits, meta\n🔥 **Apex** — Legends, weapons, movement\n🔥 **Free Fire** — Characters, guns, tricks\n\n💡 **Playstyles:** Add "aggressive", "support", or "sniper" to any game!\nExample: *"PUBG aggressive tips"* or *"Valorant support guide"*`;
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
