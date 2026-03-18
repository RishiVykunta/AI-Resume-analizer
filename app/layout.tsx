import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Resume Analyzer",
  description: "Professional AI-powered resume analysis for ATS optimization",
};

import { PageLayout } from "@/components/PageLayout";
import { AuthProvider } from "@/components/AuthProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-white antialiased`}>
        <AuthProvider>
          <PageLayout>{children}</PageLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
