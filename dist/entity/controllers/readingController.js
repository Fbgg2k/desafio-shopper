"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadReading = void 0;
const geminiService_1 = require("../services/geminiService");
const uploadReading = async (req, res) => {
    try {
        const { imagePath } = req.body;
        const data = await (0, geminiService_1.processImage)(imagePath);
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to process image' });
    }
};
exports.uploadReading = uploadReading;
