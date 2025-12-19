# React SSR Streaming Template

Modern React 18 application with **Static Shell (SSG)** and **Streaming SSR** architecture.

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│  1. StaticShell (SSG) — Instant Render                  │
│     • Header, Footer, Navigation                        │
│     • Critical CSS (inline)                             │
│     • Loading Skeleton                                  │
├─────────────────────────────────────────────────────────┤
│  2. Streaming SSR — Progressive Loading                 │
│     • React 18 renderToPipeableStream                   │
│     • Suspense boundaries                               │
│     • Dynamic content streams as ready                  │
├─────────────────────────────────────────────────────────┤
│  3. Selective Hydration on Client                       │
│     • hydrateRoot enables interactivity                 │
│     • Components hydrate by priority                    │
└─────────────────────────────────────────────────────────┘
```

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Development mode
npm run dev

# Production build
npm run build

# Start production server
npm start

# Generate static shell
npm run generate:shell
```

## 📁 Project Structure

```
src/
├── client/
│   └── entry-client.tsx    # Client hydration entry point
├── components/
│   ├── App.tsx             # Main app with Suspense boundaries
│   ├── shell/              # Static Shell components (SSG)
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   └── LoadingSkeleton.tsx
│   └── dynamic/            # Dynamic SSR components
│       ├── DynamicProducts.tsx
│       ├── DynamicReviews.tsx
│       └── DynamicStats.tsx
└── server/
    ├── index.ts            # Express server
    ├── render.ts           # Streaming SSR logic
    ├── static-shell.ts     # Static shell & Critical CSS
    ├── manifest.ts         # Client build manifest
    └── generate-shell.ts   # SSG generator script
```

## 🎯 Key Features

### 1. Static Shell (SSG)

The static shell renders instantly, providing:
- **Instant FCP** (First Contentful Paint)
- **Critical CSS inlined** in the `<head>`
- **Loading skeletons** for perceived performance

```tsx
// Components in src/components/shell/
<Header />      // Navigation, logo
<Footer />      // Footer links
<Hero />        // Hero section
<LoadingSkeleton />  // Shimmer placeholders
```

### 2. Streaming SSR

Dynamic content streams progressively using React 18's `renderToPipeableStream`:

```tsx
// Each Suspense boundary streams independently
<Suspense fallback={<LoadingSkeleton type="stats" />}>
  <DynamicStats />  {/* Streams first (100-300ms) */}
</Suspense>

<Suspense fallback={<LoadingSkeleton type="grid" count={6} />}>
  <DynamicProducts />  {/* Streams second (300-800ms) */}
</Suspense>

<Suspense fallback={<LoadingSkeleton type="list" count={3} />}>
  <DynamicReviews />  {/* Streams last (500-1200ms) */}
</Suspense>
```

### 3. Selective Hydration

Client-side hydration using `hydrateRoot` with prioritization:

```tsx
// src/client/entry-client.tsx
startTransition(() => {
  hydrateRoot(container, <App />);
});
```

**Benefits:**
- User interactions prioritize hydration of clicked components
- `startTransition` prevents blocking user interactions
- Automatic recovery from hydration mismatches

## 📊 Performance Benefits

| Metric | Traditional SSR | Streaming SSR |
|--------|-----------------|---------------|
| Time to First Byte | 800-2000ms | **< 50ms** |
| First Contentful Paint | 1000-3000ms | **< 100ms** |
| Time to Interactive | 2000-5000ms | **Progressive** |
| Largest Contentful Paint | Blocked by slowest data | **Independent** |

## 🔧 Configuration

### Server Port

```bash
PORT=3000 npm start
```

### Environment Variables

```bash
NODE_ENV=production  # Enable production optimizations
PORT=3000            # Server port
```

## 🎨 Styling

Critical CSS is inlined for instant render:

```typescript
// src/server/static-shell.ts
export function getCriticalCSS(): string {
  return `
    /* All critical styles inlined here */
    :root {
      --color-bg: #0a0a0f;
      --color-accent: #6366f1;
      /* ... */
    }
  `;
}
```

## 🔄 Data Fetching Pattern

Using React 18's `use` hook for Suspense-compatible data fetching:

```tsx
// src/components/dynamic/DynamicProducts.tsx
function fetchProducts(): Promise<Product[]> {
  return fetch('/api/products').then(r => r.json());
}

let promise: Promise<Product[]> | null = null;

function getProducts() {
  if (!promise) promise = fetchProducts();
  return promise;
}

export function DynamicProducts() {
  const products = use(getProducts());
  return <ProductGrid products={products} />;
}
```

## 📝 Adding New Dynamic Components

1. Create component in `src/components/dynamic/`:

```tsx
// src/components/dynamic/MyComponent.tsx
import { use } from 'react';

function fetchData() {
  return new Promise(resolve => 
    setTimeout(() => resolve(data), 500)
  );
}

let promise = null;
function getData() {
  if (!promise) promise = fetchData();
  return promise;
}

export function MyComponent() {
  const data = use(getData());
  return <div>{/* render data */}</div>;
}
```

2. Add to `App.tsx` with Suspense boundary:

```tsx
<Suspense fallback={<LoadingSkeleton type="card" />}>
  <MyComponent />
</Suspense>
```

## 🛠️ Development

```bash
# Run in development mode (with hot reload)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📚 Resources

- [React 18 Streaming SSR](https://react.dev/reference/react-dom/server/renderToPipeableStream)
- [Selective Hydration](https://react.dev/reference/react-dom/client/hydrateRoot)
- [Suspense for Data Fetching](https://react.dev/reference/react/Suspense)

## 📄 License

MIT

