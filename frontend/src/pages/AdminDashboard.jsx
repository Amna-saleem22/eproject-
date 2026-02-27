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
} from "@mui/material";
import { io } from "socket.io-client";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });
  const [updatingId, setUpdatingId] = useState(null);

  // Socket connection for real-time updates
  useEffect(() => {
    const socket = io(process.env.REACT_APP_API_URL || "http://localhost:5000");
    
    socket.on("bookingUpdated", (updatedBooking) => {
      setBookings(prevBookings =>
        prevBookings.map(booking =>
          booking._id === updatedBooking._id ? updatedBooking : booking
        )
      );
    });

    return () => socket.disconnect();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/admin/bookings");
      setBookings(res.data.bookings || res.data); // Handle both response formats
      setLoading(false);
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        message: err.response?.data?.message || "Error fetching bookings",
        severity: "error"
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      setUpdatingId(id);
      const res = await axiosInstance.put(`/admin/bookings/${id}`, { status });
      
      // Optimistic update
      setBookings(prevBookings =>
        prevBookings.map(booking =>
          booking._id === id ? { ...booking, status } : booking
        )
      );

      setSnackbar({
        open: true,
        message: res.data.message,
        severity: "success"
      });
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        message: err.response?.data?.message || "Error updating booking",
        severity: "error"
      });
      // Revert optimistic update on error
      fetchBookings();
    } finally {
      setUpdatingId(null);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return (
      <Container sx={{ mt: 5, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Admin Booking Panel
      </Typography>

      {bookings.length === 0 ? (
        <Alert severity="info">No bookings found</Alert>
      ) : (
        <Grid container spacing={3}>
          {bookings.map((booking) => (
            <Grid item xs={12} md={6} key={booking._id}>
              <Card sx={{ 
                position: 'relative',
                opacity: updatingId === booking._id ? 0.7 : 1,
                transition: 'opacity 0.3s'
              }}>
                <CardContent>
                  <Typography variant="h6">
                    Guest: {booking.guestName}
                  </Typography>
                  <Typography color="textSecondary">
                    Email: {booking.user?.email}
                  </Typography>
                  <Typography>
                    Check-In: {new Date(booking.checkInDate).toLocaleDateString()}
                  </Typography>
                  <Typography>
                    Check-Out: {new Date(booking.checkOutDate).toLocaleDateString()}
                  </Typography>
                  <Typography>
                    Rooms: {booking.roomsCount} | Guests: {booking.totalGuests}
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    Total: ₹{booking.totalAmount?.toLocaleString()}
                  </Typography>

                  <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip
                      label={booking.status.toUpperCase()}
                      color={
                        booking.status === "confirmed"
                          ? "success"
                          : booking.status === "cancelled"
                          ? "error"
                          : "warning"
                      }
                    />
                    {updatingId === booking._id && (
                      <CircularProgress size={20} />
                    )}
                  </Box>

                  {booking.status === "pending" && (
                    <Box sx={{ mt: 2 }}>
                      <Button
                        variant="contained"
                        sx={{ 
                          mr: 2,
                          backgroundColor: "#00e676", 
                          color: "#000",
                          '&:hover': { backgroundColor: "#00c853" }
                        }}
                        onClick={() => updateStatus(booking._id, "confirmed")}
                        disabled={updatingId === booking._id}
                      >
                        Confirm
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => updateStatus(booking._id, "cancelled")}
                        disabled={updatingId === booking._id}
                      >
                        Cancel
                      </Button>
                    </Box>
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