"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { FileText, History, Upload, Zap, LogOut, User as UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Analyze", href: "/upload", icon: Upload },
  { name: "History", href: "/history", icon: History },
];

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white transition-transform group-hover:scale-110">
            <Zap className="h-6 w-6 fill-current" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Resume<span className="text-primary">AI</span>
          </span>
        </Link>
        <div className="flex items-center gap-1 sm:gap-4 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-full px-4 py-2 transition-colors",
                pathname === item.href
                  ? "bg-primary text-white"
                  : "text-secondary hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{item.name}</span>
            </Link>
          ))}
          
          {session ? (
            <div className="flex items-center gap-3 ml-2">
              <div className="hidden sm:flex flex-col items-end mr-1 text-[10px] uppercase tracking-widest font-bold">
                <span className="text-white line-clamp-1">{session.user?.name}</span>
                <span className="text-secondary line-clamp-1">{session.user?.email}</span>
              </div>
              <button 
                onClick={() => signOut()}
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-secondary hover:text-primary hover:border-primary/50 transition-all"
                title="Sign Out"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => signIn()}
              className="ml-2 rounded-full border border-white/20 bg-white/5 px-6 py-2 text-white transition-all hover:bg-white/10 hover:border-white/30"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
