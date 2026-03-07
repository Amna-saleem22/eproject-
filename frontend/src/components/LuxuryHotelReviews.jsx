import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import VerifiedIcon from '@mui/icons-material/Verified';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

// ===== Theme constants (from Luxury_Stay_Navbar_Footer_Theme.pdf) =====
const THEME = {
  // Core Brand Colors
  primaryLight: '#0D47A1',
  primaryMain: '#1565C0',
  primaryDark: '#0A3D91',

  // Background Colors
  bgMain: '#0A0A0A',
  bgSecondary: '#111111',
  footerGradient: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
  glassEffect: 'rgba(255, 255, 255, 0.05)',

  // Text Colors
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.5)',
  textMuted: 'rgba(255, 255, 255, 0.5)',

  // Border Colors
  borderLight: 'rgba(255, 255, 255, 0.08)',
  borderStrong: 'rgba(13, 71, 161, 0.4)',

  // Navbar
  navbarBg: 'rgba(10, 10, 10, 0.9)',
  navbarScrolled: 'rgba(10, 10, 10, 0.98)',
  backdropBlur: 'blur(10px)',
  navbarBorder: '1px solid rgba(13, 71, 161, 0.4)',
  hoverColor: '#0D47A1',
  transition: '0.3s ease',

  // Mobile Drawer
  drawerBg: '#111111',
  activeBg: 'rgba(13, 71, 161, 0.15)',
  activeIcon: '#0D47A1',

  // Footer Effects
  radialGlow: 'radial-gradient(circle at 0% 50%, #0d47a1 0%, transparent 50%)',
  particleColor: 'rgba(13, 71, 161, 0.1)',
  bottomLine: 'linear-gradient(90deg, transparent, #0D47A1, transparent)',

  // Newsletter
  newsletterContainer: 'rgba(255, 255, 255, 0.05)',
  newsletterBorder: '1px solid rgba(13, 71, 161, 0.4)',
  newsletterRadius: '12px',
  newsletterButton: '#0D47A1',
};

// ===== Sample review data =====
const reviews = [
  {
    id: 1,
    name: 'Alexander Thompson',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5,
    date: 'March 2026',
    stayDate: 'March 1-5, 2026',
    text: 'An absolutely magnificent experience. The attention to detail, the service, and the ambiance were beyond perfection. The presidential suite offered breathtaking views, and the staff anticipated our every need. Every moment was crafted to perfection, from the welcome champagne to the turndown service with handmade chocolates.',
    verified: true,
    featured: true,
  },
  {
    id: 2,
    name: 'Isabella Rossi',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5,
    date: 'February 2026',
    stayDate: 'February 15-20, 2026',
    text: 'The spa treatments were divine, and the rooftop restaurant served the most exquisite Italian cuisine. Every corner of the hotel exudes luxury and elegance. Will definitely return.',
    verified: true,
    featured: true,
  },
  {
    id: 3,
    name: 'Michael Chen',
    avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
    rating: 4.5,
    date: 'January 2026',
    stayDate: 'January 10-14, 2026',
    text: 'Impeccable service and stunning architecture. The infinity pool overlooking the city is unforgettable. The only minor issue was a slight delay in room service, but they more than made up for it with a complimentary spa treatment.',
    verified: true,
    featured: false,
  },
  {
    id: 4,
    name: 'Sophia Williams',
    avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
    rating: 5,
    date: 'December 2025',
    stayDate: 'December 22-28, 2025',
    text: 'Our family Christmas at the hotel was magical. The staff decorated our suite beautifully and arranged special activities for the children. Truly a five-star experience that created memories we will cherish forever.',
    verified: true,
    featured: false,
  },
  {
    id: 5,
    name: 'James Anderson',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    rating: 5,
    date: 'November 2025',
    stayDate: 'November 5-8, 2025',
    text: 'Business trip turned into a mini vacation. The conference facilities are world-class, and the concierge helped organize an incredible desert safari. Top notch in every aspect.',
    verified: true,
    featured: true,
  },
  {
    id: 6,
    name: 'Emma Dubois',
    avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
    rating: 4,
    date: 'October 2025',
    stayDate: 'October 12-16, 2025',
    text: 'Beautiful property with exceptional amenities. The breakfast buffet is the best I have ever seen. Would have given 5 stars but the pool was under maintenance during our stay, though they offered us complimentary access to a nearby luxury spa as compensation.',
    verified: true,
    featured: false,
  },
  {
    id: 7,
    name: 'Oliver Schmidt',
    avatar: 'https://randomuser.me/api/portraits/men/55.jpg',
    rating: 5,
    date: 'September 2025',
    stayDate: 'September 3-7, 2025',
    text: 'From the moment we arrived until departure, everything was flawless. The butler service in the suite was exceptional. This is how luxury should feel.',
    verified: true,
    featured: false,
  },
  {
    id: 8,
    name: 'Victoria Kuzmina',
    avatar: 'https://randomuser.me/api/portraits/women/90.jpg',
    rating: 5,
    date: 'August 2025',
    stayDate: 'August 18-22, 2025',
    text: 'The spa is a sanctuary of peace. The treatments were rejuvenating, and the staff remembered our preferences from a previous stay. That level of attention is rare and deeply appreciated.',
    verified: true,
    featured: false,
  },
];

// ===== Helper component for star ratings =====
const StarRating = ({ rating, size = 20 }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) {
          return <StarIcon key={i} sx={{ color: THEME.primaryLight, fontSize: size }} />;
        } else if (i === fullStars && hasHalfStar) {
          return (
            <div key={i} style={{ position: 'relative' }}>
              <StarBorderIcon sx={{ color: THEME.primaryLight, fontSize: size }} />
              <div style={{ position: 'absolute', top: 0, left: 0, width: '50%', overflow: 'hidden' }}>
                <StarIcon sx={{ color: THEME.primaryLight, fontSize: size }} />
              </div>
            </div>
          );
        } else {
          return <StarBorderIcon key={i} sx={{ color: THEME.primaryLight, fontSize: size }} />;
        }
      })}
      <span style={{ marginLeft: '8px', color: THEME.textSecondary, fontSize: '0.9rem' }}>
        {rating.toFixed(1)}
      </span>
    </div>
  );
};

// ===== Individual Review Card Component =====
const ReviewCard = ({ review, index, isInView }) => {
  const [expanded, setExpanded] = useState(false);
  const isLongReview = review.text.length > 120;
  const displayText = expanded || !isLongReview ? review.text : review.text.slice(0, 120) + '...';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
      whileHover={{ y: -5 }}
      className={`luxury-review-card visible delay-${index % 5 + 1}`}
    >
      <FormatQuoteIcon className="luxury-quote-icon" />
      
      {/* Card Header */}
      <div className="luxury-card-header">
        {review.avatar ? (
          <img src={review.avatar} alt={review.name} className="luxury-avatar" />
        ) : (
          <div className="luxury-avatar-placeholder">
            {review.name.charAt(0)}
          </div>
        )}
        <div className="luxury-guest-info">
          <h4 className="luxury-guest-name">
            {review.name}
            {review.verified && (
              <VerifiedIcon className="luxury-verified-icon" fontSize="small" />
            )}
          </h4>
          <p className="luxury-review-date">{review.date}</p>
        </div>
      </div>

      {/* Rating */}
      <StarRating rating={review.rating} size={18} />

      {/* Review Text */}
      <div className="luxury-review-text">
        {displayText}
        {isLongReview && !expanded && (
          <button
            onClick={() => setExpanded(true)}
            className="luxury-read-more"
          >
            Read More
          </button>
        )}
      </div>

      {/* Card Footer */}
      <div className="luxury-card-footer">
        <span className="luxury-stay-date">Stayed: {review.stayDate}</span>
        {review.featured && (
          <span className="luxury-featured-badge">Featured</span>
        )}
      </div>
    </motion.div>
  );
};

// ===== Main Component =====
const LuxuryHotelReviews = () => {
  const sectionRef = useRef(null);
  const [filter, setFilter] = useState('all'); // 'all', 'featured', '5star'
  const [visibleReviews, setVisibleReviews] = useState(reviews);
  
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Calculate average rating
  const averageRating = (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1);
  const totalReviews = reviews.length;

  // Filter reviews based on selected filter
  useEffect(() => {
    if (filter === 'all') {
      setVisibleReviews(reviews);
    } else if (filter === 'featured') {
      setVisibleReviews(reviews.filter(r => r.featured));
    } else if (filter === '5star') {
      setVisibleReviews(reviews.filter(r => r.rating >= 5));
    }
  }, [filter]);

  return (
    <>
      <style>{`
        /* ===== UNIQUE CLASS NAMES FOR REVIEWS SECTION ===== */
        .luxury-review-section {
          background-color: ${THEME.bgMain};
          padding: 6rem 2rem;
          font-family: 'Inter', 'Helvetica Neue', sans-serif;
          color: ${THEME.textPrimary};
          position: relative;
          overflow: hidden;
        }

        .luxury-review-container {
          max-width: 1280px;
          margin: 0 auto;
        }

        /* Section Header */
        .luxury-review-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .luxury-review-title {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 300;
          margin: 0 0 1rem 0;
          color: ${THEME.textPrimary};
        }

        .luxury-review-title span {
          color: ${THEME.primaryLight};
          font-weight: 400;
        }

        .luxury-review-subtitle {
          color: ${THEME.textSecondary};
          font-size: 1.1rem;
          max-width: 600px;
          margin: 0 auto 2rem auto;
        }

        /* Average Rating Display */
        .luxury-rating-summary {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          margin-bottom: 3rem;
          padding: 1.5rem;
          background: ${THEME.glassEffect};
          border: 1px solid ${THEME.borderStrong};
          border-radius: 50px;
          max-width: 400px;
          margin-left: auto;
          margin-right: auto;
          backdrop-filter: blur(10px);
        }

        .luxury-average-number {
          font-size: 2.5rem;
          font-weight: 700;
          color: ${THEME.primaryLight};
        }

        .luxury-average-stars {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.25rem;
        }

        .luxury-total-reviews {
          color: ${THEME.textSecondary};
          font-size: 0.9rem;
        }

        /* Filter Buttons */
        .luxury-filter-bar {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .luxury-filter-btn {
          background: transparent;
          border: 1px solid ${THEME.borderStrong};
          color: ${THEME.textSecondary};
          padding: 0.75rem 2rem;
          border-radius: 30px;
          cursor: pointer;
          font-size: 0.95rem;
          transition: all ${THEME.transition};
        }

        .luxury-filter-btn:hover {
          border-color: ${THEME.primaryLight};
          color: ${THEME.primaryLight};
        }

        .luxury-filter-btn.active {
          background: ${THEME.primaryLight};
          color: ${THEME.textPrimary};
          border-color: ${THEME.primaryLight};
        }

        /* Reviews Grid */
        .luxury-reviews-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        @media (max-width: 1024px) {
          .luxury-reviews-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .luxury-reviews-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Review Card */
        .luxury-review-card {
          background: ${THEME.bgSecondary};
          border: 1px solid ${THEME.borderLight};
          border-radius: 20px;
          padding: 1.5rem;
          transition: all ${THEME.transition};
          height: 100%;
          display: flex;
          flex-direction: column;
          position: relative;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease, transform 0.6s ease, border 0.3s ease, box-shadow 0.3s ease;
        }

        .luxury-review-card.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .luxury-review-card:hover {
          border-color: ${THEME.borderStrong};
          box-shadow: 0 20px 30px -10px rgba(13, 71, 161, 0.3);
          transform: translateY(-5px);
        }

        .luxury-quote-icon {
          position: absolute;
          top: 1rem;
          right: 1rem;
          color: ${THEME.primaryLight};
          opacity: 0.2;
          font-size: 3rem;
        }

        /* Card Header */
        .luxury-card-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .luxury-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid ${THEME.borderStrong};
        }

        .luxury-avatar-placeholder {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: ${THEME.glassEffect};
          border: 2px solid ${THEME.borderStrong};
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${THEME.primaryLight};
          font-size: 1.5rem;
          font-weight: 600;
        }

        .luxury-guest-info {
          flex: 1;
        }

        .luxury-guest-name {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0 0 0.25rem 0;
          color: ${THEME.textPrimary};
        }

        .luxury-verified-icon {
          color: ${THEME.primaryLight};
          font-size: 1rem;
        }

        .luxury-review-date {
          color: ${THEME.textSecondary};
          font-size: 0.85rem;
          margin: 0;
        }

        /* Card Body */
        .luxury-review-text {
          color: ${THEME.textSecondary};
          line-height: 1.7;
          margin: 1rem 0 1.5rem 0;
          flex: 1;
          font-size: 0.95rem;
        }

        .luxury-read-more {
          color: ${THEME.primaryLight};
          background: none;
          border: none;
          padding: 0;
          font-size: 0.9rem;
          cursor: pointer;
          text-decoration: underline;
          text-underline-offset: 2px;
          transition: color ${THEME.transition};
          margin-left: 0.5rem;
        }

        .luxury-read-more:hover {
          color: ${THEME.primaryDark};
        }

        /* Card Footer */
        .luxury-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid ${THEME.borderLight};
        }

        .luxury-stay-date {
          color: ${THEME.textMuted};
          font-size: 0.8rem;
        }

        .luxury-featured-badge {
          background: ${THEME.glassEffect};
          border: 1px solid ${THEME.borderStrong};
          border-radius: 20px;
          padding: 0.25rem 1rem;
          font-size: 0.75rem;
          color: ${THEME.primaryLight};
        }

        /* Decorative Elements */
        .luxury-review-bg-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 300px;
          background: ${THEME.radialGlow};
          pointer-events: none;
          opacity: 0.3;
        }

        /* View All Button */
        .luxury-view-all {
          text-align: center;
          margin-top: 4rem;
        }

        .luxury-view-all-btn {
          background: transparent;
          border: 2px solid ${THEME.primaryLight};
          color: ${THEME.textPrimary};
          padding: 1rem 3rem;
          border-radius: 40px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all ${THEME.transition};
          position: relative;
          overflow: hidden;
          z-index: 1;
        }

        .luxury-view-all-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: ${THEME.primaryLight};
          transition: left ${THEME.transition};
          z-index: -1;
        }

        .luxury-view-all-btn:hover {
          color: ${THEME.textPrimary};
        }

        .luxury-view-all-btn:hover::before {
          left: 0;
        }

        /* Animation Delays */
        .delay-1 { transition-delay: 0.1s; }
        .delay-2 { transition-delay: 0.2s; }
        .delay-3 { transition-delay: 0.3s; }
        .delay-4 { transition-delay: 0.4s; }
        .delay-5 { transition-delay: 0.5s; }
      `}</style>

      <section ref={sectionRef} className="luxury-review-section">
        <div className="luxury-review-bg-glow"></div>
        
        <div className="luxury-review-container">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="luxury-review-header"
          >
            <h2 className="luxury-review-title">
              Guest <span>Testimonials</span>
            </h2>
            <p className="luxury-review-subtitle">
              What our valued guests say about their experience at Luxury Stay
            </p>
          </motion.div>

          {/* Average Rating Summary */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="luxury-rating-summary"
          >
            <span className="luxury-average-number">{averageRating}</span>
            <div className="luxury-average-stars">
              <StarRating rating={parseFloat(averageRating)} size={20} />
              <span className="luxury-total-reviews">Based on {totalReviews} reviews</span>
            </div>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="luxury-filter-bar"
          >
            <button
              className={`luxury-filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Reviews
            </button>
            <button
              className={`luxury-filter-btn ${filter === 'featured' ? 'active' : ''}`}
              onClick={() => setFilter('featured')}
            >
              Featured
            </button>
            <button
              className={`luxury-filter-btn ${filter === '5star' ? 'active' : ''}`}
              onClick={() => setFilter('5star')}
            >
              5 Star Only
            </button>
          </motion.div>

          {/* Reviews Grid */}
          <div className="luxury-reviews-grid">
            {visibleReviews.map((review, index) => (
              <ReviewCard 
                key={review.id} 
                review={review} 
                index={index} 
                isInView={isInView}
              />
            ))}
          </div>

          {/* View All Reviews Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="luxury-view-all"
          >
            <button className="luxury-view-all-btn">
              View All Reviews
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default LuxuryHotelReviews;