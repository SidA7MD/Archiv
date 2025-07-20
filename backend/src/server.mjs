import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use('/pdfs', express.static(path.join(__dirname, 'pdfs')));

app.get('/api/pdf/list', (req, res) => {
  const pdfDir = path.join(__dirname, 'pdfs');

  fs.readdir(pdfDir, (err, files) => {
    if (err) {
      return res.status(500).json({ success: false, error: 'Failed to read PDF directory' });
    }

    const pdfs = files
      .filter((f) => f.endsWith('.pdf'))
      .map((filename) => {
        const filePath = path.join(pdfDir, filename);
        const stats = fs.statSync(filePath);
        return {
          filename,
          title: filename.replace('.pdf', ''),
          size: stats.size,
          lastModified: stats.mtime,
        };
      });

    res.json({ success: true, pdfs });
  });
});

app.listen(PORT, () => {
  console.log(`✅ Backend server listening at http://localhost:${PORT}`);
});
