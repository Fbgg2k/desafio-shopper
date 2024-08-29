"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processImage = void 0;
const generative_ai_1 = require("@google/generative-ai");
const fs_1 = __importDefault(require("fs"));
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    throw new Error('GEMINI_API_KEY não está definida');
}
const genAI = new generative_ai_1.GoogleGenerativeAI(apiKey);
const processImage = async (imagePath) => {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const image = {
            inlineData: {
                data: Buffer.from(fs_1.default.readFileSync(imagePath)).toString('base64'),
                mimeType: 'imagem.png',
            },
        };
        const result = await model.generateContent(["Este produto parece caseiro ou comprado em loja?", image]);
        return result.response.text();
    }
    catch (error) {
        console.error('Error processing image:', error);
        throw error;
    }
};
exports.processImage = processImage;
