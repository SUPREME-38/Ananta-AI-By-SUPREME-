import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, ShoppingCart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import anantaLogo from "@/assets/ananta-logo-new.png";
import { loadChatHistory, saveChatMessages } from "@/lib/chat-history";

interface Message { role: "user" | "assistant"; content: string; }

const WELCOME = "🛒 Welcome to **ANANTA Shopping Assistant**!\n\nI can help you with:\n🔹 Phones — Gaming, Multitasking, Budget picks\n🔹 Cars & Bikes — Performance, Design, Value\n🔹 TVs, Laptops & Watches\n🔹 Tech gear — Mice, Headphones & more\n🔹 Price comparisons & reviews\n\nWhat product are you looking for?";

function getShoppingResponse(msg: string): string {
  const lower = msg.toLowerCase();

  // ─── PHONES ───
  if (lower.includes("phone") || lower.includes("mobile") || lower.includes("iphone") || lower.includes("samsung") || lower.includes("smartphone")) {
    if (lower.includes("gaming") || lower.includes("game")) {
      return `📱🎮 **Best Gaming Phones:**\n\n**Under ₹20K:**\n1. **Poco X6** — ₹18,999 | Dimensity 8300, 120Hz AMOLED\n2. **Realme Narzo 70 Pro** — ₹19,499 | Dimensity 7050\n3. **Samsung Galaxy M35** — ₹17,999 | Exynos 1380\n4. **iQOO Z9** — ₹18,498 | Dimensity 7200\n5. **Redmi Note 13 Pro** — ₹19,999 | Snapdragon 7s Gen 2\n\n**Under ₹30K:**\n6. **Poco F6** — ₹27,999 | Snapdragon 8s Gen 3\n7. **iQOO Neo 9 Pro** — ₹29,999 | Dimensity 9300\n8. **OnePlus Nord 4** — ₹27,999 | Snapdragon 7+ Gen 3\n9. **Realme GT 6T** — ₹28,999 | Snapdragon 7+ Gen 3\n10. **Nothing Phone (2a) Plus** — ₹29,999 | Dimensity 7350\n\n**Under ₹50K:**\n11. **iQOO 13** — ₹49,999 | Snapdragon 8 Elite\n12. **OnePlus 13R** — ₹44,999 | Snapdragon 8 Gen 3\n13. **Samsung Galaxy S24** — ₹49,999 | Exynos 2400\n14. **Poco F6 Pro** — ₹39,999 | Snapdragon 8 Gen 2\n15. **Realme GT 6** — ₹38,999 | Snapdragon 8s Gen 3\n16. **Motorola Edge 50 Pro** — ₹35,999 | Snapdragon 7 Gen 3\n17. **Nothing Phone (2)** — ₹37,999 | Snapdragon 8+ Gen 1\n18. **Vivo X100** — ₹48,999 | Dimensity 9300\n19. **OnePlus 12** — ₹49,999 | Snapdragon 8 Gen 3\n20. **Asus ROG Phone 8** — ₹49,999 | Snapdragon 8 Gen 3\n\n💡 Want detailed specs or comparisons?`;
    }
    if (lower.includes("multitask") || lower.includes("productivity") || lower.includes("work")) {
      return `📱💼 **Best Multitasking Phones:**\n\n**Under ₹20K:**\n1. **Samsung Galaxy M55** — ₹19,999 | 8GB RAM, 5000mAh\n2. **Redmi Note 13 Pro+** — ₹18,999 | 8GB+256GB\n3. **Realme 12 Pro** — ₹19,499 | Curved AMOLED\n4. **Poco X6 Pro** — ₹19,999 | 12GB RAM\n5. **Motorola Edge 50 Fusion** — ₹18,999 | 12GB RAM\n\n**Under ₹30K:**\n6. **Samsung Galaxy A55** — ₹27,999 | IP67, 8GB RAM\n7. **OnePlus Nord 4** — ₹27,999 | 12GB, metal body\n8. **iQOO Neo 9 Pro** — ₹29,999 | 12GB RAM\n9. **Nothing Phone (2a) Plus** — ₹29,999 | 12GB RAM\n10. **Poco F6** — ₹27,999 | 12GB RAM, UFS 4.0\n\n**Under ₹50K:**\n11. **Samsung Galaxy S24** — ₹49,999 | Galaxy AI, DeX\n12. **OnePlus 12** — ₹49,999 | 16GB RAM\n13. **iPhone 15** — ₹49,900 | A16 Bionic\n14. **Google Pixel 8** — ₹45,999 | AI features, 7yr updates\n15. **Vivo X100** — ₹48,999 | 16GB RAM\n16. **OnePlus 13R** — ₹44,999 | 12GB, OxygenOS\n17. **Samsung Galaxy S23 FE** — ₹34,999 | One UI 6\n18. **Motorola Edge 50 Pro** — ₹35,999 | 12GB RAM\n19. **iQOO 13** — ₹49,999 | 16GB RAM\n20. **Nothing Phone (2)** — ₹37,999 | 12GB RAM\n\n💡 Need comparisons between any two?`;
    }
    if (lower.includes("cheap") || lower.includes("budget") || lower.includes("affordable")) {
      return `📱💰 **Best Budget Phones:**\n\n**Under ₹20K:**\n1. **Redmi Note 13** — ₹11,999 | AMOLED, 5000mAh\n2. **Realme Narzo 70** — ₹12,999 | 120Hz, 50MP\n3. **Samsung Galaxy M15** — ₹9,999 | 6000mAh beast\n4. **Poco M6 Pro** — ₹10,999 | AMOLED, 64MP\n5. **Moto G64** — ₹13,999 | 6000mAh, stock Android\n6. **Redmi 13** — ₹8,999 | 108MP camera\n7. **Realme C67** — ₹9,499 | 33W charging\n8. **Samsung Galaxy A15** — ₹12,999 | AMOLED\n9. **Infinix Hot 40 Pro** — ₹10,999 | 108MP\n10. **Tecno Spark 20 Pro+** — ₹11,999 | 108MP\n\n**Under ₹30K (High Value):**\n11. **Poco X6** — ₹18,999 | Flagship killer\n12. **iQOO Z9** — ₹18,498 | 50MP OIS\n13. **Samsung Galaxy M35** — ₹17,999 | 6000mAh\n14. **Redmi Note 13 Pro** — ₹19,999 | 200MP\n15. **OnePlus Nord CE4** — ₹22,999 | 100W charging\n16. **Realme 12 Pro** — ₹19,499 | Curved display\n17. **Motorola Edge 50 Fusion** — ₹18,999 | 68W\n18. **Nothing Phone (2a)** — ₹23,999 | Glyph interface\n19. **Poco F6** — ₹27,999 | SD 8s Gen 3\n20. **Samsung Galaxy A35** — ₹24,999 | IP67\n\n💡 Want to compare any of these?`;
    }
    if (lower.includes("high performance") || lower.includes("flagship") || lower.includes("best") || lower.includes("powerful")) {
      return `📱🔥 **High Performance Flagship Phones:**\n\n**Under ₹30K:**\n1. **iQOO Neo 9 Pro** — ₹29,999 | Dimensity 9300\n2. **Poco F6** — ₹27,999 | SD 8s Gen 3\n3. **OnePlus Nord 4** — ₹27,999 | SD 7+ Gen 3\n4. **Realme GT 6T** — ₹28,999 | SD 7+ Gen 3\n5. **Nothing Phone (2a) Plus** — ₹29,999\n\n**Under ₹50K:**\n6. **iQOO 13** — ₹49,999 | SD 8 Elite, AnTuTu 25L+\n7. **OnePlus 12** — ₹49,999 | SD 8 Gen 3\n8. **OnePlus 13R** — ₹44,999 | SD 8 Gen 3\n9. **Samsung Galaxy S24** — ₹49,999 | Exynos 2400\n10. **Vivo X100** — ₹48,999 | Dimensity 9300\n11. **Asus ROG Phone 8** — ₹49,999 | SD 8 Gen 3\n12. **Google Pixel 8** — ₹45,999 | Tensor G3\n13. **Realme GT 6** — ₹38,999 | SD 8s Gen 3\n14. **Poco F6 Pro** — ₹39,999 | SD 8 Gen 2\n15. **Motorola Edge 50 Pro** — ₹35,999\n16. **Nothing Phone (2)** — ₹37,999 | SD 8+ Gen 1\n17. **iPhone 15** — ₹49,900 | A16 Bionic\n18. **Samsung Galaxy S23 FE** — ₹34,999\n19. **Xiaomi 14** — ₹47,999 | SD 8 Gen 3\n20. **Honor 200 Pro** — ₹44,999\n\n💡 Want benchmark comparisons?`;
    }
    // Default phone response
    return `📱 **Top Phones Across All Categories:**\n\n🎮 **Gaming** — Asus ROG Phone 8, iQOO 13, Poco F6\n💼 **Multitasking** — Samsung Galaxy S24, OnePlus 12, Pixel 8\n💰 **Budget** — Redmi Note 13, Samsung Galaxy M15, Poco M6 Pro\n🔥 **Performance** — iQOO 13, OnePlus 12, Vivo X100\n\n**Price Ranges:** ₹9K–₹50K\n\nTry asking:\n• *"Best gaming phone under 30k"*\n• *"Budget phone under 20k"*\n• *"High performance phone"*\n• *"Multitasking phone under 50k"*`;
  }

  // ─── CARS ───
  if (lower.includes("car") || lower.includes("suv") || lower.includes("sedan") || lower.includes("hatchback")) {
    if (lower.includes("cheap") || lower.includes("budget") || lower.includes("affordable")) {
      return `🚗💰 **Best Budget Cars (₹2L–₹10L):**\n\n1. **Maruti Alto K10** — ₹3.99L | 27 kmpl, AMT available\n2. **Renault Kwid** — ₹4.69L | SUV-inspired, 22 kmpl\n3. **Maruti S-Presso** — ₹4.26L | Tall-boy design, 25 kmpl\n4. **Maruti WagonR** — ₹5.54L | Best cabin space, CNG option\n5. **Tata Tiago** — ₹5.65L | 5-star safety, AMT\n6. **Hyundai Grand i10 Nios** — ₹5.73L | Premium feel, 20 kmpl\n7. **Maruti Swift** — ₹6.49L | Fun to drive, 25 kmpl\n8. **Tata Punch** — ₹6.13L | Micro SUV, 5-star NCAP\n9. **Maruti Baleno** — ₹6.61L | Premium hatchback\n10. **Hyundai i20** — ₹7.04L | Feature-loaded, sunroof\n\n💡 Want mileage comparisons or test drive tips?`;
    }
    if (lower.includes("performance") || lower.includes("fast") || lower.includes("power")) {
      return `🚗🔥 **High Performance Cars (₹5L–₹10L):**\n\n1. **Tata Altroz iTurbo** — ₹8.85L | 110PS turbo, sporty\n2. **Hyundai i20 N Line** — ₹9.99L | 120PS turbo, sport exhaust\n3. **Maruti Fronx Turbo** — ₹8.69L | 100PS turbo, fun handling\n4. **Tata Nexon** — ₹8.10L | 120PS turbo, 5-star safety\n5. **Hyundai Venue Turbo** — ₹8.71L | 120PS turbo, DCT\n6. **Kia Sonet Turbo** — ₹8.89L | 120PS, iMT/DCT\n7. **Maruti Brezza** — ₹8.29L | 103PS, AT available\n8. **Mahindra XUV 3XO** — ₹7.49L | 130PS turbo\n9. **Tata Punch Turbo** — ₹7.49L | Adventure-ready\n10. **Renault Kiger Turbo** — ₹6.49L | 100PS, CVT\n\n💡 Want detailed 0-100 times or driving reviews?`;
    }
    if (lower.includes("design") || lower.includes("look") || lower.includes("style") || lower.includes("beautiful")) {
      return `🚗✨ **Best Designed Cars (₹5L–₹10L):**\n\n1. **Hyundai i20** — ₹7.04L | Cascading grille, premium cabin\n2. **Tata Altroz** — ₹6.60L | Impact 2.0 design, sharp lines\n3. **Maruti Fronx** — ₹7.51L | Coupe SUV style\n4. **Tata Nexon** — ₹8.10L | Bold SUV stance\n5. **Hyundai Venue** — ₹7.94L | Connected car, LED DRLs\n6. **Kia Sonet** — ₹7.99L | Tiger nose grille, crown jewel LEDs\n7. **Mahindra XUV 3XO** — ₹7.49L | Panoramic sunroof\n8. **Toyota Glanza** — ₹6.86L | Clean look, reliable\n9. **Honda Amaze** — ₹7.20L | Elegant sedan\n10. **Citroen Basalt** — ₹7.99L | Coupe SUV, French design\n\n💡 Want interior comparisons or color options?`;
    }
    return `🚗 **Car Categories:**\n\n💰 **Budget** — Alto K10, Tiago, Punch\n🔥 **Performance** — i20 N Line, Nexon Turbo, Sonet Turbo\n✨ **Design** — Hyundai i20, Kia Sonet, Fronx\n\nTry: *"Budget cars"*, *"Performance cars"*, *"Best designed cars"*`;
  }

  // ─── BIKES ───
  if (lower.includes("bike") || lower.includes("motorcycle") || lower.includes("two wheeler") || lower.includes("scooter")) {
    if (lower.includes("cheap") || lower.includes("budget") || lower.includes("affordable")) {
      return `🏍️💰 **Best Budget Bikes (₹80K–₹2L):**\n\n1. **Hero Splendor Plus** — ₹79,000 | 70 kmpl, most reliable\n2. **Honda Shine** — ₹82,000 | Smooth engine, 65 kmpl\n3. **TVS Apache RTR 160** — ₹1.12L | Sporty, 45 kmpl\n4. **Bajaj Pulsar 150** — ₹1.10L | Iconic, 50 kmpl\n5. **Hero Xtreme 125R** — ₹99,000 | LED lights, sporty\n6. **Yamaha FZ-S V4** — ₹1.19L | Stylish, smooth\n7. **Honda SP 125** — ₹88,000 | Fuel efficient\n8. **TVS Raider 125** — ₹95,000 | Feature rich\n9. **Bajaj Pulsar NS125** — ₹1.07L | Sporty naked\n10. **Hero Glamour** — ₹84,000 | Practical, 60 kmpl\n\n💡 Want mileage or maintenance cost details?`;
    }
    if (lower.includes("performance") || lower.includes("fast") || lower.includes("power") || lower.includes("speed")) {
      return `🏍️🔥 **High Performance Bikes (₹1.5L–₹10L):**\n\n1. **KTM Duke 390** — ₹3.11L | 44HP, track-ready\n2. **Royal Enfield Himalayan 450** — ₹2.69L | Adventure beast\n3. **Triumph Speed 400** — ₹2.33L | Premium, 40HP\n4. **TVS Apache RR 310** — ₹2.72L | Race replica, 34HP\n5. **KTM RC 390** — ₹3.30L | Supersport, 44HP\n6. **Bajaj Dominar 400** — ₹2.25L | Touring, 40HP\n7. **Royal Enfield Interceptor 650** — ₹3.24L | Twin-cylinder\n8. **Kawasaki Ninja 300** — ₹3.43L | Smooth twin\n9. **Honda CB300R** — ₹2.80L | Neo-retro, premium\n10. **Yamaha MT-03** — ₹4.60L | Torque master\n\n💡 Want track specs or touring comparisons?`;
    }
    if (lower.includes("design") || lower.includes("look") || lower.includes("style") || lower.includes("beautiful")) {
      return `🏍️✨ **Best Designed Bikes:**\n\n1. **Royal Enfield Classic 350** — ₹1.93L | Timeless retro\n2. **Triumph Speed 400** — ₹2.33L | Modern classic\n3. **Honda CB350** — ₹2.10L | Retro elegance\n4. **Husqvarna Svartpilen 250** — ₹1.84L | Scrambler art\n5. **Yamaha FZ-X** — ₹1.32L | Neo-retro cruiser\n6. **Royal Enfield Meteor 350** — ₹2.08L | Cruiser beauty\n7. **KTM Duke 200** — ₹1.96L | Aggressive naked\n8. **Jawa 42** — ₹1.73L | Classic Jawa DNA\n9. **TVS Ronin** — ₹1.49L | Modern scrambler\n10. **Bajaj Avenger Cruise 220** — ₹1.41L | Comfortable cruiser\n\n💡 Want color options or customization tips?`;
    }
    return `🏍️ **Bike Categories:**\n\n💰 **Budget** — Splendor, Shine, Pulsar 150\n🔥 **Performance** — KTM 390, Apache RR 310, Dominar\n✨ **Design** — Classic 350, Triumph 400, CB350\n\nTry: *"Budget bikes"*, *"Fast bikes"*, *"Best looking bikes"*`;
  }

  // ─── TVs ───
  if (lower.includes("tv") || lower.includes("television") || lower.includes("smart tv")) {
    return `📺 **Top 10 Smart TVs:**\n\n**Budget (Under ₹20K):**\n1. **Redmi Smart TV 43"** — ₹18,999 | 4K, Android TV\n2. **TCL 43" 4K** — ₹17,999 | Dolby Audio, Google TV\n3. **Toshiba 43" 4K** — ₹19,999 | VIDAA, Dolby Vision\n\n**Mid-Range (₹20K–₹40K):**\n4. **Samsung Crystal 50" 4K** — ₹34,999 | Crystal processor\n5. **LG UR7500 50" 4K** — ₹36,990 | webOS, α5 Gen 6\n6. **Sony Bravia 43" 4K** — ₹37,990 | X1 processor, Triluminos\n7. **OnePlus TV 50" 4K** — ₹29,999 | 30W speakers\n\n**Premium (₹40K+):**\n8. **LG C3 48" OLED** — ₹79,990 | Perfect blacks, gaming\n9. **Samsung Neo QLED 55"** — ₹89,990 | Mini LED, 144Hz\n10. **Sony A75L 55" OLED** — ₹99,990 | Cognitive processor XR\n\n💡 Want gaming TV recommendations or sound comparisons?`;
  }

  // ─── LAPTOPS ───
  if (lower.includes("laptop") || lower.includes("macbook") || lower.includes("computer") || lower.includes("notebook")) {
    return `💻 **Top 5 Laptops Across Budgets:**\n\n1. **MacBook Air M3 15"** — ₹1,34,900 | 18hr battery, fanless\n   ⭐ Best for: Creators, students, premium users\n\n2. **ASUS Vivobook S 15 (Snapdragon)** — ₹89,990 | Copilot+, 18hr battery\n   ⭐ Best for: AI tasks, productivity\n\n3. **Lenovo IdeaPad Slim 5** — ₹64,990 | Ryzen 7, 16GB, OLED\n   ⭐ Best for: Students, everyday use\n\n4. **Acer Nitro V 15** — ₹74,990 | RTX 4050, i5-13th Gen\n   ⭐ Best for: Gaming on budget\n\n5. **HP Pavilion x360 14** — ₹59,990 | 2-in-1, touchscreen\n   ⭐ Best for: Versatility, note-taking\n\n💡 Want gaming laptops, coding setups, or student picks?`;
  }

  // ─── WATCHES ───
  if (lower.includes("watch") || lower.includes("smartwatch") || lower.includes("wearable")) {
    return `⌚ **Top 5 Smartwatches:**\n\n1. **Apple Watch Series 9** — ₹41,900 | Best iOS ecosystem\n   ✅ Health monitoring, Siri, S9 chip\n\n2. **Samsung Galaxy Watch 6** — ₹26,999 | Best for Android\n   ✅ BioActive sensor, Wear OS, rotating bezel\n\n3. **Garmin Venu 3** — ₹47,490 | Fitness king\n   ✅ 14-day battery, Body Battery, advanced GPS\n\n4. **Noise ColorFit Pro 5** — ₹3,499 | Best budget\n   ✅ AMOLED, 100+ sports modes, calling\n\n5. **Fire-Boltt Phoenix Ultra** — ₹2,499 | Value pick\n   ✅ 1.39" display, Bluetooth calling, 120+ sports\n\n💡 Want fitness tracker comparisons or luxury watch picks?`;
  }

  // ─── MOUSE ───
  if (lower.includes("mouse") || lower.includes("mice")) return `🖱️ **Top Gaming Mice:**\n\n1. **Logitech G Pro X Superlight 2** — ₹12,995\n   ⭐ 4.8/5 | Ultra lightweight (60g), HERO 2 sensor\n\n2. **Razer DeathAdder V3** — ₹7,499\n   ⭐ 4.6/5 | Ergonomic, Focus Pro sensor\n\n3. **Zowie EC2-CW** — ₹9,990\n   ⭐ 4.5/5 | Wireless, plug & play\n\n4. **Logitech G502 X Plus** — ₹11,495\n   ⭐ 4.7/5 | LIGHTFORCE switches, LIGHTSPEED\n\n5. **SteelSeries Aerox 5** — ₹7,999\n   ⭐ 4.4/5 | 9 buttons, ultra-light\n\n💡 Want mouse pad recommendations or DPI guides?`;

  // ─── HEADPHONES ───
  if (lower.includes("headphone") || lower.includes("earbuds") || lower.includes("audio")) return `🎧 **Best Audio Products:**\n\n1. **Sony WH-1000XM5** — ₹24,990 ⭐ 4.9/5 | Best ANC\n2. **AirPods Pro 2** — ₹20,900 ⭐ 4.7/5 | Best for iPhone\n3. **Samsung Galaxy Buds3 Pro** — ₹14,999 ⭐ 4.6/5 | Galaxy AI\n4. **Sony WF-1000XM5** — ₹17,990 ⭐ 4.8/5 | Tiny, powerful\n5. **boAt Airdopes 511** — ₹1,499 ⭐ 4.3/5 | Budget king\n\n💡 Need wireless vs wired or studio recommendations?`;

  // ─── GREETINGS ───
  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) return `👋 Hello! I'm your **Shopping Assistant**!\n\n🔍 I can help with:\n📱 **Phones** — Gaming, Budget, Performance\n🚗 **Cars** — Budget, Fast, Stylish\n🏍️ **Bikes** — Commuter, Sport, Cruiser\n📺 **TVs** — Smart, OLED, Budget\n💻 **Laptops** — MacBook, Gaming, Student\n⌚ **Watches** — Apple, Samsung, Budget\n\nJust tell me what you need!`;

  return `🛒 I can help you find the perfect product!\n\n• **Phones** — "Gaming phone under 30k" / "Budget phone"\n• **Cars** — "Budget car" / "Performance car"\n• **Bikes** — "Fast bikes" / "Budget bikes"\n• **TVs** — "Best smart TV"\n• **Laptops** — "Best laptop for coding"\n• **Watches** — "Best smartwatch"\n• **Mice** — "Best gaming mouse"\n• **Headphones** — "Best noise-cancelling"\n\nWhat are you looking for?`;
}

export default function ShoppingPage() {
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", content: WELCOME }]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadChatHistory("shopping").then((h) => { if (h.length > 0) setMessages(h); });
  }, []);

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const u: Message = { role: "user", content: input };
    const a: Message = { role: "assistant", content: getShoppingResponse(input) };
    setMessages((p) => [...p, u, a]);
    saveChatMessages("shopping", [u, a]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-7rem)]">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
        <div className="flex items-center gap-3">
          <motion.div className="h-10 w-10 rounded-xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center" animate={{ rotateY: [0, 360] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 5 }}>
            <ShoppingCart className="h-5 w-5 text-primary-foreground" />
          </motion.div>
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">Shopping Assistant</h1>
            <p className="text-xs text-muted-foreground">AI-powered product recommendations & comparisons</p>
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
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} placeholder="Ask about any product..." className="w-full h-12 rounded-xl bg-muted border border-border pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300" />
        </div>
        <Button onClick={sendMessage} variant="hero" size="icon" className="h-12 w-12 rounded-xl"><Send className="h-5 w-5" /></Button>
      </motion.div>
    </div>
  );
}
