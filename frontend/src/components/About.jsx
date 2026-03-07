import React, { useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Chip,
  Button,
} from '@mui/material';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupIcon from '@mui/icons-material/Group';
import HotelIcon from '@mui/icons-material/Hotel';
import SpaIcon from '@mui/icons-material/Spa';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PoolIcon from '@mui/icons-material/Pool';
import WifiIcon from '@mui/icons-material/Wifi';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HistoryIcon from '@mui/icons-material/History';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import VerifiedIcon from '@mui/icons-material/Verified';
import BusinessIcon from '@mui/icons-material/Business';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

// ===== Theme constants =====
const COLORS = {
  background: '#0A0A0A',
  backgroundElevated: '#111111',
  surface: '#111111',
  text: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.7)',
  textMuted: 'rgba(255, 255, 255, 0.5)',
  primaryLight: '#0D47A1',
  primaryDark: '#0A3D91',
  border: 'rgba(255, 255, 255, 0.08)',
  borderStrong: 'rgba(13, 71, 161, 0.4)',
};

const SPACING = {
  sectionY: 6,
  sectionX: 2,
  gridGap: 4,
  contentGap: 3,
  inlineGap: 2,
  titleToBody: 2,
  sectionTitleBottom: 4,
  cardPadding: 3,
};

const TYPOGRAPHY = {
  hero: { xs: '2.5rem', md: '4rem', lg: '5rem' },
  h1: { xs: '2rem', md: '3rem' },
  h2: { xs: '1.75rem', md: '2.5rem' },
  h3: { xs: '1.5rem', md: '2rem' },
  h4: { xs: '1.25rem', md: '1.5rem' },
  body: { xs: '1rem', md: '1.125rem' },
  bodySmall: { xs: '0.875rem', md: '1rem' },
  caption: '0.75rem',
  overline: '0.75rem',
};

const BUTTON = {
  large: { py: 1.5, px: 4 },
  borderRadius: 2,
};

const CONTAINER = {
  content: 'lg',
};

const About = () => {
  // Refs for scroll animations
  const heroRef = useRef(null);
  const historyRef = useRef(null);
  const missionRef = useRef(null);
  const staffRef = useRef(null);
  const environmentRef = useRef(null);

  // Parallax scroll effect for hero
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  // InView hooks for section animations
  const isHistoryInView = useInView(historyRef, { once: true, amount: 0.3 });
  const isMissionInView = useInView(missionRef, { once: true, amount: 0.3 });
  const isStaffInView = useInView(staffRef, { once: true, amount: 0.2 });
  const isEnvironmentInView = useInView(environmentRef, { once: true, amount: 0.3 });

  // Staff data
  const staffMembers = [
    {
      id: 1,
      name: 'Alexander Thompson',
      role: 'General Manager',
      experience: '15+ years',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      bio: 'Leading our team with passion and dedication to excellence',
      expertise: ['Luxury Service', 'Operations'],
    },
    {
      id: 2,
      name: 'Isabella Martinez',
      role: 'Head of Guest Relations',
      experience: '12+ years',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      bio: 'Ensuring every guest feels like royalty',
      expertise: ['VIP Treatment', 'Concierge'],
    },
    {
      id: 3,
      name: 'Jean-Pierre Dubois',
      role: 'Executive Chef',
      experience: '20+ years',
      image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      bio: 'Creating culinary masterpieces',
      expertise: ['French Cuisine', 'Wine Pairing'],
    },
    {
      id: 4,
      name: 'Victoria Chen',
      role: 'Spa Director',
      experience: '10+ years',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      bio: 'Bringing holistic wellness to our guests',
      expertise: ['Wellness', 'Therapies'],
    },
    {
      id: 5,
      name: 'Marcus Williams',
      role: 'Head Concierge',
      experience: '18+ years',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      bio: 'Making the impossible possible',
      expertise: ['VIP Services', 'Travel Planning'],
    },
    {
      id: 6,
      name: 'Sofia Laurent',
      role: 'Events Director',
      experience: '14+ years',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      bio: 'Creating unforgettable memories',
      expertise: ['Weddings', 'Corporate Events'],
    },
  ];

  // Environment features
  const environmentFeatures = [
    { icon: <SpaIcon />, title: 'Luxury Spa', description: 'World-class treatments' },
    { icon: <RestaurantIcon />, title: 'Fine Dining', description: 'Michelin-starred cuisine' },
    { icon: <PoolIcon />, title: 'Infinity Pool', description: 'Ocean-view swimming' },
    { icon: <FitnessCenterIcon />, title: 'Fitness Center', description: 'State-of-the-art equipment' },
    { icon: <LocalBarIcon />, title: 'Sky Bar', description: 'Premium cocktails' },
    { icon: <WifiIcon />, title: 'High-Speed WiFi', description: 'Complimentary premium' },
  ];

  // Achievements
  const achievements = [
    { icon: <EmojiEventsIcon />, number: '50+', label: 'Awards' },
    { icon: <GroupIcon />, number: '100k+', label: 'Happy Guests' },
    { icon: <HotelIcon />, number: '15', label: 'Luxury Suites' },
    { icon: <VerifiedIcon />, number: '35+', label: 'Years' },
  ];

  // Core values
  const coreValues = [
    { value: 'Excellence', description: 'Perfection in everything', icon: <WorkspacePremiumIcon /> },
    { value: 'Integrity', description: 'Honest and ethical', icon: <VerifiedIcon /> },
    { value: 'Innovation', description: 'Constantly evolving', icon: <TrackChangesIcon /> },
    { value: 'Care', description: 'Genuine concern', icon: <BusinessIcon /> },
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  const scaleIn = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  return (
    <>
      <style>{`
        /* ===== UNIQUE CLASS NAMES FOR ABOUT SECTION ===== */
        .luxury-about-root {
          overflow: hidden;
          background-color: ${COLORS.background};
          min-height: 100vh;
          position: relative;
          font-family: 'Inter', 'Helvetica Neue', sans-serif;
        }

        /* ===== Hero Section ===== */
        .luxury-hero-section {
          height: 80vh;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        @media (min-width: 900px) {
          .luxury-hero-section {
            height: 90vh;
          }
        }

        .luxury-hero-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80');
          background-size: cover;
          background-position: center;
        }

        .luxury-hero-background::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.7) 100%);
          z-index: 1;
        }

        .luxury-hero-background::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 70% 50%, rgba(13,71,161,0.2) 0%, transparent 60%);
          z-index: 2;
        }

        .luxury-hero-content {
          position: relative;
          z-index: 10;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2rem;
          width: 100%;
        }

        .luxury-hero-text {
          position: relative;
          z-index: 20;
          text-align: center;
        }

        .luxury-hero-overline {
          color: ${COLORS.primaryLight};
          font-size: 0.75rem;
          letter-spacing: 4px;
          margin-bottom: 1rem;
          display: block;
          text-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }

        .luxury-hero-title {
          color: ${COLORS.text};
          font-size: clamp(2.5rem, 8vw, 5rem);
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 1.5rem;
          text-shadow: 0 4px 20px rgba(0,0,0,0.5);
        }

        .luxury-hero-title span {
          display: block;
          background: linear-gradient(135deg, #fff 30%, ${COLORS.primaryLight} 90%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-size: clamp(2.75rem, 9vw, 5.5rem);
        }

        .luxury-hero-description {
          color: ${COLORS.textSecondary};
          max-width: 800px;
          margin: 0 auto 2rem auto;
          font-size: clamp(1rem, 3vw, 1.25rem);
          line-height: 1.75;
          text-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }

        .luxury-hero-buttons {
          display: flex;
          justify-content: center;
          gap: 1rem;
        }

        @media (max-width: 600px) {
          .luxury-hero-buttons {
            flex-direction: column;
            align-items: center;
          }
        }

        /* ===== Scroll Indicator ===== */
        .luxury-scroll-indicator {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 20;
        }

        .luxury-scroll-box {
          width: 30px;
          height: 50px;
          border: 2px solid ${COLORS.borderStrong};
          border-radius: 15px;
          position: relative;
          background-color: rgba(0,0,0,0.2);
          backdrop-filter: blur(5px);
        }

        .luxury-scroll-box::before {
          content: '';
          position: absolute;
          top: 8px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 8px;
          background-color: ${COLORS.primaryLight};
          border-radius: 2px;
          animation: scrollBounce 2s infinite;
        }

        @keyframes scrollBounce {
          0%, 100% { transform: translateX(-50%) translateY(0); opacity: 1; }
          50% { transform: translateX(-50%) translateY(15px); opacity: 0.5; }
        }

        /* ===== Achievements Bar ===== */
        .luxury-achievements-wrapper {
          max-width: 1280px;
          margin: -3rem auto 0 auto;
          padding: 0 2rem;
          position: relative;
          z-index: 30;
        }

        .luxury-achievements-paper {
          padding: 2rem;
          background: ${COLORS.backgroundElevated};
          backdrop-filter: blur(10px);
          border-radius: 8px;
          border: 1px solid ${COLORS.borderStrong};
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }

        .luxury-achievements-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          align-items: center;
        }

        @media (max-width: 640px) {
          .luxury-achievements-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .luxury-achievement-item {
          text-align: center;
        }

        .luxury-achievement-icon {
          color: ${COLORS.primaryLight};
          margin-bottom: 0.5rem;
          font-size: 2rem;
        }

        .luxury-achievement-number {
          color: ${COLORS.text};
          font-weight: 700;
          font-size: clamp(1.25rem, 4vw, 2rem);
        }

        .luxury-achievement-label {
          color: ${COLORS.textSecondary};
          font-size: 0.875rem;
        }

        /* ===== Section Styles ===== */
        .luxury-section {
          padding: 6rem 2rem;
        }

        .luxury-section-alt {
          padding: 6rem 2rem;
          background: linear-gradient(135deg, ${COLORS.background} 0%, #111111 100%);
          position: relative;
        }

        .luxury-section-alt::before,
        .luxury-section-alt::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, ${COLORS.primaryLight}, transparent);
        }

        .luxury-section-alt::before {
          top: 0;
        }

        .luxury-section-alt::after {
          bottom: 0;
        }

        .luxury-container {
          max-width: 1280px;
          margin: 0 auto;
        }

        /* ===== History Section ===== */
        .luxury-history-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        @media (max-width: 900px) {
          .luxury-history-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
        }

        .luxury-history-title {
          color: ${COLORS.text};
          margin-bottom: 2rem;
          font-size: clamp(2rem, 5vw, 3rem);
          line-height: 1.3;
        }

        .luxury-history-title span {
          color: ${COLORS.primaryLight};
          margin-left: 0.5rem;
        }

        .luxury-history-feature {
          display: flex;
          align-items: center;
          margin-bottom: 2rem;
          gap: 1rem;
        }

        .luxury-history-icon {
          color: ${COLORS.primaryLight};
          font-size: 2rem;
        }

        .luxury-history-subtitle {
          color: ${COLORS.text};
          font-weight: 500;
          font-size: clamp(1.25rem, 3vw, 1.5rem);
        }

        .luxury-history-text {
          color: ${COLORS.textSecondary};
          margin-bottom: 2rem;
          line-height: 1.75;
          font-size: clamp(0.875rem, 2vw, 1rem);
        }

        .luxury-history-chips {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .luxury-history-image-wrapper {
          position: relative;
        }

        .luxury-history-border {
          position: absolute;
          top: -16px;
          left: -16px;
          right: 16px;
          bottom: 16px;
          border: 3px solid ${COLORS.primaryLight};
          border-radius: 8px;
          z-index: 1;
        }

        .luxury-history-image {
          width: 100%;
          height: auto;
          border-radius: 8px;
          position: relative;
          z-index: 2;
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }

        .luxury-timeline {
          display: flex;
          justify-content: space-between;
          margin-top: 2rem;
          padding: 0 1rem;
        }

        .luxury-timeline-item {
          text-align: center;
        }

        .luxury-timeline-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: ${COLORS.primaryLight};
          margin-bottom: 0.5rem;
          margin-left: auto;
          margin-right: auto;
          box-shadow: 0 0 10px ${COLORS.primaryLight};
        }

        .luxury-timeline-year {
          color: ${COLORS.textSecondary};
          font-size: 0.75rem;
        }

        /* ===== Mission & Vision Grid ===== */
        .luxury-mission-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        @media (max-width: 900px) {
          .luxury-mission-grid {
            grid-template-columns: 1fr;
          }
        }

        /* ===== Staff Grid ===== */
        .luxury-staff-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        @media (max-width: 900px) {
          .luxury-staff-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .luxury-staff-grid {
            grid-template-columns: 1fr;
          }
        }

        /* ===== Environment Grid ===== */
        .luxury-environment-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        @media (max-width: 900px) {
          .luxury-environment-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .luxury-environment-grid {
            grid-template-columns: 1fr;
          }
        }

        /* ===== Core Values Grid ===== */
        .luxury-values-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }

        @media (max-width: 900px) {
          .luxury-values-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .luxury-values-grid {
            grid-template-columns: 1fr;
          }
        }

        /* ===== Text Utilities ===== */
        .luxury-text-center {
          text-align: center;
        }

        .luxury-mb-1 {
          margin-bottom: 0.5rem;
        }

        .luxury-mb-2 {
          margin-bottom: 1rem;
        }

        .luxury-mb-3 {
          margin-bottom: 1.5rem;
        }

        .luxury-mb-4 {
          margin-bottom: 2rem;
        }

        .luxury-mx-auto {
          margin-left: auto;
          margin-right: auto;
        }
      `}</style>

      <Box className="luxury-about-root">
        {/* Hero Section */}
        <Box ref={heroRef} className="luxury-hero-section">
          <Box
            component={motion.div}
            style={{
              opacity: heroOpacity,
              scale: heroScale,
            }}
            className="luxury-hero-background"
          />

          <div className="luxury-hero-content">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="luxury-hero-text"
            >
              <motion.div variants={fadeInUp}>
                <Typography className="luxury-hero-overline">
                  WELCOME TO
                </Typography>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Typography className="luxury-hero-title">
                  A Legacy of
                  <span>Unmatched Luxury</span>
                </Typography>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Typography className="luxury-hero-description">
                  Since 1985, we have been redefining the standards of luxury hospitality, 
                  creating unforgettable experiences for discerning travelers from around the globe.
                </Typography>
              </motion.div>

              <motion.div variants={fadeInUp} className="luxury-hero-buttons">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      background: `linear-gradient(135deg, ${COLORS.primaryLight} 30%, ${COLORS.primaryDark} 90%)`,
                      color: COLORS.text,
                      ...BUTTON.large,
                      borderRadius: BUTTON.borderRadius,
                      boxShadow: '0 8px 20px rgba(13,71,161,0.4)',
                      '&:hover': {
                        background: `linear-gradient(135deg, ${COLORS.primaryDark} 30%, ${COLORS.primary} 90%)`,
                        boxShadow: '0 12px 30px rgba(13,71,161,0.6)',
                      },
                    }}
                  >
                    Our Story
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: COLORS.primaryLight,
                      color: COLORS.text,
                      ...BUTTON.large,
                      borderRadius: BUTTON.borderRadius,
                      borderWidth: 2,
                      backgroundColor: 'rgba(0,0,0,0.3)',
                      backdropFilter: 'blur(5px)',
                      '&:hover': {
                        borderColor: COLORS.primaryDark,
                        borderWidth: 2,
                        backgroundColor: 'rgba(13,71,161,0.2)',
                      },
                    }}
                  >
                    Meet The Team
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            animate={{
              y: [0, 15, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="luxury-scroll-indicator"
          >
            <Box className="luxury-scroll-box" />
          </motion.div>
        </Box>

        {/* Achievements Bar */}
        <div className="luxury-achievements-wrapper">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <Paper className="luxury-achievements-paper">
              <div className="luxury-achievements-grid">
                {achievements.map((item, index) => (
                  <div key={index} className="luxury-achievement-item">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.2, type: "spring", stiffness: 200 }}
                    >
                      <Box className="luxury-achievement-icon">
                        {item.icon}
                      </Box>
                      <Typography className="luxury-achievement-number">
                        {item.number}
                      </Typography>
                      <Typography className="luxury-achievement-label">
                        {item.label}
                      </Typography>
                    </motion.div>
                  </div>
                ))}
              </div>
            </Paper>
          </motion.div>
        </div>

        {/* History Section */}
        <Box
          ref={historyRef}
          component={motion.section}
          initial="hidden"
          animate={isHistoryInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="luxury-section"
        >
          <div className="luxury-container">
            <div className="luxury-history-grid">
              <motion.div variants={fadeInUp}>
                <Typography className="luxury-history-title">
                  Our
                  <span>History</span>
                </Typography>

                <div className="luxury-history-feature">
                  <HistoryIcon className="luxury-history-icon" />
                  <Typography className="luxury-history-subtitle">
                    A Legacy of Excellence Since 1985
                  </Typography>
                </div>

                <Typography className="luxury-history-text">
                  Founded in 1985 by the Thompson family, Luxury Stay Hotel began as a vision 
                  to create the ultimate sanctuary for discerning travelers. What started as 
                  a modest 10-room boutique hotel has evolved into one of the world's most 
                  prestigious luxury destinations.
                </Typography>

                <Typography className="luxury-history-text">
                  Over the past four decades, we have welcomed royalty, celebrities, and 
                  business leaders from every corner of the globe. Each renovation has been 
                  carefully crafted to preserve our heritage while embracing modern luxury.
                </Typography>

                <div className="luxury-history-chips">
                  {['Heritage', 'Innovation', 'Excellence'].map((item, index) => (
                    <Chip
                      key={index}
                      label={item}
                      sx={{
                        backgroundColor: 'rgba(13,71,161,0.15)',
                        color: COLORS.primaryLight,
                        border: `1px solid ${COLORS.borderStrong}`,
                        fontSize: TYPOGRAPHY.body,
                        py: 1.5,
                        '&:hover': {
                          backgroundColor: 'rgba(13,71,161,0.25)',
                        },
                      }}
                    />
                  ))}
                </div>
              </motion.div>

              <motion.div variants={scaleIn}>
                <div className="luxury-history-image-wrapper">
                  <div className="luxury-history-border" />
                  <Box
                    component="img"
                    src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80"
                    alt="Hotel History"
                    className="luxury-history-image"
                  />
                </div>

                <div className="luxury-timeline">
                  {[1985, 1995, 2005, 2015, 2025].map((year, index) => (
                    <div key={index} className="luxury-timeline-item">
                      <div className="luxury-timeline-dot" />
                      <Typography className="luxury-timeline-year">
                        {year}
                      </Typography>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </Box>

        {/* Mission & Vision Section */}
        <Box
          ref={missionRef}
          component={motion.section}
          initial="hidden"
          animate={isMissionInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="luxury-section-alt"
        >
          <div className="luxury-container">
            <motion.div variants={fadeInUp} className="luxury-text-center luxury-mb-4">
              <Typography className="luxury-history-title">
                Our
                <span>Purpose</span>
              </Typography>
            </motion.div>

            <div className="luxury-mission-grid">
              <motion.div 
                variants={fadeInUp}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <Card
                  sx={{
                    height: '100%',
                    background: COLORS.backgroundElevated,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: 2,
                    position: 'relative',
                    overflow: 'hidden',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -20,
                      right: -20,
                      width: 150,
                      height: 150,
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(13,71,161,0.2) 0%, transparent 70%)',
                    }}
                  />
                  <CardContent sx={{ p: SPACING.cardPadding }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: SPACING.contentGap, gap: SPACING.inlineGap }}>
                      <TrackChangesIcon sx={{ color: COLORS.primaryLight, fontSize: 40 }} />
                      <Typography variant="h3" sx={{ color: COLORS.primaryLight, fontWeight: 600, fontSize: TYPOGRAPHY.h3 }}>
                        Mission
                      </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ color: COLORS.textSecondary, lineHeight: 1.75, fontSize: TYPOGRAPHY.body, mb: SPACING.contentGap }}>
                      To provide unparalleled luxury experiences that exceed expectations, 
                      creating lasting memories through exceptional service, 
                      attention to detail, and commitment to excellence.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {['Excellence', 'Personalization', 'Memories'].map((item, index) => (
                        <Chip
                          key={index}
                          label={item}
                          size="small"
                          sx={{ 
                            backgroundColor: 'rgba(13,71,161,0.2)', 
                            color: COLORS.primaryLight,
                            border: `1px solid ${COLORS.border}`,
                          }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div 
                variants={fadeInUp}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <Card
                  sx={{
                    height: '100%',
                    background: COLORS.backgroundElevated,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: 2,
                    position: 'relative',
                    overflow: 'hidden',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: -20,
                      left: -20,
                      width: 150,
                      height: 150,
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(13,71,161,0.2) 0%, transparent 70%)',
                    }}
                  />
                  <CardContent sx={{ p: SPACING.cardPadding }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: SPACING.contentGap, gap: SPACING.inlineGap }}>
                      <VisibilityIcon sx={{ color: COLORS.primaryLight, fontSize: 40 }} />
                      <Typography variant="h3" sx={{ color: COLORS.primaryLight, fontWeight: 600, fontSize: TYPOGRAPHY.h3 }}>
                        Vision
                      </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ color: COLORS.textSecondary, lineHeight: 1.75, fontSize: TYPOGRAPHY.body, mb: SPACING.contentGap }}>
                      To be recognized as the world's premier luxury hotel destination, 
                      setting new standards through innovation, sustainability, 
                      and unwavering dedication to extraordinary experiences.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {['Innovation', 'Sustainability', 'Global'].map((item, index) => (
                        <Chip
                          key={index}
                          label={item}
                          size="small"
                          sx={{ 
                            backgroundColor: 'rgba(13,71,161,0.2)', 
                            color: COLORS.primaryLight,
                            border: `1px solid ${COLORS.border}`,
                          }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </Box>

        {/* Staff Section */}
        <Box
          ref={staffRef}
          component={motion.section}
          initial="hidden"
          animate={isStaffInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="luxury-section"
        >
          <div className="luxury-container">
            <motion.div variants={fadeInUp} className="luxury-text-center luxury-mb-4">
              <Typography className="luxury-history-title">
                Meet Our
                <span>Experts</span>
              </Typography>
              <Typography
                sx={{
                  color: COLORS.textSecondary,
                  maxWidth: 800,
                  mx: 'auto',
                  fontSize: TYPOGRAPHY.body,
                  lineHeight: 1.75,
                }}
              >
                Dedicated professionals committed to making your stay extraordinary
              </Typography>
            </motion.div>

            <div className="luxury-staff-grid">
              {staffMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  variants={fadeInUp}
                  whileHover={{ 
                    y: -15, 
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      backgroundColor: COLORS.surface,
                      borderRadius: 2,
                      overflow: 'hidden',
                      border: `1px solid ${COLORS.border}`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        border: `1px solid ${COLORS.borderStrong}`,
                        boxShadow: '0 20px 40px rgba(13,71,161,0.3)',
                      },
                    }}
                  >
                    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                      <CardMedia
                        component="img"
                        height="280"
                        image={member.image}
                        alt={member.name}
                        sx={{
                          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                          objectFit: 'cover',
                          '&:hover': {
                            transform: 'scale(1.1)',
                          },
                        }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                          p: SPACING.titleToBody,
                        }}
                      >
                        <Typography variant="caption" sx={{ color: COLORS.primaryLight, fontWeight: 600, fontSize: TYPOGRAPHY.caption }}>
                          {member.experience} Experience
                        </Typography>
                      </Box>
                    </Box>
                    <CardContent sx={{ p: SPACING.cardPadding }}>
                      <Typography variant="h5" sx={{ color: COLORS.text, fontWeight: 600, mb: 0.5, fontSize: TYPOGRAPHY.h4 }}>
                        {member.name}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ color: COLORS.primaryLight, mb: SPACING.titleToBody, fontSize: TYPOGRAPHY.body }}>
                        {member.role}
                      </Typography>
                      <Typography variant="body2" sx={{ color: COLORS.textSecondary, mb: SPACING.titleToBody, lineHeight: 1.6, fontSize: TYPOGRAPHY.bodySmall }}>
                        {member.bio}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {member.expertise.map((skill, i) => (
                          <Chip
                            key={i}
                            label={skill}
                            size="small"
                            sx={{
                              backgroundColor: 'rgba(13,71,161,0.15)',
                              color: COLORS.primaryLight,
                              border: `1px solid ${COLORS.border}`,
                            }}
                          />
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </Box>

        {/* Environment Section */}
        <Box
          ref={environmentRef}
          component={motion.section}
          initial="hidden"
          animate={isEnvironmentInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="luxury-section-alt"
        >
          <div className="luxury-container">
            <motion.div variants={fadeInUp} className="luxury-text-center luxury-mb-4">
              <Typography className="luxury-history-title">
                The
                <span>Environment</span>
              </Typography>
              <Typography
                sx={{
                  color: COLORS.textSecondary,
                  maxWidth: 800,
                  mx: 'auto',
                  fontSize: TYPOGRAPHY.body,
                  lineHeight: 1.75,
                }}
              >
                Immerse yourself in an atmosphere of refined luxury and sophisticated comfort
              </Typography>
            </motion.div>

            <div className="luxury-environment-grid">
              {environmentFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -8,
                    transition: { duration: 0.3 }
                  }}
                >
                  <Paper
                    sx={{
                      p: SPACING.cardPadding,
                      textAlign: 'center',
                      backgroundColor: COLORS.surface,
                      backdropFilter: 'blur(10px)',
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: 2,
                      height: '100%',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        border: `1px solid ${COLORS.borderStrong}`,
                        boxShadow: '0 15px 40px rgba(13,71,161,0.25)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: 'inline-flex',
                        p: 2,
                        borderRadius: '50%',
                        background: 'rgba(13,71,161,0.15)',
                        color: COLORS.primaryLight,
                        mb: SPACING.titleToBody,
                        fontSize: '2.5rem',
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" sx={{ color: COLORS.text, fontWeight: 600, mb: 1, fontSize: TYPOGRAPHY.h4 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: COLORS.textSecondary, fontSize: TYPOGRAPHY.bodySmall, lineHeight: 1.5 }}>
                      {feature.description}
                    </Typography>
                  </Paper>
                </motion.div>
              ))}
            </div>
          </div>
        </Box>

        {/* Core Values Section */}
        <Box
          sx={{
            py: SPACING.sectionY,
            px: SPACING.sectionX,
            borderTop: `1px solid ${COLORS.borderStrong}`,
            borderBottom: `1px solid ${COLORS.border}`,
            background: `linear-gradient(135deg, ${COLORS.background} 0%, #111111 100%)`,
          }}
        >
          <div className="luxury-container">
            <div className="luxury-values-grid">
              {coreValues.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  viewport={{ once: true, amount: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Box sx={{ 
                    textAlign: 'center',
                    p: SPACING.cardPadding,
                    borderRadius: 2,
                    background: 'rgba(13,71,161,0.05)',
                    border: `1px solid ${COLORS.border}`,
                    transition: 'all 0.3s ease',
                    height: '100%',
                    '&:hover': {
                      background: 'rgba(13,71,161,0.1)',
                      border: `1px solid ${COLORS.borderStrong}`,
                    }
                  }}>
                    <Box sx={{ color: COLORS.primaryLight, fontSize: '3rem', mb: SPACING.titleToBody }}>
                      {item.icon}
                    </Box>
                    <Typography variant="h5" sx={{ color: COLORS.primaryLight, fontWeight: 700, mb: 1, fontSize: TYPOGRAPHY.h4 }}>
                      {item.value}
                    </Typography>
                    <Typography variant="body2" sx={{ color: COLORS.textSecondary, fontSize: TYPOGRAPHY.bodySmall, lineHeight: 1.5 }}>
                      {item.description}
                    </Typography>
                  </Box>
                </motion.div>
              ))}
            </div>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default About;