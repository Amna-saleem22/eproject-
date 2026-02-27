



import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Grid,
  Divider,
  Chip,
  Avatar,
  Alert,
  CircularProgress,
  Stack,
  InputAdornment,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "../api/axiosInstance";
import LockIcon from "@mui/icons-material/Lock";
import PaymentIcon from "@mui/icons-material/Payment";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import MoneyIcon from "@mui/icons-material/Money";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import CreditCardOffIcon from "@mui/icons-material/CreditCardOff";
import VerifiedIcon from "@mui/icons-material/Verified";
import SecurityIcon from "@mui/icons-material/Security";
import DiamondIcon from "@mui/icons-material/Diamond";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { SPACING, CONTAINER, COLORS, BUTTON } from "../theme/designSystem";

export default function PaymentPage() {
  const { id } = useParams(); // bookingId from URL
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // ⚠️ EXACT SAME state structure - NO CHANGES
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  const [method, setMethod] = useState("Online"); // Online or Cash
  const [cardData, setCardData] = useState({
    customerName: "",
    email: "",
    nameOnCard: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  // ------------------------
  // ⚠️ EXACT SAME useEffect - Fetch booking details
  useEffect(() => {
    if (!id) return; // prevent fetch if id is undefined
    const fetchBooking = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/bookings/${id}`);
        setBooking(res.data.booking); // backend returns { success: true, booking }
        setLoading(false);
      } catch (err) {
        console.error("Booking fetch error:", err.response?.data || err.message);
        setApiError("Failed to load booking details.");
        setLoading(false);
      }
    };
    fetchBooking();
  }, [id]);

  // ------------------------
  // ⚠️ EXACT SAME form input handler
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "cardNumber") {
      let val = value.replace(/\D/g, "");
      val = val.match(/.{1,4}/g)?.join("-") || "";
      setCardData({ ...cardData, [name]: val });
      return;
    }

    if (name === "expiry") {
      let val = value.replace(/\D/g, "");
      if (val.length > 2) val = val.slice(0, 2) + (val.length > 2 ? "/" + val.slice(2, 4) : "");
      setCardData({ ...cardData, [name]: val });
      return;
    }

    setCardData({ ...cardData, [name]: value });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  // ------------------------
  // ⚠️ EXACT SAME validateForm function
  const validateForm = () => {
    if (method === "Cash") return true; // No card validation for cash

    let newErrors = {};
    if (!/^[A-Za-z\s]+$/.test(cardData.customerName)) newErrors.customerName = "Name must contain only letters.";
    if (!/^\S+@\S+\.\S+$/.test(cardData.email)) newErrors.email = "Enter a valid email address.";
    if (!/^[A-Za-z\s]+$/.test(cardData.nameOnCard)) newErrors.nameOnCard = "Card name must contain only letters.";

    const cardDigits = cardData.cardNumber.replace(/\D/g, "");
    if (!/^\d{16}$/.test(cardDigits)) newErrors.cardNumber = "Card number must be 16 digits.";
    if (!/^\d{3}$/.test(cardData.cvv)) newErrors.cvv = "CVV must be 3 digits.";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardData.expiry)) newErrors.expiry = "Expiry must be in MM/YY format.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ------------------------
  // ⚠️ EXACT SAME payNow function - NO CHANGES
  const payNow = async () => {
    if (!validateForm()) return;

    try {
      setIsProcessing(true);
      setLoading(true);

      await axiosInstance.post("/payments/pay", {
        bookingId: id,
        method,
        customerName: cardData.customerName,
        email: cardData.email,
        nameOnCard: cardData.nameOnCard,
        cardNumber: cardData.cardNumber,
        expiry: cardData.expiry,
      });

      setLoading(false);
      setIsProcessing(false);

      navigate(`/invoice/${id}`);
    } catch (err) {
      console.error("Payment error:", err.response?.data || err.message);
      setApiError(err.response?.data?.message || "Payment failed. Please check your details.");
      setLoading(false);
      setIsProcessing(false);
    }
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
  if (loading && !booking) {
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

  // ⚠️ EXACT SAME error handling
  if (apiError) {
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
          {apiError}
        </Alert>
      </Box>
    );
  }

  // ⚠️ EXACT SAME booking check
  if (!booking) {
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
        <Typography sx={{ color: "white" }}>No booking found.</Typography>
      </Box>
    );
  }

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

      {/* Floating security orb */}
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
          top: "10%",
          right: "5%",
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
                  <LockIcon sx={{ fontSize: 40 }} />
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
                Secure Payment
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                Complete your reservation
              </Typography>
            </Box>
          </motion.div>

          {/* Main Payment Card */}
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
              {/* Amount Display */}
              <motion.div variants={itemVariants}>
                <Box
                  sx={{
                    p: 3,
                    mb: 3,
                    background: "linear-gradient(135deg, rgba(25,118,210,0.15) 0%, rgba(13,71,161,0.1) 100%)",
                    borderRadius: 3,
                    border: "1px solid rgba(25,118,210,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 2,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <ReceiptIcon sx={{ color: "#1976d2" }} />
                    <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.7)" }}>
                      Total Amount:
                    </Typography>
                  </Box>
                  <Typography variant="h4" sx={{ color: "#1976d2", fontWeight: 700 }}>
                    Rs {booking.totalAmount?.toLocaleString()}
                  </Typography>
                </Box>
              </motion.div>

              {/* Payment Method Selector */}
              <motion.div variants={itemVariants}>
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel sx={{ color: "rgba(255,255,255,0.7)" }}>
                    Payment Method
                  </InputLabel>
                  <Select
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                    label="Payment Method"
                    sx={{
                      color: "white",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(25,118,210,0.3)",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#1976d2",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#1976d2",
                        borderWidth: 2,
                      },
                      "& .MuiSvgIcon-root": {
                        color: "white",
                      },
                    }}
                  >
                    <MenuItem value="Online">
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <CreditCardIcon sx={{ color: "#1976d2" }} />
                        <span>Online Payment</span>
                      </Stack>
                    </MenuItem>
                    <MenuItem value="Cash">
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <MoneyIcon sx={{ color: "#1976d2" }} />
                        <span>Cash Payment</span>
                      </Stack>
                    </MenuItem>
                  </Select>
                </FormControl>
              </motion.div>

              <AnimatePresence mode="wait">
                {method === "Online" ? (
                  <motion.div
                    key="online"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Customer Information */}
                    <motion.div variants={itemVariants}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: "rgba(255,255,255,0.5)",
                          mb: 2,
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <PersonIcon sx={{ color: "#1976d2", fontSize: 20 }} />
                        Customer Information
                      </Typography>
                    </motion.div>

                    <Grid container spacing={2} sx={{ mb: 3 }}>
                      <Grid item xs={12} sm={6}>
                        <motion.div variants={itemVariants}>
                          <TextField
                            fullWidth
                            name="customerName"
                            label="Full Name"
                            value={cardData.customerName}
                            onChange={handleChange}
                            onBlur={() => handleBlur("customerName")}
                            error={touched.customerName && !!errors.customerName}
                            helperText={touched.customerName && errors.customerName}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <PersonIcon sx={{ color: "#1976d2" }} />
                                </InputAdornment>
                              ),
                            }}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                color: "white",
                                "& fieldset": {
                                  borderColor: "rgba(25,118,210,0.3)",
                                },
                                "&:hover fieldset": {
                                  borderColor: "#1976d2",
                                },
                                "&.Mui-focused fieldset": {
                                  borderColor: "#1976d2",
                                  borderWidth: 2,
                                  boxShadow: "0 0 10px rgba(25,118,210,0.3)",
                                },
                              },
                              "& .MuiInputLabel-root": {
                                color: "rgba(255,255,255,0.7)",
                                "&.Mui-focused": {
                                  color: "#1976d2",
                                },
                              },
                              "& .MuiFormHelperText-root": {
                                color: "#f44336",
                              },
                            }}
                          />
                        </motion.div>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <motion.div variants={itemVariants}>
                          <TextField
                            fullWidth
                            name="email"
                            label="Email Address"
                            type="email"
                            value={cardData.email}
                            onChange={handleChange}
                            onBlur={() => handleBlur("email")}
                            error={touched.email && !!errors.email}
                            helperText={touched.email && errors.email}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <EmailIcon sx={{ color: "#1976d2" }} />
                                </InputAdornment>
                              ),
                            }}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                color: "white",
                                "& fieldset": {
                                  borderColor: "rgba(25,118,210,0.3)",
                                },
                                "&:hover fieldset": {
                                  borderColor: "#1976d2",
                                },
                                "&.Mui-focused fieldset": {
                                  borderColor: "#1976d2",
                                  borderWidth: 2,
                                },
                              },
                              "& .MuiInputLabel-root": {
                                color: "rgba(255,255,255,0.7)",
                                "&.Mui-focused": {
                                  color: "#1976d2",
                                },
                              },
                            }}
                          />
                        </motion.div>
                      </Grid>
                    </Grid>

                    <motion.div variants={itemVariants}>
                      <Divider sx={{ borderColor: "rgba(25,118,210,0.2)", my: 3 }} />
                    </motion.div>

                    {/* Card Details */}
                    <motion.div variants={itemVariants}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: "rgba(255,255,255,0.5)",
                          mb: 2,
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <CreditCardIcon sx={{ color: "#1976d2", fontSize: 20 }} />
                        Card Details
                      </Typography>
                    </motion.div>

                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <motion.div variants={itemVariants}>
                          <TextField
                            fullWidth
                            name="nameOnCard"
                            label="Name on Card"
                            value={cardData.nameOnCard}
                            onChange={handleChange}
                            onBlur={() => handleBlur("nameOnCard")}
                            error={touched.nameOnCard && !!errors.nameOnCard}
                            helperText={touched.nameOnCard && errors.nameOnCard}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <PersonIcon sx={{ color: "#1976d2" }} />
                                </InputAdornment>
                              ),
                            }}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                color: "white",
                                "& fieldset": {
                                  borderColor: "rgba(25,118,210,0.3)",
                                },
                                "&:hover fieldset": {
                                  borderColor: "#1976d2",
                                },
                                "&.Mui-focused fieldset": {
                                  borderColor: "#1976d2",
                                  borderWidth: 2,
                                },
                              },
                              "& .MuiInputLabel-root": {
                                color: "rgba(255,255,255,0.7)",
                                "&.Mui-focused": {
                                  color: "#1976d2",
                                },
                              },
                            }}
                          />
                        </motion.div>
                      </Grid>

                      <Grid item xs={12}>
                        <motion.div variants={itemVariants}>
                          <TextField
                            fullWidth
                            name="cardNumber"
                            label="Card Number"
                            value={cardData.cardNumber}
                            onChange={handleChange}
                            onBlur={() => handleBlur("cardNumber")}
                            error={touched.cardNumber && !!errors.cardNumber}
                            helperText={touched.cardNumber && errors.cardNumber}
                            placeholder="1234-5678-9012-3456"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <CreditCardIcon sx={{ color: "#1976d2" }} />
                                </InputAdornment>
                              ),
                            }}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                color: "white",
                                "& fieldset": {
                                  borderColor: "rgba(25,118,210,0.3)",
                                },
                                "&:hover fieldset": {
                                  borderColor: "#1976d2",
                                },
                                "&.Mui-focused fieldset": {
                                  borderColor: "#1976d2",
                                  borderWidth: 2,
                                },
                              },
                              "& .MuiInputLabel-root": {
                                color: "rgba(255,255,255,0.7)",
                                "&.Mui-focused": {
                                  color: "#1976d2",
                                },
                              },
                            }}
                          />
                        </motion.div>
                      </Grid>

                      <Grid item xs={6}>
                        <motion.div variants={itemVariants}>
                          <TextField
                            fullWidth
                            name="expiry"
                            label="Expiry (MM/YY)"
                            value={cardData.expiry}
                            onChange={handleChange}
                            onBlur={() => handleBlur("expiry")}
                            error={touched.expiry && !!errors.expiry}
                            helperText={touched.expiry && errors.expiry}
                            placeholder="MM/YY"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <CreditCardOffIcon sx={{ color: "#1976d2", fontSize: 18 }} />
                                </InputAdornment>
                              ),
                            }}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                color: "white",
                                "& fieldset": {
                                  borderColor: "rgba(25,118,210,0.3)",
                                },
                                "&:hover fieldset": {
                                  borderColor: "#1976d2",
                                },
                                "&.Mui-focused fieldset": {
                                  borderColor: "#1976d2",
                                  borderWidth: 2,
                                },
                              },
                              "& .MuiInputLabel-root": {
                                color: "rgba(255,255,255,0.7)",
                                "&.Mui-focused": {
                                  color: "#1976d2",
                                },
                              },
                            }}
                          />
                        </motion.div>
                      </Grid>

                      <Grid item xs={6}>
                        <motion.div variants={itemVariants}>
                          <TextField
                            fullWidth
                            name="cvv"
                            label="CVV"
                            type="password"
                            value={cardData.cvv}
                            onChange={handleChange}
                            onBlur={() => handleBlur("cvv")}
                            error={touched.cvv && !!errors.cvv}
                            helperText={touched.cvv && errors.cvv}
                            placeholder="123"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <SecurityIcon sx={{ color: "#1976d2", fontSize: 18 }} />
                                </InputAdornment>
                              ),
                            }}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                color: "white",
                                "& fieldset": {
                                  borderColor: "rgba(25,118,210,0.3)",
                                },
                                "&:hover fieldset": {
                                  borderColor: "#1976d2",
                                },
                                "&.Mui-focused fieldset": {
                                  borderColor: "#1976d2",
                                  borderWidth: 2,
                                },
                              },
                              "& .MuiInputLabel-root": {
                                color: "rgba(255,255,255,0.7)",
                                "&.Mui-focused": {
                                  color: "#1976d2",
                                },
                              },
                            }}
                          />
                        </motion.div>
                      </Grid>
                    </Grid>

                    {/* Security Badge */}
                    <motion.div variants={itemVariants}>
                      <Box
                        sx={{
                          mt: 3,
                          p: 2,
                          backgroundColor: "rgba(25,118,210,0.05)",
                          borderRadius: 2,
                          border: "1px dashed rgba(25,118,210,0.3)",
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          flexWrap: "wrap",
                        }}
                      >
                        <VerifiedIcon sx={{ color: "#1976d2" }} />
                        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)" }}>
                          Your payment information is encrypted and secure
                        </Typography>
                      </Box>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="cash"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Box
                      sx={{
                        p: 4,
                        textAlign: "center",
                        backgroundColor: "rgba(25,118,210,0.05)",
                        borderRadius: 3,
                        border: "1px dashed rgba(25,118,210,0.3)",
                        mb: 3,
                      }}
                    >
                      <MoneyIcon sx={{ fontSize: 60, color: "#1976d2", mb: 2 }} />
                      <Typography variant="h6" sx={{ color: "white", mb: 1 }}>
                        Cash Payment Selected
                      </Typography>
                      <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }}>
                        You can pay in cash at the hotel reception upon arrival.
                      </Typography>
                    </Box>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Pay Button */}
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={payNow}
                  disabled={isProcessing}
                  endIcon={isProcessing ? null : <ArrowForwardIcon />}
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
                    "&.Mui-disabled": {
                      background: "rgba(25,118,210,0.3)",
                    },
                  }}
                >
                  {isProcessing ? (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CircularProgress size={20} sx={{ color: "white" }} />
                      <Typography>Processing Payment...</Typography>
                    </Box>
                  ) : (
                    `Pay Rs ${booking.totalAmount?.toLocaleString()}`
                  )}
                </Button>
              </motion.div>

              {/* Terms */}
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
                  By completing this payment, you agree to our cancellation policy and terms of service.
                </Typography>
              </motion.div>
            </Paper>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
}