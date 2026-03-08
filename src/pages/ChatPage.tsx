import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import anantaLogo from "@/assets/ananta-logo-new.png";

interface Message {
  role: "user" | "assistant";
  content: string;
}

function getAIResponse(msg: string): string {
  const lower = msg.toLowerCase();
  if (lower.includes("react")) return "⚛️ **React** is a powerful JavaScript library for building user interfaces. It uses a component-based architecture and virtual DOM for efficient rendering.\n\n**Key Concepts:**\n• Components & Props\n• State & Hooks\n• Virtual DOM\n• Context API\n\n💡 I recommend starting with the official docs at **react.dev**!";
  if (lower.includes("python")) return "🐍 **Python** is excellent for beginners and professionals alike!\n\n**Popular Use Cases:**\n• AI/ML — TensorFlow, PyTorch\n• Web Dev — Django, Flask\n• Data Science — Pandas, NumPy\n• Automation — Scripts, bots\n\n💡 Start with Python 3 and learn fundamentals like variables, loops, and functions.";
  if (lower.includes("ai") || lower.includes("machine learning")) return "🤖 **AI & Machine Learning** are transforming every industry!\n\n**Key Areas:**\n• Natural Language Processing (NLP)\n• Computer Vision\n• Reinforcement Learning\n• Generative AI (GPT, Diffusion)\n\n**Getting Started:**\n1. Learn Python basics\n2. Study linear algebra & statistics\n3. Explore TensorFlow or PyTorch\n4. Build projects & experiment\n\n💡 Want a specific learning roadmap?";
  if (lower.includes("business")) return "💼 **Starting a Successful Business:**\n\n1. **Identify** a problem worth solving\n2. **Validate** your idea with potential customers\n3. **Build** an MVP (Minimum Viable Product)\n4. **Find** product-market fit\n5. **Scale** strategically\n\n📊 Key metrics to track: CAC, LTV, MRR, Churn Rate\n\n💡 What specific area interests you — startup, marketing, or funding?";
  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) return "👋 Hello! I'm **ANANTA AI** — your intelligent assistant!\n\nI can help with:\n🔹 Technology & coding questions\n🔹 Business & startup advice\n🔹 Learning recommendations\n🔹 General knowledge\n\nWhat would you like to explore?";
  return "🧠 Great question! Based on my analysis, I'd recommend breaking this down into smaller, manageable steps and tackling each systematically.\n\n**Approach:**\n1. Define the core problem\n2. Research existing solutions\n3. Create a structured plan\n4. Execute iteratively\n\n💡 Would you like me to create a detailed plan for this topic?";
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "👋 I'm **ANANTA AI**, your intelligent assistant. I can help you with technology, coding, business, learning advice, and general knowledge.\n\nWhat would you like to know?" },
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
    const aiMsg: Message = { role: "assistant", content: getAIResponse(input) };
    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-7rem)]">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
        <div className="flex items-center gap-3">
          <motion.div
            className="relative h-10 w-10"
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 5 }}
          >
            <img src={anantaLogo} alt="ANANTA AI" className="h-10 w-10 object-contain drop-shadow-[0_0_12px_hsl(192,100%,50%,0.5)]" />
          </motion.div>
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">Chat Assistant</h1>
            <p className="text-xs text-muted-foreground">Ask about technology, coding, business, or learning</p>
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
                  className="h-8 w-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-1 border border-primary/20 overflow-hidden"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <img src={anantaLogo} alt="" className="h-6 w-6 object-contain" />
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
                  className="h-8 w-8 rounded-xl bg-secondary/20 flex items-center justify-center shrink-0 mt-1 border border-secondary/20"
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
            placeholder="Type your message..."
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
