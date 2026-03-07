// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Box, Typography, Paper, Button, CircularProgress } from "@mui/material";
// import axiosInstance from "../api/axiosInstance";

// export default function SummaryPage() {

//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [booking, setBooking] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {

//     const fetchBooking = async () => {

//       try {

//      const res = await axiosInstance.get(`/bookings/${id}`);

//         if (res.data.success) {
//          setBooking(res.data.booking);
//         }

//       } catch (error) {

//         console.error("Booking fetch error:", error);

//       } finally {
//         setLoading(false);
//       }

//     };

//     fetchBooking();

//   }, [id]);


//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" mt={5}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (!booking) {
//     return (
//       <Typography align="center" mt={5}>
//         Booking not found
//       </Typography>
//     );
//   }

//   return (
//     <Box p={3} display="flex" justifyContent="center">
//       <Paper sx={{ p: 4, width: 400 }} elevation={3}>

//         <Typography variant="h5" mb={2}>
//           Booking Summary
//         </Typography>

//         <Typography>Guest: {booking.guestName}</Typography>
//         <Typography>Phone: {booking.phone}</Typography>
//         <Typography>Room Type: {booking.roomType}</Typography>
//      <Typography>Rooms: {booking.roomsCount || 1}</Typography>
// <Typography>Total Guests: {booking.totalGuests || booking.adults}</Typography>
// <Typography>Nights: {booking.nights || 1}</Typography>
// <Typography>Check-In: {booking.checkInDate ? new Date(booking.checkInDate).toLocaleDateString() : "N/A"}</Typography>
// <Typography>Check-Out: {booking.checkOutDate ? new Date(booking.checkOutDate).toLocaleDateString() : "N/A"}</Typography>

//         <Typography sx={{ mt: 2 }}>
//           Total Amount: <b>Rs {booking.totalAmount}</b>
//         </Typography>

//         <Typography>Status: {booking.status}</Typography>

//         <Button
//           variant="contained"
//           fullWidth
//           sx={{ mt: 3 }}
//           onClick={() => navigate(`/payment/${booking._id}`)}
//         >
//           Proceed to Payment
//         </Button>

//       </Paper>
//     </Box>
//   );
// }


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  CircularProgress,
  Divider,
  Chip,
  Container,
  Fade,
  Zoom,
  Grow
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "../api/axiosInstance";
import KingBedIcon from "@mui/icons-material/KingBed";
import HotelIcon from "@mui/icons-material/Hotel";
import DiamondIcon from "@mui/icons-material/Diamond";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import NightlifeIcon from "@mui/icons-material/Nightlife";
import PaymentIcon from "@mui/icons-material/Payment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import EmailIcon from "@mui/icons-material/Email";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ReceiptIcon from "@mui/icons-material/Receipt";

export default function SummaryPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await axiosInstance.get(`/bookings/${id}`);
        if (res.data.success) {
          setBooking(res.data.booking);
          setTimeout(() => setShowContent(true), 500);
        }
      } catch (error) {
        console.error("Booking fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  // Luxury Stay theme colors
  const luxuryTheme = {
    primaryLight: '#0D47A1',
    primaryMain: '#1565C0',
    primaryDark: '#0A3D91',
    background: '#0A0A0A',
    secondaryBg: '#111111',
    footerGradient: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
    glassBg: 'rgba(255,255,255,0.05)',
    textPrimary: '#FFFFFF',
    textSecondary: 'rgba(255,255,255,0.7)',
    textMuted: 'rgba(255,255,255,0.5)',
    borderLight: 'rgba(255,255,255,0.08)',
    borderStrong: 'rgba(13,71,161,0.4)',
    navbarBg: 'rgba(10, 10, 10, 0.95)',
    hoverColor: '#0D47A1',
    activeBg: 'rgba(13,71,161,0.15)',
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.43, 0.13, 0.23, 0.96] // Custom easing for smoothness
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.95,
      rotateX: -10
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.43, 0.13, 0.23, 0.96],
        type: "spring",
        stiffness: 100,
        damping: 15
      },
    },
  };

  const priceRowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.8 + (i * 0.1),
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 1.2,
        duration: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        yoyo: Infinity
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const shimmerEffect = {
    initial: { x: "-100%" },
    animate: {
      x: "100%",
      transition: {
        repeat: Infinity,
        duration: 2,
        ease: "linear"
      }
    }
  };

  // Helper function to get room icon
  const getRoomIcon = (roomType) => {
    switch(roomType) {
      case 'Suite':
        return <DiamondIcon sx={{ color: luxuryTheme.primaryLight, fontSize: 24 }} />;
      case 'Deluxe':
        return <HotelIcon sx={{ color: luxuryTheme.primaryLight, fontSize: 24 }} />;
      default:
        return <KingBedIcon sx={{ color: luxuryTheme.primaryLight, fontSize: 24 }} />;
    }
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: luxuryTheme.footerGradient,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animated background */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            position: "absolute",
            width: "200px",
            height: "200px",
            background: `radial-gradient(circle, ${luxuryTheme.primaryLight}20 0%, transparent 70%)`,
            borderRadius: "50%",
          }}
        />
        
        <motion.div
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <CircularProgress 
            size={60}
            thickness={4}
            sx={{ 
              color: luxuryTheme.primaryLight,
              filter: `drop-shadow(0 0 10px ${luxuryTheme.primaryLight})`
            }} 
          />
        </motion.div>
      </Box>
    );
  }

  if (!booking) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: luxuryTheme.footerGradient,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Zoom in={true} timeout={500}>
          <Paper
            sx={{
              p: 6,
              background: luxuryTheme.navbarBg,
              backdropFilter: "blur(10px)",
              border: `1px solid ${luxuryTheme.borderStrong}`,
              borderRadius: 4,
              textAlign: "center",
              maxWidth: 400,
              width: "100%",
            }}
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <ConfirmationNumberIcon 
                sx={{ 
                  fontSize: 80, 
                  color: luxuryTheme.primaryLight,
                  mb: 2,
                  opacity: 0.5
                }} 
              />
            </motion.div>
            
            <Typography variant="h5" sx={{ color: luxuryTheme.textPrimary, mb: 2, fontWeight: 300 }}>
              Booking Not Found
            </Typography>
            
            <Typography sx={{ color: luxuryTheme.textSecondary, mb: 4 }}>
              The booking you're looking for doesn't exist or has been removed.
            </Typography>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="contained"
                onClick={() => navigate("/")}
                startIcon={<ArrowBackIcon />}
                sx={{
                  background: luxuryTheme.primaryMain,
                  color: luxuryTheme.textPrimary,
                  py: 1.5,
                  px: 4,
                  borderRadius: 2,
                  '&:hover': {
                    background: luxuryTheme.primaryLight,
                  },
                }}
              >
                Return Home
              </Button>
            </motion.div>
          </Paper>
        </Zoom>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: luxuryTheme.footerGradient,
        py: { xs: 4, md: 8 },
        px: { xs: 2, md: 4 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated background elements */}
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.1, 0.2, 0.1],
          rotate: [0, 90, 180],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "400px",
          height: "400px",
          background: `radial-gradient(circle, ${luxuryTheme.primaryLight} 0%, transparent 70%)`,
          borderRadius: "50%",
          opacity: 0.1,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.15, 0.1],
          rotate: [180, 270, 360],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          position: "absolute",
          bottom: "10%",
          right: "5%",
          width: "300px",
          height: "300px",
          background: `radial-gradient(circle, ${luxuryTheme.primaryLight} 0%, transparent 70%)`,
          borderRadius: "50%",
          opacity: 0.1,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.sin(i) * 50, 0],
            opacity: [0, 0.2, 0],
          }}
          transition={{
            duration: 10 + (i * 2),
            repeat: Infinity,
            delay: i * 0.5,
            ease: "linear"
          }}
          style={{
            position: "absolute",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: luxuryTheme.primaryLight,
            opacity: 0.1,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      ))}

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 10 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={showContent ? "visible" : "hidden"}
        >
          {/* Header with animation */}
          <motion.div variants={itemVariants}>
            <Box sx={{ textAlign: "center", mb: 5 }}>
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  delay: 0.2, 
                  type: "spring", 
                  stiffness: 200,
                  damping: 15
                }}
              >
                <Box
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${luxuryTheme.primaryDark} 0%, ${luxuryTheme.primaryMain} 100%)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 3,
                    boxShadow: `0 0 30px ${luxuryTheme.primaryLight}`,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{
                      position: "absolute",
                      width: "150%",
                      height: "150%",
                      background: `conic-gradient(transparent, ${luxuryTheme.primaryLight}40, transparent)`,
                    }}
                  />
                  <CheckCircleIcon sx={{ fontSize: 50, color: luxuryTheme.textPrimary, zIndex: 1 }} />
                </Box>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    color: luxuryTheme.textPrimary,
                    fontWeight: 300,
                    letterSpacing: '0.1em',
                    mb: 1,
                    fontSize: { xs: "2rem", md: "3rem" },
                    textShadow: `0 2px 10px ${luxuryTheme.primaryLight}40`,
                  }}
                >
                  Booking Summary
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <Chip
                  icon={<ConfirmationNumberIcon />}
                  label={`Reference: #${booking._id?.slice(-8).toUpperCase()}`}
                  sx={{
                    background: luxuryTheme.glassBg,
                    color: luxuryTheme.textSecondary,
                    border: `1px solid ${luxuryTheme.borderStrong}`,
                    borderRadius: 2,
                    py: 2,
                    '& .MuiChip-icon': {
                      color: luxuryTheme.primaryLight,
                    },
                  }}
                />
              </motion.div>
            </Box>
          </motion.div>

          {/* Main Summary Card */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ 
              boxShadow: `0 40px 80px ${luxuryTheme.primaryLight}30`,
              transition: { duration: 0.3 }
            }}
          >
            <Paper
              elevation={24}
              sx={{
                background: luxuryTheme.navbarBg,
                backdropFilter: "blur(10px)",
                border: `1px solid ${luxuryTheme.borderStrong}`,
                borderRadius: 4,
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* Shimmer effect overlay */}
              <motion.div
                variants={shimmerEffect}
                initial="initial"
                animate="animate"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: `linear-gradient(90deg, transparent, ${luxuryTheme.primaryLight}, transparent)`,
                  zIndex: 20,
                }}
              />

              {/* Status Bar with animation */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <Box
                  sx={{
                    p: 2.5,
                    background: luxuryTheme.activeBg,
                    borderBottom: `1px solid ${luxuryTheme.borderStrong}`,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 2,
                  }}
                >
                  <Typography sx={{ color: luxuryTheme.textSecondary, letterSpacing: '0.05em' }}>
                    Booking Status
                  </Typography>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Chip
                      label={booking.status || "Confirmed"}
                      sx={{
                        background: luxuryTheme.primaryMain,
                        color: luxuryTheme.textPrimary,
                        fontWeight: 500,
                        borderRadius: "8px",
                        px: 2,
                        '& .MuiChip-label': {
                          px: 2,
                        },
                      }}
                    />
                  </motion.div>
                </Box>
              </motion.div>

              {/* Content */}
              <Box sx={{ p: { xs: 3, md: 5 } }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {/* Personal Information Section */}
                  <motion.div variants={itemVariants}>
                    <Box>
                      <motion.div
                        whileHover={{ x: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            color: luxuryTheme.primaryLight,
                            mb: 3,
                            fontWeight: 400,
                            letterSpacing: '0.05em',
                            borderBottom: `1px solid ${luxuryTheme.borderStrong}`,
                            pb: 1,
                            display: "inline-block",
                          }}
                        >
                          Guest Information
                        </Typography>
                      </motion.div>

                      <Box sx={{ 
                        display: "grid", 
                        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                        gap: 3 
                      }}>
                        <SummaryItem
                          icon={<PersonIcon />}
                          label="Full Name"
                          value={booking.guestName}
                          theme={luxuryTheme}
                          delay={0.9}
                        />
                        <SummaryItem
                          icon={<PhoneIcon />}
                          label="Phone Number"
                          value={booking.phone}
                          theme={luxuryTheme}
                          delay={1.0}
                        />
                        {booking.email && (
                          <SummaryItem
                            icon={<EmailIcon />}
                            label="Email Address"
                            value={booking.email}
                            theme={luxuryTheme}
                            delay={1.1}
                            gridColumn="span 2"
                          />
                        )}
                      </Box>
                    </Box>
                  </motion.div>

                  {/* Stay Details Section */}
                  <motion.div variants={itemVariants}>
                    <Box>
                      <motion.div
                        whileHover={{ x: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            color: luxuryTheme.primaryLight,
                            mb: 3,
                            fontWeight: 400,
                            letterSpacing: '0.05em',
                            borderBottom: `1px solid ${luxuryTheme.borderStrong}`,
                            pb: 1,
                            display: "inline-block",
                          }}
                        >
                          Stay Details
                        </Typography>
                      </motion.div>

                      <Box sx={{ 
                        display: "grid", 
                        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" },
                        gap: 3 
                      }}>
                        <SummaryItem
                          icon={<CalendarTodayIcon />}
                          label="Check-In"
                          value={formatDate(booking.checkInDate)}
                          theme={luxuryTheme}
                          delay={1.2}
                        />
                        <SummaryItem
                          icon={<CalendarTodayIcon />}
                          label="Check-Out"
                          value={formatDate(booking.checkOutDate)}
                          theme={luxuryTheme}
                          delay={1.3}
                        />
                        <SummaryItem
                          icon={<NightlifeIcon />}
                          label="Nights"
                          value={booking.nights || 1}
                          theme={luxuryTheme}
                          delay={1.4}
                        />
                        <SummaryItem
                          icon={<MeetingRoomIcon />}
                          label="Rooms"
                          value={booking.roomsCount || 1}
                          theme={luxuryTheme}
                          delay={1.5}
                        />
                        <SummaryItem
                          icon={<PersonIcon />}
                          label="Total Guests"
                          value={booking.totalGuests || booking.adults}
                          theme={luxuryTheme}
                          delay={1.6}
                          gridColumn={{ xs: "span 1", md: "span 2" }}
                        />
                      </Box>
                    </Box>
                  </motion.div>

                  {/* Accommodation Details Section */}
                  <motion.div variants={itemVariants}>
                    <Box>
                      <motion.div
                        whileHover={{ x: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            color: luxuryTheme.primaryLight,
                            mb: 3,
                            fontWeight: 400,
                            letterSpacing: '0.05em',
                            borderBottom: `1px solid ${luxuryTheme.borderStrong}`,
                            pb: 1,
                            display: "inline-block",
                          }}
                        >
                          Accommodation
                        </Typography>
                      </motion.div>

                      <Box sx={{ 
                        display: "grid", 
                        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                        gap: 3 
                      }}>
                        <SummaryItem
                          icon={getRoomIcon(booking.roomType)}
                          label="Room Type"
                          value={booking.roomType}
                          theme={luxuryTheme}
                          delay={1.7}
                        />
                        <SummaryItem
                          icon={<RestaurantIcon />}
                          label="Dining Package"
                          value={booking.foodPackage || "Room Only"}
                          theme={luxuryTheme}
                          delay={1.8}
                        />
                      </Box>
                    </Box>
                  </motion.div>

                  {/* Price Breakdown Section */}
                  <motion.div variants={itemVariants}>
                    <Box>
                      <motion.div
                        whileHover={{ x: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            color: luxuryTheme.primaryLight,
                            mb: 3,
                            fontWeight: 400,
                            letterSpacing: '0.05em',
                            borderBottom: `1px solid ${luxuryTheme.borderStrong}`,
                            pb: 1,
                            display: "inline-block",
                          }}
                        >
                          Price Breakdown
                        </Typography>
                      </motion.div>

                      <Box sx={{ 
                        background: luxuryTheme.glassBg,
                        borderRadius: 3,
                        p: 3,
                        border: `1px solid ${luxuryTheme.borderLight}`,
                      }}>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                          {booking.roomCost && (
                            <PriceRow
                              label="Room Charges"
                              value={booking.roomCost}
                              theme={luxuryTheme}
                              index={0}
                            />
                          )}
                          {booking.foodCost && booking.foodCost > 0 && (
                            <PriceRow
                              label="Dining Package"
                              value={booking.foodCost}
                              theme={luxuryTheme}
                              index={1}
                            />
                          )}
                          
                          <motion.div
                            initial={{ opacity: 0, scaleX: 0 }}
                            animate={{ opacity: 1, scaleX: 1 }}
                            transition={{ delay: 2.0, duration: 0.5 }}
                          >
                            <Divider sx={{ 
                              borderColor: luxuryTheme.borderStrong,
                              my: 1
                            }} />
                          </motion.div>
                          
                          <PriceRow
                            label="Subtotal"
                            value={(booking.roomCost || 0) + (booking.foodCost || 0)}
                            theme={luxuryTheme}
                            isSubtotal
                            index={2}
                          />
                          
                          <motion.div
                            initial={{ opacity: 0, scaleX: 0 }}
                            animate={{ opacity: 1, scaleX: 1 }}
                            transition={{ delay: 2.2, duration: 0.5 }}
                          >
                            <Divider sx={{ 
                              borderColor: luxuryTheme.borderStrong,
                              my: 1
                            }} />
                          </motion.div>
                          
                          {/* Total Amount with animation */}
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 2.4, duration: 0.6, type: "spring" }}
                            whileHover={{ 
                              scale: 1.02,
                              boxShadow: `0 0 30px ${luxuryTheme.primaryLight}40`
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                py: 3,
                                px: 3,
                                background: `linear-gradient(135deg, ${luxuryTheme.primaryDark}20, ${luxuryTheme.primaryMain}20)`,
                                borderRadius: 2,
                                border: `1px solid ${luxuryTheme.borderStrong}`,
                                mt: 1,
                              }}
                            >
                              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <ReceiptIcon sx={{ color: luxuryTheme.primaryLight }} />
                                <Typography
                                  sx={{
                                    color: luxuryTheme.textPrimary,
                                    fontSize: "1.2rem",
                                    fontWeight: 500,
                                    letterSpacing: '0.05em',
                                  }}
                                >
                                  Total Amount
                                </Typography>
                              </Box>
                              <motion.div
                                animate={{
                                  scale: [1, 1.1, 1],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  repeatType: "reverse"
                                }}
                              >
                                <Typography
                                  sx={{
                                    color: luxuryTheme.primaryLight,
                                    fontSize: "2.2rem",
                                    fontWeight: 700,
                                    textShadow: `0 0 20px ${luxuryTheme.primaryLight}`,
                                  }}
                                >
                                  Rs {booking.totalAmount?.toLocaleString()}
                                </Typography>
                              </motion.div>
                            </Box>
                          </motion.div>
                        </Box>
                      </Box>
                    </Box>
                  </motion.div>

                  {/* Payment Button */}
                  <motion.div
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      onClick={() => navigate(`/payment/${booking._id}`)}
                      endIcon={<PaymentIcon />}
                      sx={{
                        py: 2.5,
                        background: `linear-gradient(135deg, ${luxuryTheme.primaryDark} 0%, ${luxuryTheme.primaryMain} 100%)`,
                        color: luxuryTheme.textPrimary,
                        fontWeight: 500,
                        letterSpacing: '0.1em',
                        fontSize: '1.2rem',
                        borderRadius: 2,
                        position: "relative",
                        overflow: "hidden",
                        border: `1px solid ${luxuryTheme.primaryLight}`,
                        boxShadow: `0 8px 20px ${luxuryTheme.primaryLight}40`,
                        '&::before': {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: "-100%",
                          width: "100%",
                          height: "100%",
                          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                          transition: "left 0.5s ease",
                        },
                        '&:hover::before': {
                          left: "100%",
                        },
                        '&:hover': {
                          background: `linear-gradient(135deg, ${luxuryTheme.primaryMain} 0%, ${luxuryTheme.primaryLight} 100%)`,
                          boxShadow: `0 12px 30px ${luxuryTheme.primaryLight}80`,
                        },
                      }}
                    >
                      Proceed to Secure Payment
                    </Button>
                  </motion.div>

                  {/* Terms with animation */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.8, duration: 0.5 }}
                  >
                    <Typography
                      variant="caption"
                      align="center"
                      sx={{
                        display: "block",
                        color: luxuryTheme.textMuted,
                        fontSize: '0.75rem',
                        letterSpacing: '0.05em',
                        mt: 2,
                      }}
                    >
                      By proceeding to payment, you agree to our cancellation policy and terms of service.
                      This is a secure 256-bit SSL encrypted transaction.
                    </Typography>
                  </motion.div>
                </Box>
              </Box>
            </Paper>
          </motion.div>

          {/* Back button with animation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 3.0, duration: 0.5 }}
            style={{ marginTop: "2rem", textAlign: "center" }}
          >
            <motion.div
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate(-1)}
                sx={{
                  color: luxuryTheme.textSecondary,
                  '&:hover': {
                    color: luxuryTheme.primaryLight,
                    background: 'transparent',
                  },
                }}
              >
                Back to Booking
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
}

// Helper component for summary items with animation
const SummaryItem = ({ icon, label, value, theme, delay = 0, gridColumn }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: delay,
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ 
        scale: 1.03,
        boxShadow: `0 5px 15px ${theme.primaryLight}30`,
        transition: { duration: 0.2 }
      }}
      style={{
        gridColumn: gridColumn,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          p: 2.5,
          background: theme.glassBg,
          borderRadius: 2,
          border: `1px solid ${theme.borderLight}`,
          transition: 'all 0.3s ease',
          height: "100%",
          cursor: "default",
          position: "relative",
          overflow: "hidden",
          '&::after': {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(45deg, transparent, ${theme.primaryLight}10, transparent)`,
            opacity: 0,
            transition: "opacity 0.3s ease",
          },
          '&:hover::after': {
            opacity: 1,
          },
        }}
      >
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
          style={{
            color: theme.primaryLight,
            display: "flex",
            alignItems: "center",
          }}
        >
          {icon}
        </motion.div>
        <Box sx={{ flex: 1 }}>
          <Typography variant="caption" sx={{ color: theme.textMuted, display: "block", mb: 0.5, letterSpacing: '0.05em' }}>
            {label}
          </Typography>
          <Typography sx={{ color: theme.textPrimary, fontWeight: 500, fontSize: "1.1rem" }}>
            {value}
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
};

// Helper component for price rows with animation
const PriceRow = ({ label, value, theme, isSubtotal = false, index = 0 }) => {
  const priceVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 1.8 + (index * 0.2),
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={priceVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ 
        x: 5,
        backgroundColor: isSubtotal ? 'transparent' : `${theme.primaryLight}10`,
        transition: { duration: 0.2 }
      }}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px 16px",
        borderRadius: "8px",
        cursor: "default",
      }}
    >
      <Typography
        sx={{
          color: isSubtotal ? theme.textPrimary : theme.textSecondary,
          fontWeight: isSubtotal ? 500 : 400,
          fontSize: isSubtotal ? "1.1rem" : "1rem",
        }}
      >
        {label}
      </Typography>
      <motion.div
        animate={isSubtotal ? {
          scale: [1, 1.05, 1],
        } : {}}
        transition={{
          duration: 2,
          repeat: isSubtotal ? Infinity : 0,
          repeatType: "reverse"
        }}
      >
        <Typography
          sx={{
            color: isSubtotal ? theme.primaryLight : theme.textPrimary,
            fontWeight: isSubtotal ? 600 : 400,
            fontSize: isSubtotal ? "1.3rem" : "1rem",
          }}
        >
          Rs {value?.toLocaleString()}
        </Typography>
      </motion.div>
    </motion.div>
  );
};