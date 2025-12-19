import express from 'express';
// import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';
import { renderApp } from './render.js';
import { resetAllCaches } from '../components/dynamic/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === 'production';

const app = express();
const PORT = process.env.PORT || 3000;

resetAllCaches();

// Gzip compression
// app.use(compression() as unknown as express.RequestHandler);

// Serve static files from client build
if (isProduction) {
  app.use('/assets', express.static(path.join(__dirname, '../client/assets'), {
    maxAge: '1y',
    immutable: true,
  }));
} else {
  // Development: serve from dist/client/assets
  app.use('/assets', express.static(path.join(__dirname, '../../dist/client/assets')));
}

// Serve pre-generated static shell for instant FCP
app.get('/shell.html', (_req, res) => {
  res.sendFile(path.join(__dirname, '../static/shell.html'));
});

// Main SSR handler with streaming
app.get('*', async (req, res) => {
  try {
    await renderApp(req, res);
  } catch (error) {
    console.error('SSR Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`
┌─────────────────────────────────────────────────────────┐
│  🚀 SSR Server Running                                  │
│                                                         │
│  Local:   http://localhost:${PORT}                      │
│  Mode:    ${isProduction ? 'Production' : 'Development'}│
│                                                         │
│  Architecture:                                          │
│  • Static Shell (SSG) → Instant render                  │
│  • Streaming SSR → Progressive loading                  │
│  • Selective Hydration → Priority-based                 │
└─────────────────────────────────────────────────────────┘
  `);
});

