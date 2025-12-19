import { Suspense } from 'react';
import { Header } from './shell/Header';
import { Footer } from './shell/Footer';
import { Hero } from './shell/Hero';
import { LoadingSkeleton } from './shell/LoadingSkeleton';
import { DynamicProducts } from './dynamic/DynamicProducts';
import { DynamicReviews } from './dynamic/DynamicReviews';
import { DynamicStats } from './dynamic/DynamicStats';
import { ClientFederation } from './federation/ClientFederation';

interface AppProps {
  url: string;
}

/**
 * Main App Component
 * 
 * Architecture:
 * 1. Static Shell (SSG) - renders instantly (Header, Footer, Hero, Skeletons)
 * 2. Dynamic Content (SSR) - streams progressively via Suspense boundaries
 * 3. Selective Hydration - client hydrates components by priority
 * 4. Module Federation - remote widgets loaded dynamically on client
 *    - iframe approach: Complete isolation (RemoteWidget)
 *    - federated approach: Direct React components with props (FederatedWidget)
 */
export function App({ url }: AppProps) {
  return (
    <>
      {/* === STATIC SHELL (SSG) === */}
      <Header currentPath={url} />
      
      <main className="main">
        <Hero />
        
        {/* === STREAMING SSR WITH SUSPENSE BOUNDARIES === */}
        
        {/* High Priority - Stats Section */}
        <section className="section">
          <div className="section__header">
            <h2 className="section__title">📊 Live Statistics</h2>
          </div>
          <Suspense fallback={<LoadingSkeleton type="stats" />}>
            <DynamicStats />
          </Suspense>
        </section>
        
        {/* Medium Priority - Products Section */}
        <section className="section">
          <div className="section__header">
            <h2 className="section__title">🛍️ Featured Products</h2>
          </div>
          <Suspense fallback={<LoadingSkeleton type="grid" count={6} />}>
            <DynamicProducts />
          </Suspense>
        </section>

        {/* === MODULE FEDERATION WIDGETS (Iframe Approach) === */}
        {/* Complete isolation - widgets rendered in separate context */}
        {/* <section className="section">
          <div className="section__header">
            <h2 className="section__title">🧩 Isolated Widgets</h2>
            <span className="section__badge">iframe</span>
          </div>
          <p className="section__description">
            Complete isolation via iframes. Widgets have their own React instance.
          </p>
          <div className="widgets-section">
            <div className="widget-card">
              <div className="widget-card__header">
                <span className="widget-card__title">📈 Analytics</span>
                <span className="widget-card__badge widget-card__badge--iframe">iframe</span>
              </div>
              <div className="widget-card__content">
                <RemoteWidget widgetName="AnalyticsWidget" />
              </div>
            </div>
            <div className="widget-card">
              <div className="widget-card__header">
                <span className="widget-card__title">🔔 Notifications</span>
                <span className="widget-card__badge widget-card__badge--iframe">iframe</span>
              </div>
              <div className="widget-card__content">
                <RemoteWidget widgetName="NotificationWidget" />
              </div>
            </div>
          </div>
        </section> */}

        {/* === MODULE FEDERATION WIDGETS (Direct Components) === */}
        {/* Real React components loaded via Module Federation with props support */}
        <section className="section">
          <div className="section__header">
            <h2 className="section__title">⚡ Federated Components</h2>
            <span className="section__badge section__badge--fed">Module Federation</span>
          </div>
          <p className="section__description">
            Real React components with props. Shared React instance.
          </p>
          <div className="widgets-section">
            <div className="widget-card widget-card--federated">
              <div className="widget-card__header">
                <span className="widget-card__title">📈 Analytics Widget</span>
                <span className="widget-card__badge widget-card__badge--federated">Federated</span>
              </div>
              <div className="widget-card__content">
                <ClientFederation<AnalyticsWidgetProps>
                  loader={() => import('widget-remote/AnalyticsWidget')}
                  props={{
                    title: "🎯 Custom Analytics",
                    showRefresh: true,
                    theme: "dark",
                    compact: false,
                  }}
                />
              </div>
            </div>
            <div className="widget-card widget-card--federated">
              <div className="widget-card__header">
                <span className="widget-card__title">🔔 Notifications Widget</span>
                <span className="widget-card__badge widget-card__badge--federated">Federated</span>
              </div>
              <div className="widget-card__content">
                <ClientFederation<NotificationWidgetProps>
                  loader={() => import('widget-remote/NotificationWidget')}
                  props={{
                    title: "📬 Custom Notifications",
                    maxItems: 4,
                    showClearAll: true,
                    theme: "dark",
                  }}
                />
              </div>
            </div>
            <div className="widget-card widget-card--federated">
              <div className="widget-card__header">
                <span className="widget-card__title">💬 Chat Widget</span>
                <span className="widget-card__badge widget-card__badge--federated">Federated</span>
              </div>
              <div className="widget-card__content">
                <ClientFederation<ChatWidgetProps>
                  loader={() => import('widget-remote/ChatWidget')}
                  props={{
                    initialOpen: false,
                    botName: "Chatbot",
                    botIcon: "🤖",
                    placeholder: "Ask me anything...",
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Lower Priority - Reviews Section */}
        <section className="section">
          <div className="section__header">
            <h2 className="section__title">⭐ Customer Reviews</h2>
          </div>
          <Suspense fallback={<LoadingSkeleton type="list" count={3} />}>
            <DynamicReviews />
          </Suspense>
        </section>
      </main>
      
      {/* === STATIC SHELL (SSG) === */}
      <Footer />
      
      {/* Chat Widget from Module Federation - Fixed position */}
      <ClientFederation<ChatWidgetProps>
        loader={() => import('widget-remote/ChatWidget')}
        props={{
          initialOpen: false,
          theme: "dark",
        }}
      />
      
      {/* Streaming indicator */}
      <StreamingIndicator />
    </>
  );
}

function StreamingIndicator() {
  return (
    <div className="streaming-indicator" id="streaming-indicator">
      <span className="streaming-indicator__dot"></span>
      <span>Streaming content...</span>
    </div>
  );
}
