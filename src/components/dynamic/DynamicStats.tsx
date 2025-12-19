import React, { use } from 'react';

interface Stat {
  id: string;
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: string;
}

// Random data generators
const statTemplates = [
  { id: 'users', label: 'Active Users', icon: '👥', unit: 'M', base: 2, multiplier: 5 },
  { id: 'revenue', label: 'Revenue', icon: '💰', unit: 'K', base: 30, multiplier: 100, prefix: '$' },
  { id: 'performance', label: 'Avg. Load Time', icon: '⚡', unit: 's', base: 0.5, multiplier: 1.5, isLower: true },
  { id: 'satisfaction', label: 'Satisfaction', icon: '😊', unit: '%', base: 90, multiplier: 10 },
  { id: 'orders', label: 'Orders Today', icon: '📦', unit: '', base: 500, multiplier: 2000 },
  { id: 'visitors', label: 'Page Views', icon: '👁️', unit: 'K', base: 100, multiplier: 500 },
  { id: 'conversion', label: 'Conversion Rate', icon: '📈', unit: '%', base: 2, multiplier: 8 },
  { id: 'retention', label: 'Retention', icon: '🔄', unit: '%', base: 70, multiplier: 25 },
];

function generateRandomStats(): Stat[] {
  const count = 3 + Math.floor(Math.random() * 4);
  const shuffled = [...statTemplates].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, count);
  
  return selected.map(template => {
    const value = template.base + Math.random() * template.multiplier;
    const changeValue = -30 + Math.random() * 60;
    const trend: 'up' | 'down' | 'neutral' = 
      template.isLower 
        ? (changeValue < 0 ? 'up' : changeValue > 0 ? 'down' : 'neutral')
        : (changeValue > 0 ? 'up' : changeValue < 0 ? 'down' : 'neutral');
    
    const formattedValue = template.unit === '%' || template.unit === 's'
      ? value.toFixed(1)
      : value >= 100 ? Math.round(value).toString() : value.toFixed(1);
    
    return {
      id: template.id + '-' + Math.random(),
      label: template.label,
      value: `${template.prefix || ''}${formattedValue}${template.unit}`,
      change: `${changeValue >= 0 ? '+' : ''}${changeValue.toFixed(1)}%`,
      trend,
      icon: template.icon,
    };
  });
}

// Promise cache that resets on each SSR request
let statsPromise: Promise<Stat[]> | null = null;

function fetchStats(): Promise<Stat[]> {
  if (!statsPromise) {
    statsPromise = new Promise((resolve) => {
      const delay = 500 + Math.random() * 2000;
      setTimeout(() => resolve(generateRandomStats()), delay);
    });
  }
  return statsPromise;
}

// Reset cache - call this on each new request
export function resetStatsCache() {
  statsPromise = null;
}

/**
 * DynamicStats Component - Streaming SSR (High Priority)
 */
export function DynamicStats() {
  const stats = use(fetchStats());

  return (
    <div className="stats-grid">
      {stats.map((stat, index) => (
        <StatCard 
          key={stat.id} 
          stat={stat} 
          index={index}
        />
      ))}
    </div>
  );
}

interface StatCardProps {
  stat: Stat;
  index: number;
}

function StatCard({ stat, index }: StatCardProps) {
  const trendClass = stat.trend === 'up' ? 'stat-card__change--positive' : 
                     stat.trend === 'down' ? 'stat-card__change--negative' : '';
  
  return (
    <div 
      className="stat-card"
      style={{ animationDelay: `${index * 75}ms` }}
    >
      <div className="stat-card__icon">{stat.icon}</div>
      <div className="stat-card__content">
        <span className="stat-card__value">{stat.value}</span>
        <span className="stat-card__label">{stat.label}</span>
      </div>
      <span className={`stat-card__change ${trendClass}`}>
        {stat.change}
      </span>
    </div>
  );
}
