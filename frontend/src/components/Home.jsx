import React, { useRef ,useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Chip,
  Avatar,
  IconButton,
  Paper,
  Stack,
 
} from '@mui/material';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SpaIcon from '@mui/icons-material/Spa';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PoolIcon from '@mui/icons-material/Pool';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import DiamondIcon from '@mui/icons-material/Diamond';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import StarIcon from '@mui/icons-material/Star';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { SPACING, CONTAINER, COLORS } from '../theme/designSystem';

const Home = () => {
  const heroRef = useRef(null);
  const featuredRef = useRef(null);
  const servicesRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const isFeaturedInView = useInView(featuredRef, { once: true, amount: 0.3 });
  const isServicesInView = useInView(servicesRef, { once: true, amount: 0.3 });
  const isTestimonialsInView = useInView(testimonialsRef, { once: true, amount: 0.3 });
  const isCtaInView = useInView(ctaRef, { once: true, amount: 0.3 });

  

  const services = [
    { 
      icon: <SpaIcon sx={{ fontSize: 40 }} />, 
      title: 'Luxury Spa', 
      description: 'Rejuvenate with our signature treatments and therapies',
      color: COLORS.primaryLight
    },
    { 
      icon: <RestaurantIcon sx={{ fontSize: 40 }} />, 
      title: 'Fine Dining', 
      description: 'Michelin-starred culinary experience with ocean views',
      color: COLORS.primaryLight
    },
    { 
      icon: <PoolIcon sx={{ fontSize: 40 }} />, 
      title: 'Infinity Pool', 
      description: 'Stunning ocean-view infinity pool with cabana service',
      color: COLORS.primaryLight
    },
    { 
      icon: <FitnessCenterIcon sx={{ fontSize: 40 }} />, 
      title: 'Fitness Center', 
      description: 'State-of-the-art equipment with personal trainers',
      color: COLORS.primaryLight
    },
    { 
      icon: <LocalBarIcon sx={{ fontSize: 40 }} />, 
      title: 'Sky Bar', 
      description: 'Premium cocktails and champagne with panoramic views',
      color: COLORS.primaryLight
    },
    { 
      icon: <DiamondIcon sx={{ fontSize: 40 }} />, 
      title: 'Concierge', 
      description: '24/7 personalized service for your every need',
      color: COLORS.primaryLight
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Jennifer Lawrence',
      role: 'Travel Blogger',
      comment: 'An absolutely breathtaking experience. The attention to detail and service was impeccable. The Presidential Suite exceeded all expectations.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108777-467ef4b7b4c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 2,
      name: 'Robert Downey Jr.',
      role: 'Business Executive',
      comment: 'The Royal Penthouse offers unparalleled luxury. The views are spectacular and the service is world-class. My favorite stay in the city.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 3,
      name: 'Emma Watson',
      role: 'Actor',
      comment: 'The spa treatments were divine and the staff made me feel like royalty. Already planning my next visit with family.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 4,
      name: 'George Clooney',
      role: 'Film Director',
      comment: 'This is what luxury truly means. Every detail is carefully curated for the discerning traveler. Highly recommended.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    },
  ];

  const [currentTestimonial, setCurrentTestimonial] = React.useState(0);

  const handleNextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 1
      }
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

  const scaleOnHover = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    }
  };



  const theme = {
  // Core Brand Colors
  primaryLight: "#0D47A1",
  primaryMain: "#1565C0",
  primaryDark: "#0A3D91",

  // Background Colors
  bgMain: "#0A0A0A",
  bgSecondary: "#111111",
  footerGradient: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
  glassEffect: "rgba(255, 255, 255, 0.05)",

  // Text Colors
  textPrimary: "#FFFFFF",
  textSecondary: "rgba(255, 255, 255, 0.5)",
  textMuted: "rgba(255, 255, 255, 0.5)",

  // Border Colors
  borderLight: "rgba(255, 255, 255, 0.08)",
  borderStrong: "rgba(13, 71, 161, 0.4)",

  // Navbar
  navbarBg: "rgba(10, 10, 10, 0.9)",
  navbarScrolled: "rgba(10, 10, 10, 0.98)",
  backdropBlur: "blur(10px)",
  navbarBorder: "1px solid rgba(13, 71, 161, 0.4)",
  hoverColor: "#0D47A1",
  transition: "0.3s ease",

  // Mobile Drawer
  drawerBg: "#111111",
  activeBg: "rgba(13, 71, 161, 0.15)",
  activeIcon: "#0D47A1",

  // Footer Effects
  radialGlow: "radial-gradient(circle at 0% 50%, #0d47a1 0%, transparent 50%)",
  particleColor: "rgba(13, 71, 161, 0.1)",
  bottomLine: "linear-gradient(90deg, transparent, #0D47A1, transparent)",

  // Newsletter
  newsletterContainer: "rgba(255, 255, 255, 0.05)",
  newsletterBorder: "1px solid rgba(13, 71, 161, 0.4)",
  newsletterRadius: "12px",
  newsletterButton: "#0D47A1",
};

// Sample luxury hotel images (high‑quality placeholders)
const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&auto=format",
    alt: "Luxury hotel lobby with chandelier",
    category: "Lobby",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format",
    alt: "Elegant hotel room with city view",
    category: "Room",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format",
    alt: "Infinity swimming pool overlooking ocean",
    category: "Pool",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format",
    alt: "Fine dining restaurant with white tablecloths",
    category: "Restaurant",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format",
    alt: "Modern hotel exterior at night",
    category: "Exterior",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1765745518752-68a289300789?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8THV4dXJ5JTIwc3BhJTIwd2l0aCUyMG1hcmJsZSUyMGFuZCUyMGNhbmRsZXN8ZW58MHx8MHx8fDA%3D",
    alt: "Luxury spa with marble and candles",
    category: "Spa",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1561501878-aabd62634533?w=800&auto=format",
    alt: "Grand ballroom with crystal chandeliers",
    category: "Events",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&auto=format",
    alt: "Rooftop bar with panoramic view",
    category: "Bar",
  },
   {
    id: 8,
    src: "https://images.unsplash.com/photo-1765122670586-b5f22d95c17f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8THV4dXJ5JTIwaG90ZWwlMjBlbnRyYW5jZXxlbnwwfHwwfHx8MA%3D%3D",
    alt: "Rooftop bar with panoramic view",
    category: "Bar",
  },
];

  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2, rootMargin: '50px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const [selectedImage, setSelectedImage] = useState(null);

  // Open modal with the clicked image
  const openLightbox = (image) => {
    setSelectedImage(image);
  };

  // Close modal
  const closeLightbox = () => {
    setSelectedImage(null);
  };

  // Styles object (inline CSS)
  const styles = {
    gallerySection: {
      backgroundColor: theme.bgMain,
      padding: "80px 24px",
      fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
      color: theme.textPrimary,
    },
    container: {
      maxWidth: "1280px",
      margin: "0 auto",
    },
    header: {
      textAlign: "center",
      marginBottom: "56px",
    },
    title: {
      fontSize: "clamp(2rem, 5vw, 3rem)",
      fontWeight: "300",
      letterSpacing: "2px",
      margin: "0 0 12px 0",
      textTransform: "uppercase",
      color: theme.textPrimary,
    },
    titleAccent: {
      color: theme.primaryLight,
      fontWeight: "400",
    },
    subtitle: {
      fontSize: "clamp(1rem, 2vw, 1.2rem)",
      color: theme.textSecondary,
      letterSpacing: "1px",
      fontWeight: "300",
      borderBottom: `1px solid ${theme.borderStrong}`,
      display: "inline-block",
      paddingBottom: "8px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "24px",
      gridAutoRows: "280px",
      gridAutoFlow: "row dense",
    },
    // Masonry-like effect: make some spans larger
    gridItem: (index) => {
      const largeSpans = [1, 4, 6]; // indices for larger items (just for visual interest)
      const isLarge = largeSpans.includes(index);
      return {
        gridRow: isLarge ? "span 2" : "span 1",
        gridColumn: isLarge ? "span 1" : "span 1",
        position: "relative",
        overflow: "hidden",
        borderRadius: "12px",
        cursor: "pointer",
        boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
        border: `1px solid ${theme.borderLight}`,
        transition: `all ${theme.transition}`,
        backgroundColor: theme.bgSecondary, // fallback while loading
      };
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
      transition: `transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "linear-gradient(180deg, rgba(10,10,10,0.2) 0%, rgba(13,71,161,0.4) 100%)",
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "flex-start",
      padding: "20px",
      opacity: 0,
      transition: `opacity ${theme.transition}`,
      color: theme.textPrimary,
    },
    overlayContent: {
      transform: "translateY(10px)",
      transition: `transform ${theme.transition}`,
    },
    category: {
      fontSize: "0.8rem",
      textTransform: "uppercase",
      letterSpacing: "2px",
      color: theme.primaryLight,
      marginBottom: "4px",
    },
    imageAlt: {
      fontSize: "1.1rem",
      fontWeight: "400",
      margin: 0,
      textShadow: "0 2px 4px rgba(0,0,0,0.3)",
    },
    // Hover effects will be applied via pseudo-classes in JS/React using onMouseEnter/Leave,
    // but for simplicity we'll use a styled component approach with inline hover simulation? 
    // Since pure inline styles don't support :hover, we use a wrapper div with class or inline hover via state.
    // For brevity, I'll add a style block inside component via a <style> tag (dynamic CSS) to handle hover.
    // Alternatively, we can manage hover with state, but that's too many states. 
    // Best: include a tiny style tag in the component for hover effects.
    // I'll add a <style> element for the hover rules to keep it self‑contained.
    
    // Lightbox (modal) styles
    lightboxOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(10, 10, 10, 0.98)",
      backdropFilter: "blur(10px)",
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      boxSizing: "border-box",
      cursor: "zoom-out",
    },
    lightboxContent: {
      maxWidth: "1200px",
      maxHeight: "90vh",
      position: "relative",
      animation: "fadeIn 0.3s ease",
      cursor: "default",
    },
    lightboxImage: {
      width: "100%",
      height: "auto",
      maxHeight: "80vh",
      objectFit: "contain",
      borderRadius: "12px",
      border: `1px solid ${theme.borderStrong}`,
      boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
    },
    lightboxInfo: {
      position: "absolute",
      bottom: "-40px",
      left: "0",
      right: "0",
      textAlign: "center",
      color: theme.textSecondary,
      fontSize: "0.9rem",
      letterSpacing: "1px",
    },
    closeButton: {
      position: "absolute",
      top: "-40px",
      right: "0",
      background: "none",
      border: "none",
      color: theme.textPrimary,
      fontSize: "2rem",
      cursor: "pointer",
      padding: "8px 16px",
      transition: `color ${theme.transition}`,
      lineHeight: 1,
    },













// Inline media queries and hover styles via style tag
  };

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Hero Section */}
      <Box
        ref={heroRef}
        component={motion.section}
        style={{
          opacity: heroOpacity,
          scale: heroScale,
          y: heroY,
        }}
        sx={{
          height: '100vh',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.7) 100%), url("https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 50% 50%, rgba(13,71,161,0.1) 0%, transparent 50%)',
            pointerEvents: 'none',
          },
        }}
      >
        <Container maxWidth={CONTAINER.content}>
          <Grid container spacing={SPACING.gridGap} alignItems="center">
            <Grid item xs={12} md={8}>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={fadeInUp}>
                  <Typography
                    variant="overline"
                    sx={{
                      color: COLORS.primaryLight,
                      fontSize: '1.2rem',
                      letterSpacing: 3,
                      mb: 2,
                      display: 'block',
                    }}
                  >
                    WELCOME TO LUXURY
                  </Typography>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <Typography
                    variant="h1"
                    sx={{
                      color: 'white',
                      fontSize: { xs: '2.5rem', md: '4.5rem', lg: '5.5rem' },
                      fontWeight: 700,
                      lineHeight: 1.1,
                      mb: 2,
                    }}
                  >
                    Experience
                    <Typography
                      component="span"
                      sx={{
                        display: 'block',
                        background: `linear-gradient(135deg, #fff 30%, ${COLORS.primaryLight} 90%)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontSize: { xs: '3rem', md: '5rem', lg: '6rem' },
                      }}
                    >
                      Ultimate Luxury
                    </Typography>
                  </Typography>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: 'rgba(255,255,255,0.8)',
                      maxWidth: '600px',
                      mb: 4,
                      fontSize: { xs: '1rem', md: '1.2rem' },
                    }}
                  >
                    Indulge in unparalleled comfort and sophistication at our award-winning hotel. 
                    Where every moment is crafted to perfection.
                  </Typography>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <motion.div whileHover="hover" variants={scaleOnHover}>
                      <Button
                        variant="contained"
                        size="large"
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                          background: `linear-gradient(135deg, ${COLORS.primaryLight} 30%, ${COLORS.primaryDark} 90%)`,
                          color: 'white',
                          fontSize: '1.0625rem',
                          py: 1.5,
                          px: 4,
                          borderRadius: 2,
                          boxShadow: '0 8px 20px rgba(13,71,161,0.3)',
                          '&:hover': {
                            background: `linear-gradient(135deg, ${COLORS.primaryDark} 30%, ${COLORS.primary} 90%)`,
                            boxShadow: '0 12px 30px rgba(13,71,161,0.5)',
                          },
                        }}
                      >
                        Book Your Stay
                      </Button>
                    </motion.div>

                    <motion.div whileHover="hover" variants={scaleOnHover}>
                      <Button
    component={Link}
    to="/rooms"
    variant="text"
    endIcon={<ArrowForwardIcon />}
    sx={{
      color: COLORS.primaryLight,
      fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
      py: { xs: 1.5, sm: 2 },
      px: { xs: 3, sm: 4 },
      position: "relative",
      textTransform: "none",

      "&::after": {
        content: '""',
        position: "absolute",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: 0,
        height: "2px",
        background: COLORS.primaryLight,
        transition: "width 0.3s ease",
      },

      "&:hover::after": {
        width: "80%",
      },

      "&:hover": {
        backgroundColor: "transparent",
        color: COLORS.primaryLight,
      },
    }}
  >
    Explore All Luxury Rooms
  </Button>
                    </motion.div>
                  </Stack>
                </motion.div>
              </motion.div>
            </Grid>
          </Grid>
        </Container>

        {/* Scroll Indicator */}
        <motion.div
          animate={{
            y: [0, 20, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            cursor: 'pointer',
          }}
        >
          <IconButton
            sx={{
              color: COLORS.primaryLight,
              border: `2px solid ${COLORS.borderStrong}`,
              '&:hover': {
                border: `2px solid ${COLORS.primaryLight}`,
                backgroundColor: 'rgba(13,71,161,0.1)',
              },
            }}
            aria-label="Scroll down"
          >
            <KeyboardArrowDownIcon />
          </IconButton>
        </motion.div>
      </Box>

 {/* Hero Section end */}







{/* about Section */}
     
       <style>{`
        /* UNIQUE CLASS NAME - premium-hotel-about */
        .premium-hotel-about {
          background-color: #0a0a0a;
          padding: 6rem 2rem;
          font-family: 'Inter', 'Helvetica Neue', sans-serif;
          color: #ffffff;
          position: relative;
          overflow: hidden;
        }

        .premium-hotel-about::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 0% 50%, rgba(13,71,161,0.15) 0%, transparent 50%);
          pointer-events: none;
        }

        .premium-hotel-container {
          max-width: 1280px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .premium-hotel-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        /* Left Column - Image */
        .premium-hotel-image-wrapper {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
          border: 1px solid rgba(13, 71, 161, 0.3);
          opacity: 0;
          transform: translateX(-30px);
          transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), 
                      transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .premium-hotel-image-wrapper.visible {
          opacity: 1;
          transform: translateX(0);
        }

        .premium-hotel-image {
          width: 100%;
          height: 600px;
          object-fit: cover;
          display: block;
          transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .premium-hotel-image-wrapper:hover .premium-hotel-image {
          transform: scale(1.05);
        }

        /* Right Column - Content */
        .premium-hotel-content {
          opacity: 0;
          transform: translateX(30px);
          transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), 
                      transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          transition-delay: 0.2s;
        }

        .premium-hotel-content.visible {
          opacity: 1;
          transform: translateX(0);
        }

        .premium-hotel-heading {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 300;
          letter-spacing: 1px;
          margin: 0 0 0.5rem 0;
          color: #ffffff;
          line-height: 1.2;
        }

        .premium-hotel-heading span {
          color: #0d47a1;
          font-weight: 400;
          display: block;
          margin-top: 0.5rem;
        }

        .premium-hotel-description {
          font-size: 1.125rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.7);
          margin: 2rem 0 2rem 0;
          max-width: 500px;
        }

        .premium-hotel-description p {
          margin-bottom: 1.5rem;
        }

        .premium-hotel-description p:last-child {
          margin-bottom: 0;
        }

        .premium-hotel-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          color: #ffffff;
          border: 2px solid #0d47a1;
          border-radius: 50px;
          padding: 1rem 2.5rem;
          font-size: 1rem;
          font-weight: 500;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          z-index: 1;
        }

        .premium-hotel-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: #0d47a1;
          transition: left 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: -1;
        }

        .premium-hotel-button:hover {
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(13, 71, 161, 0.3);
        }

        .premium-hotel-button:hover::before {
          left: 0;
        }

        /* Decorative Elements */
        .premium-hotel-accent {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle at 100% 100%, rgba(13,71,161,0.1) 0%, transparent 70%);
          pointer-events: none;
          z-index: 1;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .premium-hotel-image {
            height: 500px;
          }
        }

        @media (max-width: 768px) {
          .premium-hotel-about {
            padding: 4rem 1.5rem;
          }

          .premium-hotel-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }

          .premium-hotel-image-wrapper {
            max-width: 600px;
            margin: 0 auto;
          }

          .premium-hotel-image {
            height: 400px;
          }

          .premium-hotel-content {
            text-align: center;
          }

          .premium-hotel-description {
            margin-left: auto;
            margin-right: auto;
          }

          .premium-hotel-button {
            margin: 0 auto;
          }
        }

        @media (max-width: 480px) {
          .premium-hotel-about {
            padding: 3rem 1rem;
          }

          .premium-hotel-image {
            height: 300px;
          }

          .premium-hotel-heading {
            font-size: 1.75rem;
          }

          .premium-hotel-description {
            font-size: 1rem;
          }

          .premium-hotel-button {
            padding: 0.875rem 2rem;
            font-size: 0.9rem;
          }
        }

        /* Smooth scrolling for the whole page */
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      <section ref={sectionRef} className="premium-hotel-about">
        <div className="premium-hotel-container">
          <div className="premium-hotel-grid">
            {/* Left Column - Image */}
            <div className={`premium-hotel-image-wrapper ${isVisible ? 'visible' : ''}`}>
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80"
                alt="Luxury hotel exterior with infinity pool"
                className="premium-hotel-image"
              />
            </div>

            {/* Right Column - Content */}
            <div className={`premium-hotel-content ${isVisible ? 'visible' : ''}`}>
              <h2 className="premium-hotel-heading">
                About Our
                <span>Luxury Hotel</span>
              </h2>
              
              <div className="premium-hotel-description">
                <p>
                  Step into a world of timeless elegance where every detail has been 
                  meticulously curated to exceed the expectations of the most discerning 
                  travelers. Our sanctuary offers an intimate escape from the ordinary.
                </p>
                <p>
                  From the moment you arrive, experience unparalleled comfort and 
                  personalized service that anticipates your every need. Each space 
                  tells a story of sophisticated design and uncompromising luxury.
                </p>
              </div>

              <button className="premium-hotel-button">
             About Our Hotel
              </button>
            </div>
          </div>
        </div>
        
        {/* Decorative accent */}
        <div className="premium-hotel-accent"></div>
      </section>
{/* about Section end */  }




{/* Featured gallerySection */}



 <section style={styles.gallerySection}>
      {/* Inject hover styles via style tag (self-contained) */}
      <style>
        {`
          .gallery-item:hover img {
            transform: scale(1.08);
          }
          .gallery-item:hover .gallery-overlay {
            opacity: 1;
          }
          .gallery-item:hover .overlay-content {
            transform: translateY(0);
          }
          .lightbox-close:hover {
            color: ${theme.primaryLight} !important;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
        `}
      </style>

      <div style={styles.container}>
        {/* Section Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>
            Hotel <span style={styles.titleAccent}>Gallery</span>
          </h2>
          <p style={styles.subtitle}>Explore Our Luxury Spaces</p>
        </div>

        {/* Gallery Grid */}
        <div style={styles.grid}>
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className="gallery-item"
              style={styles.gridItem(index)}
              onClick={() => openLightbox(image)}
            >
              <img
                src={image.src}
                alt={image.alt}
                style={styles.image}
                loading="lazy"
              />
              <div className="gallery-overlay" style={styles.overlay}>
                <div className="overlay-content" style={styles.overlayContent}>
                  <div style={styles.category}>{image.category}</div>
                  <p style={styles.imageAlt}>{image.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div style={styles.lightboxOverlay} onClick={closeLightbox}>
          <div style={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <button
              style={styles.closeButton}
              onClick={closeLightbox}
              className="lightbox-close"
            >
              ✕
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              style={styles.lightboxImage}
            />
            <div style={styles.lightboxInfo}>
              <span>{selectedImage.alt}</span> &nbsp; | &nbsp; <span style={{ color: theme.primaryLight }}>{selectedImage.category}</span>
            </div>
          </div>
        </div>
      )}
    </section>
{/* Featured end gallerySection */}
















{/* Services Section */}
<Box
  ref={servicesRef}
  component={motion.section}
  initial="hidden"
  animate={isServicesInView ? "visible" : "hidden"}
  variants={staggerContainer}
  sx={{
    py: { xs: 6, sm: 8, md: 10, lg: 12 },
    px: { xs: 2, sm: 3, md: 4 },
    background: 'linear-gradient(135deg, #0a0a0a 0%, #111111 100%)',
    position: 'relative',
  }}
>
  <Container 
    maxWidth={CONTAINER.wide}
    sx={{
      px: { xs: 2, sm: 3, md: 4 },
    }}
  >
    <motion.div variants={fadeInUp}>
      <Typography
        variant="h2"
        align="center"
        sx={{
          color: 'white',
          mb: { xs: 1, sm: 2 },
          fontSize: { 
            xs: '1.8rem', 
            sm: '2.2rem', 
            md: '2.5rem', 
            lg: '3rem' 
          },
          lineHeight: 1.2,
        }}
      >
        Premium
        <Typography 
          component="span" 
          sx={{ 
            color: COLORS.primaryLight, 
            ml: { xs: 1, sm: 2 },
            display: { xs: 'block', sm: 'inline' },
            fontSize: { 
              xs: '1.8rem', 
              sm: '2.2rem', 
              md: '2.5rem', 
              lg: '3rem' 
            },
          }}
        >
          Services
        </Typography>
      </Typography>
      <Typography
        variant="body1"
        align="center"
        sx={{
          color: 'rgba(255,255,255,0.7)',
          mb: { xs: 4, sm: 5, md: 6, lg: 8 },
          maxWidth: { xs: '100%', sm: '90%', md: '800px' },
          mx: 'auto',
          fontSize: { 
            xs: '0.875rem', 
            sm: '0.9375rem', 
            md: '1rem' 
          },
          px: { xs: 2, sm: 3, md: 4 },
          lineHeight: 1.6,
        }}
      >
        Indulge in our world-class amenities and services designed for the discerning traveler
      </Typography>
    </motion.div>

    <Grid 
      container 
      spacing={{ xs: 3, sm: 4, md: 4 }}
      sx={{
        justifyContent: 'center',
      }}
    >
      {services.map((service, index) => (
        <Grid 
          item 
          xs={12} 
          sm={6} 
          md={4} 
          key={index}
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <motion.div
            variants={{ ...fadeInUp, hover: { scale: 1.05, y: -10 } }}
            whileHover="hover"
            style={{
              width: '100%',
              maxWidth: { xs: '100%', sm: '350px', md: '100%' },
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2.5, sm: 3, md: 3.5 },
                textAlign: 'center',
                backgroundColor: COLORS.surface,
                backdropFilter: 'blur(10px)',
                border: `1px solid ${COLORS.border}`,
                borderRadius: { xs: 3, sm: 3.5, md: 4 },
                height: '100%',
                transition: 'all 0.3s ease-in-out',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '&:hover': {
                  border: `1px solid ${COLORS.borderStrong}`,
                  boxShadow: '0 20px 40px rgba(13,71,161,0.2)',
                },
              }}
            >
              <Box
                sx={{
                  display: 'inline-flex',
                  p: { xs: 1.5, sm: 1.75, md: 2 },
                  borderRadius: '50%',
                  background: 'rgba(13,71,161,0.1)',
                  color: COLORS.primaryLight,
                  mb: { xs: 1.5, sm: 2 },
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(13,71,161,0.2)',
                    transform: 'scale(1.1)',
                  },
                }}
              >
                {React.cloneElement(service.icon, {
                  sx: { 
                    fontSize: { xs: 30, sm: 35, md: 40 } 
                  }
                })}
              </Box>
              <Typography 
                variant="h5" 
                sx={{ 
                  color: 'white', 
                  fontWeight: 600, 
                  mb: { xs: 1, sm: 1.5 },
                  fontSize: { 
                    xs: '1.1rem', 
                    sm: '1.2rem', 
                    md: '1.3rem' 
                  },
                }}
              >
                {service.title}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: { 
                    xs: '0.8rem', 
                    sm: '0.85rem', 
                    md: '0.875rem' 
                  },
                  lineHeight: 1.6,
                  maxWidth: { xs: '100%', sm: '280px' },
                  mx: 'auto',
                }}
              >
                {service.description}
              </Typography>
            </Paper>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  </Container>
</Box>
{/* Services Section end*/}



      {/* Testimonials Section with Carousel */}
      <Box
        ref={testimonialsRef}
        component={motion.section}
        initial="hidden"
        animate={isTestimonialsInView ? "visible" : "hidden"}
        variants={staggerContainer}
        sx={{
          py: SPACING.sectionY,
          px: SPACING.sectionX,
          backgroundColor: COLORS.background,
          position: 'relative',
        }}
      >
        <Container maxWidth={CONTAINER.content}>
          <motion.div variants={fadeInUp}>
            <Typography
              variant="h2"
              align="center"
              sx={{
                color: 'white',
                mb: 2,
                fontSize: { xs: '2rem', md: '3rem' },
              }}
            >
                Guest
              <Typography component="span" sx={{ color: COLORS.primaryLight, ml: 2 }}>
                Experiences
              </Typography>
            </Typography>
            <Typography
              variant="body1"
              align="center"
              sx={{
                color: 'rgba(255,255,255,0.7)',
                mb: 8,
                maxWidth: '800px',
                mx: 'auto',
              }}
            >
              What our valued guests say about their stay at Luxury Stay Hotel
            </Typography>
          </motion.div>

          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={1}>
              <IconButton
                onClick={handlePrevTestimonial}
                aria-label="Previous testimonial"
                sx={{
                  color: COLORS.primaryLight,
                  border: `1px solid ${COLORS.borderStrong}`,
                  '&:hover': {
                    backgroundColor: 'rgba(13,71,161,0.1)',
                  },
                }}
              >
                <ChevronLeftIcon />
              </IconButton>
            </Grid>

            <Grid item xs={12} md={10}>
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <Card
                  sx={{
                    p: SPACING.cardPadding,
                    backgroundColor: COLORS.surface,
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${COLORS.borderStrong}`,
                    borderRadius: 2,
                  }}
                >
                  <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={4}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Avatar
                          src={testimonials[currentTestimonial].avatar}
                          sx={{
                            width: 150,
                            height: 150,
                            mx: 'auto',
                            mb: 2,
                            border: `4px solid ${COLORS.primaryLight}`,
                          }}
                        />
                        <Typography variant="h5" sx={{ color: 'white', fontWeight: 600 }}>
                          {testimonials[currentTestimonial].name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: COLORS.primaryLight, mb: 1 }}>
                          {testimonials[currentTestimonial].role}
                        </Typography>
                        <Rating
                          value={testimonials[currentTestimonial].rating}
                          readOnly
                          sx={{ color: COLORS.primaryLight }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <Typography
                        variant="h4"
                        sx={{
                          color: 'white',
                          mb: 3,
                          fontSize: { xs: '1.5rem', md: '2rem' },
                        }}
                      >
                        "
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: 'rgba(255,255,255,0.8)',
                          fontSize: { xs: '1rem', md: '1.2rem' },
                          lineHeight: 1.8,
                          fontStyle: 'italic',
                        }}
                      >
                        {testimonials[currentTestimonial].comment}
                      </Typography>
                      <Typography
                        variant="h4"
                        sx={{
                          color: 'white',
                          mt: 3,
                          textAlign: 'right',
                          fontSize: { xs: '1.5rem', md: '2rem' },
                        }}
                      >
                        "
                      </Typography>
                    </Grid>
                  </Grid>
                </Card>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={1}>
              <IconButton
                onClick={handleNextTestimonial}
                aria-label="Next testimonial"
                sx={{
                  color: COLORS.primaryLight,
                  border: `1px solid ${COLORS.borderStrong}`,
                  '&:hover': {
                    backgroundColor: 'rgba(13,71,161,0.1)',
                  },
                }}
              >
                <ChevronRightIcon />
              </IconButton>
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 1 }}>
            {testimonials.map((_, index) => (
              <Box
                key={index}
                component={motion.div}
                whileHover={{ scale: 1.2 }}
                onClick={() => setCurrentTestimonial(index)}
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  backgroundColor: index === currentTestimonial ? COLORS.primaryLight : 'rgba(13,71,161,0.3)',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                }}
              />
            ))}
          </Box>
        </Container>
      </Box>
  {/* Testimonials Section with Carousel  end*/}






      {/* Call to Action Section */}
     

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </Box>
  );
};

export default Home;