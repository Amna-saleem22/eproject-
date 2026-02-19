// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axiosInstance from "../api/axiosInstance";

// function toInputDate(d) {
//   if (!d) return "";
//   const date = new Date(d);
//   return date.toISOString().slice(0, 10);
// }

// export default function UpdateBookingPage() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [booking, setBooking] = useState(null);
//   const [formData, setFormData] = useState({
//     guestName: "",
//     phone: "",
//     checkInDate: "",
//     checkOutDate: "",
//     adults: 1,
//     children: 0,
//     seniors: 0,
//     roomType: "Standard",
//     roomsCount: 1,
//     foodPackage: "Breakfast",
//   });
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (!id) {
//       setError("Invalid booking ID");
//       setLoading(false);
//       return;
//     }
//     const fetchBooking = async () => {
//       try {
//         setLoading(true);
//         setError("");
//         const res = await axiosInstance.get(`/bookings/${id}`);
//         const b = res.data;
//         setBooking(b);
//         setFormData({
//           guestName: b.guestName || "",
//           phone: b.phone || "",
//           checkInDate: toInputDate(b.checkInDate),
//           checkOutDate: toInputDate(b.checkOutDate),
//           adults: b.adults ?? 1,
//           children: b.children ?? 0,
//           seniors: b.seniors ?? 0,
//           roomType: b.roomType || "Standard",
//           roomsCount: b.roomsCount ?? 1,
//           foodPackage: b.foodPackage || "Breakfast",
//         });
//       } catch (err) {
//         console.error("Update page fetch error:", err.response?.data || err.message);
//         setError(err.response?.data?.message || "Failed to load booking.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBooking();
//   }, [id]);

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleUpdate = async (e) => {
//     e?.preventDefault?.();
//     if (!booking || booking.status === "Cancelled") {
//       alert("This booking cannot be updated.");
//       return;
//     }
//     if (!formData.checkInDate || !formData.checkOutDate) {
//       alert("Please select check-in and check-out dates.");
//       return;
//     }

//     const checkIn = new Date(formData.checkInDate);
//     const checkOut = new Date(formData.checkOutDate);
//     if (checkOut <= checkIn) {
//       alert("Check-Out must be after Check-In.");
//       return;
//     }

//     setSubmitting(true);
//     setError("");
//     try {
//       await axiosInstance.put(`/bookings/${id}`, {
//         guestName: formData.guestName,
//         phone: formData.phone,
//         checkInDate: formData.checkInDate,
//         checkOutDate: formData.checkOutDate,
//         adults: Number(formData.adults),
//         children: Number(formData.children),
//         seniors: Number(formData.seniors),
//         roomType: formData.roomType,
//         roomsCount: Number(formData.roomsCount),
//         foodPackage: formData.foodPackage,
//       });
//       alert("Booking Updated Successfully ✅");
//       navigate("/dashboard");
//     } catch (err) {
//       console.error("Update booking error:", err.response?.data || err.message);
//       setError(err.response?.data?.message || "Update failed. Please try again.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const cancelBooking = async () => {
//     if (!booking) return;
//     if (booking.status === "Cancelled") {
//       alert("This booking is already cancelled.");
//       return;
//     }
//     const confirmed = window.confirm("Are you sure you want to cancel this booking?");
//     if (!confirmed) return;

//     setSubmitting(true);
//     setError("");
//     try {
//       await axiosInstance.put(`/bookings/${id}`, { status: "Cancelled" });
//       alert("Booking Cancelled ✅");
//       navigate("/dashboard");
//     } catch (err) {
//       console.error("Cancel booking error:", err.response?.data || err.message);
//       setError(err.response?.data?.message || "Cancel failed. Please try again.");
//       setSubmitting(false);
//     }
//   };

//   if (loading) return <h2 style={{ color: "#fff", textAlign: "center", padding: 40 }}>Loading...</h2>;
//   if (error && !booking) return <h2 style={{ color: "red", textAlign: "center", padding: 40 }}>{error}</h2>;
//   if (!booking) return null;

//   const isCancelled = booking.status === "Cancelled";

//   return (
//     <div style={{ minHeight: "100vh", backgroundColor: "#1e1e2f", color: "#f5f5f5", padding: "20px" }}>
//       <div style={{ maxWidth: 450, margin: "0 auto", background: "#2c2c3e", padding: 30, borderRadius: 10 }}>
//         <h2 style={{ textAlign: "center", color: "#00e676", marginBottom: 20 }}>✏️ Update Booking</h2>

//         {error && <p style={{ color: "#ff5252", marginBottom: 15 }}>{error}</p>}
//         {isCancelled && <p style={{ color: "#ffab40", marginBottom: 15 }}>This booking is cancelled. You cannot edit it.</p>}

//         <form onSubmit={handleUpdate} style={{ display: "flex", flexDirection: "column", gap: 15 }}>
//           <input
//             placeholder="Guest Name"
//             name="guestName"
//             value={formData.guestName}
//             onChange={handleChange}
//             style={{ width: "100%", padding: 10, borderRadius: 5, border: "1px solid #444", background: "#1e1e2f", color: "#f5f5f5" }}
//           />
//           <input
//             placeholder="Phone"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             style={{ width: "100%", padding: 10, borderRadius: 5, border: "1px solid #444", background: "#1e1e2f", color: "#f5f5f5" }}
//           />
//           <div style={{ display: "flex", gap: 10 }}>
//             <input
//               type="number"
//               placeholder="Adults"
//               name="adults"
//               value={formData.adults}
//               onChange={handleChange}
//               min={0}
//               style={{ flex: 1, padding: 10, borderRadius: 5, border: "1px solid #444", background: "#1e1e2f", color: "#f5f5f5" }}
//             />
//             <input
//               type="number"
//               placeholder="Children"
//               name="children"
//               value={formData.children}
//               onChange={handleChange}
//               min={0}
//               style={{ flex: 1, padding: 10, borderRadius: 5, border: "1px solid #444", background: "#1e1e2f", color: "#f5f5f5" }}
//             />
//             <input
//               type="number"
//               placeholder="Seniors"
//               name="seniors"
//               value={formData.seniors}
//               onChange={handleChange}
//               min={0}
//               style={{ flex: 1, padding: 10, borderRadius: 5, border: "1px solid #444", background: "#1e1e2f", color: "#f5f5f5" }}
//             />
//           </div>
//           <div>
//             <label style={{ display: "block", marginBottom: 5 }}>Room Type</label>
//             <select
//               name="roomType"
//               value={formData.roomType}
//               onChange={handleChange}
//               style={{ width: "100%", padding: 10, borderRadius: 5, border: "1px solid #444", background: "#1e1e2f", color: "#f5f5f5" }}
//             >
//               <option value="Standard">Standard</option>
//               <option value="Deluxe">Deluxe</option>
//               <option value="Suite">Suite</option>
//             </select>
//           </div>
//           <input
//             type="number"
//             placeholder="Rooms"
//             name="roomsCount"
//             value={formData.roomsCount}
//             onChange={handleChange}
//             min={1}
//             style={{ width: "100%", padding: 10, borderRadius: 5, border: "1px solid #444", background: "#1e1e2f", color: "#f5f5f5" }}
//           />
//           <div style={{ display: "flex", gap: 10 }}>
//             <input
//               type="date"
//               name="checkInDate"
//               value={formData.checkInDate}
//               onChange={handleChange}
//               style={{ flex: 1, padding: 10, borderRadius: 5, border: "1px solid #444", background: "#1e1e2f", color: "#f5f5f5" }}
//             />
//             <input
//               type="date"
//               name="checkOutDate"
//               value={formData.checkOutDate}
//               onChange={handleChange}
//               style={{ flex: 1, padding: 10, borderRadius: 5, border: "1px solid #444", background: "#1e1e2f", color: "#f5f5f5" }}
//             />
//           </div>
//           <div>
//             <label style={{ display: "block", marginBottom: 5 }}>Food Package</label>
//             <select
//               name="foodPackage"
//               value={formData.foodPackage}
//               onChange={handleChange}
//               style={{ width: "100%", padding: 10, borderRadius: 5, border: "1px solid #444", background: "#1e1e2f", color: "#f5f5f5" }}
//             >
//               <option value="NoFood">No Food</option>
//               <option value="Breakfast">Breakfast</option>
//               <option value="HalfBoard">Half Board</option>
//               <option value="FullBoard">Full Board</option>
//             </select>
//           </div>

//           <button
//             type="submit"
//             disabled={submitting || isCancelled}
//             style={{
//               width: "100%",
//               padding: 12,
//               background: isCancelled ? "#555" : "#00e676",
//               color: "#1e1e2f",
//               fontWeight: "bold",
//               border: "none",
//               borderRadius: 5,
//               cursor: isCancelled ? "not-allowed" : "pointer",
//             }}
//           >
//             {submitting ? "Saving..." : "Save Changes"}
//           </button>
//         </form>

//         <button
//           type="button"
//           onClick={cancelBooking}
//           disabled={submitting || isCancelled}
//           style={{
//             width: "100%",
//             padding: 12,
//             marginTop: 15,
//             background: isCancelled ? "#555" : "#d32f2f",
//             color: "white",
//             fontWeight: "bold",
//             border: "none",
//             borderRadius: 5,
//             cursor: isCancelled ? "not-allowed" : "pointer",
//           }}
//         >
//           Cancel Booking
//         </button>

//         <button
//           type="button"
//           onClick={() => navigate("/dashboard")}
//           style={{
//             width: "100%",
//             padding: 10,
//             marginTop: 10,
//             background: "transparent",
//             color: "#00e676",
//             border: "1px solid #00e676",
//             borderRadius: 5,
//             cursor: "pointer",
//           }}
//         >
//           Back to Dashboard
//         </button>
//       </div>
//     </div>
//   );
// }

















import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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
  Stack,
  Divider,
  Chip,
  Avatar,
  Alert,
  CircularProgress,
  InputAdornment,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import axiosInstance from "../api/axiosInstance";
import EditIcon from "@mui/icons-material/Edit";
import DiamondIcon from "@mui/icons-material/Diamond";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import ElderlyIcon from "@mui/icons-material/Elderly";
import KingBedIcon from "@mui/icons-material/KingBed";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import WarningIcon from "@mui/icons-material/Warning";
import { SPACING, CONTAINER, COLORS, BUTTON } from "../theme/designSystem";

function toInputDate(d) {
  if (!d) return "";
  const date = new Date(d);
  return date.toISOString().slice(0, 10);
}

export default function UpdateBookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // ⚠️ EXACT SAME state structure - NO CHANGES
  const [booking, setBooking] = useState(null);
  const [formData, setFormData] = useState({
    guestName: "",
    phone: "",
    checkInDate: "",
    checkOutDate: "",
    adults: 1,
    children: 0,
    seniors: 0,
    roomType: "Standard",
    roomsCount: 1,
    foodPackage: "Breakfast",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // ⚠️ EXACT SAME useEffect - NO CHANGES
  useEffect(() => {
    if (!id) {
      setError("Invalid booking ID");
      setLoading(false);
      return;
    }
    const fetchBooking = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await axiosInstance.get(`/bookings/${id}`);
        const b = res.data;
        setBooking(b);
        setFormData({
          guestName: b.guestName || "",
          phone: b.phone || "",
          checkInDate: toInputDate(b.checkInDate),
          checkOutDate: toInputDate(b.checkOutDate),
          adults: b.adults ?? 1,
          children: b.children ?? 0,
          seniors: b.seniors ?? 0,
          roomType: b.roomType || "Standard",
          roomsCount: b.roomsCount ?? 1,
          foodPackage: b.foodPackage || "Breakfast",
        });
      } catch (err) {
        console.error("Update page fetch error:", err.response?.data || err.message);
        setError(err.response?.data?.message || "Failed to load booking.");
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [id]);

  // ⚠️ EXACT SAME handleChange - NO CHANGES
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // ⚠️ EXACT SAME handleUpdate - NO CHANGES
  const handleUpdate = async (e) => {
    e?.preventDefault?.();
    if (!booking || booking.status === "Cancelled") {
      alert("This booking cannot be updated.");
      return;
    }
    if (!formData.checkInDate || !formData.checkOutDate) {
      alert("Please select check-in and check-out dates.");
      return;
    }

    const checkIn = new Date(formData.checkInDate);
    const checkOut = new Date(formData.checkOutDate);
    if (checkOut <= checkIn) {
      alert("Check-Out must be after Check-In.");
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      await axiosInstance.put(`/bookings/${id}`, {
        guestName: formData.guestName,
        phone: formData.phone,
        checkInDate: formData.checkInDate,
        checkOutDate: formData.checkOutDate,
        adults: Number(formData.adults),
        children: Number(formData.children),
        seniors: Number(formData.seniors),
        roomType: formData.roomType,
        roomsCount: Number(formData.roomsCount),
        foodPackage: formData.foodPackage,
      });
      alert("Booking Updated Successfully ✅");
      navigate("/dashboard");
    } catch (err) {
      console.error("Update booking error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Update failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // ⚠️ EXACT SAME cancelBooking - NO CHANGES
  const cancelBooking = async () => {
    if (!booking) return;
    if (booking.status === "Cancelled") {
      alert("This booking is already cancelled.");
      return;
    }
    const confirmed = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirmed) return;

    setSubmitting(true);
    setError("");
    try {
      await axiosInstance.put(`/bookings/${id}`, { status: "Cancelled" });
      alert("Booking Cancelled ✅");
      navigate("/dashboard");
    } catch (err) {
      console.error("Cancel booking error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Cancel failed. Please try again.");
      setSubmitting(false);
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
  if (error && !booking) {
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

  if (!booking) return null;

  const isCancelled = booking.status === "Cancelled";

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
                  <EditIcon sx={{ fontSize: 40 }} />
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
                Update Booking
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                Modify your reservation details
              </Typography>
            </Box>
          </motion.div>

          {/* Main Form Card */}
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
              {/* Status Chip */}
              <motion.div variants={itemVariants}>
                <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
                  <Chip
                    label={`Status: ${booking.status}`}
                    sx={{
                      backgroundColor: isCancelled 
                        ? "rgba(211,47,47,0.15)" 
                        : "rgba(0,230,118,0.15)",
                      color: isCancelled ? "#f44336" : "#00e676",
                      border: `1px solid ${isCancelled ? "#f44336" : "#00e676"}`,
                      fontWeight: 600,
                    }}
                  />
                </Box>
              </motion.div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Alert
                    severity="error"
                    sx={{
                      mb: 3,
                      backgroundColor: "rgba(211,47,47,0.1)",
                      color: "#ff5252",
                      border: "1px solid rgba(211,47,47,0.3)",
                    }}
                  >
                    {error}
                  </Alert>
                </motion.div>
              )}

              {/* Cancelled Warning */}
              {isCancelled && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Alert
                    icon={<WarningIcon />}
                    severity="warning"
                    sx={{
                      mb: 3,
                      backgroundColor: "rgba(255,171,64,0.1)",
                      color: "#ffab40",
                      border: "1px solid rgba(255,171,64,0.3)",
                    }}
                  >
                    This booking is cancelled. You cannot edit it.
                  </Alert>
                </motion.div>
              )}

              <form onSubmit={handleUpdate}>
                <Grid container spacing={SPACING.formFieldGap}>
                  {/* Guest Information */}
                  <Grid item xs={12}>
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
                        Guest Information
                      </Typography>
                    </motion.div>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <motion.div variants={itemVariants}>
                      <TextField
                        fullWidth
                        name="guestName"
                        label="Guest Name"
                        value={formData.guestName}
                        onChange={handleChange}
                        disabled={isCancelled || submitting}
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
                        }}
                      />
                    </motion.div>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <motion.div variants={itemVariants}>
                      <TextField
                        fullWidth
                        name="phone"
                        label="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={isCancelled || submitting}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PhoneIcon sx={{ color: "#1976d2" }} />
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

                  {/* Guest Counts */}
                  <Grid item xs={12}>
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
                        <ChildCareIcon sx={{ color: "#1976d2", fontSize: 20 }} />
                        Number of Guests
                      </Typography>
                    </motion.div>
                  </Grid>

                  <Grid item xs={4}>
                    <motion.div variants={itemVariants}>
                      <TextField
                        fullWidth
                        type="number"
                        name="adults"
                        label="Adults"
                        value={formData.adults}
                        onChange={handleChange}
                        disabled={isCancelled || submitting}
                        inputProps={{ min: 0 }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon sx={{ color: "#1976d2", fontSize: 18 }} />
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

                  <Grid item xs={4}>
                    <motion.div variants={itemVariants}>
                      <TextField
                        fullWidth
                        type="number"
                        name="children"
                        label="Children"
                        value={formData.children}
                        onChange={handleChange}
                        disabled={isCancelled || submitting}
                        inputProps={{ min: 0 }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <ChildCareIcon sx={{ color: "#1976d2", fontSize: 18 }} />
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

                  <Grid item xs={4}>
                    <motion.div variants={itemVariants}>
                      <TextField
                        fullWidth
                        type="number"
                        name="seniors"
                        label="Seniors"
                        value={formData.seniors}
                        onChange={handleChange}
                        disabled={isCancelled || submitting}
                        inputProps={{ min: 0 }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <ElderlyIcon sx={{ color: "#1976d2", fontSize: 18 }} />
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

                  {/* Room Details */}
                  <Grid item xs={12}>
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
                        <KingBedIcon sx={{ color: "#1976d2", fontSize: 20 }} />
                        Room Details
                      </Typography>
                    </motion.div>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <motion.div variants={itemVariants}>
                      <FormControl fullWidth>
                        <InputLabel sx={{ color: "rgba(255,255,255,0.7)" }}>
                          Room Type
                        </InputLabel>
                        <Select
                          name="roomType"
                          value={formData.roomType}
                          onChange={handleChange}
                          disabled={isCancelled || submitting}
                          label="Room Type"
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
                          <MenuItem value="Standard">Standard Room</MenuItem>
                          <MenuItem value="Deluxe">Deluxe Room</MenuItem>
                          <MenuItem value="Suite">Luxury Suite</MenuItem>
                        </Select>
                      </FormControl>
                    </motion.div>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <motion.div variants={itemVariants}>
                      <TextField
                        fullWidth
                        type="number"
                        name="roomsCount"
                        label="Number of Rooms"
                        value={formData.roomsCount}
                        onChange={handleChange}
                        disabled={isCancelled || submitting}
                        inputProps={{ min: 1 }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <MeetingRoomIcon sx={{ color: "#1976d2" }} />
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

                  {/* Dates */}
                  <Grid item xs={12}>
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
                        <CalendarTodayIcon sx={{ color: "#1976d2", fontSize: 20 }} />
                        Stay Dates
                      </Typography>
                    </motion.div>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <motion.div variants={itemVariants}>
                      <TextField
                        fullWidth
                        type="date"
                        name="checkInDate"
                        label="Check-In Date"
                        value={formData.checkInDate}
                        onChange={handleChange}
                        disabled={isCancelled || submitting}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <CalendarTodayIcon sx={{ color: "#1976d2" }} />
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
                          "& input[type=date]": {
                            color: "white",
                            "&::-webkit-calendar-picker-indicator": {
                              filter: "invert(1)",
                              opacity: 0.5,
                            },
                          },
                        }}
                      />
                    </motion.div>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <motion.div variants={itemVariants}>
                      <TextField
                        fullWidth
                        type="date"
                        name="checkOutDate"
                        label="Check-Out Date"
                        value={formData.checkOutDate}
                        onChange={handleChange}
                        disabled={isCancelled || submitting}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <CalendarTodayIcon sx={{ color: "#1976d2" }} />
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
                          "& input[type=date]": {
                            color: "white",
                            "&::-webkit-calendar-picker-indicator": {
                              filter: "invert(1)",
                              opacity: 0.5,
                            },
                          },
                        }}
                      />
                    </motion.div>
                  </Grid>

                  {/* Food Package */}
                  <Grid item xs={12}>
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
                        <RestaurantIcon sx={{ color: "#1976d2", fontSize: 20 }} />
                        Dining Preferences
                      </Typography>
                    </motion.div>
                  </Grid>

                  <Grid item xs={12}>
                    <motion.div variants={itemVariants}>
                      <FormControl fullWidth>
                        <InputLabel sx={{ color: "rgba(255,255,255,0.7)" }}>
                          Food Package
                        </InputLabel>
                        <Select
                          name="foodPackage"
                          value={formData.foodPackage}
                          onChange={handleChange}
                          disabled={isCancelled || submitting}
                          label="Food Package"
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
                          <MenuItem value="NoFood">No Food</MenuItem>
                          <MenuItem value="Breakfast">Breakfast Only</MenuItem>
                          <MenuItem value="HalfBoard">Half Board (Breakfast + Dinner)</MenuItem>
                          <MenuItem value="FullBoard">Full Board (All Meals)</MenuItem>
                        </Select>
                      </FormControl>
                    </motion.div>
                  </Grid>

                  {/* Action Buttons */}
                  <Grid item xs={12}>
                    <motion.div variants={itemVariants}>
                      <Divider sx={{ borderColor: "rgba(25,118,210,0.2)", my: 2 }} />
                    </motion.div>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <motion.div
                      variants={itemVariants}
                      whileHover={{ scale: isCancelled || submitting ? 1 : 1.02 }}
                      whileTap={{ scale: isCancelled || submitting ? 1 : 0.98 }}
                    >
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={submitting || isCancelled}
                        startIcon={submitting ? <CircularProgress size={20} sx={{ color: "white" }} /> : <SaveIcon />}
                        sx={{
                          background: isCancelled 
                            ? "rgba(128,128,128,0.5)" 
                            : "linear-gradient(135deg, #00e676 30%, #00c853 90%)",
                          color: "#0a0a0a",
                          fontWeight: 600,
                          py: 1.5,
                          borderRadius: 2,
                          boxShadow: isCancelled ? "none" : "0 8px 20px rgba(0,230,118,0.3)",
                          "&:hover": {
                            background: isCancelled 
                              ? "rgba(128,128,128,0.5)" 
                              : "linear-gradient(135deg, #00c853 30%, #00b248 90%)",
                            boxShadow: isCancelled ? "none" : "0 12px 30px rgba(0,230,118,0.5)",
                          },
                        }}
                      >
                        {submitting ? "Saving..." : "Save Changes"}
                      </Button>
                    </motion.div>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <motion.div
                      variants={itemVariants}
                      whileHover={{ scale: isCancelled || submitting ? 1 : 1.02 }}
                      whileTap={{ scale: isCancelled || submitting ? 1 : 0.98 }}
                    >
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={cancelBooking}
                        disabled={submitting || isCancelled}
                        startIcon={<CancelIcon />}
                        sx={{
                          background: isCancelled 
                            ? "rgba(128,128,128,0.5)" 
                            : "linear-gradient(135deg, #d32f2f 30%, #b71c1c 90%)",
                          color: "white",
                          fontWeight: 600,
                          py: 1.5,
                          borderRadius: 2,
                          boxShadow: isCancelled ? "none" : "0 8px 20px rgba(211,47,47,0.3)",
                          "&:hover": {
                            background: isCancelled 
                              ? "rgba(128,128,128,0.5)" 
                              : "linear-gradient(135deg, #b71c1c 30%, #9a0007 90%)",
                            boxShadow: isCancelled ? "none" : "0 12px 30px rgba(211,47,47,0.5)",
                          },
                        }}
                      >
                        Cancel Booking
                      </Button>
                    </motion.div>
                  </Grid>

                  <Grid item xs={12}>
                    <motion.div
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        fullWidth
                        variant="outlined"
                        onClick={() => navigate("/dashboard")}
                        startIcon={<ArrowBackIcon />}
                        sx={{
                          borderColor: "#00e676",
                          color: "#00e676",
                          py: 1.2,
                          borderRadius: 2,
                          "&:hover": {
                            borderColor: "#00c853",
                            backgroundColor: "rgba(0,230,118,0.1)",
                          },
                        }}
                      >
                        Back to Dashboard
                      </Button>
                    </motion.div>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
}