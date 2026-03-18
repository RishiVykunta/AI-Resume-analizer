"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, FileSearch, ShieldCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-24 py-12">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary shadow-sm"
        >
          <Zap className="h-4 w-4" />
          <span>Powered by Gemini 1.5 Flash</span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-4xl text-5xl font-extrabold tracking-tight sm:text-7xl"
        >
          Optimize Your Resume for <span className="text-primary italic">Success</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl text-lg text-secondary sm:text-xl"
        >
          AI-powered resume analysis that gives you the edge. Get detailed ATS scoring, 
          skill gap analysis, and tailored improvement suggestions in seconds.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-4"
        >
          <Link
            href="/upload"
            className="flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-red-500 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(239,68,68,0.3)]"
          >
            Upload Resume <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="/history"
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-white/10"
          >
            View History
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: "ATS Optimization",
            description: "Industry-standard scoring to ensure your resume passes any automated screening.",
            icon: ShieldCheck,
          },
          {
            title: "Skill Analysis",
            description: "Automatically detect skills and identify critical missing keywords for your target roles.",
            icon: FileSearch,
          },
          {
            title: "Smart Suggestions",
            description: "Get actionable advice on how to improve your experience and project descriptions.",
            icon: CheckCircle2,
          },
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative rounded-3xl border border-white/10 bg-card p-8 transition-all hover:border-primary/50 hover:bg-primary/[0.02]"
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
              <feature.icon className="h-8 w-8" />
            </div>
            <h3 className="mb-3 text-2xl font-bold">{feature.title}</h3>
            <p className="text-secondary leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
