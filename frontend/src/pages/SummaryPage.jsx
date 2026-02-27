





import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  Divider,
  Grid,
  Button,
  Chip,
  Avatar,
  Stack,
  Skeleton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import axiosInstance from "../api/axiosInstance";
import DiamondIcon from "@mui/icons-material/Diamond";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import GroupIcon from "@mui/icons-material/Group";
import HotelIcon from "@mui/icons-material/Hotel";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import KingBedIcon from "@mui/icons-material/KingBed";
import NightstayIcon from "@mui/icons-material/Nightlight";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { SPACING, CONTAINER, COLORS, BUTTON } from "../theme/designSystem";

export default function SummaryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  // ⚠️ EXACT SAME useEffect - NO CHANGES
  useEffect(() => {
    if (!id) {
      alert("Invalid booking ID");
      return;
    }

    const fetchBooking = async () => {
      try {
        const res = await axiosInstance.get(`/bookings/${id}`);
      //  setBooking(res.data);
      setBooking(res.data.booking);
        setLoading(false);
      } catch (err) {
        console.error("Summary fetch error:", err.response?.data || err.message);
        alert(err.response?.data?.message || "Failed to load booking data");
        setLoading(false);
      }
    };
    fetchBooking();
  }, [id]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Loading skeleton
  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0a0a0a 0%, #111827 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 4,
          px: 2,
        }}
      >
        <Container maxWidth="md">
          <Paper
            sx={{
              p: SPACING.cardPadding,
              background: COLORS.backgroundElevated,
              backdropFilter: "blur(20px)",
              border: `1px solid ${COLORS.border}`,
              borderRadius: 2,
            }}
          >
            <Stack spacing={3}>
              <Skeleton variant="circular" width={80} height={80} sx={{ mx: "auto", bgcolor: "rgba(25,118,210,0.2)" }} />
              <Skeleton variant="text" height={60} sx={{ bgcolor: "rgba(25,118,210,0.2)" }} />
              <Skeleton variant="text" height={30} sx={{ bgcolor: "rgba(25,118,210,0.2)" }} />
              <Skeleton variant="rectangular" height={200} sx={{ bgcolor: "rgba(25,118,210,0.2)", borderRadius: 2 }} />
            </Stack>
          </Paper>
        </Container>
      </Box>
    );
  }

  if (!booking) return null;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${COLORS.background} 0%, #111827 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: SPACING.sectionY,
        px: SPACING.sectionX,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated background particles */}
      {[...Array(15)].map((_, i) => (
        <Box
          key={i}
          component={motion.div}
          animate={{
            y: [0, -40, 0],
            x: [0, 30, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20 + i,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.5,
          }}
          sx={{
            position: "absolute",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "radial-gradient(circle, #1976d2 0%, transparent 70%)",
            opacity: 0.1,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      ))}

      {/* Floating glow orb */}
      <Box
        component={motion.div}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        sx={{
          position: "absolute",
          top: "20%",
          right: "10%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(25,118,210,0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
          zIndex: 0,
        }}
      />

      <Container maxWidth={CONTAINER.form} sx={{ position: "relative", zIndex: 10 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={itemVariants}>
            <Box sx={{ textAlign: "center", mb: 4 }}>
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
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: "#1976d2",
                    mx: "auto",
                    mb: 2,
                    boxShadow: "0 0 30px rgba(25,118,210,0.5)",
                  }}
                >
                  <ReceiptIcon sx={{ fontSize: 40 }} />
                </Avatar>
              </motion.div>

              <Typography
                variant="h3"
                sx={{
                  color: "white",
                  fontWeight: 600,
                  mb: 1,
                  fontSize: { xs: "2rem", md: "2.5rem" },
                  textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                }}
              >
                Booking Invoice
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  mb: 1,
                }}
              >
                Reservation Summary
              </Typography>

              <Chip
                icon={<ConfirmationNumberIcon />}
                label={`Booking ID: ${id?.substring(0, 8)}...`}
                sx={{
                  mt: 1,
                  backgroundColor: "rgba(25,118,210,0.15)",
                  color: "#1976d2",
                  border: "1px solid rgba(25,118,210,0.3)",
                  "& .MuiChip-icon": {
                    color: "#1976d2",
                  },
                }}
              />
            </Box>
          </motion.div>

          {/* Main Invoice Card */}
          <motion.div variants={cardVariants}>
            <Paper
              elevation={24}
              sx={{
                p: SPACING.cardPadding,
                background: COLORS.backgroundElevated,
                backdropFilter: "blur(20px)",
                border: `1px solid ${COLORS.border}`,
                borderRadius: 2,
                boxShadow: `0 20px 40px rgba(0,0,0,0.4), 0 0 30px ${COLORS.border}`,
              }}
            >
              {/* Invoice Header */}
              <motion.div variants={itemVariants}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3, flexWrap: "wrap", gap: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <DiamondIcon sx={{ color: "#1976d2", fontSize: 28 }} />
                    <Typography variant="h6" sx={{ color: "white", fontWeight: 600 }}>
                      LUXURY STAY
                    </Typography>
                  </Box>
                  <Chip
                  //  label="CONFIRMED"
                  label={booking.status?.toUpperCase()}
                    icon={<CheckCircleIcon />}
                    sx={{
                      backgroundColor: "rgba(25,118,210,0.2)",
                      color: "#1976d2",
                      border: "1px solid #1976d2",
                      fontWeight: 600,
                    }}
                  />
                </Box>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Divider sx={{ borderColor: "rgba(25,118,210,0.2)", mb: 3 }} />
              </motion.div>

              {/* Guest Information */}
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h6"
                  sx={{
                    color: "white",
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <PersonIcon sx={{ color: "#1976d2" }} />
                  Guest Information
                </Typography>
              </motion.div>

              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6}>
                  <motion.div variants={itemVariants}>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>
                      Guest Name
                    </Typography>
                    <Typography variant="body1" sx={{ color: "white", fontWeight: 500 }}>
                      {booking.guestName}
                    </Typography>
                  </motion.div>
                </Grid>
                <Grid item xs={6}>
                  <motion.div variants={itemVariants}>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>
                      Phone Number
                    </Typography>
                    <Typography variant="body1" sx={{ color: "white", fontWeight: 500 }}>
                      {booking.phone}
                    </Typography>
                  </motion.div>
                </Grid>
                <Grid item xs={6}>
                  <motion.div variants={itemVariants}>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>
                      Total Guests
                    </Typography>
                    <Typography variant="body1" sx={{ color: "white", fontWeight: 500 }}>
                      {booking.totalGuests} {booking.totalGuests === 1 ? 'Guest' : 'Guests'}
                    </Typography>
                  </motion.div>
                </Grid>
                <Grid item xs={6}>
                  <motion.div variants={itemVariants}>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>
                      Nights
                    </Typography>
                    <Typography variant="body1" sx={{ color: "white", fontWeight: 500 }}>
                      {booking.nights || 1} {booking.nights === 1 ? 'Night' : 'Nights'}
                    </Typography>
                  </motion.div>
                </Grid>
              </Grid>

              <motion.div variants={itemVariants}>
                <Divider sx={{ borderColor: "rgba(25,118,210,0.2)", my: 3 }} />
              </motion.div>

              {/* Stay Details */}
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h6"
                  sx={{
                    color: "white",
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <HotelIcon sx={{ color: "#1976d2" }} />
                  Stay Details
                </Typography>
              </motion.div>

              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6}>
                  <motion.div variants={itemVariants}>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>
                      Room Type
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                      <KingBedIcon sx={{ color: "#1976d2", fontSize: 18 }} />
                      <Typography variant="body1" sx={{ color: "white", fontWeight: 500 }}>
                        {booking.roomType} {booking.roomsCount ? `(${booking.roomsCount} Room${booking.roomsCount > 1 ? 's' : ''})` : ''}
                      </Typography>
                    </Box>
                  </motion.div>
                </Grid>
                <Grid item xs={6}>
                  <motion.div variants={itemVariants}>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>
                      Food Package
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                      <RestaurantIcon sx={{ color: "#1976d2", fontSize: 18 }} />
                      <Typography variant="body1" sx={{ color: "white", fontWeight: 500 }}>
                        {booking.foodPackage === "NoFood" ? "No Food" : 
                         booking.foodPackage === "Breakfast" ? "Breakfast Only" :
                         booking.foodPackage === "HalfBoard" ? "Half Board" : "Full Board"}
                      </Typography>
                    </Box>
                  </motion.div>
                </Grid>
                <Grid item xs={6}>
                  <motion.div variants={itemVariants}>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>
                      Check-In Date
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                      <CalendarTodayIcon sx={{ color: "#1976d2", fontSize: 18 }} />
                      <Typography variant="body1" sx={{ color: "white", fontWeight: 500 }}>
                        {formatDate(booking.checkInDate)}
                      </Typography>
                    </Box>
                  </motion.div>
                </Grid>
                <Grid item xs={6}>
                  <motion.div variants={itemVariants}>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>
                      Check-Out Date
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                      <CalendarTodayIcon sx={{ color: "#1976d2", fontSize: 18 }} />
                      <Typography variant="body1" sx={{ color: "white", fontWeight: 500 }}>
                        {formatDate(booking.checkOutDate)}
                      </Typography>
                    </Box>
                  </motion.div>
                </Grid>
              </Grid>

              <motion.div variants={itemVariants}>
                <Divider sx={{ borderColor: "rgba(25,118,210,0.2)", my: 3 }} />
              </motion.div>

              {/* Price Breakdown */}
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h6"
                  sx={{
                    color: "white",
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <ReceiptIcon sx={{ color: "#1976d2" }} />
                  Price Breakdown
                </Typography>
              </motion.div>

              <Grid container spacing={2} sx={{ mb: 3 }}>
                {booking.roomCost && (
                  <>
                    <Grid item xs={8}>
                      <motion.div variants={itemVariants}>
                        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
                          Room Charges
                        </Typography>
                      </motion.div>
                    </Grid>
                    <Grid item xs={4}>
                      <motion.div variants={itemVariants}>
                        <Typography variant="body2" sx={{ color: "white", textAlign: "right" }}>
                          Rs {booking.roomCost.toLocaleString()}
                        </Typography>
                      </motion.div>
                    </Grid>
                  </>
                )}

                {booking.foodCost && booking.foodCost > 0 && (
                  <>
                    <Grid item xs={8}>
                      <motion.div variants={itemVariants}>
                        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
                          Food Package
                        </Typography>
                      </motion.div>
                    </Grid>
                    <Grid item xs={4}>
                      <motion.div variants={itemVariants}>
                        <Typography variant="body2" sx={{ color: "white", textAlign: "right" }}>
                          Rs {booking.foodCost.toLocaleString()}
                        </Typography>
                      </motion.div>
                    </Grid>
                  </>
                )}
              </Grid>

              <motion.div variants={itemVariants}>
                <Divider sx={{ borderColor: "rgba(25,118,210,0.2)", my: 2 }} />
              </motion.div>

              {/* Total Amount */}
              <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Box
                  sx={{
                    p: 3,
                    background: "linear-gradient(135deg, rgba(25,118,210,0.15) 0%, rgba(13,71,161,0.1) 100%)",
                    borderRadius: 3,
                    border: "1px solid rgba(25,118,210,0.3)",
                    mb: 3,
                    boxShadow: "0 0 30px rgba(25,118,210,0.2)",
                  }}
                >
                  <Grid container alignItems="center">
                    <Grid item xs={6}>
                      <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }}>
                        Total Amount
                      </Typography>
                      <Typography variant="h3" sx={{ color: "#1976d2", fontWeight: 700, fontSize: { xs: "1.8rem", md: "2.2rem" } }}>
                        Rs {booking.totalAmount?.toLocaleString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)", display: "block", textAlign: "right" }}>
                        All taxes included
                      </Typography>
                      <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)", display: "block", textAlign: "right" }}>
                        Best rate guaranteed
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </motion.div>

              {/* Checkout Button */}
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={() => navigate(`/payment/${booking._id}`)}
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    background: "linear-gradient(135deg, #0d47a1 30%, #1976d2 90%)",
                    color: "white",
                    fontSize: "1.1rem",
                    py: 1.8,
                    borderRadius: 3,
                    boxShadow: "0 8px 20px rgba(25,118,210,0.3)",
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: "-100%",
                      width: "100%",
                      height: "100%",
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                      transition: "left 0.5s ease",
                    },
                    "&:hover::before": {
                      left: "100%",
                    },
                    "&:hover": {
                      background: "linear-gradient(135deg, #1565c0 30%, #1e88e5 90%)",
                      boxShadow: "0 12px 30px rgba(25,118,210,0.6)",
                    },
                  }}
                >
                  Proceed to Checkout
                </Button>
              </motion.div>

              {/* Footer Note */}
              <motion.div variants={itemVariants}>
                <Typography
                  variant="caption"
                  align="center"
                  sx={{
                    display: "block",
                    color: "rgba(255,255,255,0.3)",
                    mt: 3,
                  }}
                >
                  This is a summary of your booking. Please review before proceeding to payment.
                </Typography>
              </motion.div>
            </Paper>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
}
