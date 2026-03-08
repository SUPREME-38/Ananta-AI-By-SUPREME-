import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, ShoppingCart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  role: "user" | "assistant";
  content: string;
}

function getShoppingResponse(msg: string): string {
  const lower = msg.toLowerCase();

  if (lower.includes("mouse") || lower.includes("mice")) {
    return `🖱️ **Top Gaming Mice Recommendations:**

1. **Logitech G Pro X Superlight 2** — $159
   ⭐ 4.8/5 | Ultra lightweight (60g), HERO 2 sensor, 95hr battery
   ✅ Pros: Featherweight, flawless sensor, wireless
   ❌ Cons: Expensive, no Bluetooth

2. **Razer DeathAdder V3** — $89
   ⭐ 4.6/5 | Ergonomic shape, Focus Pro sensor
   ✅ Pros: Comfortable, great sensor, affordable
   ❌ Cons: Wired only, no RGB

3. **Zowie EC2-CW** — $119
   ⭐ 4.5/5 | Wireless, plug & play, 3370 sensor
   ✅ Pros: No software needed, reliable, good shape
   ❌ Cons: Basic design, heavier than competitors

💡 **My Recommendation:** If budget isn't a concern, go with the **G Pro X Superlight 2**. For value, the **DeathAdder V3** is unbeatable. Want me to compare specific models?`;
  }

  if (lower.includes("laptop") || lower.includes("macbook") || lower.includes("computer")) {
    return `💻 **Best Laptops Right Now:**

1. **MacBook Pro M4 16"** — $2,499
   ⭐ 4.9/5 | M4 Pro chip, 18hr battery, Liquid Retina XDR
   ✅ Pros: Incredible performance, stunning display, all-day battery
   ❌ Cons: Expensive, limited ports, macOS only

2. **Framework Laptop 16** — $1,399
   ⭐ 4.4/5 | Modular, upgradeable, right-to-repair champion
   ✅ Pros: Fully modular, user-upgradeable, eco-friendly
   ❌ Cons: Bulkier, smaller accessory ecosystem

3. **ThinkPad X1 Carbon Gen 12** — $1,699
   ⭐ 4.6/5 | Ultra-portable, legendary keyboard, Intel Core Ultra
   ✅ Pros: 1.24kg, best keyboard in class, great for business
   ❌ Cons: Integrated graphics only, premium pricing

💡 **My Pick:** For creative professionals — **MacBook Pro M4**. For tinkerers — **Framework**. For business — **ThinkPad X1**. Need more details on any?`;
  }

  if (lower.includes("phone") || lower.includes("iphone") || lower.includes("samsung") || lower.includes("pixel")) {
    return `📱 **Top Smartphones 2026:**

1. **iPhone 16 Pro Max** — $1,199
   ⭐ 4.8/5 | A18 Pro chip, 48MP camera, titanium design
   ✅ Best camera system, excellent battery, premium build
   ❌ Expensive, USB-C still limited features

2. **Samsung Galaxy S25 Ultra** — $1,299
   ⭐ 4.7/5 | Snapdragon 8 Gen 4, S Pen, 200MP camera
   ✅ Versatile camera, S Pen included, great display
   ❌ Expensive, Samsung bloatware

3. **Google Pixel 9 Pro** — $999
   ⭐ 4.6/5 | Tensor G4, best AI features, clean Android
   ✅ Best computational photography, 7 years updates
   ❌ Average battery, limited availability

💡 Want me to compare prices across retailers?`;
  }

  if (lower.includes("headphone") || lower.includes("earbuds") || lower.includes("audio")) {
    return `🎧 **Best Audio Products:**

1. **Sony WH-1000XM6** — $349
   ⭐ 4.9/5 | Industry-leading ANC, 40hr battery, multipoint
   ✅ Best noise cancellation, incredible sound, comfortable

2. **AirPods Pro 3** — $249
   ⭐ 4.7/5 | H3 chip, adaptive audio, USB-C
   ✅ Seamless Apple integration, great ANC, compact

3. **Sennheiser Momentum 4** — $299
   ⭐ 4.6/5 | Audiophile-grade sound, 60hr battery
   ✅ Superior sound quality, marathon battery life

💡 Need recommendations for a specific use case (gaming, studio, commuting)?`;
  }

  if (lower.includes("compare")) {
    return `📊 I can compare any products for you! Just tell me which items you'd like to compare. For example:
    
• "Compare MacBook Pro vs ThinkPad X1"
• "Compare AirPods Pro vs Sony WH-1000XM6"
• "Compare iPhone 16 vs Galaxy S25"

What would you like me to compare?`;
  }

  if (lower.includes("budget") || lower.includes("cheap") || lower.includes("affordable")) {
    return `💰 **Best Budget-Friendly Tech:**

🖱️ **Mouse:** Logitech G305 — $39 (Wireless, HERO sensor)
💻 **Laptop:** Acer Aspire 5 — $549 (Ryzen 7, 16GB RAM)
📱 **Phone:** Pixel 8a — $499 (Great camera, 7yr updates)
🎧 **Headphones:** Sony WH-CH720N — $99 (ANC, 50hr battery)
⌨️ **Keyboard:** Keychron K2 — $79 (Mechanical, wireless)

💡 Want detailed reviews on any of these?`;
  }

  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
    return `👋 Hello! I'm your **Shopping Assistant**! I can help you with:

🔍 **Product Research** — Find the best products in any category
📊 **Comparisons** — Side-by-side product comparisons
💰 **Budget Picks** — Best value for your money
⭐ **Reviews** — Detailed pros & cons analysis

Try asking: *"Best gaming mouse"*, *"Compare laptops"*, or *"Budget headphones"*`;
  }

  return `🛒 I can help you find the perfect product! Try asking about:

• **Mice** — "Best gaming mouse"
• **Laptops** — "Best laptop for coding"
• **Phones** — "iPhone vs Samsung"
• **Headphones** — "Best noise-cancelling headphones"
• **Budget picks** — "Affordable tech gadgets"
• **Comparisons** — "Compare [product A] vs [product B]"

What are you looking for?`;
}

export default function ShoppingPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "👋 Welcome to **Shopping Assistant**! I'll help you find the best products, compare options, and make smart buying decisions.\n\nTry asking: *\"Best gaming mouse\"*, *\"Compare laptops\"*, or *\"Budget headphones\"*" },
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
    const aiMsg: Message = { role: "assistant", content: getShoppingResponse(input) };
    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-7rem)]">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
        <div className="flex items-center gap-3">
          <motion.div
            className="h-10 w-10 rounded-xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center"
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 5 }}
          >
            <ShoppingCart className="h-5 w-5 text-primary-foreground" />
          </motion.div>
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">Shopping Assistant</h1>
            <p className="text-xs text-muted-foreground">AI-powered product recommendations & comparisons</p>
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
                  className="h-8 w-8 rounded-xl bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center shrink-0 mt-1 border border-primary/20"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <ShoppingCart className="h-4 w-4 text-primary" />
                </motion.div>
              )}
              <div className={`max-w-[75%] rounded-2xl px-5 py-4 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-lg shadow-primary/20"
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
            placeholder="Ask about any product... e.g. 'Best gaming mouse'"
            className="w-full h-12 rounded-xl bg-muted border border-border pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
          />
        </div>
        <Button onClick={sendMessage} variant="hero" size="icon" className="h-12 w-12 rounded-xl">
          <Send className="h-5 w-5" />
        </Button>
      </motion.div>
    </div>
  );
}
