"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, Calendar, ArrowRight, TrendingUp } from "lucide-react";
import axios from "axios";

export default function HistoryPage() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get("/api/history");
        setHistory(response.data);
      } catch (error) {
        console.error("Failed to fetch history:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-20 w-20 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold sm:text-5xl">Analysis <span className="text-primary italic">History</span></h1>
        <p className="text-secondary text-lg">Your previously analyzed resumes and their ATS performance.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {history.length === 0 ? (
          <div className="text-center py-20 rounded-3xl border border-white/5 bg-white/[0.01]">
            <p className="text-secondary italic">No history found. Start by uploading a resume!</p>
          </div>
        ) : (
          history.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link 
                href={`/dashboard/${item.id}`}
                className="group flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-2xl border border-white/10 bg-card hover:border-primary/50 hover:bg-primary/[0.02] transition-all gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-secondary group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold group-hover:text-white transition-colors">{item.fileName}</h3>
                    <div className="flex items-center gap-3 text-secondary text-sm">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-8 w-full md:w-auto justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xs uppercase tracking-widest text-secondary font-bold">Score</p>
                      <p className="text-2xl font-black text-primary">{item.atsScore}%</p>
                    </div>
                    <div className="h-10 w-10 rounded-full border-2 border-primary/20 flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <ArrowRight className="h-6 w-6 text-secondary group-hover:text-primary transition-all group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
