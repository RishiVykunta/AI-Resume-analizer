import pdf from 'pdf-parse';

export async function extractTextFromPDF(buffer: Buffer) {
  try {
    const data = await pdf(buffer);
    return data.text;
  } catch (error) {
    console.error("PDF Parsing Error:", error);
    throw error;
  }
}
