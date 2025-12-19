'use client';

import React, { useEffect, useState, ComponentType } from 'react';

interface ClientFederationProps<T = any> {
  /** Dynamic import function, e.g. () => import('widget-remote/AnalyticsWidget') */
  loader: () => Promise<{ default: ComponentType<T> }>;
  /** Props to pass to the loaded component */
  props?: T;
  /** Fallback while loading */
  fallback?: React.ReactNode;
}

/**
 * ClientFederation - Loads Module Federation components on client-side only
 * 
 * Usage:
 * ```tsx
 * <ClientFederation
 *   loader={() => import('widget-remote/AnalyticsWidget')}
 *   props={{ title: "Custom Title", theme: "dark" }}
 * />
 * ```
 * 
 * This component:
 * 1. Renders fallback during SSR
 * 2. Dynamically imports the federated module on client
 * 3. Passes props to the loaded component
 */
export function ClientFederation<T = any>({ 
  loader, 
  props = {} as T, 
  fallback = <FederationSkeleton /> 
}: ClientFederationProps<T>) {
  const [isClient, setIsClient] = useState(false);
  const [Component, setComponent] = useState<ComponentType<T> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
    
    // Load the federated component
    loader()
      .then((module) => {
        setComponent(() => module.default);
      })
      .catch((err) => {
        console.error('Failed to load federated component:', err);
        setError(err.message || 'Failed to load component');
      });
  }, [loader]);

  // SSR: render fallback
  if (!isClient) {
    return <>{fallback}</>;
  }

  // Error state
  if (error) {
    return (
      <div className="federation-error">
        <span>⚠️ Failed to load widget</span>
        <code>{error}</code>
      </div>
    );
  }

  // Loading state
  if (!Component) {
    return <>{fallback}</>;
  }

  // Render the loaded component with props
  return <Component {...props} />;
}

function FederationSkeleton() {
  return (
    <div className="federation-skeleton">
      <div className="federation-skeleton__header">
        <span>🔗</span>
        <span>Loading federated component...</span>
      </div>
      <div className="federation-skeleton__content">
        <div className="skeleton skeleton--text" />
        <div className="skeleton skeleton--text" style={{ width: '80%' }} />
        <div className="skeleton skeleton--text" style={{ width: '60%' }} />
      </div>
    </div>
  );
}

export default ClientFederation;

