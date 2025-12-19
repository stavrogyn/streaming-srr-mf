/**
 * Static Shell Generator (SSG)
 * 
 * This script generates a static HTML shell at build time.
 * The shell includes:
 * - Header, Footer, Navigation
 * - Critical CSS (inline)
 * - Loading skeletons
 * 
 * Run with: npm run generate:shell
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getStaticShell } from './static-shell.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function generateShell() {
  console.log('🔨 Generating static shell...\n');

  const shell = getStaticShell();
  const outputDir = path.join(__dirname, '../../dist/static');
  const outputPath = path.join(outputDir, 'shell.html');

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write the shell HTML
  fs.writeFileSync(outputPath, shell, 'utf-8');

  const stats = fs.statSync(outputPath);
  const sizeKB = (stats.size / 1024).toFixed(2);

  console.log('✅ Static shell generated successfully!');
  console.log(`📁 Output: ${outputPath}`);
  console.log(`📦 Size: ${sizeKB} KB\n`);
  console.log('Architecture:');
  console.log('┌─────────────────────────────────────────────────────────┐');
  console.log('│  Static Shell (SSG) includes:                          │');
  console.log('│  • Header with navigation                              │');
  console.log('│  • Footer                                              │');
  console.log('│  • Critical CSS (inline)                               │');
  console.log('│  • Loading skeletons for dynamic content               │');
  console.log('└─────────────────────────────────────────────────────────┘\n');
}

generateShell().catch(console.error);

