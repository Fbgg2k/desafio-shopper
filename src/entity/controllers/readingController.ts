import { Request, Response } from 'express';
import { processImage } from '../services/geminiService';

export const uploadReading = async (req: Request, res: Response) => {
  try {
    const { imagePath } = req.body;
    const data = await processImage(imagePath);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to process image' });
  }
};
