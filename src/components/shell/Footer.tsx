import React from 'react';

/**
 * Footer Component - Part of Static Shell (SSG)
 * 
 * Renders instantly as part of the static shell.
 * No data dependencies - pure presentational component.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">StreamSSR</span>
          <span className="footer__text">
            © {currentYear} StreamSSR. Built with React 18 Streaming SSR.
          </span>
        </div>
        <div className="footer__links">
          <a href="/privacy" className="footer__link">Privacy</a>
          <a href="/terms" className="footer__link">Terms</a>
          <a href="https://github.com" className="footer__link" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}

