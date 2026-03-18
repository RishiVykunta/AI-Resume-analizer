<div align="center">
  
# 🚀 AI Resume Analyzer

**An intelligent, context-aware ATS optimization platform powered by Next.js 15 and Google Gemini 2.5 Flash.**

[![Next.js](https://img.shields.io/badge/Next.js-15.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.0-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)

[Live Demo](https://ai-resume-analizer-sage.vercel.app/)

</div>

<br />

## 📖 Overview

The **AI Resume Analyzer** is a modern, full-stack web application designed to help job seekers instantly evaluate and optimize their resumes against Applicant Tracking Systems (ATS). By leveraging Google's state-of-the-art **Gemini 2.5 Flash** AI model, the platform provides tailored, actionable feedback to maximize hiring potential.

Unlike generic resume scanners, this application features **Context-Aware Analysis**, allowing users to upload a target job description and role to receive strict, customized grading.

## ✨ Key Features

- **🧠 Advanced AI Engine**: Powered by Google Gemini 2.5 Flash to rapidly extract PDF text and evaluate semantic matches.
- **🎯 Context-Aware Grading**: Input an optional target role and job description to force the AI to grade the resume exactly how a recruiter would for that specific position.
- **📊 Comprehensive Dashboards**: Visualizes the ATS Score out of 100, detected skills, missing keywords, strengths, weaknesses, and actionable improvement suggestions.
- **🔐 Secure Authentication**: Implements NextAuth.js (Auth.js v5) with secure **GitHub OAuth** integration and a seamless demo login for instant access.
- **📁 Drag & Drop Interface**: Features a beautiful, interactive drag-and-drop file upload zone built with Framer Motion.
- **🖨️ Export & Share**: Fully implemented Web Share API native linking and a responsive Print-to-PDF architecture.
- **⚡ Serverless Architecture**: Optimized for Vercel deployments with extended API route limits and properly configured Node.js binary compatibility.

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Library**: React 19
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React

### Backend & Database
- **API**: Next.js API Routes (Serverless)
- **Database**: Neon Serverless PostgreSQL
- **ORM**: Prisma
- **AI Integration**: `@google/generative-ai` SDK
- **PDF Parsing**: Native `pdf-parse`

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A Google Gemini API Key
- A PostgreSQL Database URL (Neon recommended)
- GitHub OAuth Credentials

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/RishiVykunta/AI-Resume-analizer.git
   cd AI-Resume-analizer
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
   GOOGLE_GEMINI_API_KEY="your_gemini_api_key_here"
   
   # Authentication
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your_random_secret_string"
   AUTH_GITHUB_ID="your_github_client_id"
   AUTH_GITHUB_SECRET="your_github_client_secret"
   ```

4. **Initialize Database:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```
   *Open [http://localhost:3000](http://localhost:3000) to view the application.*

## 📈 Database Schema

The platform uses a relational architecture to store users, resumes, and deep AI analysis chunks securely.
- `Resume`: Tracks the file, target role, parsed ATS score, and creation metadata.
- `Analysis`: Intricately maps JSON structures of detected skills, weaknesses, and strengths directly back to individual resumes.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!

---
<div align="center">
  <i>Built thoughtfully by Rishi Vykunta.</i>
</div>
