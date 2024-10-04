import express from 'express';
import { generateThumbnail } from '../services/thumbnailService.js';

const router = express.Router();

router.post('/generate-thumbnail', async (req, res) => {
  console.log('Received request to /api/generate-thumbnail');
  console.log('Request body:', req.body);
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: 'Missing title or description' });
    }
    const thumbnailUrl = await generateThumbnail(title, description);
    console.log('Thumbnail generated successfully');

    res.json({ thumbnailUrl });
  } catch (error) {
    console.error('Error in thumbnail generation route:', error);
    if (error.message.includes('engine')) {
      res.status(400).json({ 
        error: 'Invalid engine configuration', 
        details: error.message 
      });
    } else if (error.message.includes('API key')) {
      res.status(401).json({ 
        error: 'Invalid API key', 
        details: 'Please check your Stability AI API key configuration' 
      });
    } else {
      res.status(500).json({ 
        error: 'Failed to generate thumbnail', 
        details: error.message 
      });
    }
  }
});

export default router;