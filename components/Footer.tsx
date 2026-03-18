import Link from "next/link";
import { Github, Instagram, Linkedin, Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/50 backdrop-blur-xl mt-24">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
                <Zap className="h-6 w-6 fill-current" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Resume<span className="text-primary">AI</span>
              </span>
            </Link>
            <p className="max-w-xs text-secondary leading-relaxed">
              Professional AI-powered resume analysis to help you land your dream job. 
              Built for modern professionals and recruiters.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com/RishiVykunta" target="_blank" rel="noopener noreferrer" className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 text-secondary hover:text-white hover:bg-white/10 transition-all">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/rish_i__x?igsh=MW5kOXpjbTNzcGc3bw%3D%3D" target="_blank" rel="noopener noreferrer" className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 text-secondary hover:text-white hover:bg-white/10 transition-all">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/in/rishi-vykunta-1154a932b/" target="_blank" rel="noopener noreferrer" className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 text-secondary hover:text-white hover:bg-white/10 transition-all">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-6">Product</h4>
            <ul className="space-y-4 text-secondary text-sm font-medium">
              <li><Link href="/upload" className="hover:text-primary transition-colors">Analyze Resume</Link></li>
              <li><Link href="/history" className="hover:text-primary transition-colors">History</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-6">Connect</h4>
            <ul className="space-y-4 text-secondary text-sm font-medium">
              <li><a href="https://www.instagram.com/rish_i__x?igsh=MW5kOXpjbTNzcGc3bw%3D%3D" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Discord</a></li>
              <li><a href="https://www.linkedin.com/in/rishi-vykunta-1154a932b/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LinkedIn</a></li>
              <li><a href="https://github.com/RishiVykunta" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">GitHub</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-secondary text-xs font-medium uppercase tracking-tighter">
          <p>© 2026 ResumeAI Analyzer. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
