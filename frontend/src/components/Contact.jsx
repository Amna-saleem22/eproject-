import React, { useState, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  IconButton,
  Stack,
  Chip,
  Divider,
  Alert,
  Snackbar,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DiamondIcon from '@mui/icons-material/Diamond';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import BusinessIcon from '@mui/icons-material/Business';
import { SPACING, CONTAINER, COLORS } from '../theme/designSystem';

const Contact = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  // Refs for scroll animations
  const heroRef = useRef(null);
  const infoRef = useRef(null);
  const formRef = useRef(null);
  const mapRef = useRef(null);

  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  // InView hooks
  const isInfoInView = useInView(infoRef, { once: true, amount: 0.3 });
  const isFormInView = useInView(formRef, { once: true, amount: 0.3 });
  const isMapInView = useInView(mapRef, { once: true, amount: 0.3 });

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Contact information
  const contactInfo = [
    {
      icon: <LocationOnIcon sx={{ fontSize: 32 }} />,
      title: 'Hotel Address',
      content: '123 Royal Avenue, Downtown, Dubai, UAE',
      description: 'In the heart of the city, overlooking the skyline',
    },
    {
      icon: <PhoneIcon sx={{ fontSize: 32 }} />,
      title: 'Phone Number',
      content: '+971 4 123 4567',
      description: '24/7 Front Desk & Concierge',
    },
    {
      icon: <EmailIcon sx={{ fontSize: 32 }} />,
      title: 'Email Address',
      content: 'reservations@luxurystay.com',
      description: 'concierge@luxurystay.com',
    },
    {
      icon: <AccessTimeIcon sx={{ fontSize: 32 }} />,
      title: 'Working Hours',
      content: '24/7 Front Desk',
      description: 'Check-in: 2:00 PM | Check-out: 12:00 PM',
    },
  ];

  // Additional services
  const services = [
    { icon: <RoomServiceIcon />, label: 'Room Service' },
    { icon: <AirportShuttleIcon />, label: 'Airport Transfer' },
    { icon: <BusinessIcon />, label: 'Business Center' },
  ];

  // Social media
  const socialMedia = [
    { icon: <InstagramIcon />, name: 'Instagram', color: '#E4405F', link: '#' },
    { icon: <FacebookIcon />, name: 'Facebook', color: '#1877F2', link: '#' },
    { icon: <TwitterIcon />, name: 'Twitter', color: '#1DA1F2', link: '#' },
    { icon: <LinkedInIcon />, name: 'LinkedIn', color: '#0A66C2', link: '#' },
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
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const cardHover = {
    hover: {
      y: -8,
      scale: 1.02,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  // Form validation
  const validateField = (name, value) => {
    switch (name) {
      case 'fullName':
        if (!value) return 'Full name is required';
        if (value.length < 2) return 'Name must be at least 2 characters';
        return '';
      case 'email':
        if (!value) return 'Email is required';
        if (!/\S+@\S+\.\S+/.test(value)) return 'Email is invalid';
        return '';
      case 'phone':
        if (!value) return 'Phone number is required';
        if (!/^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[0-9]{1,3}[-\s\.]?[0-9]{4,6}$/.test(value)) {
          return 'Phone number is invalid';
        }
        return '';
      case 'subject':
        if (!value) return 'Subject is required';
        return '';
      case 'message':
        if (!value) return 'Message is required';
        if (value.length < 10) return 'Message must be at least 10 characters';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validate field on change
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validate field on blur
    const error = validateField(name, formData[name]);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = {};
    Object.keys(formData).forEach(key => allTouched[key] = true);
    setTouched(allTouched);
    
    // Validate form
    const newErrors = validateForm();
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setShowSuccess(true);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
        setTouched({});
        
        // Hide success message after 5 seconds
        setTimeout(() => setShowSuccess(false), 5000);
      }, 1500);
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
          height: { xs: '60vh', md: '70vh' },
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
            background: 'linear-gradient(135deg, #0a0a0a 0%, #0d1b2a 50%, #0d47a1 100%)',
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
                  fontSize: 60,
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
              Contact
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
                Luxury Stay
              </Typography>
            </Typography>

            <Typography
              variant="h5"
              sx={{
                color: 'rgba(255,255,255,0.9)',
                maxWidth: '700px',
                mx: 'auto',
                fontSize: { xs: '1rem', md: '1.2rem' },
                lineHeight: 1.8,
                textShadow: '0 2px 10px rgba(0,0,0,0.5)',
              }}
            >
              Our dedicated team is available 24/7 to assist you with reservations, 
              special requests, or any questions about your future stay.
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

      {/* Contact Information Section */}
      <Box
        ref={infoRef}
        component={motion.section}
        initial="hidden"
        animate={isInfoInView ? "visible" : "hidden"}
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
              Get In
              <Typography component="span" sx={{ color: '#0d47a1', ml: 2 }}>
                Touch
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
              Experience the epitome of luxury service. Reach out to us through any of these channels
            </Typography>
          </motion.div>

          <Grid container spacing={SPACING.gridGap}>
            {contactInfo.map((info, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  variants={{ ...fadeInUp, ...cardHover }}
                  whileHover="hover"
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      height: '100%',
                      background: 'linear-gradient(135deg, rgba(18,18,18,0.8) 0%, rgba(13,13,13,0.8) 100%)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(13,71,161,0.3)',
                      borderRadius: 4,
                      textAlign: 'center',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        border: '1px solid rgba(13,71,161,0.8)',
                        boxShadow: '0 20px 40px rgba(13,71,161,0.2)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: 'inline-flex',
                        p: 2,
                        borderRadius: '50%',
                        background: 'rgba(13,71,161,0.15)',
                        color: '#0d47a1',
                        mb: 2,
                      }}
                    >
                      {info.icon}
                    </Box>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 1 }}>
                      {info.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#0d47a1', fontWeight: 500, mb: 1 }}>
                      {info.content}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                      {info.description}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* Services Chips */}
          <motion.div variants={fadeInUp}>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap', mt: 6 }}>
              {services.map((service, index) => (
                <Chip
                  key={index}
                  icon={service.icon}
                  label={service.label}
                  sx={{
                    backgroundColor: 'rgba(13,71,161,0.15)',
                    color: 'white',
                    border: '1px solid rgba(13,71,161,0.3)',
                    '&:hover': {
                      backgroundColor: 'rgba(13,71,161,0.25)',
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

      {/* Contact Form & Map Section */}
      <Box
        ref={formRef}
        component={motion.section}
        initial="hidden"
        animate={isFormInView ? "visible" : "hidden"}
        variants={staggerContainer}
        sx={{
          py: SPACING.sectionY,
          background: 'linear-gradient(135deg, #0a0a0a 0%, #111111 100%)',
          position: 'relative',
        }}
      >
        <Container maxWidth={CONTAINER.wide}>
          <Grid container spacing={SPACING.contentGap}>
            {/* Form Column */}
            <Grid item xs={12} md={6}>
              <motion.div variants={fadeInUp}>
                <Typography
                  variant="h3"
                  sx={{
                    color: 'white',
                    mb: 2,
                    fontSize: { xs: '1.8rem', md: '2.2rem' },
                  }}
                >
                  Send Us a
                  <Typography component="span" sx={{ color: '#0d47a1', ml: 2 }}>
                    Message
                  </Typography>
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    mb: 4,
                  }}
                >
                  Our team will respond within 24 hours to assist you with any inquiries
                </Typography>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 3, md: 5 },
                    background: 'linear-gradient(135deg, rgba(18,18,18,0.8) 0%, rgba(13,13,13,0.8) 100%)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(13,71,161,0.3)',
                    borderRadius: 4,
                  }}
                >
                  <form onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                      <TextField
                        fullWidth
                        name="fullName"
                        label="Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.fullName && !!errors.fullName}
                        helperText={touched.fullName && errors.fullName}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            color: 'white',
                            '& fieldset': {
                              borderColor: 'rgba(13,71,161,0.3)',
                            },
                            '&:hover fieldset': {
                              borderColor: '#0d47a1',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#0d47a1',
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: 'rgba(255,255,255,0.7)',
                            '&.Mui-focused': {
                              color: '#0d47a1',
                            },
                          },
                          '& .MuiFormHelperText-root': {
                            color: '#f44336',
                          },
                        }}
                      />

                      <TextField
                        fullWidth
                        name="email"
                        label="Email Address"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.email && !!errors.email}
                        helperText={touched.email && errors.email}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            color: 'white',
                            '& fieldset': {
                              borderColor: 'rgba(13,71,161,0.3)',
                            },
                            '&:hover fieldset': {
                              borderColor: '#0d47a1',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#0d47a1',
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: 'rgba(255,255,255,0.7)',
                            '&.Mui-focused': {
                              color: '#0d47a1',
                            },
                          },
                        }}
                      />

                      <TextField
                        fullWidth
                        name="phone"
                        label="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.phone && !!errors.phone}
                        helperText={touched.phone && errors.phone}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            color: 'white',
                            '& fieldset': {
                              borderColor: 'rgba(13,71,161,0.3)',
                            },
                            '&:hover fieldset': {
                              borderColor: '#0d47a1',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#0d47a1',
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: 'rgba(255,255,255,0.7)',
                            '&.Mui-focused': {
                              color: '#0d47a1',
                            },
                          },
                        }}
                      />

                      <TextField
                        fullWidth
                        name="subject"
                        label="Subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.subject && !!errors.subject}
                        helperText={touched.subject && errors.subject}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            color: 'white',
                            '& fieldset': {
                              borderColor: 'rgba(13,71,161,0.3)',
                            },
                            '&:hover fieldset': {
                              borderColor: '#0d47a1',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#0d47a1',
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: 'rgba(255,255,255,0.7)',
                            '&.Mui-focused': {
                              color: '#0d47a1',
                            },
                          },
                        }}
                      />

                      <TextField
                        fullWidth
                        name="message"
                        label="Message"
                        multiline
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.message && !!errors.message}
                        helperText={touched.message && errors.message}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            color: 'white',
                            '& fieldset': {
                              borderColor: 'rgba(13,71,161,0.3)',
                            },
                            '&:hover fieldset': {
                              borderColor: '#0d47a1',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#0d47a1',
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: 'rgba(255,255,255,0.7)',
                            '&.Mui-focused': {
                              color: '#0d47a1',
                            },
                          },
                        }}
                      />

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          size="large"
                          disabled={isSubmitting}
                          endIcon={isSubmitting ? null : <SendIcon />}
                          sx={{
                            background: 'linear-gradient(135deg, #0d47a1 30%, #1565c0 90%)',
                            color: 'white',
                            fontSize: '1.1rem',
                            py: 1.8,
                            borderRadius: 2,
                            boxShadow: '0 8px 20px rgba(13,71,161,0.3)',
                            '&:hover': {
                              background: 'linear-gradient(135deg, #1565c0 30%, #1976d2 90%)',
                              boxShadow: '0 12px 30px rgba(13,71,161,0.6)',
                            },
                            '&.Mui-disabled': {
                              background: 'rgba(13,71,161,0.3)',
                            },
                          }}
                        >
                          {isSubmitting ? 'Sending...' : 'Send Message'}
                        </Button>
                      </motion.div>
                    </Stack>
                  </form>
                </Paper>
              </motion.div>
            </Grid>

            {/* Map Column */}
            <Grid item xs={12} md={6}>
              <motion.div variants={fadeInUp}>
                <Typography
                  variant="h3"
                  sx={{
                    color: 'white',
                    mb: 2,
                    fontSize: { xs: '1.8rem', md: '2.2rem' },
                  }}
                >
                  Find Us
                  <Typography component="span" sx={{ color: '#0d47a1', ml: 2 }}>
                    Here
                  </Typography>
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    mb: 4,
                  }}
                >
                  Located in the heart of the city, easily accessible from all major landmarks
                </Typography>
              </motion.div>

              <motion.div 
                variants={scaleIn}
                whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              >
                <Paper
                  ref={mapRef}
                  elevation={0}
                  sx={{
                    overflow: 'hidden',
                    borderRadius: 4,
                    border: '1px solid rgba(13,71,161,0.3)',
                    background: 'linear-gradient(135deg, rgba(18,18,18,0.8) 0%, rgba(13,13,13,0.8) 100%)',
                    backdropFilter: 'blur(10px)',
                    height: { xs: 300, md: 500 },
                    position: 'relative',
                  }}
                >
                  {/* Embedded Google Map */}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.178650416258!2d55.2707!3d25.2048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43348a67e24b%3A0xff15e7d5d2f6c4b0!2sBurj%20Khalifa!5e0!3m2!1sen!2sae!4v1620000000000!5m2!1sen!2sae"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Hotel Location"
                  />
                </Paper>
              </motion.div>

              {/* Nearby landmarks */}
              <motion.div variants={fadeInUp}>
                <Box sx={{ mt: 3, display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
                  {['Burj Khalifa', 'Dubai Mall', 'Downtown', 'Metro Station'].map((landmark, index) => (
                    <Chip
                      key={index}
                      label={landmark}
                      sx={{
                        backgroundColor: 'rgba(13,71,161,0.1)',
                        color: 'white',
                        border: '1px solid rgba(13,71,161,0.3)',
                        '&:hover': {
                          backgroundColor: 'rgba(13,71,161,0.2)',
                        },
                      }}
                    />
                  ))}
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Social Media Section */}
      <Box
        component={motion.section}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        sx={{
          py: SPACING.sectionYCompact,
          borderTop: `1px solid ${COLORS.borderStrong}`,
          borderBottom: '1px solid rgba(13,71,161,0.3)',
        }}
      >
        <Container maxWidth="xl">
          <motion.div variants={fadeInUp}>
            <Typography
              variant="h4"
              align="center"
              sx={{
                color: 'white',
                mb: 4,
              }}
            >
              Connect With Us
            </Typography>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Stack
              direction="row"
              spacing={3}
              justifyContent="center"
              alignItems="center"
            >
              {socialMedia.map((social, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -8, scale: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconButton
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: social.color,
                      backgroundColor: 'rgba(13,71,161,0.1)',
                      border: '1px solid rgba(13,71,161,0.3)',
                      width: 56,
                      height: 56,
                      '&:hover': {
                        backgroundColor: 'rgba(13,71,161,0.2)',
                        border: `1px solid ${social.color}`,
                        boxShadow: `0 0 20px ${social.color}`,
                      },
                    }}
                  >
                    {social.icon}
                  </IconButton>
                </motion.div>
              ))}
            </Stack>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Typography
              variant="body2"
              align="center"
              sx={{
                color: 'rgba(255,255,255,0.6)',
                mt: 4,
              }}
            >
              Follow us on social media for exclusive offers and updates
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={5000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          icon={<CheckCircleIcon fontSize="inherit" />}
          severity="success"
          sx={{
            backgroundColor: 'rgba(13,71,161,0.9)',
            color: 'white',
            border: '1px solid #0d47a1',
            '& .MuiAlert-icon': {
              color: 'white',
            },
          }}
        >
          Thank you for reaching out! Our team will contact you within 24 hours.
        </Alert>
      </Snackbar>

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

export default Contact;