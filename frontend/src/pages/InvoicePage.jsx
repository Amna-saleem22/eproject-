







import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  Divider,
  Chip,
  Avatar,
  Button,
  Stack,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Alert,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import axiosInstance from "../api/axiosInstance";
import jsPDF from "jspdf";
import ReceiptIcon from "@mui/icons-material/Receipt";
import DiamondIcon from "@mui/icons-material/Diamond";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import GroupIcon from "@mui/icons-material/Group";
import HotelIcon from "@mui/icons-material/Hotel";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import NightstayIcon from "@mui/icons-material/Nightlight";
import PaymentIcon from "@mui/icons-material/Payment";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import MoneyIcon from "@mui/icons-material/Money";
import EmailIcon from "@mui/icons-material/Email";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DownloadIcon from "@mui/icons-material/Download";
import KingBedIcon from "@mui/icons-material/KingBed";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import VerifiedIcon from "@mui/icons-material/Verified";
import { SPACING, CONTAINER, COLORS } from "../theme/designSystem";

export default function InvoicePage() {
  const { id } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  // ⚠️ EXACT SAME state structure - NO CHANGES
  const [booking, setBooking] = useState(null);
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ⚠️ EXACT SAME useEffect - NO CHANGES
  useEffect(() => {
    if (!id) {
      setError("Invalid booking ID");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        // Backend returns booking object directly
      const bookingRes = await axiosInstance.get(`/bookings/${id}`);
setBooking(bookingRes.data.booking);   // 👈 FIXED

const paymentRes = await axiosInstance.get(`/payments/booking/${id}`);
setPayment(paymentRes.data.payment);   // 👈 FIXED

        setLoading(false);
      } catch (err) {
        console.error("Invoice fetch error:", err.response?.data || err.message);
        const msg = err.response?.data?.message || err.response?.status === 404
          ? "Payment not found. Complete payment first."
          : "Failed to load invoice data.";
        setError(msg);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // ⚠️ EXACT SAME maskedCard logic
  const maskedCard = payment?.cardNumber ? payment.cardNumber.replace(/\d(?=\d{4})/g, "*") : "N/A";

  // ⚠️ EXACT SAME downloadPDF function - NO CHANGES
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("🧾 Hotel Booking Invoice", 20, 20);

    doc.setFontSize(12);
    doc.text(`Booking ID: ${booking._id}`, 20, 40);
    doc.text(`Guest Name: ${booking.guestName}`, 20, 50);
    doc.text(`Phone: ${booking.phone}`, 20, 60);
    doc.text(`Total Guests: ${booking.totalGuests}`, 20, 70);
    doc.text(`Room Type: ${booking.roomType}`, 20, 80);
    doc.text(`Food Package: ${booking.foodPackage}`, 20, 90);
    doc.text(`Check-In: ${booking.checkInDate}`, 20, 100);
    doc.text(`Check-Out: ${booking.checkOutDate}`, 20, 110);
    doc.text(`Nights: ${booking.nights}`, 20, 120);
    doc.text(`Room Cost: Rs ${booking.roomCost}`, 20, 130);
    doc.text(`Food Cost: Rs ${booking.foodCost}`, 20, 140);
    doc.text(`Total Amount: Rs ${booking.totalAmount}`, 20, 150);

    doc.text(`Payment Method: ${payment.method}`, 20, 160);
    doc.text(`Payment Status: ${payment.paymentStatus}`, 20, 170);

    if (payment.method === "Online") {
      doc.text(`Paid By: ${payment.nameOnCard}`, 20, 180);
      doc.text(`Email: ${payment.email}`, 20, 190);
      doc.text(`Card Number: ${maskedCard}`, 20, 200);
      doc.text(`Expiry: ${payment.expiry}`, 20, 210);
    }

    doc.save(`Invoice-${booking._id}.pdf`);
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

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

  // Loading state
  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0a0a0a 0%, #111827 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <DiamondIcon sx={{ fontSize: 60, color: "#1976d2" }} />
        </motion.div>
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0a0a0a 0%, #111827 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Alert
          severity="error"
          sx={{
            maxWidth: 400,
            backgroundColor: "rgba(211,47,47,0.1)",
            color: "#ff5252",
            border: "1px solid rgba(211,47,47,0.3)",
          }}
        >
          {error}
        </Alert>
      </Box>
    );
  }

  // Missing data state
  if (!booking || !payment) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0a0a0a 0%, #111827 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Typography sx={{ color: "white" }}>Missing data.</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${COLORS.background} 0%, #111827 100%)`,
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

      <Container maxWidth={CONTAINER.content} sx={{ position: "relative", zIndex: 10 }}>
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
                Hotel Booking Invoice
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  mb: 2,
                }}
              >
                Reservation Summary
              </Typography>

              <Chip
                icon={<ConfirmationNumberIcon />}
                label={`Invoice #: ${id?.substring(0, 8).toUpperCase()}`}
                sx={{
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
                    <DiamondIcon sx={{ color: "#1976d2", fontSize: 32 }} />
                    <Typography variant="h5" sx={{ color: "white", fontWeight: 600 }}>
                      LUXURY STAY
                    </Typography>
                  </Box>
                  <Chip
                    label={payment.paymentStatus === "Completed" ? "PAID" : payment.paymentStatus}
                    icon={payment.paymentStatus === "Completed" ? <CheckCircleIcon /> : null}
                    sx={{
                      backgroundColor: payment.paymentStatus === "Completed" 
                        ? "rgba(0,230,118,0.15)" 
                        : "rgba(255,152,0,0.15)",
                      color: payment.paymentStatus === "Completed" ? "#00e676" : "#ff9800",
                      border: `1px solid ${
                        payment.paymentStatus === "Completed" ? "#00e676" : "#ff9800"
                      }`,
                      fontWeight: 600,
                    }}
                  />
                </Box>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Divider sx={{ borderColor: "rgba(25,118,210,0.2)", mb: 4 }} />
              </motion.div>

              {/* Booking Details Section */}
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h6"
                  sx={{
                    color: "white",
                    mb: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <HotelIcon sx={{ color: "#1976d2" }} />
                  Booking Details
                </Typography>
              </motion.div>

              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6}>
                  <motion.div variants={itemVariants}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                      <PersonIcon sx={{ color: "#1976d2", fontSize: 20 }} />
                      <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", minWidth: 100 }}>
                        Guest Name
                      </Typography>
                      <Typography variant="body1" sx={{ color: "white", fontWeight: 500 }}>
                        {booking.guestName}
                      </Typography>
                    </Box>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                      <PhoneIcon sx={{ color: "#1976d2", fontSize: 20 }} />
                      <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", minWidth: 100 }}>
                        Phone
                      </Typography>
                      <Typography variant="body1" sx={{ color: "white", fontWeight: 500 }}>
                        {booking.phone}
                      </Typography>
                    </Box>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                      <GroupIcon sx={{ color: "#1976d2", fontSize: 20 }} />
                      <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", minWidth: 100 }}>
                        Total Guests
                      </Typography>
                      <Typography variant="body1" sx={{ color: "white", fontWeight: 500 }}>
                        {booking.totalGuests}
                      </Typography>
                    </Box>
                  </motion.div>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <motion.div variants={itemVariants}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                      <KingBedIcon sx={{ color: "#1976d2", fontSize: 20 }} />
                      <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", minWidth: 100 }}>
                        Room Type
                      </Typography>
                      <Typography variant="body1" sx={{ color: "white", fontWeight: 500 }}>
                        {booking.roomType}
                      </Typography>
                    </Box>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                      <RestaurantIcon sx={{ color: "#1976d2", fontSize: 20 }} />
                      <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", minWidth: 100 }}>
                        Food Package
                      </Typography>
                      <Typography variant="body1" sx={{ color: "white", fontWeight: 500 }}>
                        {booking.foodPackage === "NoFood" ? "No Food" : 
                         booking.foodPackage === "Breakfast" ? "Breakfast Only" :
                         booking.foodPackage === "HalfBoard" ? "Half Board" : "Full Board"}
                      </Typography>
                    </Box>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                      <NightstayIcon sx={{ color: "#1976d2", fontSize: 20 }} />
                      <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", minWidth: 100 }}>
                        Nights
                      </Typography>
                      <Typography variant="body1" sx={{ color: "white", fontWeight: 500 }}>
                        {booking.nights} {booking.nights === 1 ? 'Night' : 'Nights'}
                      </Typography>
                    </Box>
                  </motion.div>
                </Grid>
              </Grid>

              {/* Dates Section */}
              <motion.div variants={itemVariants}>
                <Grid container spacing={2} sx={{ mb: 4 }}>
                  <Grid item xs={12} sm={4}>
                    <Paper
                      sx={{
                        p: 2,
                        background: "rgba(25,118,210,0.1)",
                        border: "1px solid rgba(25,118,210,0.2)",
                        borderRadius: 2,
                        textAlign: "center",
                      }}
                    >
                      <CalendarTodayIcon sx={{ color: "#1976d2", mb: 1 }} />
                      <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)", display: "block" }}>
                        Check-In
                      </Typography>
                      <Typography variant="body2" sx={{ color: "white", fontWeight: 500 }}>
                        {formatDate(booking.checkInDate)}
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Paper
                      sx={{
                        p: 2,
                        background: "rgba(25,118,210,0.1)",
                        border: "1px solid rgba(25,118,210,0.2)",
                        borderRadius: 2,
                        textAlign: "center",
                      }}
                    >
                      <CalendarTodayIcon sx={{ color: "#1976d2", mb: 1 }} />
                      <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)", display: "block" }}>
                        Check-Out
                      </Typography>
                      <Typography variant="body2" sx={{ color: "white", fontWeight: 500 }}>
                        {formatDate(booking.checkOutDate)}
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Paper
                      sx={{
                        p: 2,
                        background: "rgba(25,118,210,0.1)",
                        border: "1px solid rgba(25,118,210,0.2)",
                        borderRadius: 2,
                        textAlign: "center",
                      }}
                    >
                      <NightstayIcon sx={{ color: "#1976d2", mb: 1 }} />
                      <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)", display: "block" }}>
                        Duration
                      </Typography>
                      <Typography variant="body2" sx={{ color: "white", fontWeight: 500 }}>
                        {booking.nights} {booking.nights === 1 ? 'Night' : 'Nights'}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Divider sx={{ borderColor: "rgba(25,118,210,0.2)", my: 3 }} />
              </motion.div>

              {/* Payment Details Section */}
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h6"
                  sx={{
                    color: "white",
                    mb: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <PaymentIcon sx={{ color: "#1976d2" }} />
                  Payment Details
                </Typography>
              </motion.div>

              {/* Payment Summary Table */}
              <motion.div variants={itemVariants}>
                <Table sx={{ mb: 4 }}>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ borderColor: "rgba(25,118,210,0.2)", color: "rgba(255,255,255,0.5)" }}>
                        Room Cost
                      </TableCell>
                      <TableCell sx={{ borderColor: "rgba(25,118,210,0.2)", color: "white", textAlign: "right" }}>
                 Rs {(booking.roomCost || 0).toLocaleString()}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ borderColor: "rgba(25,118,210,0.2)", color: "rgba(255,255,255,0.5)" }}>
                        Food Cost
                      </TableCell>
                      <TableCell sx={{ borderColor: "rgba(25,118,210,0.2)", color: "white", textAlign: "right" }}>
                        Rs {(booking.foodCost || 0).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
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
                    background: "linear-gradient(135deg, rgba(0,230,118,0.15) 0%, rgba(0,200,100,0.1) 100%)",
                    borderRadius: 3,
                    border: "1px solid rgba(0,230,118,0.3)",
                    mb: 4,
                    textAlign: "center",
                    boxShadow: "0 0 30px rgba(0,230,118,0.2)",
                  }}
                >
                  <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)", mb: 1 }}>
                    Total Amount
                  </Typography>
                  <Typography variant="h3" sx={{ color: "#00e676", fontWeight: 700 }}>
                 Rs {(booking.totalAmount || 0).toLocaleString()}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.3)", display: "block", mt: 1 }}>
                    All taxes included
                  </Typography>
                </Box>
              </motion.div>

              {/* Payment Method Details */}
              <motion.div variants={itemVariants}>
                <Grid container spacing={2} sx={{ mb: 4 }}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                      {payment.method === "Online" ? (
                        <CreditCardIcon sx={{ color: "#1976d2" }} />
                      ) : (
                        <MoneyIcon sx={{ color: "#1976d2" }} />
                      )}
                      <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", minWidth: 100 }}>
                        Method
                      </Typography>
                      <Typography variant="body1" sx={{ color: "white", fontWeight: 500 }}>
                        {payment.method} Payment
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                      <VerifiedIcon sx={{ color: "#1976d2" }} />
                      <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", minWidth: 100 }}>
                        Status
                      </Typography>
                      <Chip
                        label={payment.paymentStatus}
                        size="small"
                        sx={{
                          backgroundColor: payment.paymentStatus === "Completed" 
                            ? "rgba(0,230,118,0.15)" 
                            : "rgba(255,152,0,0.15)",
                          color: payment.paymentStatus === "Completed" ? "#00e676" : "#ff9800",
                          border: `1px solid ${
                            payment.paymentStatus === "Completed" ? "#00e676" : "#ff9800"
                          }`,
                        }}
                      />
                    </Box>
                  </Grid>

                  {payment.method === "Online" && (
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                        <PersonIcon sx={{ color: "#1976d2" }} />
                        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", minWidth: 100 }}>
                          Paid By
                        </Typography>
                        <Typography variant="body1" sx={{ color: "white", fontWeight: 500 }}>
                          {payment.nameOnCard}
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                        <EmailIcon sx={{ color: "#1976d2" }} />
                        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", minWidth: 100 }}>
                          Email
                        </Typography>
                        <Typography variant="body1" sx={{ color: "white", fontWeight: 500 }}>
                          {payment.email}
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                        <CreditCardIcon sx={{ color: "#1976d2" }} />
                        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", minWidth: 100 }}>
                          Card
                        </Typography>
                        <Typography variant="body1" sx={{ color: "white", fontWeight: 500 }}>
                          {maskedCard} | Exp: {payment.expiry}
                        </Typography>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Divider sx={{ borderColor: "rgba(25,118,210,0.2)", my: 3 }} />
              </motion.div>

              {/* Download Button */}
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={downloadPDF}
                  endIcon={<DownloadIcon />}
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
                  Download Invoice PDF
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
                  This is a system generated invoice. No signature required.
                </Typography>
              </motion.div>
            </Paper>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
}