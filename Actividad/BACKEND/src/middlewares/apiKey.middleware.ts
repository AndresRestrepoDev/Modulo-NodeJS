import type { Request, Response, NextFunction } from 'express';
import 'dotenv/config';

export const validateApiKey = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ message: 'API Key inválida o ausente' });
  }
  next();
};


