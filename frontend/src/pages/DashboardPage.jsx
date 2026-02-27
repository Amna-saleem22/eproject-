import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Chip,
  Alert,
  Snackbar,
  CircularProgress,
  Box,
  Divider,
} from "@mui/material";
import { io } from "socket.io-client";

export default function UserDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [cancellingId, setCancellingId] = useState(null);

  // ===================== SOCKET CONNECTION =====================
 useEffect(() => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  if (!token || !userId) return;

  const socket = io(process.env.REACT_APP_API_URL || "http://localhost:5000", {
    auth: { token } // optional, depending on backend
  });

  socket.emit("join-user-room", userId);

  socket.on("bookingUpdated", (updatedBooking) => {
    setBookings((prev) =>
      prev.map((b) => (b._id === updatedBooking._id ? updatedBooking : b))
    );
    if (updatedBooking.status === "confirmed") showSnackbar("Your booking is confirmed! ✅", "success");
    if (updatedBooking.status === "cancelled") showSnackbar("Your booking has been cancelled ❌", "info");
  });

  return () => socket.disconnect();
}, []);

  // ===================== FETCH BOOKINGS =====================
 const fetchBookings = async () => {
  try {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) throw new Error("User not authenticated");

    const res = await axiosInstance.get("/bookings/my", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setBookings(res.data.bookings || res.data || []);
  } catch (err) {
    console.error(err);
    showSnackbar(
      err.response?.data?.message || err.message || "Error fetching bookings",
      "error"
    );
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchBookings();
  }, []);

  // ===================== CANCEL BOOKING =====================
  const cancelBooking = async (id) => {
    try {
      setCancellingId(id);

      const token = localStorage.getItem("token");
      await axiosInstance.put(
        `/bookings/${id}`,
        { status: "cancelled" },
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );

      // Optimistic update
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: "cancelled" } : b))
      );

      showSnackbar("Booking cancelled successfully ✅", "success");
    } catch (err) {
      console.error(err);
      showSnackbar(
        err.response?.data?.message || "Error cancelling booking",
        "error"
      );
      fetchBookings(); // revert on error
    } finally {
      setCancellingId(null);
    }
  };

  // ===================== SNACKBAR =====================
  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // ===================== STATUS COLOR =====================
  const getStatusColor = (status = "pending") => {
    switch (status) {
      case "confirmed":
        return "success";
      case "cancelled":
        return "error";
      default:
        return "warning";
    }
  };

  // ===================== LOADING =====================
  if (loading) {
    return (
      <Container sx={{ mt: 5, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  // ===================== DASHBOARD UI =====================
  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        My Bookings
      </Typography>

      {bookings.length === 0 ? (
        <Alert severity="info">You have no bookings yet.</Alert>
      ) : (
        <Grid container spacing={3}>
          {bookings.map((booking) => (
            <Grid item xs={12} md={6} key={booking._id}>
              <Card
                sx={{
                  position: "relative",
                  opacity: cancellingId === booking._id ? 0.7 : 1,
                  transition: "0.3s",
                }}
              >
                <CardContent>
                  <Typography variant="h6">
                    Booking ID: {booking._id ? booking._id.slice(-6).toUpperCase() : "N/A"}
                  </Typography>

                  <Divider sx={{ my: 1 }} />

                  <Typography>
                    📅 Check-In:{" "}
                    {booking.checkInDate
                      ? new Date(booking.checkInDate).toLocaleDateString()
                      : "N/A"}
                  </Typography>
                  <Typography>
                    📅 Check-Out:{" "}
                    {booking.checkOutDate
                      ? new Date(booking.checkOutDate).toLocaleDateString()
                      : "N/A"}
                  </Typography>
                  <Typography>🏨 Room Type: {booking.roomType || "N/A"}</Typography>
                  <Typography>👥 Guests: {booking.totalGuests || 0}</Typography>

                  {booking.foodPackage && <Typography>🍽️ Food Package: {booking.foodPackage}</Typography>}

                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Total: ₹{(booking.totalAmount || 0).toLocaleString()}
                  </Typography>

                  <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 1 }}>
                    <Chip
                      label={(booking.status || "pending").toUpperCase()}
                      color={getStatusColor(booking.status)}
                    />
                    {cancellingId === booking._id && <CircularProgress size={20} />}
                  </Box>

                  {booking.status === "pending" && (
                    <Button
                      variant="contained"
                      color="error"
                      sx={{ mt: 2 }}
                      onClick={() => cancelBooking(booking._id)}
                      disabled={cancellingId === booking._id}
                    >
                      Cancel Booking
                    </Button>
                  )}

                  {booking.status === "confirmed" && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                      Your booking is confirmed! ✅
                    </Alert>
                  )}

                  {booking.status === "cancelled" && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                      This booking has been cancelled ❌
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}