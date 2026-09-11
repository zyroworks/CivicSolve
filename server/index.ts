import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { aiRouter } from './routes/ai';
import { challengesRouter } from './routes/challenges';
import { projectsRouter } from './routes/projects';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/ai', aiRouter);
app.use('/api/challenges', challengesRouter);
app.use('/api/projects', projectsRouter);

app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'CivicSolve Core API',
    version: '1.0.0',
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
  });
});

// Serve frontend static build in production
const distPath = path.resolve(__dirname, '../dist');
app.use(express.static(distPath));

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(` CivicSolve API Server running at http://localhost:${PORT}`);
  console.log(` Gemini AI Engine: ${process.env.GEMINI_API_KEY ? 'Active (Live API Key)' : 'Active (Deterministic Engine)'}`);
  console.log(`======================================================\n`);
});