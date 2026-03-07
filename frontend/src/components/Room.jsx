import React, { useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Divider,
  Paper,
  Rating,
} from '@mui/material';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import DiamondIcon from '@mui/icons-material/Diamond';
import WifiIcon from '@mui/icons-material/Wifi';
import KingBedIcon from '@mui/icons-material/KingBed';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import TvIcon from '@mui/icons-material/Tv';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import BathtubIcon from '@mui/icons-material/Bathtub';
import CoffeeIcon from '@mui/icons-material/Coffee';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import SpaIcon from '@mui/icons-material/Spa';
import PoolIcon from '@mui/icons-material/Pool';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BreakfastDiningIcon from '@mui/icons-material/BreakfastDining';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import BalconyIcon from '@mui/icons-material/Balcony';
import HotTubIcon from '@mui/icons-material/HotTub';
import LightIcon from '@mui/icons-material/Light';

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
  gridGap: 3,
  contentGap: 3,
  inlineGap: 2,
  titleToBody: 2,
  sectionTitleBottom: 4,
  cardPadding: 3,
};

const CONTAINER = {
  content: 'lg',
  wide: 'lg',
  form: 'sm',
};

const RoomsPage = () => {
  // Refs for scroll animations
  const heroRef = useRef(null);
  const roomsRef = useRef(null);
  const diningRef = useRef(null);
  const ctaRef = useRef(null);

  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  // InView hooks
  const isRoomsInView = useInView(roomsRef, { once: true, amount: 0.2 });
  const isDiningInView = useInView(diningRef, { once: true, amount: 0.3 });
  const isCtaInView = useInView(ctaRef, { once: true, amount: 0.5 });

  // Room data
  const rooms = [
    {
      id: 1,
      name: 'Standard Room',
      description: 'Elegant comfort with modern amenities for the discerning traveler seeking luxury at an accessible price point.',
      price: 'RS3000 ',
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
      rating: 4.5,
      reviews: 128,
      features: [
        { icon: <KingBedIcon />, label: 'Queen Bed' },
        { icon: <WifiIcon />, label: 'Free WiFi' },
        { icon: <AcUnitIcon />, label: 'AC' },
        { icon: <TvIcon />, label: 'Smart TV' },
        { icon: <RoomServiceIcon />, label: 'Room Service' },
        { icon: <BathtubIcon />, label: 'Private Bath' },
      ],
      size: '32 m²',
      capacity: '2 Guests',
    },
    {
      id: 2,
      name: 'Deluxe Room',
      description: 'Spacious elegance with panoramic city views and premium amenities for an unforgettable stay.',
      price: 'RS5000',
      image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
      rating: 4.8,
      reviews: 256,
      features: [
        { icon: <KingBedIcon />, label: 'King Bed' },
        { icon: <BalconyIcon />, label: 'City View' },
        { icon: <CoffeeIcon />, label: 'Breakfast' },
        { icon: <LocalBarIcon />, label: 'Mini Bar' },
        { icon: <TvIcon />, label: 'Smart TV' },
        { icon: <WifiIcon />, label: 'High-Speed WiFi' },
      ],
      size: '45 m²',
      capacity: '3 Guests',
    },
    {
      id: 3,
      name: 'Presidential Suite',
      description: 'The pinnacle of luxury featuring separate living areas, Jacuzzi, and personalized butler service.',
      price: 'RS10000',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
      rating: 5.0,
      reviews: 89,
      features: [
        { icon: <KingBedIcon />, label: 'Master Bedroom' },
        { icon: <SpaIcon />, label: 'Living Area' },
        { icon: <HotTubIcon />, label: 'Jacuzzi' },
        { icon: <LocationCityIcon />, label: 'Ocean View' },
        { icon: <RoomServiceIcon />, label: 'Butler Service' },
        { icon: <LightIcon />, label: 'Smart Lighting' },
      ],
      size: '85 m²',
      capacity: '4 Guests',
    },
  ];

  // Dining categories
  const diningCategories = [
    {
      id: 1,
      name: 'Continental Breakfast',
      description: 'Start your day with our exquisite breakfast buffet featuring fresh pastries, premium coffee, and international delicacies.',
      icon: <BreakfastDiningIcon sx={{ fontSize: 48 }} />,
      image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
      time: '6:30 AM - 10:30 AM',
    },
    {
      id: 2,
      name: 'Premium Lunch Buffet',
      description: 'Indulge in our lavish lunch spread featuring live cooking stations, seafood delicacies, and global cuisines.',
      icon: <LunchDiningIcon sx={{ fontSize: 48 }} />,
      image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
      time: '12:30 PM - 3:30 PM',
    },
    {
      id: 3,
      name: 'Candle Light Dinner',
      description: 'Experience romantic fine dining with panoramic views, gourmet cuisine, and an extensive wine collection.',
      icon: <DinnerDiningIcon sx={{ fontSize: 48 }} />,
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
      time: '7:00 PM - 11:00 PM',
    },
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

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8 }
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
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const cardHover = {
    hover: {
      y: -12,
      scale: 1.02,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  return (
    <>
      <style>{`
        /* ===== UNIQUE CLASS NAMES FOR ROOMS SECTION ===== */
        .luxury-rooms-root {
          overflow: hidden;
          background-color: #0a0a0a;
          min-height: 100vh;
          position: relative;
          font-family: 'Inter', 'Helvetica Neue', sans-serif;
        }

        /* ===== Hero Section ===== */
        .luxury-rooms-hero {
          height: 70vh;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        @media (min-width: 900px) {
          .luxury-rooms-hero {
            height: 80vh;
          }
        }

        .luxury-rooms-hero-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, #0a0a0a 0%, #111827 50%, #0d1b2a 100%);
        }

        .luxury-rooms-hero-bg::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 70% 50%, rgba(13,71,161,0.2) 0%, transparent 60%);
        }

        .luxury-rooms-hero-content {
          position: relative;
          z-index: 10;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2rem;
          text-align: center;
          width: 100%;
        }

        .luxury-rooms-hero-icon {
          font-size: 70px;
          color: #0d47a1;
          margin-bottom: 1rem;
          filter: drop-shadow(0 0 20px rgba(13,71,161,0.5));
        }

        .luxury-rooms-hero-title {
          color: white;
          font-size: clamp(2.5rem, 8vw, 5rem);
          font-weight: 700;
          line-height: 1.1;
          margin-bottom: 1rem;
          text-shadow: 0 4px 20px rgba(0,0,0,0.5);
        }

        .luxury-rooms-hero-title span {
          display: block;
          background: linear-gradient(135deg, #fff 30%, #0d47a1 90%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-size: clamp(2rem, 6vw, 4.5rem);
        }

        .luxury-rooms-hero-description {
          color: rgba(255,255,255,0.9);
          max-width: 800px;
          margin: 0 auto;
          font-size: clamp(1rem, 3vw, 1.2rem);
          line-height: 1.8;
          text-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }

        /* ===== Scroll Indicator ===== */
        .luxury-rooms-scroll {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
        }

        .luxury-rooms-scroll-box {
          width: 30px;
          height: 50px;
          border: 2px solid rgba(13,71,161,0.6);
          border-radius: 15px;
          position: relative;
          background-color: rgba(0,0,0,0.3);
          backdrop-filter: blur(5px);
        }

        .luxury-rooms-scroll-box::before {
          content: '';
          position: absolute;
          top: 8px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 8px;
          background-color: #0d47a1;
          border-radius: 2px;
          animation: scrollBounce 2s infinite;
        }

        @keyframes scrollBounce {
          0%, 100% { transform: translateX(-50%) translateY(0); opacity: 1; }
          50% { transform: translateX(-50%) translateY(15px); opacity: 0.5; }
        }

        /* ===== Section Styles ===== */
        .luxury-rooms-section {
          padding: 6rem 2rem;
          position: relative;
          z-index: 5;
        }

        .luxury-rooms-section-alt {
          padding: 6rem 2rem;
          background: linear-gradient(135deg, #0a0a0a 0%, #111111 100%);
          position: relative;
        }

        .luxury-rooms-section-alt::before,
        .luxury-rooms-section-alt::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #0d47a1, transparent);
        }

        .luxury-rooms-section-alt::before {
          top: 0;
        }

        .luxury-rooms-section-alt::after {
          bottom: 0;
        }

        .luxury-rooms-container {
          max-width: 1280px;
          margin: 0 auto;
        }

        /* ===== Section Headers ===== */
        .luxury-rooms-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .luxury-rooms-header h2 {
          color: white;
          margin-bottom: 0.5rem;
          font-size: clamp(2rem, 5vw, 3rem);
        }

        .luxury-rooms-header h2 span {
          color: #0d47a1;
          margin-left: 0.5rem;
        }

        .luxury-rooms-header p {
          color: rgba(255,255,255,0.8);
          max-width: 800px;
          margin: 0 auto;
        }

        /* ===== Rooms Grid ===== */
        .luxury-rooms-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        @media (max-width: 900px) {
          .luxury-rooms-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .luxury-rooms-grid {
            grid-template-columns: 1fr;
          }
        }

        /* ===== Dining Grid ===== */
        .luxury-dining-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-bottom: 3rem;
        }

        @media (max-width: 900px) {
          .luxury-dining-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .luxury-dining-grid {
            grid-template-columns: 1fr;
          }
        }

        /* ===== Dining Highlights ===== */
        .luxury-dining-highlights {
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
          margin-top: 2rem;
        }

        @media (max-width: 640px) {
          .luxury-dining-highlights {
            gap: 1rem;
          }
        }

        /* ===== Amenities Grid ===== */
        .luxury-amenities-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .luxury-amenity-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .luxury-amenity-icon {
          color: #0d47a1;
          font-size: 1rem;
        }

        .luxury-amenity-label {
          color: rgba(255,255,255,0.8);
          font-size: 0.75rem;
        }

        /* ===== Room Meta ===== */
        .luxury-room-meta {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }

        .luxury-room-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .luxury-room-rating {
          display: flex;
          align-items: center;
        }

        /* ===== Price Badge ===== */
        .luxury-price-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(13,71,161,0.9);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          backdrop-filter: blur(5px);
        }

        .luxury-price-badge h6 {
          font-weight: 700;
          margin: 0;
        }

        .luxury-price-badge span {
          font-size: 0.75rem;
          margin-left: 0.25rem;
        }

        /* ===== Card Styles ===== */
        .luxury-room-card {
          height: 100%;
          background: linear-gradient(135deg, rgba(18,18,18,0.9) 0%, rgba(13,13,13,0.9) 100%);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(13,71,161,0.2);
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .luxury-room-card:hover {
          border: 1px solid rgba(13,71,161,0.6);
          box-shadow: 0 20px 40px rgba(13,71,161,0.3);
        }

        .luxury-room-image-wrapper {
          position: relative;
          overflow: hidden;
        }

        .luxury-room-image {
          width: 100%;
          height: 280px;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @media (max-width: 600px) {
          .luxury-room-image {
            height: 250px;
          }
        }

        .luxury-room-image:hover {
          transform: scale(1.1);
        }

        .luxury-room-content {
          padding: 1.5rem;
        }

        /* ===== Dining Card ===== */
        .luxury-dining-card {
          height: 100%;
          background: linear-gradient(135deg, rgba(18,18,18,0.8) 0%, rgba(13,13,13,0.8) 100%);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(13,71,161,0.2);
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.3s ease;
          padding: 1.5rem;
        }

        .luxury-dining-card:hover {
          border: 1px solid rgba(13,71,161,0.6);
          box-shadow: 0 20px 40px rgba(13,71,161,0.2);
        }

        .luxury-dining-image-wrapper {
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 1rem;
        }

        .luxury-dining-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .luxury-dining-image:hover {
          transform: scale(1.1);
        }

        .luxury-dining-icon {
          position: absolute;
          top: 16px;
          left: 16px;
          background: rgba(13,71,161,0.9);
          color: white;
          padding: 0.5rem;
          border-radius: 8px;
        }

        /* ===== CTA Section ===== */
        .luxury-cta-section {
          padding: 6rem 2rem;
          position: relative;
          overflow: hidden;
        }

        .luxury-cta-paper {
          padding: 3rem 2rem;
          background: linear-gradient(135deg, rgba(13,71,161,0.1) 0%, rgba(13,71,161,0.05) 100%);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(13,71,161,0.3);
          border-radius: 16px;
          position: relative;
          overflow: hidden;
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }

        @media (min-width: 900px) {
          .luxury-cta-paper {
            padding: 4rem 6rem;
          }
        }

        .luxury-cta-bg {
          position: absolute;
          top: -50px;
          right: -50px;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(13,71,161,0.2) 0%, transparent 70%);
        }

        .luxury-cta-title {
          color: white;
          margin-bottom: 1.5rem;
          font-size: clamp(1.8rem, 4vw, 2.5rem);
          font-weight: 600;
        }

        .luxury-cta-title span {
          color: #0d47a1;
          margin-left: 1rem;
        }

        .luxury-cta-text {
          color: rgba(255,255,255,0.8);
          margin-bottom: 2rem;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
          font-size: 1.1rem;
        }

        .luxury-cta-caption {
          display: block;
          color: rgba(255,255,255,0.5);
          margin-top: 1.5rem;
          font-size: 0.75rem;
        }

        /* ===== Background Particles ===== */
        .luxury-particle {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: radial-gradient(circle, #0d47a1 0%, transparent 70%);
          opacity: 0.1;
          pointer-events: none;
          z-index: 1;
        }

        /* ===== Utility Classes ===== */
        .luxury-mb-2 {
          margin-bottom: 0.5rem;
        }

        .luxury-mb-3 {
          margin-bottom: 1rem;
        }

        .luxury-mb-4 {
          margin-bottom: 2rem;
        }

        .luxury-mt-4 {
          margin-top: 2rem;
        }

        .luxury-text-center {
          text-align: center;
        }

        .luxury-flex {
          display: flex;
        }

        .luxury-flex-wrap {
          flex-wrap: wrap;
        }

        .luxury-gap-2 {
          gap: 0.5rem;
        }

        .luxury-gap-3 {
          gap: 1rem;
        }
      `}</style>

      <Box className="luxury-rooms-root">
        {/* Animated background particles */}
        {[...Array(20)].map((_, i) => (
          <Box
            key={i}
            component={motion.div}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 15 + i,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5,
            }}
            className="luxury-particle"
            sx={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}

        {/* Hero Section */}
        <Box
          ref={heroRef}
          className="luxury-rooms-hero"
        >
          {/* Background with overlay */}
          <Box
            component={motion.div}
            style={{
              opacity: heroOpacity,
              scale: heroScale,
            }}
            className="luxury-rooms-hero-bg"
          />

          {/* Content */}
          <div className="luxury-rooms-hero-content">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <DiamondIcon className="luxury-rooms-hero-icon" />
              </motion.div>

              <Typography className="luxury-rooms-hero-title">
                Our
                <span>Luxury Rooms</span>
              </Typography>

              <Typography className="luxury-rooms-hero-description">
                Experience unparalleled comfort and elegance in our meticulously designed rooms,
                where every detail is crafted for your ultimate relaxation and enjoyment.
              </Typography>

              {/* Scroll indicator */}
              <motion.div
                animate={{
                  y: [0, 15, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="luxury-rooms-scroll"
              >
                <Box className="luxury-rooms-scroll-box" />
              </motion.div>
            </motion.div>
          </div>
        </Box>

        {/* Rooms Section */}
        <Box
          ref={roomsRef}
          component={motion.section}
          initial="hidden"
          animate={isRoomsInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="luxury-rooms-section"
        >
          <div className="luxury-rooms-container">
            <motion.div variants={fadeInUp} className="luxury-rooms-header">
              <Typography variant="h2">
                Choose Your
                <span>Perfect Stay</span>
              </Typography>
              <Typography variant="body1">
                Each room is thoughtfully designed to provide the ultimate luxury experience
              </Typography>
            </motion.div>

            <div className="luxury-rooms-grid">
              {rooms.map((room, index) => (
                <motion.div
                  key={room.id}
                  variants={{ ...fadeInUp, ...cardHover }}
                  whileHover="hover"
                >
                  <Card className="luxury-room-card">
                    <Box className="luxury-room-image-wrapper">
                      <CardMedia
                        component="img"
                        image={room.image}
                        alt={room.name}
                        className="luxury-room-image"
                      />
                      <Box className="luxury-price-badge">
                        <Typography variant="h6">
                          {room.price}
                          <span>/night</span>
                        </Typography>
                      </Box>
                    </Box>

                    <CardContent className="luxury-room-content">
                      <div className="luxury-room-header">
                        <Typography variant="h4" sx={{ color: 'white', fontWeight: 600, fontSize: '1.5rem' }}>
                          {room.name}
                        </Typography>
                        <div className="luxury-room-rating">
                          <Rating value={room.rating} readOnly size="small" sx={{ color: '#0d47a1', mr: 1 }} />
                          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                            ({room.reviews})
                          </Typography>
                        </div>
                      </div>

                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 2, lineHeight: 1.7 }}>
                        {room.description}
                      </Typography>

                      <div className="luxury-room-meta">
                        <Chip
                          label={room.size}
                          size="small"
                          sx={{
                            backgroundColor: 'rgba(13,71,161,0.1)',
                            color: '#0d47a1',
                            border: '1px solid rgba(13,71,161,0.3)',
                          }}
                        />
                        <Chip
                          label={room.capacity}
                          size="small"
                          sx={{
                            backgroundColor: 'rgba(13,71,161,0.1)',
                            color: '#0d47a1',
                            border: '1px solid rgba(13,71,161,0.3)',
                          }}
                        />
                      </div>

                      <Divider sx={{ borderColor: 'rgba(13,71,161,0.2)', my: 2 }} />

                      <Typography variant="subtitle2" sx={{ color: 'white', mb: 1 }}>
                        Amenities:
                      </Typography>

                      <div className="luxury-amenities-grid">
                        {room.features.map((feature, idx) => (
                          <div key={idx} className="luxury-amenity-item">
                            <Box className="luxury-amenity-icon">
                              {feature.icon}
                            </Box>
                            <Typography className="luxury-amenity-label">
                              {feature.label}
                            </Typography>
                          </div>
                        ))}
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          fullWidth
                          variant="contained"
                          endIcon={<ArrowForwardIcon />}
                          sx={{
                            background: 'linear-gradient(135deg, #0d47a1 30%, #1565c0 90%)',
                            color: 'white',
                            py: 1.5,
                            borderRadius: 2,
                            boxShadow: '0 8px 20px rgba(13,71,161,0.3)',
                            '&:hover': {
                              background: 'linear-gradient(135deg, #1565c0 30%, #1976d2 90%)',
                              boxShadow: '0 12px 30px rgba(13,71,161,0.6)',
                            },
                          }}
                        >
                         All Details
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </Box>

        {/* Food & Dining Section */}
        <Box
          ref={diningRef}
          component={motion.section}
          initial="hidden"
          animate={isDiningInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="luxury-rooms-section-alt"
        >
          <div className="luxury-rooms-container">
            <motion.div variants={fadeInUp} className="luxury-rooms-header">
              <Typography variant="h2">
                Fine
                <span>Dining Experience</span>
              </Typography>
              <Typography variant="body1">
                Indulge in culinary excellence at our award-winning restaurants, where world-class chefs
                create unforgettable gastronomic experiences.
              </Typography>
            </motion.div>

            <div className="luxury-dining-grid">
              {diningCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  variants={{ ...fadeInUp, ...cardHover }}
                  whileHover="hover"
                >
                  <Paper elevation={0} className="luxury-dining-card">
                    <div className="luxury-dining-image-wrapper">
                      <Box
                        component="img"
                        src={category.image}
                        alt={category.name}
                        className="luxury-dining-image"
                      />
                      <Box className="luxury-dining-icon">
                        {category.icon}
                      </Box>
                    </div>

                    <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, mb: 1 }}>
                      {category.name}
                    </Typography>

                    <Typography variant="body2" sx={{ color: '#0d47a1', mb: 2, fontWeight: 500 }}>
                      {category.time}
                    </Typography>

                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 3, lineHeight: 1.7 }}>
                      {category.description}
                    </Typography>

                    <div className="luxury-flex luxury-flex-wrap luxury-gap-2" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                      <Chip
                        icon={<RestaurantIcon />}
                        label="Reserve"
                        size="small"
                        sx={{
                          backgroundColor: 'rgba(13,71,161,0.1)',
                          color: '#0d47a1',
                          border: '1px solid rgba(13,71,161,0.3)',
                          '&:hover': {
                            backgroundColor: 'rgba(13,71,161,0.2)',
                          },
                        }}
                      />
                      <Button
                        variant="text"
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                          color: '#0d47a1',
                          '&:hover': {
                            color: '#1976d2',
                          },
                        }}
                      >
                        View Menu
                      </Button>
                    </div>
                  </Paper>
                </motion.div>
              ))}
            </div>

            {/* Dining Highlights */}
            <motion.div variants={fadeInUp}>
              <div className="luxury-dining-highlights">
                {[
                  { icon: <RestaurantIcon />, label: 'Michelin Star Chef' },
                  { icon: <LocalBarIcon />, label: 'Premium Wine Cellar' },
                  { icon: <SpaIcon />, label: 'Private Dining' },
                  { icon: <PoolIcon />, label: 'Poolside Service' },
                ].map((item, index) => (
                  <Chip
                    key={index}
                    icon={item.icon}
                    label={item.label}
                    sx={{
                      backgroundColor: 'rgba(13,71,161,0.1)',
                      color: 'white',
                      border: '1px solid rgba(13,71,161,0.3)',
                      py: 2,
                      '&:hover': {
                        backgroundColor: 'rgba(13,71,161,0.2)',
                        border: '1px solid rgba(13,71,161,0.8)',
                      },
                      '& .MuiChip-icon': {
                        color: '#0d47a1',
                      },
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </Box>

        {/* Call to Action Section */}
        <Box
          ref={ctaRef}
          component={motion.section}
          initial="hidden"
          animate={isCtaInView ? "visible" : "hidden"}
          variants={fadeIn}
          className="luxury-cta-section"
        >
          <div className="luxury-rooms-container">
            <motion.div
              variants={scaleIn}
            >
              <Paper elevation={0} className="luxury-cta-paper">
                <div className="luxury-cta-bg" />
                
                <Typography className="luxury-cta-title">
                  Book Your
                  <span>Dream Stay</span>
                </Typography>

                <Typography className="luxury-cta-text">
                  Experience the pinnacle of luxury hospitality. Limited availability for exclusive packages.
                </Typography>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<DiamondIcon />}
                    sx={{
                      background: 'linear-gradient(135deg, #0d47a1 30%, #1565c0 90%)',
                      color: 'white',
                      fontSize: '1.2rem',
                      py: 2,
                      px: 6,
                      borderRadius: 3,
                      boxShadow: '0 8px 30px rgba(13,71,161,0.4)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #1565c0 30%, #1976d2 90%)',
                        boxShadow: '0 15px 40px rgba(13,71,161,0.6)',
                      },
                    }}
                  >
                    Reserve Now
                  </Button>
                </motion.div>

                <Typography className="luxury-cta-caption">
                  Best Rate Guarantee • Free Cancellation • 24/7 Support
                </Typography>
              </Paper>
            </motion.div>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default RoomsPage;