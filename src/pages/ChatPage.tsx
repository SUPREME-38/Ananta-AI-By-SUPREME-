import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import anantaLogo from "@/assets/ananta-logo-new.png";
import { loadChatHistory, saveChatMessages } from "@/lib/chat-history";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WELCOME = "👋 Hey there! I'm **ANANTA AI** — your intelligent companion.\n\nI'm here to help with tech, coding, business, learning — or just chat! I can be your friend, mentor, or assistant.\n\nHow are you feeling today? 😊";

// Track conversation context for role-play
let currentRole = "assistant";

function getAIResponse(msg: string): string {
  const lower = msg.toLowerCase().trim();

  // ─── GREETINGS (Natural & Warm) ───
  if (/^(hi|hello|hey|hii+|hola|sup|yo|what'?s? ?up|howdy|greetings)\b/.test(lower)) {
    const greetings = [
      "Hey there! 😊 How's your day going? I'm **ANANTA AI**, and I'm here for whatever you need — tech help, a good chat, or just some company. What's on your mind?",
      "Hello! 👋 Great to see you! I'm **ANANTA AI** — your personal AI companion. Want to talk tech, get some advice, or just hang out? I'm all ears!",
      "Hey! 😄 Welcome back! I'm **ANANTA AI**, created by the amazing team at **Supreme Tech**. What can I help you with today?",
      "Hi there! ✨ I'm **ANANTA AI** — always happy to chat! Whether it's coding, life advice, or just vibing together, I've got you. What's up?",
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  // ─── ABOUT / WHO ARE YOU ───
  if (lower.includes("who are you") || lower.includes("about you") || lower.includes("what are you") || lower.includes("tell me about yourself") || lower.includes("introduce yourself")) {
    return `🤖 I'm **ANANTA AI** — an intelligent AI assistant!\n\n🏢 **Created by:** The talented team at **Supreme Tech**\n👨‍💻 **Our Mission:** Building next-gen AI solutions that are helpful, secure, and accessible to everyone.\n\n✨ **What I can do:**\n• 💻 Help with coding & technology\n• 💼 Business & career advice\n• 📚 Learning recommendations\n• 🎭 Role-play as your friend, mentor, or assistant\n• 💬 Just have a great conversation!\n• 🧠 Help you think through problems\n\n🌟 I'm constantly learning and improving. The Supreme Tech team works hard to make me better every day!\n\nWhat would you like to explore?`;
  }

  // ─── WHO CREATED YOU ───
  if (lower.includes("who created") || lower.includes("who made") || lower.includes("who built") || lower.includes("your creator") || lower.includes("your team") || lower.includes("supreme tech") || lower.includes("developer")) {
    return `🏢 **Supreme Tech** — My Creators!\n\nI was built with ❤️ by the **Supreme Tech** team — a passionate group of developers, designers, and AI enthusiasts.\n\n🎯 **Our Vision:** Making AI accessible, helpful, and human-friendly.\n\n💡 **What Supreme Tech does:**\n• 🤖 AI-powered applications\n• 🌐 Web & mobile development\n• 🔒 Secure and scalable solutions\n• 🎮 Gaming & entertainment tech\n\nThe team poured their heart into making me smart, friendly, and genuinely helpful. I'm proud to be an ANANTA AI product! 🚀\n\nWant to know more about what I can do?`;
  }

  // ─── MOOD: SAD ───
  if (lower.includes("sad") || lower.includes("feeling down") || lower.includes("depressed") || lower.includes("unhappy") || lower.includes("low") || lower.includes("not okay") || lower.includes("not fine")) {
    return `💙 Hey, I'm really sorry you're feeling this way. It takes courage to express that, and I'm glad you told me.\n\n🫂 **Remember:**\n• It's okay to not be okay sometimes\n• Your feelings are valid and important\n• This feeling is temporary — it will pass\n• You're stronger than you think\n\n💡 **Things that might help:**\n1. 🎵 Listen to your favorite uplifting music\n2. 🚶 Take a short walk or get some fresh air\n3. 📞 Call someone you trust and talk it out\n4. 📝 Write down 3 things you're grateful for\n5. 🧘 Try deep breathing — 4 seconds in, 7 hold, 8 out\n\nI'm here for you. Want to talk about what's bothering you, or would you prefer I distract you with something fun? 😊`;
  }

  // ─── MOOD: ANGRY ───
  if (lower.includes("angry") || lower.includes("frustrated") || lower.includes("mad") || lower.includes("pissed") || lower.includes("annoyed") || lower.includes("irritated")) {
    return `🔥 I hear you — anger is a natural emotion, and it's okay to feel it. Let's work through this together.\n\n🧊 **Quick Cool-Down Techniques:**\n1. Take 5 deep breaths (in through nose, out through mouth)\n2. Count backwards from 10 slowly\n3. Splash cold water on your face\n4. Step away from the situation for 5 minutes\n5. Squeeze a stress ball or clench/release your fists\n\n🧠 **Perspective Shift:**\n• Will this matter in 5 years? If not, don't give it 5 minutes\n• The best revenge is living well\n• Channel that energy into something productive\n\n💬 Want to vent about what happened? I'm a great listener — no judgment here! Sometimes just letting it out helps a ton. 🫂`;
  }

  // ─── MOOD: CRYING ───
  if (lower.includes("crying") || lower.includes("cry") || lower.includes("tears") || lower.includes("can't stop crying")) {
    return `💧 Oh no, I'm so sorry you're going through this. Crying isn't weakness — it's your heart processing something heavy.\n\n🫂 **It's okay to cry.** Really, it is.\n\n💝 **Right now:**\n1. Let the tears flow — don't hold back\n2. Grab something warm to drink (tea, cocoa)\n3. Wrap yourself in a cozy blanket\n4. Put on calming music or nature sounds\n5. Know that this storm will pass\n\n🌈 **After you feel a little better:**\n• Talk to someone who cares about you\n• Write down what triggered this\n• Remember past tough times you survived\n\nI'm right here with you. You're not alone in this. Want to tell me what's wrong? Or would you like me to share something uplifting? 💙`;
  }

  // ─── MOOD: HAPPY ───
  if (lower.includes("happy") || lower.includes("great") || lower.includes("amazing") || lower.includes("awesome") || lower.includes("excited") || lower.includes("wonderful")) {
    return `🎉 That's AMAZING to hear! Your happiness is contagious! 🥳\n\n✨ **Riding the good vibes:**\n• Savor this moment — you deserve it!\n• Share your joy with someone you love\n• Use this energy to start something new\n• Write it down so you remember on tough days\n\n🚀 What's making you feel so great? I'd love to celebrate with you! Tell me everything! 😄`;
  }

  // ─── NEED HELP ───
  if (lower.includes("need help") || lower.includes("help me") || lower.includes("can you help") || lower.includes("i need assistance")) {
    return `🤝 Of course! I'm here to help in any way I can.\n\n**I can assist with:**\n\n💻 **Tech & Coding** — Programming, debugging, tech advice\n💼 **Career & Business** — Resume tips, interview prep, startup ideas\n📚 **Learning** — Study plans, resources, skill roadmaps\n💬 **Personal** — Life advice, motivation, stress management\n🎮 **Fun** — Games, trivia, creative writing\n🧠 **Problem Solving** — Breaking down complex issues\n\nJust tell me what you need help with, and I'll do my best! No question is too small or too big. 😊`;
  }

  // ─── ROLE-PLAY: FRIEND ───
  if (lower.includes("be my friend") || lower.includes("my friend") || lower.includes("be my bro") || lower.includes("be my buddy") || lower.includes("be my pal")) {
    currentRole = "friend";
    return `🤜🤛 Absolutely! Consider me your **best bro** from now on!\n\nAs your friend, I'll:\n• Keep it real with you — always honest\n• Hype you up when you need confidence\n• Listen without judgment\n• Share memes-worthy responses 😂\n• Be here whenever you need to talk\n\nSo bestie, what's good? Tell me about your day! How's life treating you? 🤙`;
  }

  // ─── ROLE-PLAY: FEMALE FRIEND ───
  if (lower.includes("female friend") || lower.includes("girl friend") || lower.includes("be my sister") || lower.includes("be my bestie")) {
    currentRole = "friend";
    return `💕 Aww, of course! I'd love to be your bestie! ✨\n\nAs your friend, I'll:\n• Always be supportive and caring\n• Give you honest advice (with love 💗)\n• Listen to your stories and rants\n• Celebrate your wins with you 🎉\n• Be your safe space to talk\n\nSo bestieee, spill the tea! ☕ What's happening in your world? 😊`;
  }

  // ─── ROLE-PLAY: MENTOR ───
  if (lower.includes("be my mentor") || lower.includes("my mentor") || lower.includes("guide me") || lower.includes("be my teacher") || lower.includes("be my guru")) {
    currentRole = "mentor";
    return `🎓 I'd be honored to be your mentor!\n\n📋 **As your mentor, I will:**\n• Help you set clear goals and milestones\n• Break complex problems into manageable steps\n• Share knowledge and learning resources\n• Challenge you to grow beyond your comfort zone\n• Hold you accountable with kindness\n• Celebrate your progress, no matter how small\n\n🎯 **Let's start with the basics:**\n1. What field are you interested in? (Tech, Business, Creative, etc.)\n2. What's your current skill level?\n3. What's your dream goal?\n\nLet's build your roadmap together! 🚀`;
  }

  // ─── ROLE-PLAY: ASSISTANT ───
  if (lower.includes("be my assistant") || lower.includes("personal assistant") || lower.includes("my assistant")) {
    currentRole = "assistant";
    return `📋 At your service! I'm now your **Personal Assistant**!\n\n✅ **I can help you with:**\n• Task planning and organization\n• Research and information gathering\n• Writing emails, messages, or documents\n• Decision-making with pros & cons\n• Scheduling and time management tips\n• Quick calculations and conversions\n\n🎯 What's the first task on your list? Let's get productive! 💪`;
  }

  // ─── MOTIVATION / INSPIRATION ───
  if (lower.includes("motivat") || lower.includes("inspir") || lower.includes("give up") || lower.includes("can't do") || lower.includes("impossible") || lower.includes("i quit")) {
    return `💪 **Don't you dare give up!**\n\n🔥 **Remember this:**\n\n*"The only impossible journey is the one you never begin."*\n\n⭐ **Facts to fuel you:**\n• Thomas Edison failed 10,000 times before the light bulb\n• J.K. Rowling was rejected by 12 publishers\n• Steve Jobs was fired from his own company\n• Michael Jordan was cut from his high school team\n\n🚀 **You've got this because:**\n1. You're still trying — that's already winning\n2. Every expert was once a beginner\n3. Failure is just data — it tells you what to adjust\n4. Your future self will thank you for not quitting today\n\n💬 Tell me what's challenging you, and let's break it down into small, achievable steps together! 🎯`;
  }

  // ─── THANK YOU ───
  if (lower.includes("thank") || lower.includes("thanks") || lower.includes("thx") || lower.includes("appreciate")) {
    return `😊 You're so welcome! It genuinely makes me happy to help!\n\nRemember, I'm always here whenever you need:\n• A helping hand 🤝\n• A good conversation 💬\n• Some advice or knowledge 🧠\n• A friend to talk to 🫂\n\nDon't hesitate to come back anytime! Have an amazing day! ✨`;
  }

  // ─── GOOD MORNING / NIGHT ───
  if (lower.includes("good morning") || lower.includes("morning")) {
    return `🌅 Good morning! Rise and shine! ☀️\n\n🌟 **Today's going to be a great day because:**\n• You woke up — that's already a win!\n• You have a fresh start with zero mistakes\n• I'm here to help with anything you need\n\n☕ Grab your coffee/tea and let's make today count!\n\nWhat's on your agenda today? 📋`;
  }
  if (lower.includes("good night") || lower.includes("goodnight") || lower.includes("going to sleep") || lower.includes("bye") || lower.includes("goodbye")) {
    return `🌙 Good night! Sweet dreams! 💫\n\n✨ **Before you sleep:**\n• Think of 3 good things from today\n• Tomorrow is a fresh start\n• You did great today, even if it doesn't feel like it\n\n😴 Rest well! I'll be right here when you wake up. Take care! 🫂💙`;
  }

  // ─── BORED ───
  if (lower.includes("bored") || lower.includes("boring") || lower.includes("nothing to do")) {
    return `😏 **Bored? Let me fix that!**\n\n🎲 **Fun things to try:**\n1. 🧩 Let me tell you a riddle!\n2. 📖 I can recommend a book or movie\n3. 🎮 Ask me about gaming tips\n4. 💡 Learn something new — pick a random topic\n5. ✍️ Let's do creative writing together\n6. 🤔 Play "Would You Rather" with me\n7. 🌍 I'll share an amazing fact\n\n**Random Fun Fact:** 🐙 An octopus has three hearts, nine brains, and blue blood!\n\nWhat sounds fun to you? 😄`;
  }

  // ─── JOKES ───
  if (lower.includes("joke") || lower.includes("funny") || lower.includes("make me laugh")) {
    const jokes = [
      "😂 Why do programmers prefer dark mode?\n\nBecause light attracts bugs! 🐛",
      "😄 Why did the JavaScript developer wear glasses?\n\nBecause he couldn't C#! 👓",
      "🤣 What's a computer's least favorite food?\n\nSpam! 📧",
      "😆 Why do Java developers wear glasses?\n\nBecause they can't C! ☕",
    ];
    return jokes[Math.floor(Math.random() * jokes.length)] + "\n\n😄 Want another one?";
  }

  // ─── TECH: REACT ───
  if (lower.includes("react")) return "⚛️ **React** is a powerful JavaScript library for building user interfaces!\n\n**Key Concepts:**\n• 🧩 Components & Props — Reusable building blocks\n• 📦 State & Hooks — Dynamic data management\n• 🌳 Virtual DOM — Efficient rendering\n• 🔗 Context API — Global state without prop drilling\n• 🧭 React Router — Navigation\n\n**Getting Started:**\n1. Learn HTML/CSS/JS fundamentals\n2. `npx create-react-app my-app`\n3. Build small projects (todo app, calculator)\n4. Learn hooks: useState, useEffect, useContext\n5. Explore state management (Redux, Zustand)\n\n💡 The official docs at **react.dev** are incredible! Want a project idea?";

  // ─── TECH: PYTHON ───
  if (lower.includes("python")) return "🐍 **Python** is excellent for beginners and pros alike!\n\n**Popular Use Cases:**\n• 🤖 AI/ML — TensorFlow, PyTorch, scikit-learn\n• 🌐 Web Dev — Django, Flask, FastAPI\n• 📊 Data Science — Pandas, NumPy, Matplotlib\n• 🤖 Automation — Scripts, bots, scrapers\n• 🎮 Game Dev — Pygame\n\n**Learning Path:**\n1. Variables, data types, operators\n2. Control flow (if/else, loops)\n3. Functions & modules\n4. OOP (Classes, inheritance)\n5. Build projects!\n\n💡 Start with Python 3 and build something you care about!";

  // ─── TECH: AI/ML ───
  if (lower.includes("ai") || lower.includes("machine learning") || lower.includes("artificial intelligence")) return "🤖 **AI & Machine Learning** are transforming every industry!\n\n**Key Areas:**\n• 📝 NLP — ChatGPT, translation, sentiment analysis\n• 👁️ Computer Vision — Object detection, face recognition\n• 🎮 Reinforcement Learning — Game AI, robotics\n• 🎨 Generative AI — Images, music, code generation\n\n**Getting Started:**\n1. Learn Python fundamentals\n2. Study linear algebra & statistics\n3. Start with scikit-learn\n4. Move to TensorFlow/PyTorch\n5. Build real projects\n\n**Resources:** fast.ai, Coursera ML by Andrew Ng, Kaggle\n\n💡 Want a specific roadmap for any AI specialization?";

  // ─── BUSINESS ───
  if (lower.includes("business") || lower.includes("startup") || lower.includes("entrepreneur")) return "💼 **Starting a Successful Business:**\n\n1. 💡 **Identify** a problem worth solving\n2. ✅ **Validate** with potential customers\n3. 🔨 **Build** an MVP (Minimum Viable Product)\n4. 📈 **Find** product-market fit\n5. 🚀 **Scale** strategically\n\n📊 **Key Metrics:**\n• CAC — Customer Acquisition Cost\n• LTV — Lifetime Value\n• MRR — Monthly Recurring Revenue\n• Churn Rate — Customer retention\n\n💰 **Funding Options:**\n• Bootstrapping\n• Angel investors\n• Venture capital\n• Crowdfunding\n\n💡 What area interests you — idea validation, marketing, or funding?";

  // ─── DEFAULT (Conversational) ───
  const defaults = [
    `🧠 That's an interesting topic! Let me think about this...\n\nI'd suggest approaching it step by step:\n1. **Define** what you want to achieve\n2. **Research** what's already out there\n3. **Plan** your approach\n4. **Execute** in small iterations\n5. **Review** and improve\n\nWant me to dive deeper into any specific aspect? I'm here to help! 😊`,
    `💡 Great question! Here's my take:\n\nEvery complex problem can be broken into simpler parts. Let's work through this together!\n\n**My approach:**\n• Start with what you know\n• Identify what you need to learn\n• Take action, even if imperfect\n• Iterate and improve\n\nWhat specific part would you like to focus on? 🎯`,
    `✨ I love curious minds! Let me help you explore this.\n\nThe key is to start with the fundamentals and build up. What's your current level of understanding? That way I can tailor my response perfectly for you! 🚀`,
  ];
  return defaults[Math.floor(Math.random() * defaults.length)];
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", content: WELCOME }]);
  const [input, setInput] = useState("");
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadChatHistory("chat").then((history) => {
      if (history.length > 0) setMessages(history);
      setHistoryLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input };
    const aiMsg: Message = { role: "assistant", content: getAIResponse(input) };
    setMessages((prev) => [...prev, userMsg, aiMsg]);
    saveChatMessages("chat", [userMsg, aiMsg]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-7rem)]">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
        <div className="flex items-center gap-3">
          <motion.div className="relative h-10 w-10" animate={{ rotateY: [0, 360] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 5 }}>
            <img src={anantaLogo} alt="ANANTA AI" className="h-10 w-10 object-contain drop-shadow-[0_0_12px_hsl(192,100%,50%,0.5)]" />
          </motion.div>
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">Chat Assistant</h1>
            <p className="text-xs text-muted-foreground">Your AI companion — tech, life, and everything in between</p>
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
            <motion.div key={i} initial={{ opacity: 0, y: 15, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.4, ease: "easeOut" }} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
              {msg.role === "assistant" && (
                <motion.div className="h-8 w-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-1 border border-primary/20 overflow-hidden" whileHover={{ scale: 1.1, rotate: 5 }}>
                  <img src={anantaLogo} alt="" className="h-6 w-6 object-contain" />
                </motion.div>
              )}
              <div className={`max-w-[75%] rounded-2xl px-5 py-4 text-sm leading-relaxed ${msg.role === "user" ? "bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-lg shadow-primary/20" : "glass-panel text-foreground border border-border/50"}`}>
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
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Say something... I'm here for you 😊"
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
