import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface ManifestEntry {
  file: string;
  src?: string;
  isEntry?: boolean;
  css?: string[];
  imports?: string[];
}

interface Manifest {
  [key: string]: ManifestEntry;
}

let cachedManifest: Manifest | null = null;

export async function getClientManifest(): Promise<Manifest | null> {
  if (cachedManifest) {
    return cachedManifest;
  }

  const isProduction = process.env.NODE_ENV === 'production';
  const manifestPath = isProduction
    ? path.join(__dirname, '../client/.vite/manifest.json')
    : path.join(__dirname, '../../dist/client/.vite/manifest.json');

  try {
    if (fs.existsSync(manifestPath)) {
      const content = fs.readFileSync(manifestPath, 'utf-8');
      cachedManifest = JSON.parse(content) as Manifest;
      return cachedManifest;
    }
  } catch (error) {
    console.warn('Could not read client manifest:', error);
  }

  return null;
}

export function getScriptTags(manifest: Manifest | null): string {
  if (!manifest) {
    // Development fallback
    return '<script type="module" src="/src/client/entry-client.tsx"></script>';
  }

  const entry = Object.values(manifest).find((m) => m.isEntry);
  if (!entry) {
    return '';
  }

  let tags = '';

  // Add CSS files
  if (entry.css) {
    tags += entry.css
      .map((css) => `<link rel="stylesheet" href="/assets/${css}">`)
      .join('\n');
  }

  // Add preload for imports
  if (entry.imports) {
    tags += entry.imports
      .map((imp) => {
        const impEntry = manifest[imp];
        return impEntry
          ? `<link rel="modulepreload" href="/assets/${impEntry.file}">`
          : '';
      })
      .join('\n');
  }

  // Add main script
  tags += `<script type="module" src="/assets/${entry.file}"></script>`;

  return tags;
}

