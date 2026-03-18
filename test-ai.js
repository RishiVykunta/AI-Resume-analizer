const pdf = require('pdf-parse');
const fs = require('fs');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function test() {
  console.log("Testing PDF Parse...");
  try {
    // If you have a sample resume.pdf, use it. Otherwise, let's just test the logic with a dummy buffer if needed.
    // But better to test the AI connection.
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "");
    const models = ["gemini-1.5-flash", "gemini-1.5-flash-latest", "gemini-pro"];
    
    for (const modelName of models) {
      console.log(`Testing model: ${modelName}`);
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Hello, are you working?");
        const response = await result.response;
        console.log(`Model ${modelName} working:`, response.text());
        break; // Stop if one works
      } catch (e) {
        console.error(`Model ${modelName} failed:`, e);
      }
    }
  } catch (e) {
    console.error("Test failed:", e);
  }
}

test();
