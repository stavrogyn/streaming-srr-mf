// Type declarations for Module Federation remotes

import type { ComponentType } from 'react';

// Widget Props Types
export interface AnalyticsWidgetProps {
  title?: string;
  showRefresh?: boolean;
  theme?: 'dark' | 'light';
  compact?: boolean;
  onMetricClick?: (metric: { id: string; label: string; value: number; unit: string }) => void;
  onRefresh?: () => void;
}

export interface NotificationWidgetProps {
  title?: string;
  maxItems?: number;
  showClearAll?: boolean;
  theme?: 'dark' | 'light';
  onNotificationClick?: (notification: { id: number; title: string; message: string }) => void;
  onClearAll?: () => void;
  initialNotifications?: Array<{
    id: number;
    type: 'success' | 'warning' | 'info' | 'error';
    title: string;
    message: string;
    time: string;
    read: boolean;
  }>;
}

export interface ChatWidgetProps {
  initialOpen?: boolean;
  botName?: string;
  botIcon?: string;
  placeholder?: string;
  welcomeMessage?: string;
  initialMessage?: string;
  theme?: 'dark' | 'light';
  position?: 'bottom-right' | 'bottom-left';
  onMessageSend?: (message: any) => void;
  onOpen?: () => void;
  onClose?: () => void;
  customResponses?: string[];
}

// Module declarations for federated modules
declare module 'widget-remote/ChatWidget' {
  const ChatWidget: React.FC<ChatWidgetProps>;
  export default ChatWidget;
}

declare module 'widget-remote/AnalyticsWidget' {
  const AnalyticsWidget: React.FC<AnalyticsWidgetProps>;
  export default AnalyticsWidget;
}

declare module 'widget-remote/NotificationWidget' {
  const NotificationWidget: React.FC<NotificationWidgetProps>;
  export default NotificationWidget;
}

// Global federation types
declare global {
  interface Window {
    __federation__?: {
      ensure?: (module: string) => Promise<any>;
      load?: (module: string, scope: string) => Promise<any>;
    };
    __remoteModuleContainer__?: {
      [key: string]: any;
    };
  }
}

export {};
