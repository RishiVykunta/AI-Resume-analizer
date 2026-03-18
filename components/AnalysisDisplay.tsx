"use client";

import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, TrendingUp, Search, MessageSquare, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScoreCardProps {
  score: number;
}

export function ScoreCard({ score }: ScoreCardProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-card p-8 flex flex-col items-center justify-center gap-6">
      <div className="relative h-40 w-40">
        {/* Progress Circle */}
        <svg className="h-full w-full transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r="70"
            className="stroke-white/5 fill-none"
            strokeWidth="12"
          />
          <motion.circle
            cx="80"
            cy="80"
            r="70"
            className="stroke-primary fill-none shadow-lg"
            strokeWidth="12"
            strokeLinecap="round"
            initial={{ strokeDasharray: "0, 440" }}
            animate={{ strokeDasharray: `${(score / 100) * 440}, 440` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl font-black text-white"
          >
            {score}
          </motion.span>
          <span className="text-secondary text-xs uppercase tracking-widest font-bold">ATS Score</span>
        </div>
      </div>
      
      <div className="text-center space-y-2">
        <h3 className="text-xl font-bold">
          {score >= 80 ? "Excellent Match!" : score >= 60 ? "Good Potential" : "Needs Improvement"}
        </h3>
        <p className="text-secondary text-sm max-w-[200px]">
          {score >= 80 
            ? "Your resume is highly optimized for current ATS standards." 
            : "Some critical improvements can boost your visibility significantly."
          }
        </p>
      </div>
    </div>
  );
}

interface ListCardProps {
  title: string;
  items: string[];
  type: "success" | "warning" | "neutral";
  icon: any;
}

export function SkillList({ title, items, type, icon: Icon }: ListCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-card p-6 space-y-4">
      <div className="flex items-center gap-3">
        <div className={cn(
          "flex h-10 w-10 items-center justify-center rounded-xl",
          type === "success" ? "bg-green-500/10 text-green-500" : 
          type === "warning" ? "bg-red-500/10 text-red-500" : "bg-primary/10 text-primary"
        )}>
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <span 
            key={i}
            className={cn(
              "px-3 py-1.5 rounded-lg text-sm font-medium border",
              type === "success" ? "bg-green-500/5 border-green-500/20 text-green-400" : 
              type === "warning" ? "bg-red-500/5 border-red-500/20 text-red-400" : "bg-white/5 border-white/10 text-white"
            )}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function AnalysisCard({ children, title }: { children: React.ReactNode, title?: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-card p-6 space-y-4">
      {title && <h3 className="text-xl font-bold">{title}</h3>}
      {children}
    </div>
  );
}

export function SuggestionPanel({ title, items }: { title: string, items: string[] }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-card p-8 space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Lightbulb className="h-5 w-5" />
        </div>
        <h3 className="text-2xl font-bold">{title}</h3>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {items.map((item, i) => (
          <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 items-start">
            <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
            <p className="text-secondary leading-relaxed">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
