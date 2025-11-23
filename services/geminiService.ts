/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from '../constants';

const getSystemInstruction = () => {
  const productContext = PRODUCTS.map(p => 
    `- ${p.name} ($${p.price}): ${p.description}. Features: ${p.features.join(', ')}`
  ).join('\n');

  return `You are "Chronos", the advanced research AI for "Ascend to Peak".
  Your persona is highly intelligent, clinical, and precise. Think of yourself as a lab assistant or a bio-engineer.
  
  Your Purpose:
  1. Assist users in finding research materials (peptides, coaching, software).
  2. Explain the scientific mechanism of action for compounds (ALWAYS stating "for research purposes only").
  3. Discuss "Looksmaxxing" concepts (bone structure, facial aesthetics) using anatomical terminology.
  
  Important Rules:
  - If asked about consuming peptides/SARMs, you MUST state: "These compounds are for laboratory research purposes only and not for human consumption. A medical prescription is required for purchase."
  - Be concise. Use bullet points for data.
  - Do not be "friendly" or "warm". Be helpful but efficient and neutral.
  
  Catalog:
  ${productContext}
  
  If asked about the "App", explain it connects users to doctors and graphics for cycle tracking.`;
};

export const sendMessageToGemini = async (history: {role: string, text: string}[], newMessage: string): Promise<string> => {
  try {
    let apiKey: string | undefined;
    
    try {
      apiKey = process.env.API_KEY;
    } catch (e) {
      console.warn("Accessing process.env failed");
    }
    
    if (!apiKey) {
      return "CONNECTION ERROR: API_KEY_MISSING. Chronos system offline.";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: getSystemInstruction(),
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text;

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "SYSTEM ERROR: Unable to access neural archives. Retrying connection...";
  }
};