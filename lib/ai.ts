import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "");
const MODEL_NAME = "gemini-2.5-flash"; // Using the 2.5 model natively supported by this key
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

export async function analyzeResume(resumeText: string, targetRole?: string | null, jobDescription?: string | null) {
  console.log(`Analyzing resume with model: ${MODEL_NAME}`);
  
  const roleContext = targetRole ? `\nTarget Role: ${targetRole}` : "";
  const jdContext = jobDescription ? `\nJob Description: ${jobDescription}` : "";

  const prompt = `
    You are an expert ATS (Applicant Tracking System) optimizer and Senior Technical Recruiter. 
    Analyze the following resume text.
    ${roleContext}
    ${jdContext}
    
    If a Target Role or Job Description is provided above, grade the resume strictly against how well it matches those specific requirements. If none are provided, grade it generally for ATS optimization best practices.

    Resume Text:
    ${resumeText}
    
    Expected JSON Format:
    {
      "atsScore": number (0-100),
      "skillsDetected": string[],
      "missingSkills": string[],
      "strengths": string[],
      "weaknesses": string[],
      "suggestions": string[]
    }
    
    Ensure the JSON is valid and only return the JSON object.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    // Extract JSON from the text (in case Gemini wraps it in markdown blocks)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Failed to parse AI response as JSON");
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
}
