import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Updated CORS configuration for Vercel
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [
        'https://archiv.vercel.app',                    // Your main Vercel URL
        'https://archiv-git-main-sidt10s-projects.vercel.app', // Git branch deployments
        'https://archiv-sidt10s-projects.vercel.app',   // Alternative Vercel URL format
        /^https:\/\/archiv-.*\.vercel\.app$/,           // Any Vercel preview deployments
        'https://archiv.onrender.com',                  // Your backend URL (if needed)
        'https://your-custom-domain.com'                // Replace with your actual domain
      ]
    : [
        'http://localhost:3000', 
        'http://localhost:5173', 
        'http://127.0.0.1:3000', 
        'http://127.0.0.1:5173'
      ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'Accept',
    'Origin',
    'X-Requested-With'
  ]
}));

// Add preflight handling for complex CORS requests
app.options('*', cors());

// Parse JSON bodies
app.use(express.json());

// Add request logging in development
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - Origin: ${req.headers.origin || 'none'}`);
    next();
  });
}

// Serve static files from pdfs directory with proper headers
app.use('/pdfs', (req, res, next) => {
  // Add CORS headers for PDF files
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
}, express.static(path.join(__dirname, 'pdfs')));

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Archiv Backend Server is running!',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

// API endpoint to list PDFs
app.get('/api/pdf/list', (req, res) => {
  const pdfDir = path.join(__dirname, 'pdfs');
  
  console.log(`📋 PDF list requested from: ${req.headers.origin || 'unknown origin'}`);
  
  // Check if pdfs directory exists
  if (!fs.existsSync(pdfDir)) {
    console.log('📁 PDFs directory does not exist, creating it...');
    fs.mkdirSync(pdfDir, { recursive: true });
    return res.json({ success: true, pdfs: [], message: 'PDF directory created but empty' });
  }

  fs.readdir(pdfDir, (err, files) => {
    if (err) {
      console.error('❌ Error reading PDF directory:', err);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to read PDF directory',
        details: process.env.NODE_ENV === 'development' ? err.message : 'Internal error'
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
  });
});

// Serve individual PDF files with proper headers
app.get('/pdfs/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'pdfs', filename);
  
  console.log(`📄 PDF requested: ${filename} from ${req.headers.origin || 'unknown origin'}`);
  
  // Security check - prevent directory traversal
  if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
    console.log(`⚠️  Security violation - invalid filename: ${filename}`);
    return res.status(400).json({ success: false, error: 'Invalid filename' });
  }
  
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    console.log(`❌ File not found: ${filename}`);
    return res.status(404).json({ success: false, error: 'File not found' });
  }
  
  // Set proper headers for PDF
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
  res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
  
  // Stream the file
  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);
  
  fileStream.on('error', (error) => {
    console.error('❌ Error streaming file:', error);
    if (!res.headersSent) {
      res.status(500).json({ success: false, error: 'Error reading file' });
    }
  });
  
  fileStream.on('end', () => {
    console.log(`✅ Successfully served: ${filename}`);
  });
});

// API endpoint to get server info
app.get('/api/info', (req, res) => {
  const pdfDir = path.join(__dirname, 'pdfs');
  const pdfCount = fs.existsSync(pdfDir) 
    ? fs.readdirSync(pdfDir).filter(f => f.toLowerCase().endsWith('.pdf')).length 
    : 0;
    
  res.json({
    success: true,
    server: 'Archiv Backend',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    port: PORT,
    pdfCount,
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err);
  res.status(500).json({ 
    success: false, 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler for unknown routes
app.use('*', (req, res) => {
  console.log(`❌ 404 - Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ 
    success: false, 
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Archiv Backend Server Started`);
  console.log(`✅ Server listening at http://localhost:${PORT}`);
  console.log(`📁 PDFs directory: ${path.join(__dirname, 'pdfs')}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  
  // Check if pdfs directory exists and list files
  const pdfDir = path.join(__dirname, 'pdfs');
  if (!fs.existsSync(pdfDir)) {
    console.log('⚠️  PDFs directory does not exist, creating it...');
    fs.mkdirSync(pdfDir, { recursive: true });
    console.log('📁 Empty PDFs directory created');
  } else {
    const files = fs.readdirSync(pdfDir).filter(f => f.toLowerCase().endsWith('.pdf'));
    console.log(`📄 Found ${files.length} PDF files:`);
    files.forEach(file => console.log(`   - ${file}`));
  }
  
  console.log(`🔗 Health check: http://localhost:${PORT}/`);
  console.log(`📋 PDF list API: http://localhost:${PORT}/api/pdf/list`);
  console.log('🎯 Ready to serve requests!');
});