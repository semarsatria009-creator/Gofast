
import { GoogleGenAI, Type } from "@google/genai";

// Fixed: Instantiate GoogleGenAI within each service function to ensure the latest API key is used
export const getSmartFoodRecommendations = async (userPrompt: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Rekomendasikan 3 jenis makanan Indonesia berdasarkan permintaan berikut: "${userPrompt}". 
      Format dalam JSON array dengan properti: name, description, priceEstimate (number), and reason (kenapa cocok).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              description: { type: Type.STRING },
              priceEstimate: { type: Type.NUMBER },
              reason: { type: Type.STRING }
            },
            required: ["name", "description", "priceEstimate", "reason"]
          }
        }
      }
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Gemini Error:", error);
    return [];
  }
};

export const getSmartSearchAssistant = async (query: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Bantu pengguna menemukan apa yang mereka cari dalam aplikasi Ojek/Food Delivery. 
      Input: "${query}". Berikan respon singkat yang ramah dan informatif dalam Bahasa Indonesia.`,
      config: {
        systemInstruction: "Anda adalah asisten virtual GoFast yang ramah dan membantu pengguna memesan ojek atau makanan."
      }
    });
    return response.text;
  } catch (error) {
    return "Maaf, saya sedang kesulitan memproses permintaan Anda.";
  }
};
