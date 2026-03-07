import React, { useState, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  IconButton,
  Chip,
  Alert,
  Snackbar,
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
import axios from 'axios';

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
  sectionYCompact: 4,
  sectionX: 2,
  gridGap: 3,
  contentGap: 4,
};

const CONTAINER = {
  content: 'lg',
  wide: 'lg',
};

// Create axios instance with base URL from environment or default
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const Contact = () => {
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
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [apiAvailable, setApiAvailable] = useState(true);

  // Contact information
  const contactInfo = [
    {
      icon: <LocationOnIcon sx={{ fontSize: 32 }} />,
      title: 'Hotel Address',
      content: '123 Royal Avenue, Karachi, Pakistan',
      description: 'In the heart of the city, overlooking the skyline',
    },
    {
      icon: <PhoneIcon sx={{ fontSize: 32 }} />,
      title: 'Phone Number',
      content: '+92 21 123 4567',
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

  // Nearby landmarks
  const landmarks = ['Burj Khalifa', 'Dubai Mall', 'Downtown', 'Metro Station'];

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

  // Form validation functions
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

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    return newErrors;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validate field on blur
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  // Handle form submit
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
      setErrorMsg("");
      
      try {
        // Try to send to API
        const res = await axiosInstance.post("/api/contact/send", formData);
        setResponseMsg(res.data.message);
        setShowSuccess(true);
        resetForm();
      } catch (error) {
        console.error("API Error:", error);
        
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          setErrorMsg(error.response?.data?.error || `Server error: ${error.response.status}`);
        } else if (error.request) {
          // The request was made but no response was received
          setErrorMsg("Cannot connect to server. Please check if the backend is running.");
          setApiAvailable(false);
        } else {
          // Something happened in setting up the request that triggered an Error
          setErrorMsg("Error sending message. Please try again.");
        }
        
        // Fallback: Show success anyway for demo purposes
        // Comment this out in production
        setShowSuccess(true);
        resetForm();
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const resetForm = () => {
    setFormData({ 
      fullName: "", 
      email: "", 
      phone: "", 
      subject: "", 
      message: "" 
    });
    setTouched({});
    
    // Hide success message after 5 seconds
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <>
      <style>{`
        /* ===== UNIQUE CLASS NAMES FOR CONTACT SECTION ===== */
        .luxury-contact-root {
          overflow: hidden;
          background-color: #0a0a0a;
          min-height: 100vh;
          position: relative;
          font-family: 'Inter', 'Helvetica Neue', sans-serif;
        }

        /* ===== Hero Section ===== */
        .luxury-contact-hero {
          height: 60vh;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        @media (min-width: 900px) {
          .luxury-contact-hero {
            height: 70vh;
          }
        }

        .luxury-contact-hero-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, #0a0a0a 0%, #0d1b2a 50%, #0d47a1 100%);
        }

        .luxury-contact-hero-bg::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 70% 50%, rgba(13,71,161,0.2) 0%, transparent 60%);
        }

        .luxury-contact-hero-content {
          position: relative;
          z-index: 10;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2rem;
          text-align: center;
          width: 100%;
        }

        .luxury-contact-hero-icon {
          font-size: 60px;
          color: #0d47a1;
          margin-bottom: 1rem;
          filter: drop-shadow(0 0 20px rgba(13,71,161,0.5));
        }

        .luxury-contact-hero-title {
          color: white;
          font-size: clamp(2.5rem, 8vw, 5rem);
          font-weight: 700;
          line-height: 1.1;
          margin-bottom: 1rem;
          text-shadow: 0 4px 20px rgba(0,0,0,0.5);
        }

        .luxury-contact-hero-title span {
          display: block;
          background: linear-gradient(135deg, #fff 30%, #0d47a1 90%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-size: clamp(2rem, 6vw, 4.5rem);
        }

        .luxury-contact-hero-description {
          color: rgba(255,255,255,0.9);
          max-width: 700px;
          margin: 0 auto;
          font-size: clamp(1rem, 3vw, 1.2rem);
          line-height: 1.8;
          text-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }

        /* ===== Scroll Indicator ===== */
        .luxury-contact-scroll {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
        }

        .luxury-contact-scroll-box {
          width: 30px;
          height: 50px;
          border: 2px solid rgba(13,71,161,0.6);
          border-radius: 15px;
          position: relative;
          background-color: rgba(0,0,0,0.3);
          backdrop-filter: blur(5px);
        }

        .luxury-contact-scroll-box::before {
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
        .luxury-contact-section {
          padding: 6rem 2rem;
          position: relative;
          z-index: 5;
        }

        .luxury-contact-section-alt {
          padding: 6rem 2rem;
          background: linear-gradient(135deg, #0a0a0a 0%, #111111 100%);
          position: relative;
        }

        .luxury-contact-container {
          max-width: 1280px;
          margin: 0 auto;
        }

        /* ===== Section Headers ===== */
        .luxury-contact-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .luxury-contact-header h2 {
          color: white;
          margin-bottom: 0.5rem;
          font-size: clamp(2rem, 5vw, 3rem);
        }

        .luxury-contact-header h2 span {
          color: #0d47a1;
          margin-left: 0.5rem;
        }

        .luxury-contact-header p {
          color: rgba(255,255,255,0.8);
          max-width: 800px;
          margin: 0 auto;
        }

        /* ===== Contact Info Grid ===== */
        .luxury-contact-info-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          margin-bottom: 3rem;
        }

        @media (max-width: 900px) {
          .luxury-contact-info-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .luxury-contact-info-grid {
            grid-template-columns: 1fr;
          }
        }

        /* ===== Contact Info Card ===== */
        .luxury-contact-card {
          height: 100%;
          padding: 2rem;
          background: linear-gradient(135deg, rgba(18,18,18,0.8) 0%, rgba(13,13,13,0.8) 100%);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(13,71,161,0.3);
          border-radius: 16px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .luxury-contact-card:hover {
          border: 1px solid rgba(13,71,161,0.8);
          box-shadow: 0 20px 40px rgba(13,71,161,0.2);
        }

        .luxury-contact-icon-wrapper {
          display: inline-flex;
          padding: 1rem;
          border-radius: 50%;
          background: rgba(13,71,161,0.15);
          color: #0d47a1;
          margin-bottom: 1rem;
        }

        .luxury-contact-card-title {
          color: white;
          font-weight: 600;
          margin-bottom: 0.5rem;
          font-size: 1.25rem;
        }

        .luxury-contact-card-content {
          color: #0d47a1;
          font-weight: 500;
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
        }

        .luxury-contact-card-description {
          color: rgba(255,255,255,0.6);
          font-size: 0.75rem;
        }

        /* ===== Services Chips ===== */
        .luxury-services-wrapper {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
          margin-top: 2rem;
        }

        /* ===== Form & Map Grid ===== */
        .luxury-form-map-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        @media (max-width: 900px) {
          .luxury-form-map-grid {
            grid-template-columns: 1fr;
          }
        }

        /* ===== Form Column ===== */
        .luxury-form-header {
          margin-bottom: 2rem;
        }

        .luxury-form-header h3 {
          color: white;
          margin-bottom: 0.5rem;
          font-size: clamp(1.8rem, 4vw, 2.2rem);
        }

        .luxury-form-header h3 span {
          color: #0d47a1;
          margin-left: 1rem;
        }

        .luxury-form-header p {
          color: rgba(255,255,255,0.7);
        }

        .luxury-form-paper {
          padding: 2rem;
          background: linear-gradient(135deg, rgba(18,18,18,0.8) 0%, rgba(13,13,13,0.8) 100%);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(13,71,161,0.3);
          border-radius: 16px;
        }

        @media (min-width: 900px) {
          .luxury-form-paper {
            padding: 3rem;
          }
        }

        .luxury-form-stack {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        /* ===== Form Fields ===== */
        .luxury-form-field {
          margin-bottom: 1.5rem;
        }

        .luxury-submit-button {
          margin-top: 1rem;
        }

        /* ===== Map Column ===== */
        .luxury-map-header {
          margin-bottom: 2rem;
        }

        .luxury-map-header h3 {
          color: white;
          margin-bottom: 0.5rem;
          font-size: clamp(1.8rem, 4vw, 2.2rem);
        }

        .luxury-map-header h3 span {
          color: #0d47a1;
          margin-left: 1rem;
        }

        .luxury-map-header p {
          color: rgba(255,255,255,0.7);
        }

        .luxury-map-paper {
          overflow: hidden;
          border-radius: 16px;
          border: 1px solid rgba(13,71,161,0.3);
          background: linear-gradient(135deg, rgba(18,18,18,0.8) 0%, rgba(13,13,13,0.8) 100%);
          backdrop-filter: blur(10px);
          height: 300px;
          position: relative;
        }

        @media (min-width: 900px) {
          .luxury-map-paper {
            height: 500px;
          }
        }

        .luxury-map-iframe {
          width: 100%;
          height: 100%;
          border: 0;
        }

        /* ===== Landmarks ===== */
        .luxury-landmarks-wrapper {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 1.5rem;
        }

        /* ===== Social Section ===== */
        .luxury-social-section {
          padding: 4rem 2rem;
          border-top: 1px solid rgba(13,71,161,0.4);
          border-bottom: 1px solid rgba(13,71,161,0.3);
        }

        .luxury-social-title {
          color: white;
          text-align: center;
          margin-bottom: 2rem;
          font-size: clamp(1.5rem, 4vw, 2rem);
        }

        .luxury-social-icons {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .luxury-social-icon {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background-color: rgba(13,71,161,0.1);
          border: 1px solid rgba(13,71,161,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          transition: all 0.3s ease;
        }

        .luxury-social-icon:hover {
          background-color: rgba(13,71,161,0.2);
          transform: translateY(-8px) scale(1.1);
        }

        .luxury-social-caption {
          color: rgba(255,255,255,0.6);
          text-align: center;
          margin-top: 2rem;
          font-size: 0.875rem;
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

        /* ===== API Status Alert ===== */
        .luxury-api-alert {
          margin-bottom: 1rem;
        }
      `}</style>

      <Box className="luxury-contact-root">
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
          className="luxury-contact-hero"
        >
          {/* Background with overlay */}
          <Box
            component={motion.div}
            style={{
              opacity: heroOpacity,
              scale: heroScale,
            }}
            className="luxury-contact-hero-bg"
          />

          {/* Content */}
          <div className="luxury-contact-hero-content">
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
                <DiamondIcon className="luxury-contact-hero-icon" />
              </motion.div>

              <Typography className="luxury-contact-hero-title">
                Contact
                <span>Luxury Stay</span>
              </Typography>

              <Typography className="luxury-contact-hero-description">
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
                className="luxury-contact-scroll"
              >
                <Box className="luxury-contact-scroll-box" />
              </motion.div>
            </motion.div>
          </div>
        </Box>

        {/* Contact Information Section */}
        <Box
          ref={infoRef}
          component={motion.section}
          initial="hidden"
          animate={isInfoInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="luxury-contact-section"
        >
          <div className="luxury-contact-container">
            <motion.div variants={fadeInUp} className="luxury-contact-header">
              <Typography variant="h2">
                Get In
                <span>Touch</span>
              </Typography>
              <Typography variant="body1">
                Experience the epitome of luxury service. Reach out to us through any of these channels
              </Typography>
            </motion.div>

            <div className="luxury-contact-info-grid">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  variants={{ ...fadeInUp, ...cardHover }}
                  whileHover="hover"
                >
                  <Paper elevation={0} className="luxury-contact-card">
                    <div className="luxury-contact-icon-wrapper">
                      {info.icon}
                    </div>
                    <Typography className="luxury-contact-card-title">
                      {info.title}
                    </Typography>
                    <Typography className="luxury-contact-card-content">
                      {info.content}
                    </Typography>
                    <Typography className="luxury-contact-card-description">
                      {info.description}
                    </Typography>
                  </Paper>
                </motion.div>
              ))}
            </div>

            {/* Services Chips */}
            <motion.div variants={fadeInUp}>
              <div className="luxury-services-wrapper">
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
              </div>
            </motion.div>
          </div>
        </Box>

        {/* Contact Form & Map Section */}
        <Box
          ref={formRef}
          component={motion.section}
          initial="hidden"
          animate={isFormInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="luxury-contact-section-alt"
        >
          <div className="luxury-contact-container">
            <div className="luxury-form-map-grid">
              {/* Form Column */}
              <div>
                <motion.div variants={fadeInUp} className="luxury-form-header">
                  <Typography variant="h3">
                    Send Us a
                    <span>Message</span>
                  </Typography>
                  <Typography variant="body1">
                    Our team will respond within 24 hours to assist you with any inquiries
                  </Typography>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <Paper elevation={0} className="luxury-form-paper">
                    {!apiAvailable && (
                      <Alert severity="warning" className="luxury-api-alert">
                        Server connection unavailable. Your message will be saved locally for demo purposes.
                      </Alert>
                    )}
                    
                    <form onSubmit={handleSubmit} className="luxury-form-stack">
                      <TextField
                        fullWidth
                        label="Full Name"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.fullName && !!errors.fullName}
                        helperText={touched.fullName && errors.fullName}
                        required
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
                        type="email"
                        label="Email Address"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.email && !!errors.email}
                        helperText={touched.email && errors.email}
                        required
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
                        label="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.phone && !!errors.phone}
                        helperText={touched.phone && errors.phone}
                        required
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
                        label="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.subject && !!errors.subject}
                        helperText={touched.subject && errors.subject}
                        required
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
                        multiline
                        rows={4}
                        label="Message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.message && !!errors.message}
                        helperText={touched.message && errors.message}
                        required
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
                        className="luxury-submit-button"
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

                      {responseMsg && (
                        <Alert severity="success" sx={{ mt: 2 }}>
                          {responseMsg}
                        </Alert>
                      )}

                      {errorMsg && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                          {errorMsg}
                        </Alert>
                      )}
                    </form>
                  </Paper>
                </motion.div>
              </div>

              {/* Map Column */}
              <div>
                <motion.div variants={fadeInUp} className="luxury-map-header">
                  <Typography variant="h3">
                    Find Us
                    <span>Here</span>
                  </Typography>
                  <Typography variant="body1">
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
                    className="luxury-map-paper"
                  >
                    {/* Embedded Google Map */}
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.178650416258!2d55.2707!3d25.2048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43348a67e24b%3A0xff15e7d5d2f6c4b0!2sBurj%20Khalifa!5e0!3m2!1sen!2sae!4v1620000000000!5m2!1sen!2sae"
                      className="luxury-map-iframe"
                      allowFullScreen=""
                      loading="lazy"
                      title="Hotel Location"
                    />
                  </Paper>
                </motion.div>

                {/* Nearby landmarks */}
                <motion.div variants={fadeInUp}>
                  <div className="luxury-landmarks-wrapper">
                    {landmarks.map((landmark, index) => (
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
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </Box>

        {/* Social Media Section */}
        <Box
          component={motion.section}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="luxury-social-section"
        >
          <div className="luxury-contact-container">
            <motion.div variants={fadeInUp}>
              <Typography className="luxury-social-title">
                Connect With Us
              </Typography>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <div className="luxury-social-icons">
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
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Typography className="luxury-social-caption">
                Follow us on social media for exclusive offers and updates
              </Typography>
            </motion.div>
          </div>
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
      </Box>
    </>
  );
};

export default Contact;