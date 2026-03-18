import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary/30 flex flex-col">
      <Navbar />
      <div className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {children}
        </div>
      </div>
      <Footer />
      {/* Background radial gradient for modern look */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 h-[500px] w-[500px] bg-primary/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-red-900/10 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />
      </div>
    </div>
  );
}
