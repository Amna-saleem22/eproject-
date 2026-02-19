import React, { useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Chip,
  Button,
  Stack,
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
import { SPACING, CONTAINER, COLORS, TYPOGRAPHY, BUTTON } from '../theme/designSystem';

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
    <Box sx={{ 
      overflow: 'hidden', 
      backgroundColor: COLORS.background,
      minHeight: '100vh',
      position: 'relative',
    }}>
      {/* Hero Section - Fixed layering */}
      <Box
        ref={heroRef}
        sx={{
          height: { xs: '80vh', md: '90vh' },
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Background with overlay - Proper layering */}
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
            backgroundImage: 'url("https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.7) 100%)',
              zIndex: 1,
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at 70% 50%, rgba(13,71,161,0.2) 0%, transparent 60%)',
              zIndex: 2,
            },
          }}
        />

        {/* Content - High z-index to appear above background */}
        <Container 
          maxWidth={CONTAINER.content} 
          sx={{ 
            position: 'relative', 
            zIndex: 10,
          }}
        >
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            style={{ 
              position: 'relative',
              zIndex: 20,
            }}
          >
            <motion.div variants={fadeInUp}>
              <Typography
                variant="overline"
                align="center"
                sx={{
                  color: COLORS.primaryLight,
                  fontSize: TYPOGRAPHY.overline,
                  letterSpacing: 4,
                  mb: SPACING.titleToBody,
                  display: 'block',
                  textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                }}
              >
                WELCOME TO
              </Typography>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Typography
                variant="h1"
                align="center"
                sx={{
                  color: COLORS.text,
                  fontSize: TYPOGRAPHY.hero,
                  fontWeight: 700,
                  lineHeight: 1.2,
                  mb: SPACING.titleToBody,
                  textShadow: '0 4px 20px rgba(0,0,0,0.5)',
                }}
              >
                A Legacy of
                <Typography
                  component="span"
                  sx={{
                    display: 'block',
                    background: `linear-gradient(135deg, #fff 30%, ${COLORS.primaryLight} 90%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontSize: { xs: '2.75rem', md: '4.5rem', lg: '5.5rem' },
                  }}
                >
                  Unmatched Luxury
                </Typography>
              </Typography>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Typography
                variant="h5"
                align="center"
                sx={{
                  color: COLORS.textSecondary,
                  maxWidth: 800,
                  mx: 'auto',
                  mb: 4,
                  fontSize: TYPOGRAPHY.body,
                  lineHeight: 1.75,
                  textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                }}
              >
                Since 1985, we have been redefining the standards of luxury hospitality, 
                creating unforgettable experiences for discerning travelers from around the globe.
              </Typography>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={SPACING.inlineGap}>
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
              </Stack>
            </motion.div>
          </motion.div>
        </Container>

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
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 20,
          }}
        >
          <Box
            sx={{
              width: 30,
              height: 50,
              border: `2px solid ${COLORS.borderStrong}`,
              borderRadius: 15,
              position: 'relative',
              backgroundColor: 'rgba(0,0,0,0.2)',
              backdropFilter: 'blur(5px)',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 8,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 4,
                height: 8,
                backgroundColor: COLORS.primaryLight,
                borderRadius: 2,
                animation: 'scrollBounce 2s infinite',
              },
            }}
          />
        </motion.div>
      </Box>

      {/* Achievements Bar */}
      <Container maxWidth={CONTAINER.content} sx={{ mt: -6, position: 'relative', zIndex: 30, px: SPACING.sectionX }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Paper
            elevation={24}
            sx={{
              p: SPACING.cardPadding,
              background: COLORS.backgroundElevated,
              backdropFilter: 'blur(10px)',
              borderRadius: 2,
              border: `1px solid ${COLORS.borderStrong}`,
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            }}
          >
            <Grid container spacing={SPACING.gridGap} alignItems="center">
              {achievements.map((item, index) => (
                <Grid item xs={6} sm={6} md={3} key={index}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.2, type: "spring", stiffness: 200 }}
                    style={{ textAlign: 'center' }}
                  >
                    <Box sx={{ color: COLORS.primaryLight, mb: 1, fontSize: '2rem' }}>
                      {item.icon}
                    </Box>
                    <Typography variant="h4" sx={{ color: COLORS.text, fontWeight: 700, fontSize: TYPOGRAPHY.h4 }}>
                      {item.number}
                    </Typography>
                    <Typography variant="body2" sx={{ color: COLORS.textSecondary }}>
                      {item.label}
                    </Typography>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </motion.div>
      </Container>

      {/* History Section */}
      <Box
        ref={historyRef}
        component={motion.section}
        initial="hidden"
        animate={isHistoryInView ? "visible" : "hidden"}
        variants={staggerContainer}
        sx={{
          py: SPACING.sectionY,
          px: SPACING.sectionX,
        }}
      >
        <Container maxWidth={CONTAINER.content}>
          <Grid container spacing={SPACING.gridGap} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div variants={fadeInUp}>
                <Typography
                  variant="h2"
                  sx={{
                    color: COLORS.text,
                    mb: SPACING.contentGap,
                    fontSize: TYPOGRAPHY.h1,
                    lineHeight: 1.3,
                  }}
                >
                  Our
                  <Typography component="span" sx={{ color: COLORS.primaryLight, ml: SPACING.titleToBody }}>
                    History
                  </Typography>
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: SPACING.contentGap, gap: SPACING.inlineGap }}>
                  <HistoryIcon sx={{ color: COLORS.primaryLight, fontSize: 32 }} />
                  <Typography variant="h5" sx={{ color: COLORS.text, fontWeight: 500, fontSize: TYPOGRAPHY.h4 }}>
                    A Legacy of Excellence Since 1985
                  </Typography>
                </Box>

                <Typography variant="body1" sx={{ color: COLORS.textSecondary, mb: SPACING.contentGap, lineHeight: 1.75, fontSize: TYPOGRAPHY.body }}>
                  Founded in 1985 by the Thompson family, Luxury Stay Hotel began as a vision 
                  to create the ultimate sanctuary for discerning travelers. What started as 
                  a modest 10-room boutique hotel has evolved into one of the world's most 
                  prestigious luxury destinations.
                </Typography>

                <Typography variant="body1" sx={{ color: COLORS.textSecondary, mb: SPACING.contentGap, lineHeight: 1.75, fontSize: TYPOGRAPHY.body }}>
                  Over the past four decades, we have welcomed royalty, celebrities, and 
                  business leaders from every corner of the globe. Each renovation has been 
                  carefully crafted to preserve our heritage while embracing modern luxury.
                </Typography>

                <Box sx={{ display: 'flex', gap: SPACING.inlineGap, flexWrap: 'wrap' }}>
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
                </Box>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={6}>
              <motion.div variants={scaleIn}>
                <Box
                  sx={{
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: -16,
                      left: -16,
                      right: 16,
                      bottom: 16,
                      border: `3px solid ${COLORS.primaryLight}`,
                      borderRadius: 2,
                      zIndex: 1,
                    },
                  }}
                >
                  <Box
                    component="img"
                    src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80"
                    alt="Hotel History"
                    sx={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: 2,
                      position: 'relative',
                      zIndex: 2,
                      boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                    }}
                  />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: SPACING.contentGap, px: 2 }}>
                  {[1985, 1995, 2005, 2015, 2025].map((year, index) => (
                    <Box key={index} sx={{ textAlign: 'center' }}>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          backgroundColor: COLORS.primaryLight,
                          mb: 1,
                          mx: 'auto',
                          boxShadow: `0 0 10px ${COLORS.primaryLight}`,
                        }}
                      />
                      <Typography variant="caption" sx={{ color: COLORS.textSecondary, fontSize: TYPOGRAPHY.caption }}>
                        {year}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Mission & Vision Section */}
      <Box
        ref={missionRef}
        component={motion.section}
        initial="hidden"
        animate={isMissionInView ? "visible" : "hidden"}
        variants={staggerContainer}
        sx={{
          py: SPACING.sectionY,
          px: SPACING.sectionX,
          background: `linear-gradient(135deg, ${COLORS.background} 0%, #111111 100%)`,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background: `linear-gradient(90deg, transparent, ${COLORS.primaryLight}, transparent)`,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 1,
            background: `linear-gradient(90deg, transparent, ${COLORS.primaryLight}, transparent)`,
          },
        }}
      >
        <Container maxWidth={CONTAINER.content}>
          <motion.div variants={fadeInUp}>
            <Typography
              variant="h2"
              align="center"
              sx={{
                color: COLORS.text,
                mb: SPACING.sectionTitleBottom,
                fontSize: TYPOGRAPHY.h1,
                lineHeight: 1.3,
              }}
            >
              Our
              <Typography component="span" sx={{ color: COLORS.primaryLight, ml: SPACING.titleToBody }}>
                Purpose
              </Typography>
            </Typography>
          </motion.div>

          <Grid container spacing={SPACING.gridGap}>
            <Grid item xs={12} md={6}>
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
            </Grid>

            <Grid item xs={12} md={6}>
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
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Staff Section */}
      <Box
        ref={staffRef}
        component={motion.section}
        initial="hidden"
        animate={isStaffInView ? "visible" : "hidden"}
        variants={staggerContainer}
        sx={{
          py: SPACING.sectionY,
          px: SPACING.sectionX,
        }}
      >
        <Container maxWidth={CONTAINER.content}>
          <motion.div variants={fadeInUp}>
            <Typography
              variant="h2"
              align="center"
              sx={{
                color: COLORS.text,
                mb: SPACING.titleToBody,
                fontSize: TYPOGRAPHY.h1,
                lineHeight: 1.3,
              }}
            >
              Meet Our
              <Typography component="span" sx={{ color: COLORS.primaryLight, ml: SPACING.titleToBody }}>
                Experts
              </Typography>
            </Typography>
            <Typography
              variant="body1"
              align="center"
              sx={{
                color: COLORS.textSecondary,
                mb: SPACING.sectionTitleBottom,
                maxWidth: 800,
                mx: 'auto',
                fontSize: TYPOGRAPHY.body,
                lineHeight: 1.75,
              }}
            >
              Dedicated professionals committed to making your stay extraordinary
            </Typography>
          </motion.div>

          <Grid container spacing={SPACING.gridGap}>
            {staffMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={4} key={member.id}>
                <motion.div
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
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Environment Section */}
      <Box
        ref={environmentRef}
        component={motion.section}
        initial="hidden"
        animate={isEnvironmentInView ? "visible" : "hidden"}
        variants={staggerContainer}
        sx={{
          py: SPACING.sectionY,
          px: SPACING.sectionX,
          background: `linear-gradient(135deg, ${COLORS.background} 0%, #111111 100%)`,
          position: 'relative',
        }}
      >
        <Container maxWidth={CONTAINER.content}>
          <motion.div variants={fadeInUp}>
            <Typography
              variant="h2"
              align="center"
              sx={{
                color: COLORS.text,
                mb: SPACING.titleToBody,
                fontSize: TYPOGRAPHY.h1,
                lineHeight: 1.3,
              }}
            >
              The
              <Typography component="span" sx={{ color: COLORS.primaryLight, ml: SPACING.titleToBody }}>
                Environment
              </Typography>
            </Typography>
            <Typography
              variant="body1"
              align="center"
              sx={{
                color: COLORS.textSecondary,
                mb: SPACING.sectionTitleBottom,
                maxWidth: 800,
                mx: 'auto',
                fontSize: TYPOGRAPHY.body,
                lineHeight: 1.75,
              }}
            >
              Immerse yourself in an atmosphere of refined luxury and sophisticated comfort
            </Typography>
          </motion.div>

          <Grid container spacing={SPACING.gridGap}>
            {environmentFeatures.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
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
              </Grid>
            ))}
          </Grid>
        </Container>
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
        <Container maxWidth={CONTAINER.content}>
          <Grid container spacing={SPACING.gridGap}>
            {coreValues.map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
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
              </Grid>
            ))}
          </Grid>
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

export default About;