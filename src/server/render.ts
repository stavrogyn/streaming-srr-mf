import { Request, Response } from 'express';
import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { App } from '../components/App.js';
import { getStaticShell, getCriticalCSS } from './static-shell.js';
import { getClientManifest } from './manifest.js';
import { resetAllCaches } from '../components/dynamic/index.js';

export async function renderApp(req: Request, res: Response): Promise<void> {
  // Reset all data caches for fresh content on each request
  resetAllCaches();
  
  const manifest = await getClientManifest();
  
  // Find the main entry point (entry-client.tsx)
  const mainEntry = manifest?.['src/client/entry-client.tsx'];
  const bootstrapModules = mainEntry
    ? [`/assets/${mainEntry.file.replace(/^assets\//, '')}`]
    : [];

  const criticalCSS = getCriticalCSS();
  const staticShell = getStaticShell();

  let shellSent = false;

  const { pipe, abort } = renderToPipeableStream(
    React.createElement(App, { url: req.url }),
    {
      bootstrapModules, // Use modules for ES module support
      bootstrapScriptContent: `
        // Enable selective hydration
        window.__SSR_DATA__ = ${JSON.stringify({ url: req.url })};
      `,
      onShellReady() {
        // Shell is ready - send the static shell immediately
        // This provides instant FCP (First Contentful Paint)
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.setHeader('Transfer-Encoding', 'chunked');
        
        // Send the HTML head with critical CSS inline
        res.write(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>React SSR Streaming App</title>
  <style id="critical-css">${criticalCSS}</style>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
</head>
<body>
  <div id="root">`);

        shellSent = true;
        
        // Now stream the React content
        pipe(res);
      },
      onShellError(error: unknown) {
        // Shell couldn't render - fall back to client-side rendering
        console.error('Shell render error:', error);
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.status(500).send(staticShell);
      },
      onAllReady() {
        // All Suspense boundaries resolved
        // Good for crawlers and static generation
        if (!shellSent) {
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          pipe(res);
        }
      },
      onError(error: unknown) {
        console.error('Streaming error:', error);
      },
    }
  );

  // Timeout for slow responses
  setTimeout(() => {
    if (!shellSent) {
      abort();
      res.status(500).send('Request timeout');
    }
  }, 10000);
}
