import type { VercelRequest, VercelResponse } from '@vercel/node';
import app from '../src/index';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Handle the request using Express app
    await new Promise((resolve, reject) => {
      app(req, res);
      
      // Check if response has been sent
      const originalSend = res.send;
      const originalJson = res.json;
      const originalEnd = res.end;
      
      res.send = function(data) {
        resolve(data);
        return originalSend.call(this, data);
      };
      
      res.json = function(data) {
        resolve(data);
        return originalJson.call(this, data);
      };
      
      res.end = function(data) {
        resolve(data);
        return originalEnd.call(this, data);
      };
      
      // Set a timeout to avoid hanging
      setTimeout(() => {
        if (!res.headersSent) {
          reject(new Error('Request timeout'));
        }
      }, 25000);
    });
  } catch (error) {
    console.error('Handler error:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
