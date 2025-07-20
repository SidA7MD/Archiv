import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://archiv.onrender.com', 'https://your-frontend-domain.com'] 
    : ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:3000', 'http://127.0.0.1:5173'],
  credentials: true
}));

// Parse JSON bodies
app.use(express.json());

// Serve static files from pdfs directory
app.use('/pdfs', express.static(path.join(__dirname, 'pdfs')));

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Archiv Backend Server is running!',
    timestamp: new Date().toISOString()
  });
});

// API endpoint to list PDFs
app.get('/api/pdf/list', (req, res) => {
  const pdfDir = path.join(__dirname, 'pdfs');
  
  // Check if pdfs directory exists
  if (!fs.existsSync(pdfDir)) {
    console.log('PDFs directory does not exist, creating it...');
    fs.mkdirSync(pdfDir, { recursive: true });
    return res.json({ success: true, pdfs: [] });
  }

  fs.readdir(pdfDir, (err, files) => {
    if (err) {
      console.error('Error reading PDF directory:', err);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to read PDF directory',
        details: err.message 
      });
    }

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
          console.error(`Error reading file ${filename}:`, error);
          return null;
        }
      })
      .filter(Boolean); // Remove null entries

    console.log(`Found ${pdfs.length} PDF files`);
    res.json({ success: true, pdfs });
  });
});

// Serve individual PDF files with proper headers
app.get('/pdfs/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'pdfs', filename);
  
  // Security check - prevent directory traversal
  if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
    return res.status(400).json({ success: false, error: 'Invalid filename' });
  }
  
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ success: false, error: 'File not found' });
  }
  
  // Set proper headers for PDF
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
  
  // Stream the file
  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);
  
  fileStream.on('error', (error) => {
    console.error('Error streaming file:', error);
    if (!res.headersSent) {
      res.status(500).json({ success: false, error: 'Error reading file' });
    }
  });
});

// API endpoint to get server info
app.get('/api/info', (req, res) => {
  res.json({
    success: true,
    server: 'Archiv Backend',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    success: false, 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler for unknown routes
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    error: 'Route not found',
    path: req.originalUrl 
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Backend server listening at http://localhost:${PORT}`);
  console.log(`📁 PDFs directory: ${path.join(__dirname, 'pdfs')}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  
  // Check if pdfs directory exists
  const pdfDir = path.join(__dirname, 'pdfs');
  if (!fs.existsSync(pdfDir)) {
    console.log('⚠️  PDFs directory does not exist, creating it...');
    fs.mkdirSync(pdfDir, { recursive: true });
  } else {
    const files = fs.readdirSync(pdfDir).filter(f => f.toLowerCase().endsWith('.pdf'));
    console.log(`📄 Found ${files.length} PDF files`);
  }
});