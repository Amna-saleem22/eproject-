import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
  Stack,
  Avatar,
  Paper,
} from '@mui/material';
import { motion } from 'framer-motion';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import DiamondIcon from '@mui/icons-material/Diamond';
import SendIcon from '@mui/icons-material/Send';
import { SPACING, CONTAINER, COLORS } from '../theme/designSystem';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialIcons = [
    { icon: <FacebookIcon />, color: '#1877F2', name: 'Facebook' },
    { icon: <InstagramIcon />, color: '#E4405F', name: 'Instagram' },
    { icon: <TwitterIcon />, color: '#1DA1F2', name: 'Twitter' },
    { icon: <LinkedInIcon />, color: '#0A66C2', name: 'LinkedIn' },
  ];

  const quickLinks = [
    { text: 'Home', path: '/' },
    { text: 'Rooms', path: '/rooms' },
    { text: 'Blog', path: '/blog' },
    { text: 'Reviews', path: '/reviews' },
    { text: 'Contact', path: '/contact' },
  ];

  const contactInfo = [
    { icon: <LocationOnIcon />, text: '123 Luxury Avenue, Beverly Hills, CA 90210' },
    { icon: <PhoneIcon />, text: '+1 (888) 123-4567' },
    { icon: <EmailIcon />, text: 'info@luxurystay.com' },
  ];

  // Animation variants for sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.2,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  const iconVariants = {
    hover: {
      scale: 1.2,
      rotate: 360,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 300
      }
    },
    tap: {
      scale: 0.9
    }
  };

  const linkVariants = {
    hover: {
      x: 8,
      color: COLORS.primaryLight,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
        color: COLORS.text,
        pt: SPACING.sectionY,
        pb: 3,
        position: 'relative',
        overflow: 'hidden',
        borderTop: `1px solid ${COLORS.borderStrong}`,
      }}
    >
      {/* Animated background pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.03,
          background: 'radial-gradient(circle at 0% 50%, #0d47a1 0%, transparent 50%)',
          pointerEvents: 'none',
        }}
      />

      {/* Floating particles */}
      {[...Array(10)].map((_, i) => (
        <Box
          key={i}
          component={motion.div}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 10 + i,
            repeat: Infinity,
            ease: "linear"
          }}
          sx={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: 4,
            height: 4,
            borderRadius: '50%',
            backgroundColor: '#0d47a1',
            opacity: 0.1,
            pointerEvents: 'none',
          }}
        />
      ))}

      <Container maxWidth={CONTAINER.wide}>
        <Grid container spacing={SPACING.contentGap}>
          {/* Brand Info Section */}
          <Grid item xs={12} md={3}>
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar
                  sx={{
                    bgcolor: COLORS.primaryLight,
                    width: 48,
                    height: 48,
                    mr: 2,
                    boxShadow: `0 4px 20px ${COLORS.borderStrong}`,
                  }}
                >
                  <DiamondIcon />
                </Avatar>
                <Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      lineHeight: 1.2,
                      background: `linear-gradient(135deg, #fff 30%, ${COLORS.primaryLight} 90%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    LUXURY STAY
                  </Typography>
                </Box>
              </Box>

              <Typography
                variant="body2"
                sx={{
                  color: COLORS.textSecondary,
                  lineHeight: 1.8,
                  mb: 3,
                  fontSize: '0.9375rem',
                }}
              >
                Experience unparalleled luxury and comfort at our prestigious hotel.
                Where every moment is crafted to perfection and every stay becomes a cherished memory.
              </Typography>

              {/* Social Icons */}
              <Stack direction="row" spacing={1}>
                {socialIcons.map((social, index) => (
                  <motion.div
                    key={index}
                    variants={iconVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <IconButton
                      aria-label={social.name}
                      sx={{
                        color: social.color,
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        '&:hover': {
                          backgroundColor: 'rgba(255,255,255,0.1)',
                          boxShadow: `0 0 20px ${social.color}`,
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {social.icon}
                    </IconButton>
                  </motion.div>
                ))}
              </Stack>
            </motion.div>
          </Grid>

          {/* Quick Links Section */}
          <Grid item xs={12} md={3}>
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={1}
            >
              <Typography
                variant="h6"
                sx={{
                  color: COLORS.primaryLight,
                  fontWeight: 600,
                  mb: 3,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -8,
                    left: 0,
                    width: 40,
                    height: 3,
                    backgroundColor: COLORS.primaryLight,
                    borderRadius: 2,
                  },
                }}
              >
                Quick Links
              </Typography>

              <Stack spacing={2}>
                {quickLinks.map((link, index) => (
                  <motion.div
                    key={index}
                    variants={linkVariants}
                    whileHover="hover"
                  >
                    <Typography
                      component="a"
                      href={link.path}
                      sx={{
                        color: COLORS.textSecondary,
                        textDecoration: 'none',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        display: 'inline-block',
                        transition: 'color 0.2s ease',
                        '&:hover': {
                          color: COLORS.primaryLight,
                        },
                      }}
                    >
                      {link.text}
                    </Typography>
                  </motion.div>
                ))}
              </Stack>
            </motion.div>
          </Grid>

          {/* Contact Info Section */}
          <Grid item xs={12} md={3}>
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={2}
            >
              <Typography
                variant="h6"
                sx={{
                  color: COLORS.primaryLight,
                  fontWeight: 600,
                  mb: 3,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -8,
                    left: 0,
                    width: 40,
                    height: 3,
                    backgroundColor: COLORS.primaryLight,
                    borderRadius: 2,
                  },
                }}
              >
                Contact Info
              </Typography>

              <Stack spacing={3}>
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <Box sx={{ color: COLORS.primaryLight, minWidth: 24, display: 'flex', justifyContent: 'center' }}>
                        {info.icon}
                      </Box>
                      <Typography variant="body2" sx={{ color: COLORS.textSecondary, lineHeight: 1.6, fontSize: '0.9375rem' }}>
                        {info.text}
                      </Typography>
                    </Box>
                  </motion.div>
                ))}
              </Stack>
            </motion.div>
          </Grid>

          {/* Newsletter Section */}
          <Grid item xs={12} md={3}>
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={3}
            >
              <Typography
                variant="h6"
                sx={{
                  color: COLORS.primaryLight,
                  fontWeight: 600,
                  mb: 3,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -8,
                    left: 0,
                    width: 40,
                    height: 3,
                    backgroundColor: COLORS.primaryLight,
                    borderRadius: 2,
                  },
                }}
              >
                Newsletter
              </Typography>

              <Typography variant="body2" sx={{ color: COLORS.textSecondary, mb: 3, fontSize: '0.9375rem' }}>
                Subscribe to receive exclusive offers and updates about our luxury services.
              </Typography>

              <Paper
                component={motion.div}
                whileHover={{ scale: 1.02 }}
                sx={{
                  p: 0.5,
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  border: `1px solid ${COLORS.borderStrong}`,
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                <TextField
                  fullWidth
                  placeholder="Your email"
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                    sx: {
                      px: 2,
                      py: 1,
                      color: '#fff',
                      '&::placeholder': {
                        color: 'rgba(255,255,255,0.5)',
                      },
                    },
                  }}
                />
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      minWidth: 48,
                      height: 48,
                      borderRadius: 2,
                      backgroundColor: COLORS.primaryLight,
                      '&:hover': {
                        backgroundColor: COLORS.primaryDark,
                        boxShadow: `0 0 20px ${COLORS.primaryLight}`,
                      },
                    }}
                  >
                    <SendIcon />
                  </Button>
                </motion.div>
              </Paper>

              {/* Trust badges */}
              <Box
                sx={{
                  mt: 4,
                  display: 'flex',
                  gap: 2,
                  justifyContent: 'flex-start',
                }}
              >
                {['SSL Secure', 'Best Rate', '24/7 Support'].map((badge, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Paper
                      sx={{
                        px: 1.5,
                        py: 0.5,
                        backgroundColor: 'rgba(13, 71, 161, 0.15)',
                        border: `1px solid ${COLORS.borderStrong}`,
                        borderRadius: 2,
                      }}
                    >
                      <Typography variant="caption" sx={{ color: COLORS.primaryLight }}>
                        {badge}
                      </Typography>
                    </Paper>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Divider sx={{ my: SPACING.contentGap, borderColor: COLORS.borderStrong }} />
        </motion.div>

        {/* Copyright Section */}
        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: COLORS.textMuted,
                  textAlign: { xs: 'center', md: 'left' },
                }}
              >
                © {currentYear} Luxury Stay Hotel. All rights reserved. 
                Crafted with precision for the discerning traveler.
              </Typography>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Stack
                direction="row"
                spacing={3}
                justifyContent={{ xs: 'center', md: 'flex-end' }}
              >
                {['Privacy Policy', 'Terms of Use', 'Cookie Policy'].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -2 }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: COLORS.textMuted,
                        cursor: 'pointer',
                        '&:hover': { color: COLORS.primaryLight },
                        transition: 'color 0.2s ease',
                      }}
                    >
                      {item}
                    </Typography>
                  </motion.div>
                ))}
              </Stack>
            </motion.div>
          </Grid>
        </Grid>

        {/* Bottom decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
            style={{
            height: 2,
            background: `linear-gradient(90deg, transparent, ${COLORS.primaryLight}, transparent)`,
            marginTop: 24,
          }}
        />
      </Container>
    </Box>
  );
};

export default Footer;