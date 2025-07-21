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
    
    console.log(`📋 PDF list requested from: ${req.headers.origin || 'unknown origin'}`);
    
    // Check if pdfs directory exists
    if (!fs.existsSync(pdfDir)) {
      console.log('📁 PDFs directory does not exist');
      return res.json({ success: true, pdfs: [], message: 'PDF directory not found' });
    }

    const files = fs.readdirSync(pdfDir);
    
    const pdfs = files
      .filter((f) => f.toLowerCase().endsWith('.pdf'))
      .map((filename) => {
        try {
          const filePath = path.join(pdfDir, filename);
          const stats = fs.statSync(filePath);
          return {
            filename,
            title: filename.replace('.pdf', '').replace(/[-_]/g, ' '),
            size: stats.size,
            lastModified: stats.mtime,
          };
        } catch (error) {
          console.error(`❌ Error reading file ${filename}:`, error);
          return null;
        }
      })
      .filter(Boolean); // Remove null entries

    console.log(`✅ Found ${pdfs.length} PDF files, sending to client`);
    res.json({ 
      success: true, 
      pdfs,
      count: pdfs.length,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Error reading PDF directory:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to read PDF directory',
      details: process.env.NODE_ENV === 'development' ? error.message : 'Internal error'
    });
  }
}