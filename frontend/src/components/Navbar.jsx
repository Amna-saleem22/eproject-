




import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Container,
  Box,
  useMediaQuery,
  Avatar,
} from '@mui/material';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import HotelIcon from '@mui/icons-material/Hotel';
import BadgeIcon from '@mui/icons-material/Badge';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import ArticleIcon from '@mui/icons-material/Article';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import LoginIcon from '@mui/icons-material/Login';
import DiamondIcon from '@mui/icons-material/Diamond';
import { Link, useLocation } from 'react-router-dom';
import { CONTAINER, COLORS } from '../theme/designSystem';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width:900px)');
  const { scrollY } = useScroll();

  const token = localStorage.getItem('token'); // <-- login check
 const role = localStorage.getItem("role");
 const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/";
  };
  // ================= NAV ITEMS =================
  const publicItems = [
    { text: 'Home', path: '/', icon: <HomeIcon /> },
    { text: 'About', path: '/about', icon: <InfoIcon /> },
    { text: 'Rooms', path: '/rooms', icon: <HotelIcon /> },
    { text: 'Blog', path: '/blog', icon: <ArticleIcon /> },
    { text: 'Reviews', path: '/reviews', icon: <RateReviewIcon /> },
    { text: 'Contact', path: '/contact', icon: <ContactMailIcon /> },
    { text: 'Login', path: '/login', icon: <LoginIcon /> },
  ];
// ===== STAFF =====
  const staffItems = [
    { text: "Staff Panel", path: "/staff", icon: <BadgeIcon /> },
    { text: "Logout", action: handleLogout, icon: <LoginIcon /> },
  ];
   const adminItems = [
    { text: "Admin Panel", path: "/admin", icon: <AdminPanelSettingsIcon /> },
    { text: "Create Staff", path: "/admincreatestaff", icon: <BadgeIcon /> }, 
    { text: "Staff List", path: "/adminstafflist", icon: <BadgeIcon /> },
    { text: "Admin Rooms", path: "/adminrooms", icon: <HotelIcon /> },
    { text: "Admin Feedback", path: "/adminfeedback", icon: <RateReviewIcon /> },
     { text: 'Followers', path: '/adminusers', icon: <AdminPanelSettingsIcon /> },
     { text: "Logout", action: handleLogout, icon: <LoginIcon /> },
  ];

  const userItems = [
    { text: 'Dashboard', path: '/dashboard', icon: <HomeIcon /> },
    { text: 'Booking', path: '/booking', icon: <HotelIcon /> },
   
    { text: 'Feedback', path: '/feedback', icon: <RateReviewIcon /> },
     { text: "Logout", action: handleLogout, icon: <LoginIcon /> },
      
  ];

  let navItems = token ? userItems : publicItems;
if (token) {
    if (role === "admin") navItems = adminItems;
    else if (role === "staff") navItems = staffItems;
    else navItems = userItems;
  }
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Scroll transforms
  const navbarBackground = useTransform(
    scrollY,
    [0, 100],
    ['rgba(10, 10, 10, 0.9)', 'rgba(10, 10, 10, 0.98)']
  );
  const navbarBlur = useTransform(scrollY, [0, 100], ['blur(0px)', 'blur(10px)']);
  const navbarBorder = useTransform(
    scrollY,
    [0, 100],
    [`1px solid ${COLORS.border}`, `1px solid ${COLORS.borderStrong}`]
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation variants
  const logoVariants = { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0, transition: { duration: 0.6 } }, hover: { scale: 1.05 } };
  const navItemVariants = {
    initial: { opacity: 0, y: -20 },
    animate: (custom) => ({ opacity: 1, y: 0, transition: { delay: custom * 0.1, duration: 0.5 } }),
    hover: { scale: 1.1, color: COLORS.primaryLight, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };
  const mobileMenuVariants = {
    hidden: { x: '100%' },
    visible: { x: 0, transition: { type: 'spring', damping: 20, stiffness: 100 } },
    exit: { x: '100%', transition: { duration: 0.3 } },
  };

  const drawerContent = (
    <Box component={motion.div} variants={mobileMenuVariants} initial="hidden" animate="visible" exit="exit" sx={{ width: '100%', height: '100%', background: '#111', position: 'relative' }}>
      <IconButton onClick={handleDrawerToggle} sx={{ position: 'absolute', right: 2, top: 2, color: COLORS.primaryLight, zIndex: 10 }}>
        <CloseIcon />
      </IconButton>

      <Box sx={{ pt: 8, pb: 4, px: 3 }}>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
            <Avatar sx={{ bgcolor: COLORS.primaryLight, width: 50, height: 50, mr: 2 }}>
              <DiamondIcon />
            </Avatar>
            <Typography variant="h5" sx={{ fontWeight: 700, background: `linear-gradient(135deg, #fff 30%, ${COLORS.primaryLight} 90%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              LUXURY STAY
            </Typography>
          </Box>
        </motion.div>

        <List disablePadding>
          {navItems.map((item, index) => (
            <motion.div key={item.text} initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: index * 0.1 + 0.3 }} whileHover={{ x: 10 }}>
              <ListItem
                button
                component={Link}
                to={item.path}
                onClick={() => {
                  handleDrawerToggle();
                  if (item.action) item.action();
                }}
                sx={{
                  py: 2,
                  px: 3,
                  mb: 1,
                  borderRadius: 2,
                  backgroundColor: location.pathname === item.path ? 'rgba(13,71,161,0.15)' : 'transparent',
                }}
              >
                <ListItemIcon sx={{ color: location.pathname === item.path ? COLORS.primaryLight : '#fff', minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} primaryTypographyProps={{ sx: { color: location.pathname === item.path ? COLORS.primaryLight : '#fff', fontWeight: 500 } }} />
              </ListItem>
            </motion.div>
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <motion.div style={{ position: 'sticky', top: 0, zIndex: 1100, backgroundColor: navbarBackground, backdropFilter: navbarBlur, borderBottom: navbarBorder }}>
      <AppBar position="static" elevation={0} sx={{ background: 'transparent', boxShadow: 'none' }}>
        <Container maxWidth={CONTAINER.wide}>
          <Toolbar disableGutters sx={{ py: 1.25, minHeight: { xs: 64, md: 72 } }}>
            <motion.div variants={logoVariants} initial="initial" animate="animate" whileHover="hover" style={{ display: 'flex', alignItems: 'center' }}>
              <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                <Avatar sx={{ bgcolor: COLORS.primaryLight, width: { xs: 40, md: 48 }, height: { xs: 40, md: 48 }, mr: 1.5 }}>
                  <DiamondIcon sx={{ fontSize: { xs: 20, md: 24 } }} />
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 700, color: COLORS.primaryLight }}>LUXURY STAY</Typography>
              </Box>
            </motion.div>

            {!isMobile && (
              <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
                {navItems.map((item, index) => (
                  <motion.div key={item.text} custom={index} variants={navItemVariants} initial="initial" animate="animate" whileHover="hover" whileTap="tap">
                    <Button
                      component={Link}
                      to={item.path}
                      onClick={item.action || null}
                      size="medium"
                      sx={{ color: location.pathname === item.path ? COLORS.primaryLight : '#fff' }}
                    >
                      {item.text}
                    </Button>
                  </motion.div>
                ))}
              </Box>
            )}

            {isMobile && (
              <IconButton onClick={handleDrawerToggle} sx={{ ml: 'auto', color: COLORS.primaryLight, border: `1px solid ${COLORS.borderStrong}` }} aria-label="Open menu">
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <AnimatePresence>{mobileOpen && <Drawer variant="temporary" anchor="right" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }} sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { width: '100%', maxWidth: 400, backgroundColor: 'transparent', boxShadow: 'none' } }}>{drawerContent}</Drawer>}</AnimatePresence>
    </motion.div>
  );
};

export default Navbar;