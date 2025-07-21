import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Testing backend setup...\n');

// Check directory structure
const srcDir = path.join(__dirname, 'src');
const pdfsDir = path.join(__dirname, 'src', 'pdfs');
const indexFile = path.join(__dirname, 'src', 'index.mjs');

console.log('📁 Directory structure:');
console.log(`   Backend root: ${__dirname}`);
console.log(`   Src directory: ${srcDir} - ${fs.existsSync(srcDir) ? '✅' : '❌'}`);
console.log(`   PDFs directory: ${pdfsDir} - ${fs.existsSync(pdfsDir) ? '✅' : '❌'}`);
console.log(`   Index file: ${indexFile} - ${fs.existsSync(indexFile) ? '✅' : '❌'}\n`);

// Check PDF files
if (fs.existsSync(pdfsDir)) {
  const files = fs.readdirSync(pdfsDir);
  const pdfFiles = files.filter(f => f.toLowerCase().endsWith('.pdf'));
  
  console.log('📄 PDF files found:');
  pdfFiles.forEach(file => {
    const filePath = path.join(pdfsDir, file);
    const stats = fs.statSync(filePath);
    console.log(`   - ${file} (${Math.round(stats.size / 1024)} KB)`);
    console.log(`     Encoded: ${encodeURIComponent(file)}`);
  });
  
  if (pdfFiles.length === 0) {
    console.log('   ❌ No PDF files found!');
    console.log('   💡 Add your PDF files to: backend/src/pdfs/');
  }
} else {
  console.log('❌ PDFs directory not found!');
  console.log('💡 Create directory: backend/src/pdfs/');
}

console.log('\n🚀 To start the server:');
console.log('   cd backend');
console.log('   npm run start:dev');

console.log('\n🌐 Test URLs (after starting server):');
console.log('   http://localhost:5000/api/health');
console.log('   http://localhost:5000/api/pdf/list');

if (fs.existsSync(pdfsDir)) {
  const files = fs.readdirSync(pdfsDir).filter(f => f.endsWith('.pdf'));
  files.forEach(file => {
    console.log(`   http://localhost:5000/pdfs/${encodeURIComponent(file)}`);
  });
}