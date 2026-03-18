const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

async function checkModels() {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
  console.log("Checking available models...");
  try {
    const models = ["gemini-2.0-flash", "gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro"];
    let found = false;
    for (const m of models) {
      try {
        const model = genAI.getGenerativeModel({ model: m });
        const res = await model.generateContent("Say hi");
        console.log(" SUCCESS with model:", m);
        console.log(" Response:", await res.response.text());
        found = true;
        break; // Stop on first success
      } catch(e) {
        console.log(" FAILED with model:", m, "->", e.message);
      }
    }
    if (!found) console.log("All tested models failed with this API key.");
  } catch(e) {
    console.error("General error:", e.message);
  }
}
checkModels();
