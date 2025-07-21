
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
    const { filename } = req.query;
    
    console.log(`📄 PDF requested: ${filename} from ${req.headers.origin || 'unknown origin'}`);
    
    // Security check - prevent directory traversal
    if (!filename || filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
      console.log(`⚠️  Security violation - invalid filename: ${filename}`);
      return res.status(400).json({ success: false, error: 'Invalid filename' });
    }
    
    const filePath = path.join(process.cwd(), 'public', 'pdfs', filename);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.log(`❌ File not found: ${filename}`);
      return res.status(404).json({ success: false, error: 'File not found' });
    }
    
    // Read file
    const fileBuffer = fs.readFileSync(filePath);
    
    // Set proper headers for PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
    res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
    res.setHeader('Content-Length', fileBuffer.length);
    
    console.log(`✅ Successfully served: ${filename}`);
    res.send(fileBuffer);

  } catch (error) {
    console.error('❌ Error serving PDF:', error);
    res.status(500).json({ success: false, error: 'Error reading file' });
  }
}