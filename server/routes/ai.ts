import { Router, Request, Response } from 'express';
import { analyzeWithGemini, chatWithCivicAI } from '../services/geminiService';
import { getChallenges } from './challenges';

export const aiRouter = Router();

aiRouter.post('/analyze', async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, category, ward } = req.body;
    if (!title || !description) {
      res.status(400).json({ error: 'Title and description are required for AI analysis' });
      return;
    }

    const diagnostics = await analyzeWithGemini({
      title,
      description,
      category: category || 'General Civic Infrastructure',
      ward: ward || 'Ward 14',
    });

    res.json({ success: true, diagnostics });
  } catch (error) {
    console.error('Error analyzing problem:', error);
    res.status(500).json({ error: 'Internal AI service error' });
  }
});

aiRouter.post('/chat', async (req: Request, res: Response): Promise<void> => {
  try {
    const { message, userRole, history } = req.body;
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      res.status(400).json({ error: 'Valid message is required for AI chat' });
      return;
    }

    const currentChallenges = getChallenges();
    const result = await chatWithCivicAI({
      message,
      userRole: userRole || 'CITIZEN',
      history: history || [],
      challenges: currentChallenges,
    });

    res.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error('Error in AI chatbot conversation:', error);
    res.status(500).json({
      error: 'CivicSolve AI is temporarily unavailable. You can still browse challenges and submit a problem.',
    });
  }
});