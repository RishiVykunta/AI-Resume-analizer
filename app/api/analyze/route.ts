import { NextRequest, NextResponse } from "next/server";
import { extractTextFromPDF } from "@/lib/pdf-parser";
import { analyzeResume } from "@/lib/ai";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    console.log("Extracting text from PDF...");
    const buffer = Buffer.from(await file.arrayBuffer());
    const text = await extractTextFromPDF(buffer);
    console.log("Text extracted, length:", text.length);

    console.log("Analyzing resume with Gemini...");
    const analysisResult = await analyzeResume(text);
    console.log("Analysis complete:", analysisResult);

    // Save to database
    const resume = await prisma.resume.create({
      data: {
        fileName: file.name,
        atsScore: analysisResult.atsScore,
        analysis: {
          create: {
            skillsDetected: analysisResult.skillsDetected,
            missingSkills: analysisResult.missingSkills,
            strengths: analysisResult.strengths,
            weaknesses: analysisResult.weaknesses,
            suggestions: analysisResult.suggestions,
          },
        },
      },
      include: {
        analysis: true,
      },
    });

    return NextResponse.json(resume);
  } catch (error: any) {
    console.error("Upload API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
