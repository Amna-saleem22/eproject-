import React, { useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Stack,
  Divider,
  Paper,
  Rating,
  Avatar,
  useTheme,
  useMediaQuery,
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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BreakfastDiningIcon from '@mui/icons-material/BreakfastDining';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import BalconyIcon from '@mui/icons-material/Balcony';
import HotTubIcon from '@mui/icons-material/HotTub';
import LightIcon from '@mui/icons-material/Light';
import { SPACING, CONTAINER, COLORS } from '../theme/designSystem';

const RoomsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

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
      price: '$299',
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
      price: '$499',
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
      price: '$999',
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
    <Box sx={{ 
      overflow: 'hidden', 
      backgroundColor: '#0a0a0a',
      minHeight: '100vh',
      position: 'relative',
    }}>
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
          sx={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: 'radial-gradient(circle, #0d47a1 0%, transparent 70%)',
            opacity: 0.1,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      ))}

      {/* Hero Section */}
      <Box
        ref={heroRef}
        sx={{
          height: { xs: '70vh', md: '80vh' },
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Background with overlay */}
        <Box
          component={motion.div}
          style={{
            opacity: heroOpacity,
            scale: heroScale,
          }}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, #0a0a0a 0%, #111827 50%, #0d1b2a 100%)',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at 70% 50%, rgba(13,71,161,0.2) 0%, transparent 60%)',
            },
          }}
        />

        {/* Content */}
        <Container 
          maxWidth={CONTAINER.content} 
          sx={{ 
            position: 'relative', 
            zIndex: 10,
            textAlign: 'center',
          }}
        >
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
              <DiamondIcon
                sx={{
                  fontSize: 70,
                  color: '#0d47a1',
                  mb: 2,
                  filter: 'drop-shadow(0 0 20px rgba(13,71,161,0.5))',
                }}
              />
            </motion.div>

            <Typography
              variant="h1"
              sx={{
                color: 'white',
                fontSize: { xs: '2.5rem', md: '4rem', lg: '5rem' },
                fontWeight: 700,
                lineHeight: 1.1,
                mb: 2,
                textShadow: '0 4px 20px rgba(0,0,0,0.5)',
              }}
            >
              Our
              <Typography
                component="span"
                sx={{
                  display: 'block',
                  background: 'linear-gradient(135deg, #fff 30%, #0d47a1 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: { xs: '2rem', md: '3.5rem', lg: '4.5rem' },
                }}
              >
                Luxury Rooms
              </Typography>
            </Typography>

            <Typography
              variant="h5"
              sx={{
                color: 'rgba(255,255,255,0.9)',
                maxWidth: '800px',
                mx: 'auto',
                fontSize: { xs: '1rem', md: '1.2rem' },
                lineHeight: 1.8,
                textShadow: '0 2px 10px rgba(0,0,0,0.5)',
              }}
            >
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
              style={{
                position: 'absolute',
                bottom: -100,
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            >
              <Box
                sx={{
                  width: 30,
                  height: 50,
                  border: '2px solid rgba(13,71,161,0.6)',
                  borderRadius: 15,
                  position: 'relative',
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  backdropFilter: 'blur(5px)',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 8,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 4,
                    height: 8,
                    backgroundColor: '#0d47a1',
                    borderRadius: 2,
                    animation: 'scrollBounce 2s infinite',
                  },
                }}
              />
            </motion.div>
          </motion.div>
        </Container>
      </Box>

      {/* Rooms Section */}
      <Box
        ref={roomsRef}
        component={motion.section}
        initial="hidden"
        animate={isRoomsInView ? "visible" : "hidden"}
        variants={staggerContainer}
        sx={{
          py: SPACING.sectionY,
          px: SPACING.sectionX,
          position: 'relative',
          zIndex: 5,
        }}
      >
        <Container maxWidth={CONTAINER.wide}>
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
              Choose Your
              <Typography component="span" sx={{ color: '#0d47a1', ml: 2 }}>
                Perfect Stay
              </Typography>
            </Typography>
            <Typography
              variant="body1"
              align="center"
              sx={{
                color: 'rgba(255,255,255,0.8)',
                mb: 8,
                maxWidth: '800px',
                mx: 'auto',
              }}
            >
              Each room is thoughtfully designed to provide the ultimate luxury experience
            </Typography>
          </motion.div>

          <Grid container spacing={SPACING.gridGap}>
            {rooms.map((room, index) => (
              <Grid item xs={12} md={4} key={room.id}>
                <motion.div
                  variants={{ ...fadeInUp, ...cardHover }}
                  whileHover="hover"
                >
                  <Card
                    sx={{
                      height: '100%',
                      backgroundColor: 'transparent',
                      background: 'linear-gradient(135deg, rgba(18,18,18,0.9) 0%, rgba(13,13,13,0.9) 100%)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(13,71,161,0.2)',
                      borderRadius: 4,
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        border: '1px solid rgba(13,71,161,0.6)',
                        boxShadow: '0 20px 40px rgba(13,71,161,0.3)',
                      },
                    }}
                  >
                    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                      <CardMedia
                        component="img"
                        height={isMobile ? 250 : 280}
                        image={room.image}
                        alt={room.name}
                        sx={{
                          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                          '&:hover': {
                            transform: 'scale(1.1)',
                          },
                        }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 16,
                          right: 16,
                          background: 'rgba(13,71,161,0.9)',
                          color: 'white',
                          px: 2,
                          py: 1,
                          borderRadius: 2,
                          backdropFilter: 'blur(5px)',
                        }}
                      >
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          {room.price}
                          <Typography component="span" variant="caption" sx={{ ml: 0.5 }}>
                            /night
                          </Typography>
                        </Typography>
                      </Box>
                    </Box>

                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h4" sx={{ color: 'white', fontWeight: 600 }}>
                          {room.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Rating value={room.rating} readOnly size="small" sx={{ color: '#0d47a1', mr: 1 }} />
                          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                            ({room.reviews})
                          </Typography>
                        </Box>
                      </Box>

                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 3, lineHeight: 1.7 }}>
                        {room.description}
                      </Typography>

                      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
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
                      </Box>

                      <Divider sx={{ borderColor: 'rgba(13,71,161,0.2)', my: 2 }} />

                      <Typography variant="subtitle2" sx={{ color: 'white', mb: 2 }}>
                        Amenities:
                      </Typography>

                      <Grid container spacing={1} sx={{ mb: 3 }}>
                        {room.features.map((feature, idx) => (
                          <Grid item xs={6} key={idx}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Box sx={{ color: '#0d47a1', fontSize: '1rem' }}>
                                {feature.icon}
                              </Box>
                              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                                {feature.label}
                              </Typography>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>

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
                          Book Now
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Food & Dining Section */}
      <Box
        ref={diningRef}
        component={motion.section}
        initial="hidden"
        animate={isDiningInView ? "visible" : "hidden"}
        variants={staggerContainer}
        sx={{
          py: SPACING.sectionY,
          background: 'linear-gradient(135deg, #0a0a0a 0%, #111111 100%)',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background: 'linear-gradient(90deg, transparent, #0d47a1, transparent)',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 1,
            background: 'linear-gradient(90deg, transparent, #0d47a1, transparent)',
          },
        }}
      >
        <Container maxWidth={CONTAINER.wide}>
          <motion.div variants={fadeInUp}>
            <Typography
              variant="h2"
              align="center"
              sx={{
                color: COLORS.text,
                mb: 2,
                fontSize: { xs: '2rem', md: '3rem' },
              }}
            >
              Fine
              <Typography component="span" sx={{ color: '#0d47a1', ml: 2 }}>
                Dining Experience
              </Typography>
            </Typography>
            <Typography
              variant="body1"
              align="center"
              sx={{
                color: 'rgba(255,255,255,0.8)',
                mb: 6,
                maxWidth: '800px',
                mx: 'auto',
              }}
            >
              Indulge in culinary excellence at our award-winning restaurants, where world-class chefs
              create unforgettable gastronomic experiences.
            </Typography>
          </motion.div>

          <Grid container spacing={SPACING.gridGap}>
            {diningCategories.map((category, index) => (
              <Grid item xs={12} md={4} key={category.id}>
                <motion.div
                  variants={{ ...fadeInUp, ...cardHover }}
                  whileHover="hover"
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      height: '100%',
                      background: 'linear-gradient(135deg, rgba(18,18,18,0.8) 0%, rgba(13,13,13,0.8) 100%)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(13,71,161,0.2)',
                      borderRadius: 4,
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        border: '1px solid rgba(13,71,161,0.6)',
                        boxShadow: '0 20px 40px rgba(13,71,161,0.2)',
                      },
                    }}
                  >
                    <Box sx={{ position: 'relative', mb: 2, borderRadius: 2, overflow: 'hidden' }}>
                      <Box
                        component="img"
                        src={category.image}
                        alt={category.name}
                        sx={{
                          width: '100%',
                          height: 200,
                          objectFit: 'cover',
                          transition: 'transform 0.6s ease',
                          '&:hover': {
                            transform: 'scale(1.1)',
                          },
                        }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 16,
                          left: 16,
                          background: 'rgba(13,71,161,0.9)',
                          color: 'white',
                          px: 2,
                          py: 1,
                          borderRadius: 2,
                        }}
                      >
                        {category.icon}
                      </Box>
                    </Box>

                    <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, mb: 1 }}>
                      {category.name}
                    </Typography>

                    <Typography variant="body2" sx={{ color: '#0d47a1', mb: 2, fontWeight: 500 }}>
                      {category.time}
                    </Typography>

                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 3, lineHeight: 1.7 }}>
                      {category.description}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', gap: 1 }}>
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
                      </Box>
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
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* Dining Highlights */}
          <motion.div variants={fadeInUp}>
            <Box
              sx={{
                mt: 6,
                display: 'flex',
                justifyContent: 'center',
                gap: { xs: 2, md: 4 },
                flexWrap: 'wrap',
              }}
            >
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
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Box
        ref={ctaRef}
        component={motion.section}
        initial="hidden"
        animate={isCtaInView ? "visible" : "hidden"}
        variants={fadeIn}
        sx={{
          py: SPACING.sectionY,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth={CONTAINER.form}>
          <motion.div
            variants={scaleIn}
            style={{ textAlign: 'center' }}
          >
            <Paper
              elevation={0}
              sx={{
                p: { xs: 4, md: 6 },
                background: 'linear-gradient(135deg, rgba(13,71,161,0.1) 0%, rgba(13,71,161,0.05) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(13,71,161,0.3)',
                borderRadius: 4,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: -50,
                  right: -50,
                  width: 200,
                  height: 200,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(13,71,161,0.2) 0%, transparent 70%)',
                }}
              />
              
              <Typography
                variant="h3"
                sx={{
                  color: 'white',
                  mb: 3,
                  fontSize: { xs: '1.8rem', md: '2.5rem' },
                  fontWeight: 600,
                }}
              >
                Book Your
                <Typography component="span" sx={{ color: '#0d47a1', ml: 2 }}>
                  Dream Stay
                </Typography>
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255,255,255,0.8)',
                  mb: 4,
                  maxWidth: '500px',
                  mx: 'auto',
                  fontSize: '1.1rem',
                }}
              >
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

              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  color: 'rgba(255,255,255,0.5)',
                  mt: 3,
                }}
              >
                Best Rate Guarantee • Free Cancellation • 24/7 Support
              </Typography>
            </Paper>
          </motion.div>
        </Container>
      </Box>

      {/* CSS Animations */}
      <style>{`
        @keyframes scrollBounce {
          0%, 100% { transform: translateX(-50%) translateY(0); opacity: 1; }
          50% { transform: translateX(-50%) translateY(15px); opacity: 0.5; }
        }
      `}</style>
    </Box>
  );
};

export default RoomsPage;