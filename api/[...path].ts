import type { VercelRequest, VercelResponse } from '@vercel/node';
import app from '../src/index';

export default function handler(req: VercelRequest, res: VercelResponse) {
  return new Promise((resolve, reject) => {
    // Use the Express app to handle the request
    app(req, res);
    
    // Listen for the response to finish
    res.on('finish', () => {
      resolve(res);
    });
    
    res.on('error', (err) => {
      reject(err);
    });
  });
}
