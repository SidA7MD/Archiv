import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const pdfDir = path.join(process.cwd(), 'public', 'pdfs');
    let pdfCount = 0;
    
    if (fs.existsSync(pdfDir)) {
      pdfCount = fs.readdirSync(pdfDir).filter(f => f.toLowerCase().endsWith('.pdf')).length;
    }
    
    res.json({
      success: true,
      server: 'Archiv Backend',
      version: '1.0.0',
      environment: process.env.VERCEL_ENV || 'development',
      pdfCount,
      timestamp: new Date().toISOString(),
      platform: 'Vercel Serverless'
    });
  } catch (error) {
    console.error('Error in info endpoint:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
  }
}