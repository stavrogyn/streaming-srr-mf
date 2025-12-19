import React, { useState, useEffect, useRef } from 'react';

interface RemoteWidgetProps {
  widgetName: 'ChatWidget' | 'AnalyticsWidget' | 'NotificationWidget';
  fallback?: React.ReactNode;
  height?: string | number;
}

// Remote configuration
const REMOTE_URL = 'http://localhost:3001';

// Widget-specific iframe paths
const widgetPaths: Record<string, string> = {
  ChatWidget: '/#/chat',
  AnalyticsWidget: '/#/analytics',
  NotificationWidget: '/#/notifications',
};

/**
 * RemoteWidget - Loads widgets from micro-frontend via iframe
 * 
 * Benefits of iframe approach:
 * - Complete isolation (styles, JS, state)
 * - Works with SSR (rendered on client)
 * - Cross-origin compatible
 * - Independent deployments
 */
export function RemoteWidget({ widgetName, fallback, height = 400 }: RemoteWidgetProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    setIsClient(true);
    
    // Check if remote is available
    fetch(`${REMOTE_URL}/assets/remoteEntry.js`, { method: 'HEAD' })
      .then((res) => {
        if (!res.ok) throw new Error('Remote not available');
      })
      .catch(() => {
        setError('Widget server not running');
      });
  }, []);

  // Server-side: render fallback
  if (!isClient) {
    return (
      <div className="remote-widget remote-widget--loading">
        {fallback || <WidgetSkeleton name={widgetName} />}
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="remote-widget remote-widget--error">
        <WidgetError widgetName={widgetName} error={error} />
      </div>
    );
  }

  const iframeSrc = `${REMOTE_URL}${widgetPaths[widgetName] || ''}`;

  return (
    <div className="remote-widget remote-widget--iframe">
      {!loaded && (
        <div className="remote-widget__loader">
          <WidgetSkeleton name={widgetName} />
        </div>
      )}
      <iframe
        ref={iframeRef}
        src={iframeSrc}
        title={widgetName}
        onLoad={() => setLoaded(true)}
        onError={() => setError('Failed to load widget')}
        style={{
          width: '100%',
          height: typeof height === 'number' ? `${height}px` : height,
          border: 'none',
          borderRadius: '12px',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      />
    </div>
  );
}

function WidgetSkeleton({ name }: { name: string }) {
  return (
    <div className="widget-skeleton">
      <div className="widget-skeleton__header">
        <div className="widget-skeleton__icon">🧩</div>
        <div className="widget-skeleton__title">Loading {name}...</div>
      </div>
      <div className="widget-skeleton__content">
        <div className="skeleton skeleton--text"></div>
        <div className="skeleton skeleton--text" style={{ width: '80%' }}></div>
        <div className="skeleton skeleton--text" style={{ width: '60%' }}></div>
      </div>
      <div className="widget-skeleton__badge">Micro-Frontend</div>
    </div>
  );
}

function WidgetError({ widgetName, error }: { widgetName: string; error: string }) {
  return (
    <div className="widget-error">
      <div className="widget-error__icon">⚠️</div>
      <div className="widget-error__content">
        <h4 className="widget-error__title">Failed to load {widgetName}</h4>
        <p className="widget-error__message">
          Make sure the widget remote is running on port 3001
        </p>
        <code className="widget-error__code">{error}</code>
      </div>
    </div>
  );
}

export default RemoteWidget;
