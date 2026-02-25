// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AdminDashboard = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const token = localStorage.getItem("token");

//   // ✅ Fetch ALL bookings
//   const fetchBookings = async () => {
//     try {
//       const { data } = await axios.get(
//         "http://localhost:5000/api/admin/bookings",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setBookings(data); // ✅ FIXED
//       setLoading(false);

//     } catch (error) {
//       console.error(
//         "Error fetching bookings:",
//         error.response?.data || error.message
//       );
//       setLoading(false);
//     }
//   };

//   // ✅ Confirm booking
//   const confirmBooking = async (id) => {
//     try {
//       await axios.patch(
//         `http://localhost:5000/api/admin/bookings/${id}/confirm`,
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       fetchBookings(); // refresh

//     } catch (error) {
//       console.error(
//         "Error confirming booking:",
//         error.response?.data || error.message
//       );
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   if (loading) return <div>Loading bookings...</div>;

//   return (
//     <div>
//       <h1>Admin Dashboard 👑</h1>

//       {bookings.length === 0 ? (
//         <p>No bookings found</p>
//       ) : (
//         <table border="1" cellPadding="10">
//           <thead>
//             <tr>
//               <th>Guest Name</th>
//               <th>Email</th>
//               <th>Room Type</th>
//               <th>Total Amount</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {bookings.map((booking) => (
//               <tr key={booking._id}>
//                 <td>{booking.guestName}</td>
//                 <td>{booking.user?.email}</td>
//                 <td>{booking.roomType}</td>
//                 <td>{booking.totalAmount}</td>
//                 <td>{booking.status}</td>

//                 {/* <td>
//                   {booking.status === "pending" && (
//                     <button
//                       onClick={() => confirmBooking(booking._id)}
//                     >
//                       Confirm
//                     </button>
//                   )}

//                   {booking.status === "confirmed" && (
//                     <span>Confirmed ✅</span>
//                   )}

//                   {booking.status === "cancelled" && (
//                     <span>Cancelled ❌</span>
//                   )}
//                 </td> */}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;

import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid,
  Chip,
  Button,
  Collapse,
  Divider,
  Avatar,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import KingBedIcon from "@mui/icons-material/KingBed";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import GroupIcon from "@mui/icons-material/Group";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import SpaIcon from "@mui/icons-material/Spa";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import WifiIcon from "@mui/icons-material/Wifi";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import BathtubIcon from "@mui/icons-material/Bathtub";

export default function AdminDashboard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [error, setError] = useState("");

  // Fetch all bookings
 // Fetch all bookings
const fetchBookings = async () => {
  try {
    setLoading(true);
    const res = await axiosInstance.get("/admin/bookings"); // ✅ relative to baseURL
    setBookings(res.data);
  } catch (err) {
    console.error(err);
    setError(err.response?.data?.message || "Failed to fetch bookings");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchBookings();
  }, []);

  // Confirm booking
  const confirmBooking = async (id) => {
    setActionId(id);
    try {
      await axiosInstance.put(`/admin/bookings/${id}`, { status: "confirmed" });
      fetchBookings();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to confirm booking");
    } finally {
      setActionId(null);
    }
  };
const updateBookingStatus = async (id, status) => {
  setActionId(id);
  try {
    await axiosInstance.put(`/admin/bookings/${id}`, { status });
    fetchBookings(); // refresh bookings
  } catch (err) {
    console.error(err);
    setError(err.response?.data?.message || "Failed to update status");
  } finally {
    setActionId(null);
  }
};
  // Cancel booking
  const cancelBooking = async (id) => {
    const confirmed = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirmed) return;

    setActionId(id);
    try {
      await axiosInstance.put(`/admin/bookings/${id}`, { status: "cancelled" });
      fetchBookings();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to cancel booking");
    } finally {
      setActionId(null);
    }
  };

  const handleExpandClick = (id) => setExpandedId(expandedId === id ? null : id);

  const formatDate = (date) => (date ? new Date(date).toLocaleDateString() : "N/A");

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "#00e676";
      case "pending":
        return "#ff9800";
      case "cancelled":
        return "#f44336";
      default:
        return "#1976d2";
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
    hover: { y: -4, scale: 1.02, transition: { duration: 0.3 } },
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#111" }}>
        <CircularProgress size={60} sx={{ color: "#1976d2" }} />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", py: 6, background: "#121212" }}>
      <Container>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Avatar sx={{ width: 80, height: 80, bgcolor: "#1976d2", mx: "auto", mb: 2 }}>
            <DashboardIcon sx={{ fontSize: 40 }} />
          </Avatar>
          <Typography variant="h3" sx={{ color: "white", mb: 1 }}>Admin Dashboard</Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.6)" }}>Manage all bookings</Typography>
        </Box>

        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Box sx={{ color: "red", textAlign: "center", mb: 2 }}>{error}</Box>
            </motion.div>
          )}
        </AnimatePresence>

        {bookings.length === 0 ? (
          <Typography sx={{ color: "rgba(255,255,255,0.5)", textAlign: "center", mt: 6 }}>
            No bookings found
          </Typography>
        ) : (
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <Grid container spacing={3}>
              {bookings.map((b) => (
                <Grid item xs={12} md={6} key={b._id}>
                  <motion.div variants={cardVariants} whileHover="hover">
                    <Card sx={{ background: "#1e1e2f", borderRadius: 2 }}>
                      <CardContent>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <KingBedIcon sx={{ color: "#1976d2" }} />
                            <Typography sx={{ color: "white", fontWeight: 600 }}>{b.roomType}</Typography>
                          </Box>
                          <Chip
                            label={b.status.toUpperCase()}
                            sx={{
                              backgroundColor: `${getStatusColor(b.status)}15`,
                              color: getStatusColor(b.status),
                              border: `1px solid ${getStatusColor(b.status)}`,
                              fontWeight: 600,
                            }}
                          />
                        </Box>

                        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 1 }}>
                          {b.guestName && (
                            <Typography sx={{ color: "white" }}>Guest: {b.guestName}</Typography>
                          )}
                          {b.phone && (
                            <Typography sx={{ color: "white" }}>Phone: {b.phone}</Typography>
                          )}
                          {b.totalGuests && (
                            <Typography sx={{ color: "white" }}>Guests: {b.totalGuests}</Typography>
                          )}
                          {b.checkInDate && (
                            <Typography sx={{ color: "white" }}>Check-In: {formatDate(b.checkInDate)}</Typography>
                          )}
                          {b.checkOutDate && (
                            <Typography sx={{ color: "white" }}>Check-Out: {formatDate(b.checkOutDate)}</Typography>
                          )}
                        </Box>

                        {b.extraServices?.length > 0 && (
                          <>
                            <Divider sx={{ borderColor: "rgba(255,255,255,0.2)", my: 1 }} />
                            <Button
                              onClick={() => handleExpandClick(b._id)}
                              endIcon={expandedId === b._id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                              sx={{ color: "#1976d2", textTransform: "none", p: 0 }}
                            >
                              Extra Services ({b.extraServices.length})
                            </Button>
                            <Collapse in={expandedId === b._id}>
                              {b.extraServices.map((s, i) => (
                                <Box key={i} sx={{ display: "flex", justifyContent: "space-between", py: 0.5 }}>
                                  <Typography sx={{ color: "white" }}>{s.name}</Typography>
                                  <Typography sx={{ color: "#00e676" }}>Rs {s.price}</Typography>
                                </Box>
                              ))}
                            </Collapse>
                          </>
                        )}
                      </CardContent>

                    <CardActions sx={{ gap: 1, flexWrap: "wrap", p: 2 }}>
  {b.status === "pending" && (
    <>
      <Button
        variant="contained"
        startIcon={<CheckCircleIcon />}
        onClick={() => updateBookingStatus(b._id, "confirmed")}
        disabled={actionId === b._id}
        sx={{ backgroundColor: "#00e676", color: "#000" }}
      >
        Confirm
      </Button>
      <Button
        variant="contained"
        startIcon={<CancelIcon />}
        onClick={() => updateBookingStatus(b._id, "cancelled")}
        disabled={actionId === b._id}
        sx={{ backgroundColor: "#d32f2f", color: "#fff" }}
      >
        Cancel
      </Button>
    </>
  )}
</CardActions>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        )}
      </Container>
    </Box>
  );
}