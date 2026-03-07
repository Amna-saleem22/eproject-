// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   Box,
//   Paper,
//   Typography,
//   Button,
//   TextField,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
// } from "@mui/material";
// import axiosInstance from "../api/axiosInstance";

// export default function PaymentPage() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [booking, setBooking] = useState(null);
//   const [method, setMethod] = useState("Cash");
//   const [customerName, setCustomerName] = useState("");
//   const [email, setEmail] = useState("");
//   const [nameOnCard, setNameOnCard] = useState("");
//   const [cardNumber, setCardNumber] = useState("");
//   const [expiry, setExpiry] = useState("");
//   const [cvv, setCvv] = useState("");
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchBooking = async () => {
//       try {
//         const res = await axiosInstance.get(`/bookings/${id}`);
//         setBooking(res.data.booking);

//         // Prefill customer info if available
//         if (res.data.booking.guestName) setCustomerName(res.data.booking.guestName);
//         if (res.data.booking.user?.email) setEmail(res.data.booking.user.email);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to fetch booking data");
//       }
//     };
//     fetchBooking();
//   }, [id]);

//   // ✅ Realistic validation functions
//   const isValidEmail = (email) =>
//     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//   const isValidCardNumber = (num) =>
//     /^\d{16}$/.test(num.replace(/\s+/g, "")); // 16 digits

//   const isValidExpiry = (exp) =>
//     /^(0[1-9]|1[0-2])\/\d{2}$/.test(exp);

//   const isValidCvv = (cvv) =>
//     /^\d{3,4}$/.test(cvv);

//   const payNow = async () => {
//     setError("");

//     // Guest info validation
//     if (!customerName || !email) {
//       setError("Customer name and email are required");
//       return;
//     }
//     if (!isValidEmail(email)) {
//       setError("Invalid email format");
//       return;
//     }

//     // Card info validation for online payments
//     if (method === "Online") {
//       if (!nameOnCard || !cardNumber || !expiry || !cvv) {
//         setError("Complete card details are required for online payment");
//         return;
//       }
//       if (!isValidCardNumber(cardNumber)) {
//         setError("Invalid card number. Must be 16 digits");
//         return;
//       }
//       if (!isValidExpiry(expiry)) {
//         setError("Invalid expiry date. Use MM/YY format");
//         return;
//       }
//       if (!isValidCvv(cvv)) {
//         setError("Invalid CVV. Must be 3 or 4 digits");
//         return;
//       }
//     }

//     try {
//       await axiosInstance.post("/payments/pay", {
//         bookingId: id,
//         method,
//         customerName,
//         email,
//         nameOnCard: method === "Online" ? nameOnCard : "",
//         cardNumber: method === "Online" ? cardNumber : "",
//         expiry: method === "Online" ? expiry : "",
//         cvv: method === "Online" ? cvv : "",
//       });

//       navigate(`/invoice/${id}`);
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.message || "Payment failed");
//     }
//   };

//   if (!booking) return <Typography>Loading booking...</Typography>;

//   return (
//     <Box p={3} display="flex" justifyContent="center">
//       <Paper sx={{ p: 4, width: 400 }}>
//         <Typography variant="h5" mb={2}>
//           Payment
//         </Typography>

//         {error && <Typography color="error" mb={2}>{error}</Typography>}

//         <TextField
//           label="Customer Name"
//           value={customerName}
//           onChange={(e) => setCustomerName(e.target.value)}
//           fullWidth
//           sx={{ mb: 2 }}
//         />

//         <TextField
//           label="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           fullWidth
//           sx={{ mb: 2 }}
//         />

//         <FormControl fullWidth sx={{ mb: 2 }}>
//           <InputLabel>Payment Method</InputLabel>
//           <Select value={method} onChange={(e) => setMethod(e.target.value)}>
//             <MenuItem value="Cash">Cash</MenuItem>
//             <MenuItem value="Online">Online</MenuItem>
//           </Select>
//         </FormControl>

//         {method === "Online" && (
//           <>
//             <TextField
//               label="Name on Card"
//               value={nameOnCard}
//               onChange={(e) => setNameOnCard(e.target.value)}
//               fullWidth
//               sx={{ mb: 2 }}
//             />
//             <TextField
//               label="Card Number"
//               value={cardNumber}
//               onChange={(e) => setCardNumber(e.target.value)}
//               fullWidth
//               sx={{ mb: 2 }}
//               placeholder="1234 5678 9012 3456"
//             />
//             <TextField
//               label="Expiry (MM/YY)"
//               value={expiry}
//               onChange={(e) => setExpiry(e.target.value)}
//               fullWidth
//               sx={{ mb: 2 }}
//               placeholder="MM/YY"
//             />
//             <TextField
//               label="CVV"
//               value={cvv}
//               onChange={(e) => setCvv(e.target.value)}
//               fullWidth
//               sx={{ mb: 2 }}
//               placeholder="3 or 4 digits"
//             />
//           </>
//         )}

//         <Button variant="contained" fullWidth onClick={payNow}>
//           Pay Rs {booking.totalAmount}
//         </Button>
//       </Paper>
//     </Box>
//   );
// }




import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Container,
  Divider,
  Chip,
  InputAdornment,
  Card,
  CardContent,
  Grid,
  FormHelperText,
  IconButton,
  InputBase,
  alpha,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "../api/axiosInstance";
import PaymentIcon from "@mui/icons-material/Payment";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import MoneyIcon from "@mui/icons-material/Money";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LockIcon from "@mui/icons-material/Lock";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SecurityIcon from "@mui/icons-material/Security";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import VisaIcon from "@mui/icons-material/CreditCard";
import MastercardIcon from "@mui/icons-material/CreditCard";
import AmexIcon from "@mui/icons-material/CreditCard";
import DiscoverIcon from "@mui/icons-material/CreditCard";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FingerprintIcon from "@mui/icons-material/Fingerprint";

export default function PaymentPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [method, setMethod] = useState("online");
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");
  const [cardType, setCardType] = useState("");
  const [focusedField, setFocusedField] = useState(null);
  const [saveCard, setSaveCard] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formValid, setFormValid] = useState({});

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await axiosInstance.get(`/bookings/${id}`);
        setBooking(res.data.booking);

        // Prefill customer info if available
        if (res.data.booking.guestName) setCustomerName(res.data.booking.guestName);
        if (res.data.booking.user?.email) setEmail(res.data.booking.user.email);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch booking data");
      }
    };
    fetchBooking();
  }, [id]);

  // Detect card type from number
  useEffect(() => {
    const num = cardNumber.replace(/\s+/g, "");
    if (num.startsWith("4")) {
      setCardType("visa");
    } else if (num.startsWith("5")) {
      setCardType("mastercard");
    } else if (num.startsWith("3")) {
      setCardType("amex");
    } else if (num.startsWith("6")) {
      setCardType("discover");
    } else {
      setCardType("");
    }
  }, [cardNumber]);

  // Format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  // Format expiry date
  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + (v.length > 2 ? "/" + v.substring(2, 4) : "");
    }
    return v;
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
    
    // Validate on change
    validateField('cardNumber', formatted);
  };

  const handleExpiryChange = (e) => {
    const formatted = formatExpiry(e.target.value);
    setExpiry(formatted);
    validateField('expiry', formatted);
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    setCvv(value);
    validateField('cvv', value);
  };

  // Field validation
  const validateField = (field, value) => {
    let isValid = true;
    
    switch(field) {
      case 'customerName':
        isValid = value.trim().length > 0;
        break;
      case 'email':
        isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        break;
      case 'nameOnCard':
        isValid = value.trim().length > 0;
        break;
      case 'cardNumber':
        isValid = /^\d{16}$/.test(value.replace(/\s+/g, ""));
        break;
      case 'expiry':
        isValid = /^(0[1-9]|1[0-2])\/\d{2}$/.test(value);
        break;
      case 'cvv':
        isValid = /^\d{3,4}$/.test(value);
        break;
      default:
        break;
    }
    
    setFormValid(prev => ({ ...prev, [field]: isValid }));
    return isValid;
  };

  // ✅ Realistic validation functions
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidCardNumber = (num) =>
    /^\d{16}$/.test(num.replace(/\s+/g, ""));

  const isValidExpiry = (exp) =>
    /^(0[1-9]|1[0-2])\/\d{2}$/.test(exp);

  const isValidCvv = (cvv) =>
    /^\d{3,4}$/.test(cvv);

  const payNow = async () => {
    setError("");
    setIsProcessing(true);

    // Guest info validation
    if (!customerName || !email) {
      setError("Customer name and email are required");
      setIsProcessing(false);
      return;
    }
    if (!isValidEmail(email)) {
      setError("Invalid email format");
      setIsProcessing(false);
      return;
    }

    // Card info validation for online payments
    if (method === "online") {
      if (!nameOnCard || !cardNumber || !expiry || !cvv) {
        setError("Complete card details are required for online payment");
        setIsProcessing(false);
        return;
      }
      if (!isValidCardNumber(cardNumber)) {
        setError("Invalid card number. Must be 16 digits");
        setIsProcessing(false);
        return;
      }
      if (!isValidExpiry(expiry)) {
        setError("Invalid expiry date. Use MM/YY format");
        setIsProcessing(false);
        return;
      }
      if (!isValidCvv(cvv)) {
        setError("Invalid CVV. Must be 3 or 4 digits");
        setIsProcessing(false);
        return;
      }
    }

    try {
      await axiosInstance.post("/payments/pay", {
        bookingId: id,
        method: method === "online" ? "Online" : "Cash",
        customerName,
        email,
        nameOnCard: method === "online" ? nameOnCard : "",
        cardNumber: method === "online" ? cardNumber : "",
        expiry: method === "online" ? expiry : "",
        cvv: method === "online" ? cvv : "",
      });

      navigate(`/invoice/${id}`);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Payment failed");
    } finally {
      setIsProcessing(false);
    }
  };

  // Modern luxury theme colors
  const theme = {
    primary: '#0D47A1',
    primaryLight: '#1565C0',
    primaryDark: '#0A3D91',
    primaryGradient: 'linear-gradient(135deg, #0D47A1 0%, #1565C0 100%)',
    secondaryGradient: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%)',
    background: '#0A0A0A',
    surface: '#111111',
    surfaceLight: 'rgba(255,255,255,0.05)',
    text: '#FFFFFF',
    textSecondary: 'rgba(255,255,255,0.7)',
    textMuted: 'rgba(255,255,255,0.5)',
    border: 'rgba(255,255,255,0.08)',
    borderActive: 'rgba(13,71,161,0.4)',
    success: '#4CAF50',
    error: '#f44336',
    warning: '#ff9800',
  };

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const scaleOnHover = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 }
  };

  // Get card icon based on type
  const getCardIcon = () => {
    switch(cardType) {
      case 'visa':
        return <VisaIcon sx={{ color: '#1A1F71', fontSize: 32 }} />;
      case 'mastercard':
        return <MastercardIcon sx={{ color: '#EB001B', fontSize: 32 }} />;
      case 'amex':
        return <AmexIcon sx={{ color: '#006FCF', fontSize: 32 }} />;
      case 'discover':
        return <DiscoverIcon sx={{ color: '#FF6600', fontSize: 32 }} />;
      default:
        return <CreditCardIcon sx={{ color: theme.primary, fontSize: 32 }} />;
    }
  };

  if (!booking) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: theme.secondaryGradient,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <CreditCardIcon sx={{ fontSize: 60, color: theme.primary, opacity: 0.5 }} />
        </motion.div>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: theme.secondaryGradient,
        py: { xs: 4, md: 8 },
        px: { xs: 2, md: 4 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Modern background effects */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          right: "5%",
          width: "400px",
          height: "400px",
          background: `radial-gradient(circle, ${theme.primary}15 0%, transparent 70%)`,
          borderRadius: "50%",
          filter: "blur(60px)",
          zIndex: 0,
        }}
      />
      
      <Box
        sx={{
          position: "absolute",
          bottom: "10%",
          left: "5%",
          width: "300px",
          height: "300px",
          background: `radial-gradient(circle, ${theme.primary}10 0%, transparent 70%)`,
          borderRadius: "50%",
          filter: "blur(60px)",
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header with modern design */}
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <Box
                sx={{
                  width: 90,
                  height: 90,
                  borderRadius: "50%",
                  background: theme.primaryGradient,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  mb: 3,
                  boxShadow: `0 10px 30px ${theme.primary}60`,
                  position: "relative",
                  '&::after': {
                    content: '""',
                    position: "absolute",
                    top: -3,
                    left: -3,
                    right: -3,
                    bottom: -3,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${theme.primary} 0%, transparent 100%)`,
                    opacity: 0.5,
                    zIndex: -1,
                  }
                }}
              >
                <FingerprintIcon sx={{ fontSize: 40, color: theme.text }} />
              </Box>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Typography
                variant="h2"
                sx={{
                  color: theme.text,
                  fontWeight: 600,
                  fontSize: { xs: "2rem", md: "2.8rem" },
                  mb: 1,
                  letterSpacing: '-0.02em',
                }}
              >
                Secure Checkout
              </Typography>
              
              <Typography
                sx={{
                  color: theme.textSecondary,
                  fontSize: "1.1rem",
                  maxWidth: 500,
                  mx: "auto",
                }}
              >
                Complete your payment securely with 256-bit encryption
              </Typography>
            </motion.div>
          </Box>

          {/* Main payment card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Paper
              elevation={0}
              sx={{
                background: theme.surface,
                backdropFilter: "blur(20px)",
                border: `1px solid ${theme.borderActive}`,
                borderRadius: 4,
                overflow: "hidden",
                boxShadow: `0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px ${theme.primary}20`,
              }}
            >
              {/* Booking summary header */}
              <Box
                sx={{
                  p: 3,
                  background: `linear-gradient(135deg, ${theme.primary}15 0%, transparent 100%)`,
                  borderBottom: `1px solid ${theme.borderActive}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <ReceiptIcon sx={{ color: theme.primary }} />
                  <Box>
                    <Typography sx={{ color: theme.textSecondary, fontSize: "0.9rem" }}>
                      Booking Reference
                    </Typography>
                    <Typography sx={{ color: theme.text, fontWeight: 600, letterSpacing: 1 }}>
                      #{booking._id?.slice(-8).toUpperCase()}
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ textAlign: "right" }}>
                  <Typography sx={{ color: theme.textSecondary, fontSize: "0.9rem" }}>
                    Total Amount
                  </Typography>
                  <Typography
                    sx={{
                      color: theme.primary,
                      fontSize: "2rem",
                      fontWeight: 700,
                      lineHeight: 1,
                    }}
                  >
                    Rs {booking.totalAmount?.toLocaleString()}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ p: { xs: 3, md: 5 } }}>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ marginBottom: "1.5rem" }}
                  >
                    <Paper
                      sx={{
                        p: 2,
                        background: alpha(theme.error, 0.1),
                        border: `1px solid ${alpha(theme.error, 0.3)}`,
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <InfoIcon sx={{ color: theme.error }} />
                      <Typography color="error" sx={{ flex: 1 }}>{error}</Typography>
                    </Paper>
                  </motion.div>
                )}

                {/* Customer information */}
                <motion.div variants={staggerContainer} initial="initial" animate="animate">
                  <Typography
                    variant="h6"
                    sx={{
                      color: theme.primary,
                      mb: 3,
                      fontWeight: 600,
                      fontSize: "1.1rem",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <PersonIcon sx={{ fontSize: 20 }} />
                    Personal Information
                  </Typography>

                  <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} md={6}>
                      <motion.div {...fadeInUp}>
                        <TextField
                          fullWidth
                          label="Full Name"
                          value={customerName}
                          onChange={(e) => {
                            setCustomerName(e.target.value);
                            validateField('customerName', e.target.value);
                          }}
                          onFocus={() => setFocusedField("name")}
                          onBlur={() => setFocusedField(null)}
                          error={focusedField !== "name" && formValid.customerName === false}
                          helperText={focusedField !== "name" && formValid.customerName === false ? "Name is required" : ""}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PersonIcon sx={{ color: theme.primary }} />
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              color: theme.text,
                              backgroundColor: theme.surfaceLight,
                              borderRadius: 2,
                              '& fieldset': {
                                borderColor: focusedField === "name" ? theme.primary : theme.border,
                              },
                              '&:hover fieldset': {
                                borderColor: theme.primary,
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: theme.primary,
                                borderWidth: 2,
                              },
                            },
                            '& .MuiInputLabel-root': {
                              color: theme.textSecondary,
                              '&.Mui-focused': {
                                color: theme.primary,
                              },
                            },
                            '& .MuiFormHelperText-root': {
                              color: theme.error,
                            },
                          }}
                        />
                      </motion.div>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <motion.div {...fadeInUp}>
                        <TextField
                          fullWidth
                          label="Email Address"
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            validateField('email', e.target.value);
                          }}
                          onFocus={() => setFocusedField("email")}
                          onBlur={() => setFocusedField(null)}
                          error={focusedField !== "email" && formValid.email === false}
                          helperText={focusedField !== "email" && formValid.email === false ? "Valid email required" : ""}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <EmailIcon sx={{ color: theme.primary }} />
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              color: theme.text,
                              backgroundColor: theme.surfaceLight,
                              borderRadius: 2,
                              '& fieldset': {
                                borderColor: focusedField === "email" ? theme.primary : theme.border,
                              },
                              '&:hover fieldset': {
                                borderColor: theme.primary,
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: theme.primary,
                                borderWidth: 2,
                              },
                            },
                            '& .MuiInputLabel-root': {
                              color: theme.textSecondary,
                              '&.Mui-focused': {
                                color: theme.primary,
                              },
                            },
                          }}
                        />
                      </motion.div>
                    </Grid>
                  </Grid>

                  {/* Payment method selection */}
                  <Typography
                    variant="h6"
                    sx={{
                      color: theme.primary,
                      mb: 3,
                      fontWeight: 600,
                      fontSize: "1.1rem",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <PaymentIcon sx={{ fontSize: 20 }} />
                    Payment Method
                  </Typography>

                  <Box sx={{ mb: 4 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <motion.div {...scaleOnHover}>
                          <Paper
                            elevation={0}
                            onClick={() => setMethod("online")}
                            sx={{
                              p: 2.5,
                              background: method === "online" ? alpha(theme.primary, 0.15) : theme.surfaceLight,
                              border: `2px solid ${method === "online" ? theme.primary : theme.border}`,
                              borderRadius: 2,
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                              transition: "all 0.2s ease",
                              '&:hover': {
                                borderColor: theme.primary,
                                background: method === "online" ? alpha(theme.primary, 0.2) : alpha(theme.primary, 0.05),
                              },
                            }}
                          >
                            <CreditCardIcon sx={{ color: method === "online" ? theme.primary : theme.textSecondary, fontSize: 28 }} />
                            <Box>
                              <Typography sx={{ color: theme.text, fontWeight: 600, mb: 0.5 }}>
                                Credit / Debit Card
                              </Typography>
                              <Typography sx={{ color: theme.textSecondary, fontSize: "0.8rem" }}>
                                Pay securely with card
                              </Typography>
                            </Box>
                            {method === "online" && (
                              <CheckCircleIcon sx={{ color: theme.primary, ml: "auto" }} />
                            )}
                          </Paper>
                        </motion.div>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <motion.div {...scaleOnHover}>
                          <Paper
                            elevation={0}
                            onClick={() => setMethod("cash")}
                            sx={{
                              p: 2.5,
                              background: method === "cash" ? alpha(theme.primary, 0.15) : theme.surfaceLight,
                              border: `2px solid ${method === "cash" ? theme.primary : theme.border}`,
                              borderRadius: 2,
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                              transition: "all 0.2s ease",
                              '&:hover': {
                                borderColor: theme.primary,
                                background: method === "cash" ? alpha(theme.primary, 0.2) : alpha(theme.primary, 0.05),
                              },
                            }}
                          >
                            <MoneyIcon sx={{ color: method === "cash" ? theme.primary : theme.textSecondary, fontSize: 28 }} />
                            <Box>
                              <Typography sx={{ color: theme.text, fontWeight: 600, mb: 0.5 }}>
                                Cash
                              </Typography>
                              <Typography sx={{ color: theme.textSecondary, fontSize: "0.8rem" }}>
                                Pay at hotel reception
                              </Typography>
                            </Box>
                            {method === "cash" && (
                              <CheckCircleIcon sx={{ color: theme.primary, ml: "auto" }} />
                            )}
                          </Paper>
                        </motion.div>
                      </Grid>
                    </Grid>
                  </Box>

                  {/* Card details - only shown for online payment */}
                  <AnimatePresence mode="wait">
                    {method === "online" && (
                      <motion.div
                        key="card-details"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            color: theme.primary,
                            mb: 3,
                            fontWeight: 600,
                            fontSize: "1.1rem",
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <CreditCardIcon sx={{ fontSize: 20 }} />
                          Card Details
                        </Typography>

                        {/* Card preview */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <Card
                            sx={{
                              background: theme.primaryGradient,
                              borderRadius: 3,
                              mb: 4,
                              p: 3,
                              boxShadow: `0 10px 30px ${theme.primary}60`,
                              position: "relative",
                              overflow: "hidden",
                              '&::before': {
                                content: '""',
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
                              }
                            }}
                          >
                            <Box sx={{ position: "relative", zIndex: 1 }}>
                              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
                                <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem" }}>
                                  {cardType ? cardType.toUpperCase() : "CARD TYPE"}
                                </Typography>
                                {getCardIcon()}
                              </Box>
                              
                              <Typography sx={{ color: theme.text, fontSize: "1.5rem", mb: 3, letterSpacing: 3, fontFamily: 'monospace' }}>
                                {cardNumber || "•••• •••• •••• ••••"}
                              </Typography>
                              
                              <Box sx={{ display: "flex", gap: 4 }}>
                                <Box>
                                  <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: "0.7rem", mb: 0.5 }}>
                                    CARD HOLDER
                                  </Typography>
                                  <Typography sx={{ color: theme.text, fontSize: "1rem", textTransform: 'uppercase' }}>
                                    {nameOnCard || "FULL NAME"}
                                  </Typography>
                                </Box>
                                <Box>
                                  <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: "0.7rem", mb: 0.5 }}>
                                    EXPIRES
                                  </Typography>
                                  <Typography sx={{ color: theme.text, fontSize: "1rem" }}>
                                    {expiry || "MM/YY"}
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                          </Card>
                        </motion.div>

                        {/* Card input fields */}
                        <Grid container spacing={3}>
                          <Grid item xs={12}>
                            <motion.div {...fadeInUp}>
                              <TextField
                                fullWidth
                                label="Name on Card"
                                value={nameOnCard}
                                onChange={(e) => {
                                  setNameOnCard(e.target.value);
                                  validateField('nameOnCard', e.target.value);
                                }}
                                onFocus={() => setFocusedField("cardName")}
                                onBlur={() => setFocusedField(null)}
                                error={focusedField !== "cardName" && formValid.nameOnCard === false}
                                helperText={focusedField !== "cardName" && formValid.nameOnCard === false ? "Name is required" : ""}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <PersonIcon sx={{ color: theme.primary }} />
                                    </InputAdornment>
                                  ),
                                }}
                                sx={{
                                  '& .MuiOutlinedInput-root': {
                                    color: theme.text,
                                    backgroundColor: theme.surfaceLight,
                                    borderRadius: 2,
                                    '& fieldset': {
                                      borderColor: focusedField === "cardName" ? theme.primary : theme.border,
                                    },
                                    '&:hover fieldset': {
                                      borderColor: theme.primary,
                                    },
                                    '&.Mui-focused fieldset': {
                                      borderColor: theme.primary,
                                      borderWidth: 2,
                                    },
                                  },
                                  '& .MuiInputLabel-root': {
                                    color: theme.textSecondary,
                                    '&.Mui-focused': {
                                      color: theme.primary,
                                    },
                                  },
                                }}
                              />
                            </motion.div>
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <motion.div {...fadeInUp}>
                              <TextField
                                fullWidth
                                label="Card Number"
                                value={cardNumber}
                                onChange={handleCardNumberChange}
                                onFocus={() => setFocusedField("cardNumber")}
                                onBlur={() => setFocusedField(null)}
                                error={focusedField !== "cardNumber" && formValid.cardNumber === false}
                                helperText={focusedField !== "cardNumber" && formValid.cardNumber === false ? "16 digits required" : ""}
                                placeholder="1234 5678 9012 3456"
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <CreditCardIcon sx={{ color: theme.primary }} />
                                    </InputAdornment>
                                  ),
                                  endAdornment: cardType && (
                                    <InputAdornment position="end">
                                      <Chip
                                        label={cardType}
                                        size="small"
                                        sx={{
                                          background: theme.primary,
                                          color: theme.text,
                                          fontSize: "0.7rem",
                                          height: 20,
                                        }}
                                      />
                                    </InputAdornment>
                                  ),
                                }}
                                sx={{
                                  '& .MuiOutlinedInput-root': {
                                    color: theme.text,
                                    backgroundColor: theme.surfaceLight,
                                    borderRadius: 2,
                                    '& fieldset': {
                                      borderColor: focusedField === "cardNumber" ? theme.primary : theme.border,
                                    },
                                    '&:hover fieldset': {
                                      borderColor: theme.primary,
                                    },
                                    '&.Mui-focused fieldset': {
                                      borderColor: theme.primary,
                                      borderWidth: 2,
                                    },
                                  },
                                  '& .MuiInputLabel-root': {
                                    color: theme.textSecondary,
                                    '&.Mui-focused': {
                                      color: theme.primary,
                                    },
                                  },
                                }}
                              />
                            </motion.div>
                          </Grid>

                          <Grid item xs={12} md={3}>
                            <motion.div {...fadeInUp}>
                              <TextField
                                fullWidth
                                label="Expiry Date"
                                value={expiry}
                                onChange={handleExpiryChange}
                                onFocus={() => setFocusedField("expiry")}
                                onBlur={() => setFocusedField(null)}
                                error={focusedField !== "expiry" && formValid.expiry === false}
                                helperText={focusedField !== "expiry" && formValid.expiry === false ? "MM/YY" : ""}
                                placeholder="MM/YY"
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <CalendarTodayIcon sx={{ color: theme.primary }} />
                                    </InputAdornment>
                                  ),
                                }}
                                sx={{
                                  '& .MuiOutlinedInput-root': {
                                    color: theme.text,
                                    backgroundColor: theme.surfaceLight,
                                    borderRadius: 2,
                                    '& fieldset': {
                                      borderColor: focusedField === "expiry" ? theme.primary : theme.border,
                                    },
                                    '&:hover fieldset': {
                                      borderColor: theme.primary,
                                    },
                                    '&.Mui-focused fieldset': {
                                      borderColor: theme.primary,
                                      borderWidth: 2,
                                    },
                                  },
                                  '& .MuiInputLabel-root': {
                                    color: theme.textSecondary,
                                    '&.Mui-focused': {
                                      color: theme.primary,
                                    },
                                  },
                                }}
                              />
                            </motion.div>
                          </Grid>

                          <Grid item xs={12} md={3}>
                            <motion.div {...fadeInUp}>
                              <TextField
                                fullWidth
                                label="CVV"
                                value={cvv}
                                onChange={handleCvvChange}
                                onFocus={() => setFocusedField("cvv")}
                                onBlur={() => setFocusedField(null)}
                                error={focusedField !== "cvv" && formValid.cvv === false}
                                helperText={focusedField !== "cvv" && formValid.cvv === false ? "3-4 digits" : ""}
                                placeholder="123"
                                type="password"
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <LockIcon sx={{ color: theme.primary }} />
                                    </InputAdornment>
                                  ),
                                }}
                                sx={{
                                  '& .MuiOutlinedInput-root': {
                                    color: theme.text,
                                    backgroundColor: theme.surfaceLight,
                                    borderRadius: 2,
                                    '& fieldset': {
                                      borderColor: focusedField === "cvv" ? theme.primary : theme.border,
                                    },
                                    '&:hover fieldset': {
                                      borderColor: theme.primary,
                                    },
                                    '&.Mui-focused fieldset': {
                                      borderColor: theme.primary,
                                      borderWidth: 2,
                                    },
                                  },
                                  '& .MuiInputLabel-root': {
                                    color: theme.textSecondary,
                                    '&.Mui-focused': {
                                      color: theme.primary,
                                    },
                                  },
                                }}
                              />
                            </motion.div>
                          </Grid>

                          {/* Save card option */}
                          <Grid item xs={12}>
                            <motion.div {...fadeInUp}>
                              <Paper
                                elevation={0}
                                onClick={() => setSaveCard(!saveCard)}
                                sx={{
                                  p: 2,
                                  background: saveCard ? alpha(theme.primary, 0.1) : 'transparent',
                                  border: `1px solid ${saveCard ? theme.primary : theme.border}`,
                                  borderRadius: 2,
                                  cursor: "pointer",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 2,
                                  transition: "all 0.2s ease",
                                }}
                              >
                                <CheckCircleIcon sx={{ color: saveCard ? theme.primary : theme.textMuted }} />
                                <Box>
                                  <Typography sx={{ color: theme.text, fontWeight: 500 }}>
                                    Save card for future payments
                                  </Typography>
                                  <Typography sx={{ color: theme.textSecondary, fontSize: "0.8rem" }}>
                                    Your card information will be securely stored
                                  </Typography>
                                </Box>
                              </Paper>
                            </motion.div>
                          </Grid>
                        </Grid>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Security badge */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Box
                      sx={{
                        mt: 4,
                        p: 2.5,
                        background: alpha(theme.primary, 0.05),
                        borderRadius: 2,
                        border: `1px solid ${theme.borderActive}`,
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        flexWrap: "wrap",
                      }}
                    >
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <LockIcon sx={{ color: theme.primary, fontSize: 20 }} />
                        <VerifiedUserIcon sx={{ color: theme.primary, fontSize: 20 }} />
                        <SecurityIcon sx={{ color: theme.primary, fontSize: 20 }} />
                      </Box>
                      <Typography sx={{ color: theme.textSecondary, fontSize: "0.9rem", flex: 1 }}>
                        Your payment information is encrypted with 256-bit SSL technology
                      </Typography>
                    </Box>
                  </motion.div>

                  <Divider sx={{ borderColor: theme.border, my: 4 }} />

                  {/* Payment button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      onClick={payNow}
                      disabled={isProcessing}
                      sx={{
                        py: 2.5,
                        background: theme.primaryGradient,
                        color: theme.text,
                        fontSize: "1.2rem",
                        fontWeight: 600,
                        borderRadius: 2,
                        textTransform: "none",
                        boxShadow: `0 10px 20px ${theme.primary}60`,
                        position: "relative",
                        overflow: "hidden",
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
                          background: theme.primaryGradient,
                          boxShadow: `0 15px 30px ${theme.primary}80`,
                        },
                        '&.Mui-disabled': {
                          background: theme.surfaceLight,
                        },
                      }}
                    >
                      {isProcessing ? (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <LockIcon />
                          </motion.div>
                          Processing Payment...
                        </Box>
                      ) : (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <LockIcon />
                          Pay Rs {booking.totalAmount?.toLocaleString()} Securely
                        </Box>
                      )}
                    </Button>
                  </motion.div>

                  {/* Back button */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    style={{ marginTop: "1.5rem", textAlign: "center" }}
                  >
                    <Button
                      startIcon={<ArrowBackIcon />}
                      onClick={() => navigate(`/summary/${id}`)}
                      sx={{
                        color: theme.textSecondary,
                        '&:hover': {
                          color: theme.primary,
                          background: 'transparent',
                        },
                      }}
                    >
                      Return to Booking Summary
                    </Button>
                  </motion.div>

                  {/* Accepted cards */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    style={{ marginTop: "2rem" }}
                  >
                    <Typography sx={{ color: theme.textMuted, textAlign: "center", mb: 2, fontSize: "0.9rem" }}>
                      Accepted Payment Methods
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "center", gap: 3, flexWrap: "wrap" }}>
                      {[
                        { icon: <VisaIcon />, name: "Visa" },
                        { icon: <MastercardIcon />, name: "Mastercard" },
                        { icon: <AmexIcon />, name: "Amex" },
                        { icon: <DiscoverIcon />, name: "Discover" },
                        { icon: <MoneyIcon />, name: "Cash" },
                      ].map((item, index) => (
                        <motion.div
                          key={item.name}
                          whileHover={{ y: -2 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1 + index * 0.1 }}
                        >
                          <Box sx={{ textAlign: "center" }}>
                            <Box sx={{ color: theme.textSecondary, fontSize: "1.5rem", mb: 0.5 }}>
                              {item.icon}
                            </Box>
                            <Typography sx={{ color: theme.textMuted, fontSize: "0.7rem" }}>
                              {item.name}
                            </Typography>
                          </Box>
                        </motion.div>
                      ))}
                    </Box>
                  </motion.div>
                </motion.div>
              </Box>
            </Paper>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
}