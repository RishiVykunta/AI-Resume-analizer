"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ScoreCard, SkillList, SuggestionPanel } from "@/components/AnalysisDisplay";
import { CheckCircle2, AlertCircle, Search, TrendingUp, MessageSquare, Briefcase } from "lucide-react";
import axios from "axios";

export default function DashboardPage() {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/analysis/${id}`);
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch analysis:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-20 w-20 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!data) return <div className="text-center py-20">Analysis not found.</div>;

  const analysis = data.analysis[0];

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "My ATS Resume Score",
          text: `I scored ${data.atsScore}/100 on my resume! Check out my AI analysis.`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-2 text-center md:text-left">
          <h1 className="text-4xl font-extrabold">{data.fileName}</h1>
          <p className="text-secondary text-lg italic">Analyzed on {new Date(data.createdAt).toLocaleDateString()}</p>
        </div>
        <div className="flex gap-4 print:hidden">
          <button 
            onClick={handlePrint}
            className="px-6 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm font-medium">
            Download PDF
          </button>
          <button 
            onClick={handleShare}
            className="px-6 py-2 rounded-xl bg-primary text-white hover:bg-red-500 transition-all text-sm font-medium shadow-lg shadow-primary/20">
            Share Results
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <ScoreCard score={data.atsScore} />
        </div>
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <SkillList 
            title="Skills Detected" 
            items={analysis.skillsDetected} 
            type="success" 
            icon={CheckCircle2} 
          />
          <SkillList 
            title="Missing Skills" 
            items={analysis.missingSkills} 
            type="warning" 
            icon={Briefcase} 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <SkillList 
            title="Key Strengths" 
            items={analysis.strengths} 
            type="neutral" 
            icon={TrendingUp} 
          />
          <SkillList 
            title="Weaknesses" 
            items={analysis.weaknesses} 
            type="neutral" 
            icon={AlertCircle} 
          />
        </div>
        <SuggestionPanel 
          title="Improvement Suggestions" 
          items={analysis.suggestions} 
        />
      </div>
    </div>
  );
}
