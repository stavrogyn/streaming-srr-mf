import React, { use } from 'react';

interface Review {
  id: number;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  content: string;
  helpful: number;
}

// Name generators
const firstNames = ['Alex', 'Sarah', 'Marcus', 'Emily', 'James', 'Olivia', 'Daniel', 'Sophia', 'Michael', 'Emma', 'David', 'Isabella', 'Chris', 'Mia', 'Andrew', 'Ava', 'Ryan', 'Luna', 'Kevin', 'Chloe'];
const lastNames = ['Chen', 'Johnson', 'Williams', 'Rodriguez', 'Kim', 'Patel', 'Anderson', 'Martinez', 'Taylor', 'Thomas', 'Lee', 'Garcia', 'Brown', 'Davis', 'Wilson', 'Moore', 'Jackson', 'White', 'Harris', 'Clark'];
const avatars = ['👨‍💻', '👩‍🔬', '👨‍🎨', '👩‍💼', '👨‍🔧', '👩‍🏫', '👨‍⚕️', '👩‍🚀', '👨‍🍳', '👩‍🎤', '🧑‍💻', '🧑‍🔬', '🧑‍🎨', '🧑‍💼', '👴', '👵', '🧔', '👱‍♀️'];

const positiveIntros = [
  'Absolutely revolutionary!',
  'Game-changing product!',
  'Exceeded all expectations!',
  'Best purchase I\'ve ever made!',
  'Incredible quality!',
  'Simply amazing!',
  'Outstanding performance!',
  'Highly recommended!',
];

const negativeIntros = [
  'Disappointed with this purchase.',
  'Could be better.',
  'Not what I expected.',
  'Has some issues.',
  'Average at best.',
];

const contentMiddles = [
  'The streaming SSR implementation is incredibly smooth.',
  'Page loads feel instant, and the progressive enhancement is seamless.',
  'Our interactive components now load in order of priority.',
  'Core Web Vitals improved dramatically after implementation.',
  'The static shell approach means users see content immediately.',
  'Time to First Byte went from 800ms to under 50ms.',
  'Users are loving the snappy experience!',
  'The selective hydration feature is a game-changer.',
  'Integration was straightforward and well-documented.',
  'Performance metrics are through the roof.',
  'Customer satisfaction increased by 40%.',
  'Bounce rates dropped significantly.',
  'Mobile experience is now buttery smooth.',
  'SEO rankings improved within weeks.',
];

const endings = [
  'Best investment for our platform.',
  'Will definitely recommend to others.',
  'Looking forward to future updates.',
  'Worth every penny.',
  'Five stars without hesitation.',
  'Team productivity has increased.',
  'Already planning to expand usage.',
  'Only wish I had found it sooner.',
];

function generateRandomReview(id: number): Review {
  const rating = Math.floor(3 + Math.random() * 3);
  const isPositive = rating >= 4;
  
  const intro = isPositive 
    ? positiveIntros[Math.floor(Math.random() * positiveIntros.length)]
    : negativeIntros[Math.floor(Math.random() * negativeIntros.length)];
  
  const middleCount = 1 + Math.floor(Math.random() * 3);
  const shuffledMiddles = [...contentMiddles].sort(() => Math.random() - 0.5);
  const middles = shuffledMiddles.slice(0, middleCount).join(' ');
  
  const ending = isPositive ? endings[Math.floor(Math.random() * endings.length)] : '';
  
  const daysAgo = Math.floor(Math.random() * 30);
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  
  return {
    id,
    author: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
    avatar: avatars[Math.floor(Math.random() * avatars.length)],
    rating,
    date: date.toISOString().split('T')[0],
    content: `${intro} ${middles} ${ending}`.trim(),
    helpful: Math.floor(Math.random() * 100),
  };
}

function generateRandomReviews(): Review[] {
  const count = 2 + Math.floor(Math.random() * 5);
  return Array.from({ length: count }, (_, i) => generateRandomReview(i + 1));
}

// Promise cache
let reviewsPromise: Promise<Review[]> | null = null;

function fetchReviews(): Promise<Review[]> {
  if (!reviewsPromise) {
    reviewsPromise = new Promise((resolve) => {
      const delay = 800 + Math.random() * 4000;
      setTimeout(() => resolve(generateRandomReviews()), delay);
    });
  }
  return reviewsPromise;
}

// Reset cache - call this on each new request
export function resetReviewsCache() {
  reviewsPromise = null;
}

/**
 * DynamicReviews Component - Streaming SSR
 */
export function DynamicReviews() {
  const reviews = use(fetchReviews());

  return (
    <div className="reviews-list">
      {reviews.map((review, index) => (
        <ReviewCard 
          key={review.id} 
          review={review} 
          index={index}
        />
      ))}
    </div>
  );
}

interface ReviewCardProps {
  review: Review;
  index: number;
}

function ReviewCard({ review, index }: ReviewCardProps) {
  const stars = '⭐'.repeat(review.rating);
  
  return (
    <article 
      className="card review-card"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="review-card__header">
        <div className="review-card__author">
          <span className="review-card__avatar">{review.avatar}</span>
          <div className="review-card__author-info">
            <span className="review-card__name">{review.author}</span>
            <span className="review-card__date">
              {new Date(review.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>
        <div className="review-card__rating">
          <span className="review-card__stars">{stars}</span>
        </div>
      </div>
      <p className="review-card__content">{review.content}</p>
      <div className="review-card__footer">
        <button className="review-card__helpful">
          👍 Helpful ({review.helpful})
        </button>
        <button className="review-card__report">
          Report
        </button>
      </div>
    </article>
  );
}

