import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { initializeDeepSeekClient } from './server/services/deepseekClient';
import analyzeResumeRouter from './server/routes/analyzeResume';
import chatCoachRouter from './server/routes/chatCoach';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize the DeepSeek AI SDK if the key is present
const apiKey = process.env.DEEPSEEK_API_KEY;

if (apiKey) {
  initializeDeepSeekClient(apiKey);
} else {
  console.warn('DEEPSEEK_API_KEY environment variable not detected. Fallbacks enabled.');
}

// Mount API routes
app.use(analyzeResumeRouter);
app.use(chatCoachRouter);

// Serve frontend application static assets in production mode
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite middleware mounted in Development mode.');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Production static asset pipelines active.');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`NextMove AI Full-Stack Server executing seamlessly on port ${PORT}`);
  });
}

startServer();
