

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

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // 🔹 Fetch all bookings
  const fetchBookings = async () => {
    try {
      const res = await axiosInstance.get("/admin/bookings");
      setBookings(res.data.bookings || []);
    } catch (err) {
      showSnackbar("Error fetching bookings", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  // 🔹 Handle booking actions: confirm, checkin, checkout, cancel
 const handleAction = async (id, action) => {
  try {
    setUpdatingId(id);

    // Correct admin routes
    await axiosInstance.put(`/admin/bookings/${id}/${action}`);

    fetchBookings();
    showSnackbar(`Booking ${action} successful ✅`, "success");
  } catch (err) {
    showSnackbar(err.response?.data?.message || "Action failed", "error");
  } finally {
    setUpdatingId(null);
  }
};

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "warning";
      case "confirmed":
        return "success";
      case "checked-in":
        return "primary";
      case "checked-out":
        return "info";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  if (loading)
    return (
      <Container sx={{ mt: 5, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );

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
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    Guest: {booking.user?.name || booking.guestName}
                  </Typography>

                  <Divider sx={{ my: 1 }} />

                  <Typography>Room Type: {booking.roomType}</Typography>
                 <Typography>
  Assigned Room: {booking.assignedRoom?.roomNumber || "Wait for assigned room"}
</Typography>

                  {booking.upgrade && (
                    <Alert severity="success" sx={{ mt: 1 }}>
                      Guest Upgraded 🎉
                    </Alert>
                  )}

                  {booking.extraService && (
                    <Typography>Extra Service: {booking.extraService}</Typography>
                  )}

                  <Typography>
                    Check-In: {new Date(booking.checkInDate).toLocaleDateString()}
                  </Typography>
                  <Typography>
                    Check-Out: {new Date(booking.checkOutDate).toLocaleDateString()}
                  </Typography>

                  <Typography sx={{ mt: 2 }}>Total: ₹{booking.totalAmount}</Typography>

                  <Box sx={{ mt: 2 }}>
                    <Chip
                      label={booking.status.toUpperCase()}
                      color={getStatusColor(booking.status)}
                    />
                  </Box>

                  {/* ACTION BUTTONS */}
                  {booking.status === "pending" && (
                    <Box sx={{ mt: 2 }}>
                      <Button
                        variant="contained"
                        onClick={() => handleAction(booking._id, "confirm")}
                      >
                        Confirm
                      </Button>
                      <Button
                        sx={{ ml: 2 }}
                        variant="contained"
                        color="error"
                        onClick={() => handleAction(booking._id, "cancel")}
                      >
                        Cancel
                      </Button>
                    </Box>
                  )}

                  {booking.status === "confirmed" && (
                    <Button
                      sx={{ mt: 2 }}
                      variant="contained"
                      color="primary"
                      onClick={() => handleAction(booking._id, "checkin")}
                    >
                      Check-In
                    </Button>
                  )}

                  {booking.status === "checked-in" && (
                    <Button
                      sx={{ mt: 2 }}
                      variant="contained"
                      color="secondary"
                      onClick={() => handleAction(booking._id, "checkout")}
                    >
                      Check-Out
                    </Button>
                  )}

                  {updatingId === booking._id && (
                    <CircularProgress size={20} sx={{ ml: 2 }} />
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Container>
  );
}