import React from 'react';

interface LoadingSkeletonProps {
  type: 'grid' | 'list' | 'stats' | 'card';
  count?: number;
}

/**
 * Loading Skeleton Component - Part of Static Shell (SSG)
 * 
 * Provides visual placeholders while dynamic content streams in.
 * These skeletons are part of the static shell and render instantly,
 * giving users immediate visual feedback about the page structure.
 */
export function LoadingSkeleton({ type, count = 3 }: LoadingSkeletonProps) {
  switch (type) {
    case 'grid':
      return (
        <div className="grid">
          {Array.from({ length: count }).map((_, i) => (
            <SkeletonCard key={i} index={i} />
          ))}
        </div>
      );

    case 'list':
      return (
        <div className="skeleton-list">
          {Array.from({ length: count }).map((_, i) => (
            <SkeletonListItem key={i} index={i} />
          ))}
        </div>
      );

    case 'stats':
      return (
        <div className="stats-grid">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonStat key={i} index={i} />
          ))}
        </div>
      );

    case 'card':
      return <SkeletonCard index={0} />;

    default:
      return null;
  }
}

function SkeletonCard({ index }: { index: number }) {
  return (
    <div 
      className="skeleton skeleton--card"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="skeleton__inner">
        <div className="skeleton skeleton--image"></div>
        <div className="skeleton__content">
          <div className="skeleton skeleton--title-sm"></div>
          <div className="skeleton skeleton--text"></div>
          <div className="skeleton skeleton--text" style={{ width: '60%' }}></div>
        </div>
      </div>
    </div>
  );
}

function SkeletonListItem({ index }: { index: number }) {
  return (
    <div 
      className="skeleton skeleton--list-item"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="skeleton skeleton--avatar"></div>
      <div className="skeleton__content">
        <div className="skeleton skeleton--text" style={{ width: '40%' }}></div>
        <div className="skeleton skeleton--text"></div>
        <div className="skeleton skeleton--text" style={{ width: '80%' }}></div>
      </div>
    </div>
  );
}

function SkeletonStat({ index }: { index: number }) {
  return (
    <div 
      className="skeleton skeleton--stat"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="skeleton skeleton--stat-value"></div>
      <div className="skeleton skeleton--stat-label"></div>
    </div>
  );
}

