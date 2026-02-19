// import { useEffect, useState } from "react";
// import axiosInstance from "../api/axiosInstance";
// import { useNavigate } from "react-router-dom";

// export default function DashboardPage() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [cancellingId, setCancellingId] = useState(null);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const fetchBookings = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       const res = await axiosInstance.get("/bookings/my");
//       setBookings(res.data);
//     } catch (err) {
//       console.error("Dashboard fetch error:", err.response?.data || err.message);
//       setError(err.response?.data?.message || "Failed to load bookings.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const handleCancelBooking = async (bookingId) => {
//     const confirmed = window.confirm("Are you sure you want to cancel this booking? This cannot be undone.");
//     if (!confirmed) return;

//     setCancellingId(bookingId);
//     setError("");
//     try {
//       await axiosInstance.put(`/bookings/${bookingId}`, { status: "Cancelled" });
//       setBookings((prev) => prev.filter((b) => b._id !== bookingId));
//       // No page refresh: state update removes booking and its extra services from the list
//     } catch (err) {
//       console.error("Cancel booking error:", err.response?.data || err.message);
//       setError(err.response?.data?.message || "Failed to cancel booking.");
//     } finally {
//       setCancellingId(null);
//     }
//   };

//   if (loading) return <h2 style={{ color: "#fff", textAlign: "center", padding: 30 }}>Loading...</h2>;

//   return (
//     <div style={{ padding: 30, color: "white", maxWidth: 800, margin: "0 auto" }}>
//       <h2 style={{ color: "#00e676" }}>👤 User Dashboard</h2>
//       {error && <p style={{ color: "#ff5252", marginBottom: 15 }}>{error}</p>}

//       {bookings.length === 0 ? (
//         <p style={{ color: "#aaa", marginTop: 20 }}>You have no active bookings.</p>
//       ) : (
//         bookings.map((b) => (
//           <div
//             key={b._id}
//             style={{
//               background: "#2c2c3e",
//               padding: 15,
//               marginTop: 15,
//               borderRadius: 8,
//             }}
//           >
//             <p><b>Room:</b> {b.roomType}</p>
//             <p><b>Status:</b> {b.status}</p>
//             <p><b>Total:</b> Rs {b.totalAmount}</p>
//             {b.guestName && <p><b>Guest:</b> {b.guestName}</p>}
//             {b.checkInDate && <p><b>Check-in:</b> {new Date(b.checkInDate).toLocaleDateString()}</p>}
//             {b.checkOutDate && <p><b>Check-out:</b> {new Date(b.checkOutDate).toLocaleDateString()}</p>}

//             {b.extraServices && b.extraServices.length > 0 && (
//               <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid #444" }}>
//                 <p><b>Extra services:</b></p>
//                 <ul style={{ margin: "5px 0 0 0", paddingLeft: 20 }}>
//                   {b.extraServices.map((s, i) => (
//                     <li key={i}>{s.name || "Service"} — Rs {s.price}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             <div style={{ display: "flex", gap: 10, marginTop: 15, flexWrap: "wrap" }}>
//               <button
//                 onClick={() => navigate(`/update-booking/${b._id}`)}
//                 style={{
//                   padding: 8,
//                   background: "#00e676",
//                   color: "#1e1e2f",
//                   border: "none",
//                   borderRadius: 5,
//                   cursor: "pointer",
//                   fontWeight: "bold",
//                 }}
//               >
//                 Update Booking
//               </button>
//               <button
//                 onClick={() => handleCancelBooking(b._id)}
//                 disabled={cancellingId === b._id}
//                 style={{
//                   padding: 8,
//                   background: cancellingId === b._id ? "#555" : "#d32f2f",
//                   color: "white",
//                   border: "none",
//                   borderRadius: 5,
//                   cursor: cancellingId === b._id ? "not-allowed" : "pointer",
//                   fontWeight: "bold",
//                 }}
//               >
//                 {cancellingId === b._id ? "Cancelling..." : "Cancel Booking"}
//               </button>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }
























import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Chip,
  Button,
  Avatar,
  Stack,
  Divider,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Collapse,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DiamondIcon from "@mui/icons-material/Diamond";
import KingBedIcon from "@mui/icons-material/KingBed";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import GroupIcon from "@mui/icons-material/Group";
import PaymentIcon from "@mui/icons-material/Payment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import SpaIcon from "@mui/icons-material/Spa";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import WifiIcon from "@mui/icons-material/Wifi";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import BathtubIcon from "@mui/icons-material/Bathtub";
import { SPACING, CONTAINER, COLORS } from "../theme/designSystem";

export default function DashboardPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  // ⚠️ EXACT SAME state structure - NO CHANGES
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  // ⚠️ EXACT SAME fetchBookings function
  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axiosInstance.get("/bookings/my");
      setBookings(res.data);
    } catch (err) {
      console.error("Dashboard fetch error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  // ⚠️ EXACT SAME useEffect
  useEffect(() => {
    fetchBookings();
  }, []);

  // ⚠️ EXACT SAME handleCancelBooking function
  const handleCancelBooking = async (bookingId) => {
    const confirmed = window.confirm("Are you sure you want to cancel this booking? This cannot be undone.");
    if (!confirmed) return;

    setCancellingId(bookingId);
    setError("");
    try {
      await axiosInstance.put(`/bookings/${bookingId}`, { status: "Cancelled" });
      setBookings((prev) => prev.filter((b) => b._id !== bookingId));
      // No page refresh: state update removes booking and its extra services from the list
    } catch (err) {
      console.error("Cancel booking error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to cancel booking.");
    } finally {
      setCancellingId(null);
    }
  };

  const handleExpandClick = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get status chip color
  const getStatusColor = (status) => {
    switch(status) {
      case 'Confirmed': return '#00e676';
      case 'Pending': return '#ff9800';
      case 'Cancelled': return '#f44336';
      default: return '#1976d2';
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
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hover: {
      y: -4,
      scale: 1.02,
      transition: { duration: 0.3, ease: "easeOut" },
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
          <DiamondIcon sx={{ fontSize: 60, color: COLORS.primary }} />
        </motion.div>
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
            <Box sx={{ textAlign: "center", mb: SPACING.sectionTitleBottom }}>
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
                    bgcolor: COLORS.primary,
                    mx: "auto",
                    mb: SPACING.titleToBody,
                    boxShadow: `0 0 30px ${COLORS.borderStrong}`,
                  }}
                >
                  <DashboardIcon sx={{ fontSize: 40 }} />
                </Avatar>
              </motion.div>

              <Typography
                variant="h3"
                sx={{
                  color: COLORS.text,
                  fontWeight: 600,
                  mb: SPACING.inlineGap,
                  fontSize: { xs: "2rem", md: "2.5rem" },
                  textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                }}
              >
                User Dashboard
              </Typography>

              <Typography
                variant="body1"
                sx={{ color: COLORS.textSecondary }}
              >
                Manage your bookings and reservations
              </Typography>
            </Box>
          </motion.div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
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
          </AnimatePresence>

          {/* Empty State */}
          {bookings.length === 0 ? (
            <motion.div variants={itemVariants}>
              <Paper
                sx={{
                  p: SPACING.cardPadding,
                  textAlign: "center",
                  background: COLORS.backgroundElevated,
                  backdropFilter: "blur(20px)",
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 2,
                }}
              >
                <DiamondIcon sx={{ fontSize: 60, color: COLORS.primary, mb: SPACING.titleToBody, opacity: 0.5 }} />
                <Typography variant="h5" sx={{ color: "white", mb: 1 }}>
                  No Active Bookings
                </Typography>
                <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.5)" }}>
                  Start planning your luxury stay with us today!
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => navigate("/booking")}
                  sx={{
                    mt: 3,
                    background: "linear-gradient(135deg, #0d47a1 30%, #1976d2 90%)",
                    color: "white",
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                  }}
                >
                  Browse Rooms
                </Button>
              </Paper>
            </motion.div>
          ) : (
            /* Booking Cards */
            <motion.div variants={containerVariants}>
              <Grid container spacing={SPACING.formFieldGap}>
                {bookings.map((booking) => (
                  <Grid item xs={12} key={booking._id}>
                    <motion.div
                      variants={cardVariants}
                      whileHover="hover"
                    >
                      <Card
                        sx={{
                          background: COLORS.backgroundElevated,
                          backdropFilter: "blur(20px)",
                          border: `1px solid ${COLORS.border}`,
                          borderRadius: 2,
                          overflow: "visible",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            border: `1px solid ${COLORS.borderStrong}`,
                            boxShadow: `0 20px 40px ${COLORS.border}`,
                          },
                        }}
                      >
                        <CardContent sx={{ p: 3 }}>
                          {/* Header Row */}
                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, flexWrap: "wrap", gap: 2 }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <KingBedIcon sx={{ color: "#1976d2" }} />
                              <Typography variant="h6" sx={{ color: "white", fontWeight: 600 }}>
                                {booking.roomType}
                              </Typography>
                            </Box>
                            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                              <Chip
                                label={booking.status}
                                size="small"
                                sx={{
                                  backgroundColor: `${getStatusColor(booking.status)}15`,
                                  color: getStatusColor(booking.status),
                                  border: `1px solid ${getStatusColor(booking.status)}`,
                                  fontWeight: 600,
                                }}
                              />
                              <Chip
                                label={`Rs ${booking.totalAmount?.toLocaleString()}`}
                                size="small"
                                sx={{
                                  backgroundColor: "rgba(0,230,118,0.15)",
                                  color: "#00e676",
                                  border: "1px solid #00e676",
                                  fontWeight: 600,
                                }}
                              />
                            </Box>
                          </Box>

                          {/* Main Details Grid */}
                          <Grid container spacing={2} sx={{ mb: 2 }}>
                            {booking.guestName && (
                              <Grid item xs={12} sm={6} md={3}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                  <PersonIcon sx={{ color: "#1976d2", fontSize: 18 }} />
                                  <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>
                                    Guest:
                                  </Typography>
                                  <Typography variant="body2" sx={{ color: "white" }}>
                                    {booking.guestName}
                                  </Typography>
                                </Box>
                              </Grid>
                            )}

                            {booking.phone && (
                              <Grid item xs={12} sm={6} md={3}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                  <PhoneIcon sx={{ color: "#1976d2", fontSize: 18 }} />
                                  <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>
                                    Phone:
                                  </Typography>
                                  <Typography variant="body2" sx={{ color: "white" }}>
                                    {booking.phone}
                                  </Typography>
                                </Box>
                              </Grid>
                            )}

                            {booking.totalGuests && (
                              <Grid item xs={12} sm={6} md={3}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                  <GroupIcon sx={{ color: "#1976d2", fontSize: 18 }} />
                                  <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>
                                    Guests:
                                  </Typography>
                                  <Typography variant="body2" sx={{ color: "white" }}>
                                    {booking.totalGuests}
                                  </Typography>
                                </Box>
                              </Grid>
                            )}

                            {booking.nights && (
                              <Grid item xs={12} sm={6} md={3}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                  <CalendarTodayIcon sx={{ color: "#1976d2", fontSize: 18 }} />
                                  <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>
                                    Nights:
                                  </Typography>
                                  <Typography variant="body2" sx={{ color: "white" }}>
                                    {booking.nights}
                                  </Typography>
                                </Box>
                              </Grid>
                            )}
                          </Grid>

                          {/* Dates Row */}
                          {(booking.checkInDate || booking.checkOutDate) && (
                            <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", mb: 2 }}>
                              {booking.checkInDate && (
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                  <CalendarTodayIcon sx={{ color: "#1976d2", fontSize: 16 }} />
                                  <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)" }}>
                                    Check-In:
                                  </Typography>
                                  <Typography variant="caption" sx={{ color: "white" }}>
                                    {formatDate(booking.checkInDate)}
                                  </Typography>
                                </Box>
                              )}
                              {booking.checkOutDate && (
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                  <CalendarTodayIcon sx={{ color: "#1976d2", fontSize: 16 }} />
                                  <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)" }}>
                                    Check-Out:
                                  </Typography>
                                  <Typography variant="caption" sx={{ color: "white" }}>
                                    {formatDate(booking.checkOutDate)}
                                  </Typography>
                                </Box>
                              )}
                            </Box>
                          )}

                          {/* Extra Services */}
                          {booking.extraServices && booking.extraServices.length > 0 && (
                            <>
                              <Divider sx={{ borderColor: "rgba(25,118,210,0.2)", my: 2 }} />
                              
                              <Box>
                                <Button
                                  onClick={() => handleExpandClick(booking._id)}
                                  sx={{
                                    color: "#1976d2",
                                    textTransform: "none",
                                    p: 0,
                                    mb: 1,
                                    "&:hover": { backgroundColor: "transparent" },
                                  }}
                                  endIcon={expandedId === booking._id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                >
                                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    Extra Services ({booking.extraServices.length})
                                  </Typography>
                                </Button>

                                <Collapse in={expandedId === booking._id}>
                                  <Box sx={{ pl: 2 }}>
                                    {booking.extraServices.map((service, index) => (
                                      <Box
                                        key={index}
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "space-between",
                                          py: 0.5,
                                        }}
                                      >
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                          {service.icon === "spa" && <SpaIcon sx={{ color: "#1976d2", fontSize: 16 }} />}
                                          {service.icon === "dining" && <RestaurantIcon sx={{ color: "#1976d2", fontSize: 16 }} />}
                                          {service.icon === "bar" && <LocalBarIcon sx={{ color: "#1976d2", fontSize: 16 }} />}
                                          {service.icon === "wifi" && <WifiIcon sx={{ color: "#1976d2", fontSize: 16 }} />}
                                          {service.icon === "ac" && <AcUnitIcon sx={{ color: "#1976d2", fontSize: 16 }} />}
                                          {service.icon === "bath" && <BathtubIcon sx={{ color: "#1976d2", fontSize: 16 }} />}
                                          {!service.icon && <RoomServiceIcon sx={{ color: "#1976d2", fontSize: 16 }} />}
                                          <Typography variant="body2" sx={{ color: "white" }}>
                                            {service.name || "Service"}
                                          </Typography>
                                        </Box>
                                        <Typography variant="body2" sx={{ color: "#00e676" }}>
                                          Rs {service.price}
                                        </Typography>
                                      </Box>
                                    ))}
                                  </Box>
                                </Collapse>
                              </Box>
                            </>
                          )}
                        </CardContent>

                        {/* Card Actions */}
                        <CardActions sx={{ p: 3, pt: 0, gap: 2, flexWrap: "wrap" }}>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                              variant="contained"
                              startIcon={<EditIcon />}
                              onClick={() => navigate(`/update-booking/${booking._id}`)}
                              sx={{
                                background: "linear-gradient(135deg, #00e676 30%, #00c853 90%)",
                                color: "#0a0a0a",
                                fontWeight: 600,
                                px: 3,
                                py: 1,
                                borderRadius: 2,
                                boxShadow: "0 4px 15px rgba(0,230,118,0.3)",
                                "&:hover": {
                                  background: "linear-gradient(135deg, #00c853 30%, #00b248 90%)",
                                  boxShadow: "0 8px 20px rgba(0,230,118,0.5)",
                                },
                              }}
                            >
                              Update Booking
                            </Button>
                          </motion.div>

                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                              variant="contained"
                              startIcon={<DeleteIcon />}
                              onClick={() => handleCancelBooking(booking._id)}
                              disabled={cancellingId === booking._id}
                              sx={{
                                background: cancellingId === booking._id 
                                  ? "rgba(211,47,47,0.5)" 
                                  : "linear-gradient(135deg, #d32f2f 30%, #b71c1c 90%)",
                                color: "white",
                                fontWeight: 600,
                                px: 3,
                                py: 1,
                                borderRadius: 2,
                                boxShadow: cancellingId === booking._id 
                                  ? "none" 
                                  : "0 4px 15px rgba(211,47,47,0.3)",
                                "&:hover": {
                                  background: cancellingId === booking._id 
                                    ? "rgba(211,47,47,0.5)" 
                                    : "linear-gradient(135deg, #b71c1c 30%, #9a0007 90%)",
                                  boxShadow: cancellingId === booking._id 
                                    ? "none" 
                                    : "0 8px 20px rgba(211,47,47,0.5)",
                                },
                              }}
                            >
                              {cancellingId === booking._id ? (
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                  <CircularProgress size={16} sx={{ color: "white" }} />
                                  <span>Cancelling...</span>
                                </Box>
                              ) : (
                                "Cancel Booking"
                              )}
                            </Button>
                          </motion.div>
                        </CardActions>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          )}
        </motion.div>
      </Container>
    </Box>
  );
}
