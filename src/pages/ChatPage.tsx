import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const aiResponses: Record<string, string> = {
  default: "I'm ANANTA AI, your intelligent assistant. I can help you with technology, coding, business, learning advice, and general knowledge. What would you like to know?",
};

function getAIResponse(msg: string): string {
  const lower = msg.toLowerCase();
  if (lower.includes("react")) return "React is a powerful JavaScript library for building user interfaces. It uses a component-based architecture and virtual DOM for efficient rendering. I recommend starting with the official React docs at react.dev!";
  if (lower.includes("python")) return "Python is excellent for beginners and professionals alike. It's widely used in AI/ML, web development (Django/Flask), data science, and automation. Start with Python 3 and learn fundamentals like variables, loops, and functions.";
  if (lower.includes("ai") || lower.includes("machine learning")) return "AI and Machine Learning are transforming every industry. Key areas include: Natural Language Processing, Computer Vision, Reinforcement Learning, and Generative AI. Start with Python, learn linear algebra basics, then explore frameworks like TensorFlow or PyTorch.";
  if (lower.includes("business")) return "Starting a successful business requires: 1) Identifying a problem worth solving, 2) Validating your idea with potential customers, 3) Building an MVP, 4) Finding product-market fit, 5) Scaling strategically. What specific area interests you?";
  if (lower.includes("hello") || lower.includes("hi")) return "Hello! I'm ANANTA AI. I can help you with technology questions, coding guidance, business advice, and learning recommendations. What would you like to explore?";
  return "That's a great question! Based on my analysis, I'd recommend breaking this down into smaller steps and tackling each one systematically. Would you like me to create a structured plan for this topic?";
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: aiResponses.default },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input };
    const aiMsg: Message = { role: "assistant", content: getAIResponse(input) };
    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-7rem)]">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="font-heading text-2xl font-bold text-foreground mb-1">Chat Assistant</h1>
        <p className="text-sm text-muted-foreground mb-4">Ask about technology, coding, business, or learning.</p>
      </motion.div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
          >
            {msg.role === "assistant" && (
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                <Bot className="h-4 w-4 text-primary" />
              </div>
            )}
            <div className={`max-w-[70%] rounded-xl px-4 py-3 text-sm ${
              msg.role === "user"
                ? "bg-primary text-primary-foreground"
                : "glass-panel text-foreground"
            }`}>
              {msg.content}
            </div>
            {msg.role === "user" && (
              <div className="h-8 w-8 rounded-lg bg-secondary/20 flex items-center justify-center shrink-0 mt-1">
                <User className="h-4 w-4 text-secondary" />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="flex gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
          className="flex-1 h-12 rounded-xl bg-muted border border-border px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <Button onClick={sendMessage} variant="hero" size="icon" className="h-12 w-12 rounded-xl">
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
