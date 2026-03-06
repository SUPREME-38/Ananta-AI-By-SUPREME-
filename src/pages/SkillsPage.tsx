import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const skills = [
  {
    name: "Programming",
    roadmap: [
      { level: "Beginner", steps: ["Learn variables & data types", "Understand control flow (loops, if/else)", "Write simple functions", "Practice with small projects"] },
      { level: "Intermediate", steps: ["Learn OOP concepts", "Understand data structures", "Practice algorithms", "Build a CLI application"] },
      { level: "Advanced", steps: ["System design principles", "Design patterns", "Performance optimization", "Contribute to open source"] },
    ],
  },
  {
    name: "Web Development",
    roadmap: [
      { level: "Beginner", steps: ["Learn HTML & CSS basics", "Understand responsive design", "JavaScript fundamentals", "Build a static website"] },
      { level: "Intermediate", steps: ["Learn React or Vue", "State management", "REST APIs & fetch", "Build a full-stack app"] },
      { level: "Advanced", steps: ["TypeScript mastery", "Testing strategies", "CI/CD pipelines", "Performance & SEO optimization"] },
    ],
  },
  {
    name: "AI & Machine Learning",
    roadmap: [
      { level: "Beginner", steps: ["Python fundamentals", "Linear algebra basics", "Statistics & probability", "Intro to NumPy & Pandas"] },
      { level: "Intermediate", steps: ["Supervised learning", "Neural networks", "TensorFlow / PyTorch basics", "Build a classification model"] },
      { level: "Advanced", steps: ["Deep learning architectures", "NLP & Computer Vision", "MLOps & deployment", "Research & publish papers"] },
    ],
  },
  {
    name: "Entrepreneurship",
    roadmap: [
      { level: "Beginner", steps: ["Identify problems worth solving", "Customer discovery", "Lean startup methodology", "Build an MVP"] },
      { level: "Intermediate", steps: ["Product-market fit", "Business model canvas", "Fundraising basics", "Marketing & growth"] },
      { level: "Advanced", steps: ["Scaling operations", "Team building & culture", "Financial management", "Exit strategies"] },
    ],
  },
];

export default function SkillsPage() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  const skill = skills.find(s => s.name === selectedSkill);

  const toggleComplete = (step: string) => {
    setCompleted(prev => {
      const next = new Set(prev);
      next.has(step) ? next.delete(step) : next.add(step);
      return next;
    });
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading text-2xl font-bold text-foreground mb-1">Skill Unlocking</h1>
        <p className="text-sm text-muted-foreground mb-4">Select a skill to get your AI-generated learning roadmap.</p>
      </motion.div>

      {!selectedSkill ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {skills.map((s, i) => (
            <motion.button
              key={s.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => setSelectedSkill(s.name)}
              className="glass-panel rounded-xl p-6 text-center hover-glow transition-all duration-300 group"
            >
              <h3 className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors">{s.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{s.roadmap.length} levels</p>
            </motion.button>
          ))}
        </div>
      ) : (
        <div>
          <Button variant="ghost" size="sm" onClick={() => setSelectedSkill(null)} className="mb-4">
            ← Back to Skills
          </Button>
          <h2 className="font-heading text-xl font-bold text-foreground mb-6">{selectedSkill} Roadmap</h2>
          <div className="space-y-8">
            {skill?.roadmap.map((level, li) => (
              <motion.div key={level.level} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: li * 0.15 }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                    {li + 1}
                  </div>
                  <h3 className="font-heading font-semibold text-foreground">{level.level}</h3>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <div className="ml-4 border-l-2 border-border pl-6 space-y-3">
                  {level.steps.map((step) => {
                    const done = completed.has(`${selectedSkill}-${step}`);
                    return (
                      <button
                        key={step}
                        onClick={() => toggleComplete(`${selectedSkill}-${step}`)}
                        className={`flex items-center gap-3 w-full text-left p-3 rounded-lg transition-all duration-200 ${
                          done ? "bg-primary/10 border border-primary/20" : "glass-panel hover-glow"
                        }`}
                      >
                        {done ? (
                          <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                        ) : (
                          <Circle className="h-5 w-5 text-muted-foreground shrink-0" />
                        )}
                        <span className={`text-sm ${done ? "text-primary" : "text-foreground"}`}>{step}</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
