"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadBox } from "@/components/UploadBox";
import { motion } from "framer-motion";

export default function UploadPage() {
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const handleUpload = async (file: File, role: string, jd: string) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      if (role) formData.append("role", role);
      if (jd) formData.append("jd", jd);
      
      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Upload failed: ${response.status} ${errorText}`);
      }
      
      const data = await response.json();
      
      // Navigate to dashboard with the analysis ID
      router.push(`/dashboard/${data.id}`);
    } catch (error: any) {
      console.error("Upload failed:", error);
      alert(`Error: ${error.message || "Failed to analyze resume. Please try again."}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-12">
      <div className="text-center space-y-4 max-w-2xl">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold sm:text-5xl"
        >
          Check Your <span className="text-primary italic">ATS Score</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-secondary text-lg"
        >
          Our AI will scan your resume for ATS compatibility, keyword match, and formatting issues.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full"
      >
        <UploadBox onUpload={handleUpload} isUploading={isUploading} />
      </motion.div>
    </div>
  );
}
