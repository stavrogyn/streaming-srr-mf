import { DynamicProducts, resetProductsCache } from './DynamicProducts.js';
import { DynamicReviews, resetReviewsCache } from './DynamicReviews.js';
import { DynamicStats, resetStatsCache } from './DynamicStats.js';

export { DynamicProducts, resetProductsCache };
export { DynamicReviews, resetReviewsCache };
export { DynamicStats, resetStatsCache };

// Reset all caches - call on each SSR request
export function resetAllCaches() {
  resetProductsCache();
  resetReviewsCache();
  resetStatsCache();
}
