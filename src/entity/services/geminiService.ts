import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error('GEMINI_API_KEY não está definida');
}
const genAI = new GoogleGenerativeAI(apiKey);

export const processImage = async (imagePath: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const image = {
      inlineData: {
        data: Buffer.from(fs.readFileSync(imagePath)).toString('base64'),
        mimeType: 'imagem.png',
      },
    };
    const result = await model.generateContent(["Este produto parece caseiro ou comprado em loja?", image]);
    return result.response.text();
  } catch (error) {
    console.error('Error processing image:', error);
    throw error;
  }
};
