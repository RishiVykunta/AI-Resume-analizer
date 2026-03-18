"use client";

import { useState, useCallback } from "react";
import { Upload, X, FileText, Loader2, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface UploadBoxProps {
  onUpload: (file: File) => void;
  isUploading: boolean;
}

export function UploadBox({ onUpload, isUploading }: UploadBoxProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
    }
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    }
  }, []);

  const handleClear = useCallback(() => {
    setFile(null);
  }, []);

  const handleUpload = useCallback(() => {
    if (file) {
      onUpload(file);
    }
  }, [file, onUpload]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative group cursor-pointer overflow-hidden rounded-3xl border-2 border-dashed p-12 transition-all duration-300",
          isDragging
            ? "border-primary bg-primary/5"
            : file
            ? "border-green-500/50 bg-green-500/5"
            : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
        )}
      >
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="absolute inset-0 opacity-0 cursor-pointer z-10"
          disabled={isUploading}
        />
        
        <div className="flex flex-col items-center justify-center text-center gap-4">
          <div className={cn(
            "flex h-20 w-20 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110",
            file ? "bg-green-500/10 text-green-500" : "bg-primary/10 text-primary"
          )}>
            {file ? <CheckCircle2 className="h-10 w-10" /> : <Upload className="h-10 w-10" />}
          </div>
          
          <div className="space-y-1">
            <h3 className="text-2xl font-bold">
              {file ? file.name : "Upload your resume"}
            </h3>
            <p className="text-secondary text-sm">
              {file 
                ? `${(file.size / 1024 / 1024).toFixed(2)} MB • PDF format`
                : "Drag and drop your PDF here, or click to browse"
              }
            </p>
          </div>
        </div>

        {file && !isUploading && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClear();
            }}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/5 text-secondary hover:bg-white/10 hover:text-white transition-colors z-20"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {file && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-6"
          >
            <button
              onClick={handleUpload}
              disabled={isUploading}
              className="w-full flex items-center justify-center gap-3 rounded-2xl bg-primary py-4 text-lg font-bold text-white transition-all hover:bg-red-500 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-[0_0_20px_rgba(239,68,68,0.2)]"
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-6 w-6 animate-spin" />
                  Analyzing Resume...
                </>
              ) : (
                <>
                  <FileText className="h-6 w-6" />
                  Analyze with AI
                </>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
