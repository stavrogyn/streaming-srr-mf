
/**
 * Hero Component - Part of Static Shell (SSG)
 * 
 * The hero section renders instantly as static content.
 * Uses CSS animations for visual interest without JavaScript.
 */
export function Hero() {
  return (
    <section className="hero">
      <div className="hero__badge">⚡ React 18 Streaming SSR</div>
      <h1 className="hero__title">
        Progressive Rendering
        <br />
        <span className="hero__title-accent">At Lightning Speed</span>
      </h1>
      <p className="hero__subtitle">
        Experience the future of web rendering. Static shell loads instantly,
        while dynamic content streams in progressively. No loading spinners,
        just smooth, progressive enhancement.
      </p>
      <div className="hero__cta">
        <button className="btn btn--primary btn--lg">
          Explore Demo
        </button>
        <button className="btn btn--secondary btn--lg">
          Learn More
        </button>
      </div>
      <div className="hero__features">
        <div className="hero__feature">
          <span className="hero__feature-icon">🎯</span>
          <span className="hero__feature-text">Instant FCP</span>
        </div>
        <div className="hero__feature">
          <span className="hero__feature-icon">🌊</span>
          <span className="hero__feature-text">Streaming SSR</span>
        </div>
        <div className="hero__feature">
          <span className="hero__feature-icon">💧</span>
          <span className="hero__feature-text">Selective Hydration</span>
        </div>
      </div>
    </section>
  );
}

