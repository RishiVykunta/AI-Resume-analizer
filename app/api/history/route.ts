import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const resumes = await prisma.resume.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        analysis: true,
      },
    });

    return NextResponse.json(resumes);
  } catch (error: any) {
    console.error("History API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
