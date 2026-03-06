import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Star, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Product {
  name: string;
  price: string;
  rating: number;
  pros: string[];
  cons: string[];
}

const mockResults: Record<string, Product[]> = {
  mouse: [
    { name: "Logitech G Pro X Superlight 2", price: "$159", rating: 4.8, pros: ["Ultra lightweight", "Excellent sensor", "Long battery"], cons: ["Expensive", "No Bluetooth"] },
    { name: "Razer DeathAdder V3", price: "$89", rating: 4.6, pros: ["Ergonomic", "Great sensor", "Affordable"], cons: ["Wired only", "No RGB"] },
    { name: "Zowie EC2-CW", price: "$119", rating: 4.5, pros: ["Wireless", "No software needed", "Reliable"], cons: ["Basic design", "Heavy"] },
  ],
  laptop: [
    { name: "MacBook Pro M4 16\"", price: "$2,499", rating: 4.9, pros: ["Incredible performance", "Amazing display", "All-day battery"], cons: ["Expensive", "Limited ports"] },
    { name: "Framework Laptop 16", price: "$1,399", rating: 4.4, pros: ["Modular design", "Upgradeable", "Right to repair"], cons: ["Bulkier", "Fewer accessories"] },
    { name: "ThinkPad X1 Carbon Gen 12", price: "$1,699", rating: 4.6, pros: ["Lightweight", "Great keyboard", "Business features"], cons: ["Integrated graphics", "Pricey"] },
  ],
};

function searchProducts(query: string): Product[] {
  const lower = query.toLowerCase();
  if (lower.includes("mouse")) return mockResults.mouse;
  if (lower.includes("laptop") || lower.includes("macbook")) return mockResults.laptop;
  return mockResults.mouse; // default
}

export default function ShoppingPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [compared, setCompared] = useState<Set<number>>(new Set());

  const handleSearch = () => {
    if (!query.trim()) return;
    setResults(searchProducts(query));
    setCompared(new Set());
  };

  const toggleCompare = (i: number) => {
    setCompared(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const comparedProducts = Array.from(compared).map(i => results[i]).filter(Boolean);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading text-2xl font-bold text-foreground mb-1">Shopping Assistance</h1>
        <p className="text-sm text-muted-foreground mb-4">Find and compare the best products.</p>
      </motion.div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search products... e.g. 'Best gaming mouse'"
            className="w-full h-12 rounded-xl bg-muted border border-border pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <Button onClick={handleSearch} variant="hero" size="lg">Search</Button>
      </div>

      {results.length > 0 && (
        <div className="grid md:grid-cols-3 gap-4">
          {results.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`glass-panel rounded-xl p-6 transition-all duration-300 ${compared.has(i) ? "border-primary/50 glow-primary" : "hover-glow"}`}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-heading font-semibold text-foreground text-sm">{p.name}</h3>
                <span className="text-primary font-bold text-lg">{p.price}</span>
              </div>
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className={`h-3.5 w-3.5 ${s < Math.floor(p.rating) ? "text-primary fill-primary" : "text-muted-foreground"}`} />
                ))}
                <span className="text-xs text-muted-foreground ml-1">{p.rating}</span>
              </div>
              <div className="space-y-2 mb-4">
                {p.pros.map(pr => (
                  <div key={pr} className="flex items-center gap-2 text-xs">
                    <ThumbsUp className="h-3 w-3 text-primary shrink-0" />
                    <span className="text-foreground">{pr}</span>
                  </div>
                ))}
                {p.cons.map(c => (
                  <div key={c} className="flex items-center gap-2 text-xs">
                    <ThumbsDown className="h-3 w-3 text-destructive shrink-0" />
                    <span className="text-muted-foreground">{c}</span>
                  </div>
                ))}
              </div>
              <Button variant={compared.has(i) ? "default" : "outline"} size="sm" className="w-full" onClick={() => toggleCompare(i)}>
                {compared.has(i) ? "Selected" : "Compare"}
              </Button>
            </motion.div>
          ))}
        </div>
      )}

      {comparedProducts.length >= 2 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel rounded-xl p-6">
          <h3 className="font-heading font-semibold text-foreground mb-4">Comparison Table</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 text-muted-foreground font-medium">Feature</th>
                  {comparedProducts.map(p => (
                    <th key={p.name} className="text-left py-3 text-foreground font-medium">{p.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50">
                  <td className="py-3 text-muted-foreground">Price</td>
                  {comparedProducts.map(p => <td key={p.name} className="py-3 text-primary font-bold">{p.price}</td>)}
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 text-muted-foreground">Rating</td>
                  {comparedProducts.map(p => <td key={p.name} className="py-3 text-foreground">{p.rating}/5</td>)}
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 text-muted-foreground">Pros</td>
                  {comparedProducts.map(p => <td key={p.name} className="py-3 text-foreground">{p.pros.join(", ")}</td>)}
                </tr>
                <tr>
                  <td className="py-3 text-muted-foreground">Cons</td>
                  {comparedProducts.map(p => <td key={p.name} className="py-3 text-muted-foreground">{p.cons.join(", ")}</td>)}
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
}
