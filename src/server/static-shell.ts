/**
 * Static Shell (SSG) - Pre-generated at build time
 * Contains: Header, Footer, Navigation, Critical CSS, Loading Skeleton
 * 
 * This provides instant FCP (First Contentful Paint) while
 * dynamic content streams in via SSR
 */

export function getCriticalCSS(): string {
  return `
    /* CSS Reset & Base */
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    :root {
      --color-bg: #0a0a0f;
      --color-bg-secondary: #12121a;
      --color-bg-tertiary: #1a1a25;
      --color-text: #e8e8ed;
      --color-text-muted: #8b8b9a;
      --color-accent: #6366f1;
      --color-accent-hover: #818cf8;
      --color-border: #2a2a3a;
      --color-skeleton: #1f1f2e;
      --color-skeleton-shine: #2a2a3d;
      --font-sans: 'DM Sans', system-ui, sans-serif;
      --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
      --radius-sm: 6px;
      --radius-md: 12px;
      --radius-lg: 20px;
      --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);
      --shadow-md: 0 8px 24px rgba(0, 0, 0, 0.4);
      --shadow-glow: 0 0 40px rgba(99, 102, 241, 0.15);
    }

    html {
      font-size: 16px;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    body {
      font-family: var(--font-sans);
      background: var(--color-bg);
      color: var(--color-text);
      line-height: 1.6;
      min-height: 100vh;
    }

    #root {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    /* Header Styles */
    .header {
      position: sticky;
      top: 0;
      z-index: 100;
      background: rgba(10, 10, 15, 0.85);
      backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--color-border);
      padding: 0 2rem;
    }

    .header__inner {
      max-width: 1400px;
      margin: 0 auto;
      height: 72px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .header__logo {
      font-size: 1.5rem;
      font-weight: 700;
      background: linear-gradient(135deg, var(--color-accent), #a855f7);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      letter-spacing: -0.02em;
    }

    /* Navigation Styles */
    .nav {
      display: flex;
      gap: 0.5rem;
    }

    .nav__link {
      padding: 0.625rem 1.25rem;
      color: var(--color-text-muted);
      text-decoration: none;
      font-size: 0.9375rem;
      font-weight: 500;
      border-radius: var(--radius-sm);
      transition: all 0.2s ease;
    }

    .nav__link:hover {
      color: var(--color-text);
      background: var(--color-bg-secondary);
    }

    .nav__link--active {
      color: var(--color-accent);
      background: rgba(99, 102, 241, 0.1);
    }

    /* Main Content */
    .main {
      flex: 1;
      max-width: 1400px;
      width: 100%;
      margin: 0 auto;
      padding: 3rem 2rem;
    }

    /* Footer Styles */
    .footer {
      background: var(--color-bg-secondary);
      border-top: 1px solid var(--color-border);
      padding: 2.5rem 2rem;
      margin-top: auto;
    }

    .footer__inner {
      max-width: 1400px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .footer__text {
      color: var(--color-text-muted);
      font-size: 0.875rem;
    }

    /* Loading Skeleton */
    .skeleton {
      background: var(--color-skeleton);
      border-radius: var(--radius-md);
      position: relative;
      overflow: hidden;
    }

    .skeleton::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        90deg,
        transparent,
        var(--color-skeleton-shine),
        transparent
      );
      animation: skeleton-shimmer 1.5s infinite;
    }

    @keyframes skeleton-shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }

    .skeleton--text {
      height: 1.25rem;
      border-radius: var(--radius-sm);
    }

    .skeleton--title {
      height: 2.5rem;
      width: 60%;
      border-radius: var(--radius-sm);
    }

    .skeleton--card {
      height: 200px;
      border-radius: var(--radius-lg);
    }

    .skeleton--avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
    }

    /* Card Components */
    .card {
      background: var(--color-bg-secondary);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: 1.5rem;
      transition: all 0.3s ease;
    }

    .card:hover {
      border-color: var(--color-accent);
      box-shadow: var(--shadow-glow);
      transform: translateY(-2px);
    }

    .card__title {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 0.75rem;
    }

    .card__description {
      color: var(--color-text-muted);
      font-size: 0.9375rem;
    }

    /* Grid Layout */
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.5rem;
    }

    /* Button */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      font-size: 0.9375rem;
      font-weight: 600;
      border: none;
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn--primary {
      background: var(--color-accent);
      color: white;
    }

    .btn--primary:hover {
      background: var(--color-accent-hover);
      transform: translateY(-1px);
    }

    /* Suspense Fallback */
    .suspense-fallback {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 2rem;
      animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    /* Streaming indicator */
    .streaming-indicator {
      position: fixed;
      bottom: 1.5rem;
      right: 1.5rem;
      padding: 0.75rem 1rem;
      background: var(--color-bg-tertiary);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      font-size: 0.8125rem;
      color: var(--color-text-muted);
      display: flex;
      align-items: center;
      gap: 0.5rem;
      opacity: 0;
      animation: slideUp 0.3s ease forwards;
    }

    @keyframes slideUp {
      to {
        opacity: 1;
        transform: translateY(0);
      }
      from {
        opacity: 0;
        transform: translateY(10px);
      }
    }

    .streaming-indicator__dot {
      width: 8px;
      height: 8px;
      background: var(--color-accent);
      border-radius: 50%;
      animation: pulse 1s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }

    /* Hero Section */
    .hero {
      text-align: center;
      padding: 4rem 0;
      margin-bottom: 3rem;
    }

    .hero__title {
      font-size: clamp(2.5rem, 5vw, 4rem);
      font-weight: 800;
      letter-spacing: -0.03em;
      margin-bottom: 1rem;
      background: linear-gradient(135deg, var(--color-text), var(--color-accent));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero__subtitle {
      font-size: 1.25rem;
      color: var(--color-text-muted);
      max-width: 600px;
      margin: 0 auto;
    }

    /* Section */
    .section {
      margin-bottom: 4rem;
    }

    .section__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .section__title {
      font-size: 1.5rem;
      font-weight: 700;
    }

    .section__badge {
      background: linear-gradient(135deg, var(--color-accent), #8b5cf6);
      color: white;
      font-size: 11px;
      font-weight: 600;
      padding: 6px 12px;
      border-radius: 100px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* Hero Extended Styles */
    .hero__badge {
      display: inline-block;
      padding: 0.5rem 1rem;
      background: rgba(99, 102, 241, 0.15);
      border: 1px solid rgba(99, 102, 241, 0.3);
      border-radius: 100px;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--color-accent);
      margin-bottom: 1.5rem;
    }

    .hero__title-accent {
      background: linear-gradient(135deg, var(--color-accent), #a855f7, #ec4899);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero__cta {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-top: 2.5rem;
    }

    .btn--lg {
      padding: 1rem 2rem;
      font-size: 1rem;
    }

    .btn--secondary {
      background: transparent;
      border: 1px solid var(--color-border);
      color: var(--color-text);
    }

    .btn--secondary:hover {
      border-color: var(--color-accent);
      background: rgba(99, 102, 241, 0.1);
    }

    .hero__features {
      display: flex;
      justify-content: center;
      gap: 2rem;
      margin-top: 3rem;
      flex-wrap: wrap;
    }

    .hero__feature {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--color-text-muted);
      font-size: 0.9375rem;
    }

    .hero__feature-icon {
      font-size: 1.25rem;
    }

    /* Stats Grid */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
    }

    .stat-card {
      background: var(--color-bg-secondary);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: 1.5rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      animation: slideIn 0.4s ease forwards;
      opacity: 0;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .stat-card__icon {
      font-size: 2rem;
      width: 56px;
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--color-bg-tertiary);
      border-radius: var(--radius-md);
    }

    .stat-card__content {
      flex: 1;
    }

    .stat-card__value {
      display: block;
      font-size: 1.5rem;
      font-weight: 700;
      letter-spacing: -0.02em;
    }

    .stat-card__label {
      display: block;
      font-size: 0.875rem;
      color: var(--color-text-muted);
    }

    .stat-card__change {
      font-size: 0.875rem;
      font-weight: 600;
      padding: 0.25rem 0.75rem;
      border-radius: 100px;
    }

    .stat-card__change--positive {
      background: rgba(34, 197, 94, 0.15);
      color: #22c55e;
    }

    .stat-card__change--negative {
      background: rgba(239, 68, 68, 0.15);
      color: #ef4444;
    }

    /* Product Card */
    .product-card {
      display: flex;
      flex-direction: column;
      animation: slideIn 0.4s ease forwards;
      opacity: 0;
    }

    .product-card__image {
      height: 140px;
      background: var(--color-bg-tertiary);
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1rem;
    }

    .product-card__emoji {
      font-size: 4rem;
    }

    .product-card__content {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .product-card__category {
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--color-accent);
      margin-bottom: 0.5rem;
    }

    .product-card__title {
      font-size: 1.125rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .product-card__description {
      font-size: 0.875rem;
      color: var(--color-text-muted);
      margin-bottom: 1rem;
      flex: 1;
    }

    .product-card__footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .product-card__price {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--color-accent);
    }

    .product-card__rating {
      font-size: 0.875rem;
      color: var(--color-text-muted);
    }

    .product-card__btn {
      width: 100%;
    }

    /* Reviews */
    .reviews-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .review-card {
      animation: slideIn 0.4s ease forwards;
      opacity: 0;
    }

    .review-card__header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
    }

    .review-card__author {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .review-card__avatar {
      width: 48px;
      height: 48px;
      font-size: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--color-bg-tertiary);
      border-radius: 50%;
    }

    .review-card__author-info {
      display: flex;
      flex-direction: column;
    }

    .review-card__name {
      font-weight: 600;
    }

    .review-card__date {
      font-size: 0.875rem;
      color: var(--color-text-muted);
    }

    .review-card__stars {
      font-size: 1rem;
    }

    .review-card__content {
      color: var(--color-text-muted);
      line-height: 1.7;
      margin-bottom: 1rem;
    }

    .review-card__footer {
      display: flex;
      gap: 1rem;
    }

    .review-card__helpful,
    .review-card__report {
      background: none;
      border: 1px solid var(--color-border);
      color: var(--color-text-muted);
      padding: 0.5rem 1rem;
      border-radius: var(--radius-sm);
      font-size: 0.875rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .review-card__helpful:hover {
      background: rgba(99, 102, 241, 0.1);
      border-color: var(--color-accent);
      color: var(--color-accent);
    }

    .review-card__report:hover {
      background: rgba(239, 68, 68, 0.1);
      border-color: #ef4444;
      color: #ef4444;
    }

    /* Skeleton Extended */
    .skeleton--list-item {
      display: flex;
      gap: 1rem;
      padding: 1.5rem;
      align-items: flex-start;
    }

    .skeleton__inner {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .skeleton--image {
      height: 100px;
      margin-bottom: 1rem;
      border-radius: var(--radius-md);
    }

    .skeleton__content {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      flex: 1;
    }

    .skeleton--title-sm {
      height: 1.25rem;
      width: 70%;
      border-radius: var(--radius-sm);
    }

    .skeleton--stat {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 1.5rem;
    }

    .skeleton--stat-value {
      height: 2rem;
      width: 60%;
      border-radius: var(--radius-sm);
    }

    .skeleton--stat-label {
      height: 1rem;
      width: 80%;
      border-radius: var(--radius-sm);
    }

    .skeleton-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    /* Footer Extended */
    .footer__brand {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .footer__logo {
      font-size: 1.25rem;
      font-weight: 700;
      background: linear-gradient(135deg, var(--color-accent), #a855f7);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .footer__links {
      display: flex;
      gap: 1.5rem;
    }

    .footer__link {
      color: var(--color-text-muted);
      text-decoration: none;
      font-size: 0.875rem;
      transition: color 0.2s ease;
    }

    .footer__link:hover {
      color: var(--color-text);
    }

    /* Header Extended */
    .header__actions {
      display: flex;
      gap: 0.75rem;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .header__inner {
        height: 64px;
      }

      .nav {
        display: none;
      }

      .hero__cta {
        flex-direction: column;
        align-items: center;
      }

      .hero__features {
        flex-direction: column;
        align-items: center;
      }

      .stats-grid {
        grid-template-columns: 1fr 1fr;
      }

      .footer__inner {
        flex-direction: column;
        gap: 1.5rem;
        text-align: center;
      }
    }

    @media (max-width: 480px) {
      .stats-grid {
        grid-template-columns: 1fr;
      }

      .grid {
        grid-template-columns: 1fr;
      }
    }

    /* Remote Widget Styles */
    .remote-widget {
      position: relative;
    }

    .widget-skeleton {
      background: var(--color-bg-secondary);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: 24px;
      position: relative;
      overflow: hidden;
    }

    .widget-skeleton__header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 20px;
    }

    .widget-skeleton__icon {
      width: 48px;
      height: 48px;
      background: var(--color-bg-tertiary);
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
    }

    .widget-skeleton__title {
      color: var(--color-text-muted);
      font-size: 14px;
      font-weight: 500;
    }

    .widget-skeleton__content {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .widget-skeleton__badge {
      position: absolute;
      top: 12px;
      right: 12px;
      background: rgba(99, 102, 241, 0.15);
      color: var(--color-accent);
      font-size: 10px;
      font-weight: 600;
      padding: 4px 8px;
      border-radius: 100px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .widget-error {
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.2);
      border-radius: var(--radius-lg);
      padding: 24px;
      display: flex;
      gap: 16px;
      align-items: flex-start;
    }

    .widget-error__icon {
      font-size: 32px;
    }

    .widget-error__content {
      flex: 1;
    }

    .widget-error__title {
      color: #ef4444;
      font-size: 16px;
      font-weight: 600;
      margin: 0 0 8px 0;
    }

    .widget-error__message {
      color: var(--color-text-muted);
      font-size: 14px;
      margin: 0 0 12px 0;
    }

    .widget-error__code {
      display: block;
      background: rgba(0, 0, 0, 0.3);
      padding: 8px 12px;
      border-radius: var(--radius-sm);
      font-family: var(--font-mono);
      font-size: 12px;
      color: #ef4444;
    }

    /* Widgets Section */
    .widgets-section {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 24px;
    }

    .widget-card {
      background: var(--color-bg-secondary);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      overflow: hidden;
    }

    .widget-card__header {
      padding: 16px 20px;
      border-bottom: 1px solid var(--color-border);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .widget-card__title {
      font-size: 14px;
      font-weight: 600;
      color: var(--color-text);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .widget-card__badge {
      background: linear-gradient(135deg, var(--color-accent), #8b5cf6);
      color: white;
      font-size: 10px;
      font-weight: 600;
      padding: 4px 10px;
      border-radius: 100px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .widget-card__content {
      padding: 0;
    }

    .widget-card--federated {
      border-color: rgba(99, 102, 241, 0.3);
      box-shadow: 0 0 20px rgba(99, 102, 241, 0.1);
    }

    .widget-card__badge--iframe {
      background: linear-gradient(135deg, #f59e0b, #d97706);
    }

    .widget-card__badge--federated {
      background: linear-gradient(135deg, #22c55e, #16a34a);
    }

    .section__badge {
      background: rgba(99, 102, 241, 0.15);
      color: var(--color-accent);
      font-size: 11px;
      font-weight: 600;
      padding: 4px 12px;
      border-radius: 100px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .section__badge--fed {
      background: rgba(34, 197, 94, 0.15);
      color: #22c55e;
    }

    .section__description {
      color: var(--color-text-muted);
      font-size: 14px;
      margin: 0 0 24px 0;
      max-width: 600px;
    }

    .federated-widget {
      min-height: 100px;
    }

    .federated-widget--loading {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .federated-widget--loaded {
      animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
}

export function getStaticShell(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>React SSR Streaming App</title>
  <style id="critical-css">${getCriticalCSS()}</style>
</head>
<body>
  <div id="root">
    <header class="header">
      <div class="header__inner">
        <div class="header__logo">StreamSSR</div>
        <nav class="nav">
          <a href="/" class="nav__link nav__link--active">Home</a>
          <a href="/products" class="nav__link">Products</a>
          <a href="/about" class="nav__link">About</a>
          <a href="/contact" class="nav__link">Contact</a>
        </nav>
      </div>
    </header>
    
    <main class="main">
      <section class="hero">
        <div class="skeleton skeleton--title" style="margin: 0 auto 1rem;"></div>
        <div class="skeleton skeleton--text" style="width: 80%; margin: 0 auto;"></div>
      </section>
      
      <section class="section">
        <div class="section__header">
          <div class="skeleton skeleton--text" style="width: 150px;"></div>
        </div>
        <div class="grid">
          <div class="skeleton skeleton--card"></div>
          <div class="skeleton skeleton--card"></div>
          <div class="skeleton skeleton--card"></div>
        </div>
      </section>
    </main>
    
    <footer class="footer">
      <div class="footer__inner">
        <span class="footer__text">© 2024 StreamSSR. Built with React 18 Streaming SSR.</span>
      </div>
    </footer>
  </div>
</body>
</html>`;
}

