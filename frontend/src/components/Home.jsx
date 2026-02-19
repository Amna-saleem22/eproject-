import React, { useRef } from 'react';
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

  const featuredRooms = [
    {
      id: 1,
      name: 'Presidential Suite',
      price: 2500,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
      rating: 5,
      reviews: 128,
      features: ['Ocean View', 'Private Pool', 'Butler Service', '850 sq ft'],
    },
    {
      id: 2,
      name: 'Royal Penthouse',
      price: 1800,
      image: 'https://images.unsplash.com/photo-1590490360182-c33d5773342b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
      rating: 5,
      reviews: 96,
      features: ['City View', 'Jacuzzi', 'Smart Home', '700 sq ft'],
    },
    {
      id: 3,
      name: 'Deluxe Suite',
      price: 1200,
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
      rating: 4.5,
      reviews: 156,
      features: ['Garden View', 'Rain Shower', 'Mini Bar', '550 sq ft'],
    },
  ];

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
                        variant="outlined"
                        size="large"
                        sx={{
                          borderColor: COLORS.primaryLight,
                          color: 'white',
                          fontSize: '1.0625rem',
                          py: 1.5,
                          px: 4,
                          borderRadius: 2,
                          borderWidth: 2,
                          '&:hover': {
                            borderColor: COLORS.primaryDark,
                            borderWidth: 2,
                            backgroundColor: 'rgba(13,71,161,0.1)',
                          },
                        }}
                      >
                        Explore Rooms
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

      {/* Featured Rooms Section */}
      <Box
        ref={featuredRef}
        component={motion.section}
        initial="hidden"
        animate={isFeaturedInView ? "visible" : "hidden"}
        variants={staggerContainer}
        sx={{
          py: SPACING.sectionY,
          px: SPACING.sectionX,
          backgroundColor: COLORS.background,
          position: 'relative',
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
              Featured
              <Typography component="span" sx={{ color: COLORS.primaryLight, ml: 2 }}>
                Luxury Rooms
              </Typography>
            </Typography>
            <Typography
              variant="body1"
              align="center"
              sx={{
                color: COLORS.textSecondary,
                mb: SPACING.sectionTitleBottom,
                maxWidth: '800px',
                mx: 'auto',
                fontSize: '0.9375rem',
              }}
            >
              Experience the epitome of comfort and elegance in our carefully curated selection of premium suites
            </Typography>
          </motion.div>

          <Grid container spacing={SPACING.gridGap}>
            {featuredRooms.map((room, index) => (
              <Grid item xs={12} md={4} key={room.id}>
                <motion.div
                  variants={{ ...fadeInUp, hover: { y: -20 } }}
                  whileHover="hover"
                >
                  <Card
                    sx={{
                      height: '100%',
                      backgroundColor: '#1a1a1a',
                      borderRadius: 4,
                      overflow: 'hidden',
                      position: 'relative',
                      border: `1px solid ${COLORS.border}`,
                      '&:hover': {
                        border: `1px solid ${COLORS.borderStrong}`,
                      },
                    }}
                  >
                    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                      <CardMedia
                        component="img"
                        height="300"
                        image={room.image}
                        alt={room.name}
                        sx={{
                          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                          '&:hover': {
                            transform: 'scale(1.1)',
                          },
                        }}
                      />
                      <Chip
                        label={`$${room.price}/night`}
                        sx={{
                          position: 'absolute',
                          top: 16,
                          right: 16,
                          backgroundColor: COLORS.primaryLight,
                          color: 'white',
                          fontWeight: 600,
                          fontSize: '1rem',
                          px: 1,
                        }}
                      />
                    </Box>
                    <CardContent sx={{ p: SPACING.contentGap }}>
                      <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, mb: 1 }}>
                        {room.name}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Rating value={room.rating} readOnly sx={{ color: COLORS.primaryLight, mr: 1 }} />
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                          ({room.reviews} reviews)
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
                        {room.features.map((feature, i) => (
                          <Chip
                            key={i}
                            label={feature}
                            size="small"
                            sx={{
                              backgroundColor: 'rgba(13,71,161,0.1)',
                              color: COLORS.primaryLight,
                              border: `1px solid ${COLORS.borderStrong}`,
                            }}
                          />
                        ))}
                      </Box>

                      <Button
                        fullWidth
                        variant="outlined"
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                          borderColor: COLORS.primaryLight,
                          color: COLORS.primaryLight,
                          '&:hover': {
                            borderColor: COLORS.primaryDark,
                            backgroundColor: 'rgba(13,71,161,0.1)',
                          },
                        }}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          <motion.div
            variants={fadeInUp}
            style={{ textAlign: 'center', marginTop: 48 }}
          >
            <Button
              variant="text"
              endIcon={<ArrowForwardIcon />}
              sx={{
                color: COLORS.primaryLight,
                fontSize: '1.0625rem',
                '&:hover': {
                  color: COLORS.primaryDark,
                },
              }}
            >
              View All Rooms
            </Button>
          </motion.div>
        </Container>
      </Box>

      {/* Services Section */}
      <Box
        ref={servicesRef}
        component={motion.section}
        initial="hidden"
        animate={isServicesInView ? "visible" : "hidden"}
        variants={staggerContainer}
        sx={{
          py: SPACING.sectionY,
          px: SPACING.sectionX,
          background: 'linear-gradient(135deg, #0a0a0a 0%, #111111 100%)',
          position: 'relative',
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
                Premium
              <Typography component="span" sx={{ color: COLORS.primaryLight, ml: 2 }}>
                Services
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
              Indulge in our world-class amenities and services designed for the discerning traveler
            </Typography>
          </motion.div>

          <Grid container spacing={SPACING.gridGap}>
            {services.map((service, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
                  variants={{ ...fadeInUp, hover: { scale: 1.05, y: -10 } }}
                  whileHover="hover"
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: SPACING.contentGap,
                      textAlign: 'center',
                      backgroundColor: COLORS.surface,
                      backdropFilter: 'blur(10px)',
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: 2,
                      height: '100%',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        border: `1px solid ${COLORS.borderStrong}`,
                        boxShadow: '0 20px 40px rgba(13,71,161,0.2)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: 'inline-flex',
                        p: 2,
                        borderRadius: '50%',
                        background: 'rgba(13,71,161,0.1)',
                        color: COLORS.primaryLight,
                        mb: 2,
                      }}
                    >
                      {service.icon}
                    </Box>
                    <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, mb: 1 }}>
                      {service.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                      {service.description}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

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

      {/* Call to Action Section */}
      <Box
        ref={ctaRef}
        component={motion.section}
        initial="hidden"
        animate={isCtaInView ? "visible" : "hidden"}
        variants={fadeIn}
        sx={{
          py: SPACING.sectionY,
          background: `linear-gradient(135deg, rgba(13,71,161,0.9) 0%, ${COLORS.background} 100%), url("https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <Container maxWidth={CONTAINER.form}>
          <motion.div variants={fadeInUp} style={{ textAlign: 'center' }}>
            <Typography
              variant="h2"
              sx={{
                color: COLORS.text,
                mb: 3,
                fontSize: { xs: '2rem', md: '3.5rem' },
              }}
            >
              Ready for an
              <Typography component="span" sx={{ color: COLORS.primaryLight, display: 'block' }}>
                Unforgettable Experience?
              </Typography>
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255,255,255,0.9)',
                mb: 4,
                maxWidth: '600px',
                mx: 'auto',
              }}
            >
              Book your stay now and enjoy exclusive benefits including spa credits, 
              complimentary breakfast, and late checkout.
            </Typography>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="contained"
                size="large"
                sx={{
                  background: `linear-gradient(135deg, ${COLORS.primaryLight} 30%, ${COLORS.primaryDark} 90%)`,
                  color: 'white',
                  fontSize: '1.0625rem',
                  py: 1.5,
                  px: 4,
                  borderRadius: 2,
                  boxShadow: '0 8px 30px rgba(13,71,161,0.4)',
                  '&:hover': {
                    background: `linear-gradient(135deg, ${COLORS.primaryDark} 30%, ${COLORS.primary} 90%)`,
                    boxShadow: '0 15px 40px rgba(13,71,161,0.6)',
                  },
                }}
              >
                Book Your Luxury Stay
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </Box>

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