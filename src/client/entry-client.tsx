import React, { StrictMode, startTransition } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { App } from '../components/App';

declare global {
  interface Window {
    __SSR_DATA__?: {
      url: string;
    };
  }
}

/**
 * Client Entry Point - Selective Hydration
 * 
 * This file handles client-side hydration using React 18's hydrateRoot.
 * Key features:
 * 
 * 1. Selective Hydration - React hydrates components based on user interaction
 *    priority. If a user clicks on a Suspense boundary before it's hydrated,
 *    React will prioritize hydrating that component first.
 * 
 * 2. Progressive Enhancement - The page is interactive as soon as the static
 *    shell is hydrated. Dynamic content becomes interactive as it streams in.
 * 
 * 3. startTransition - Wrapping hydration in startTransition ensures it doesn't
 *    block user interactions.
 */

const ssrData = window.__SSR_DATA__ || { url: window.location.pathname };

// Performance mark for hydration timing
if (typeof performance !== 'undefined') {
  performance.mark('hydration-start');
}

// Get the root element
const container = document.getElementById('root');

if (!container) {
  throw new Error('Root element not found. Make sure you have <div id="root"></div> in your HTML.');
}

// Use startTransition to ensure hydration doesn't block user interactions
startTransition(() => {
  hydrateRoot(
    container,
    <StrictMode>
      <App url={ssrData.url} />
    </StrictMode>,
    {
      onRecoverableError(error, errorInfo) {
        // Log hydration errors but don't crash the app
        console.warn('Hydration error:', error);
        console.warn('Component stack:', errorInfo.componentStack);
      },
    }
  );
});

// Performance measurement
if (typeof performance !== 'undefined') {
  // Wait for hydration to complete
  requestIdleCallback(() => {
    performance.mark('hydration-end');
    
    try {
      performance.measure('hydration', 'hydration-start', 'hydration-end');
      const hydrationTime = performance.getEntriesByName('hydration')[0]?.duration;
      
      if (hydrationTime) {
        console.log(`⚡ Hydration completed in ${hydrationTime.toFixed(2)}ms`);
      }
      
      // Hide streaming indicator after hydration
      const indicator = document.getElementById('streaming-indicator');
      if (indicator) {
        indicator.style.opacity = '0';
        setTimeout(() => indicator.remove(), 300);
      }
    } catch (e) {
      // Performance API not fully supported
    }
  });
}

// Report Core Web Vitals
if (typeof window !== 'undefined') {
  // First Contentful Paint
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.name === 'first-contentful-paint') {
        console.log(`🎨 FCP: ${entry.startTime.toFixed(2)}ms`);
      }
    }
  });
  
  try {
    observer.observe({ type: 'paint', buffered: true });
  } catch (e) {
    // Performance Observer not supported
  }
}

