"use client";

import { signIn } from "next-auth/react";
import { Github, Mail, Lock, Zap, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8 rounded-3xl border border-white/10 bg-card p-10 shadow-2xl"
      >
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white">
            <Zap className="h-8 w-8 fill-current" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white">
            Welcome Back
          </h2>
          <p className="text-secondary text-sm">
            Sign in to access your resume analysis history
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <button
            onClick={() => signIn("github", { callbackUrl: "/" })}
            className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 py-3.5 text-sm font-bold text-white transition-all hover:bg-white/10 hover:border-white/20 active:scale-95"
          >
            <Github className="h-5 w-5" />
            Continue with GitHub
          </button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/5" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-secondary font-bold tracking-widest">Or Use Credentials</span>
            </div>
          </div>

          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              signIn("credentials", {
                email: formData.get("email"),
                password: formData.get("password"),
                callbackUrl: "/",
              });
            }}
            className="space-y-4"
          >
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-secondary flex items-center gap-2">
                <Mail className="h-3 w-3" /> Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="email@example.com"
                required
                className="w-full rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white focus:border-primary/50 focus:outline-none transition-all"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-secondary flex items-center gap-2">
                <Lock className="h-3 w-3" /> Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  required
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white focus:border-primary/50 focus:outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full rounded-2xl bg-primary py-4 text-sm font-bold text-white transition-all hover:bg-red-500 hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(239,68,68,0.2)]"
            >
              Sign In
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-secondary mt-8 leading-relaxed">
          By continuing, you agree to our <br />
          <Link href="#" className="underline hover:text-white">Terms of Service</Link> and <Link href="#" className="underline hover:text-white">Privacy Policy</Link>.
        </p>
      </motion.div>
    </div>
  );
}
