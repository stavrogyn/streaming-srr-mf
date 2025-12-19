import React, { use } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  image: string;
}

// Product name parts for generation
const adjectives = ['Quantum', 'Neural', 'Holographic', 'Fusion', 'Nano', 'Anti-Gravity', 'Hyper', 'Bio', 'Cyber', 'Plasma', 'Photon', 'Stellar', 'Atomic', 'Sonic', 'Cryo'];
const nouns = ['Processor', 'Interface', 'Display', 'Battery', 'Scanner', 'Boots', 'Helmet', 'Gloves', 'Reactor', 'Engine', 'Module', 'Core', 'Matrix', 'Drive', 'Lens'];
const categories = ['Electronics', 'Biotech', 'Display', 'Energy', 'Healthcare', 'Transport', 'Gaming', 'Security', 'Communication', 'Wearables'];
const emojis = ['🔮', '🧠', '📺', '🔋', '💊', '👟', '🎮', '🛡️', '📡', '⌚', '🔬', '🚀', '💎', '🌟', '⚡', '🎯', '🔧', '🌈'];
const suffixes = ['X', 'Pro', 'Max', 'Ultra', 'Elite', 'Plus'];

const descriptionTemplates = [
  'Next-gen {adj} technology with {num} quantum cores',
  'Revolutionary {adj} system for enhanced {use}',
  'Immersive {adj} experience with {num}-year warranty',
  'Advanced {adj} solution powered by AI',
  'Ultra-efficient {adj} device with {num}x performance',
  'Premium {adj} gear for professional {use}',
  'Cutting-edge {adj} innovation for daily {use}',
  'Smart {adj} companion with real-time analytics',
];

const uses = ['productivity', 'entertainment', 'health', 'mobility', 'security', 'communication', 'gaming', 'fitness'];

function generateRandomProduct(id: number): Product {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const category = categories[Math.floor(Math.random() * categories.length)];
  const emoji = emojis[Math.floor(Math.random() * emojis.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  
  const descTemplate = descriptionTemplates[Math.floor(Math.random() * descriptionTemplates.length)];
  const description = descTemplate
    .replace('{adj}', adj.toLowerCase())
    .replace('{num}', String(Math.floor(2 + Math.random() * 10)))
    .replace('{use}', uses[Math.floor(Math.random() * uses.length)]);
  
  return {
    id,
    name: `${adj} ${noun} ${suffix}${Math.floor(Math.random() * 10)}`,
    description,
    price: Math.floor(299 + Math.random() * 4700),
    category,
    rating: Math.round((3.5 + Math.random() * 1.5) * 10) / 10,
    image: emoji,
  };
}

function generateRandomProducts(): Product[] {
  const count = 3 + Math.floor(Math.random() * 7);
  return Array.from({ length: count }, (_, i) => generateRandomProduct(i + 1));
}

// Promise cache
let productsPromise: Promise<Product[]> | null = null;

function fetchProducts(): Promise<Product[]> {
  if (!productsPromise) {
    productsPromise = new Promise((resolve) => {
      const delay = 300 + Math.random() * 3000;
      setTimeout(() => resolve(generateRandomProducts()), delay);
    });
  }
  return productsPromise;
}

// Reset cache - call this on each new request
export function resetProductsCache() {
  productsPromise = null;
}

/**
 * DynamicProducts Component - Streaming SSR
 */
export function DynamicProducts() {
  const products = use(fetchProducts());

  return (
    <div className="grid">
      {products.map((product, index) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          index={index}
        />
      ))}
    </div>
  );
}

interface ProductCardProps {
  product: Product;
  index: number;
}

function ProductCard({ product, index }: ProductCardProps) {
  return (
    <article 
      className="card product-card"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="product-card__image">
        <span className="product-card__emoji">{product.image}</span>
      </div>
      <div className="product-card__content">
        <span className="product-card__category">{product.category}</span>
        <h3 className="product-card__title">{product.name}</h3>
        <p className="product-card__description">{product.description}</p>
        <div className="product-card__footer">
          <span className="product-card__price">${product.price}</span>
          <span className="product-card__rating">
            ⭐ {product.rating}
          </span>
        </div>
        <button className="btn btn--primary product-card__btn">
          Add to Cart
        </button>
      </div>
    </article>
  );
}
