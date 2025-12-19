import React from 'react';

interface HeaderProps {
  currentPath: string;
}

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

/**
 * Header Component - Part of Static Shell (SSG)
 * 
 * This component is rendered as part of the static shell,
 * providing instant FCP (First Contentful Paint).
 * It requires no data fetching and renders synchronously.
 */
export function Header({ currentPath }: HeaderProps) {
  return (
    <header className="header">
      <div className="header__inner">
        <a href="/" className="header__logo">
          StreamSSR
        </a>
        <nav className="nav" role="navigation" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav__link ${
                currentPath === link.href ? 'nav__link--active' : ''
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="header__actions">
          <button className="btn btn--primary" type="button">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}

