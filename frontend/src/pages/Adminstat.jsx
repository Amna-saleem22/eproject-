// src/pages/AdminDashboard.jsx
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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

// Luxury Theme
const luxuryTheme = {
  colors: {
    primaryMain: '#1565C0',
    primaryLight: '#0D47A1',
    secondary: '#F50057',
    background: {
      main: '#0A0A0A',
      secondary: '#111111'
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255,255,255,0.5)'
    },
    border: {
      light: 'rgba(255,255,255,0.08)',
      strong: 'rgba(13,71,161,0.4)'
    }
  },
  effects: {
    transition: '0.3s ease'
  }
};

export default function AdminDashboard() {
  const [allBookings, setAllBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [statusFilter, setStatusFilter] = useState("all");

  // Fetch all bookings once
  const fetchBookings = async () => {
    try {
      const res = await axiosInstance.get("/admin/bookings");
      setAllBookings(res.data.bookings || []);
      setFilteredBookings(res.data.bookings || []);
    } catch (err) {
      showSnackbar("Error fetching bookings", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  // Filter bookings whenever statusFilter or allBookings changes
  useEffect(() => {
    if (statusFilter === "all") {
      setFilteredBookings(allBookings);
    } else {
      const filtered = allBookings.filter(b => b.status === statusFilter);
      setFilteredBookings(filtered);
    }
  }, [statusFilter, allBookings]);

  const showSnackbar = (message, severity) => setSnackbar({ open: true, message, severity });

  const handleAction = async (id, action) => {
    try {
      setUpdatingId(id);
      await axiosInstance.put(`/admin/bookings/${id}/${action}`);
      // Update booking locally instead of refetch
      const updated = allBookings.map(b => b._id === id ? { ...b, status: getNextStatus(action) } : b);
      setAllBookings(updated);
      showSnackbar(`Booking ${action} successful ✅`, "success");
    } catch (err) {
      showSnackbar(err.response?.data?.message || "Action failed", "error");
    } finally { setUpdatingId(null); }
  };

  // Map action to resulting status for local update
  const getNextStatus = (action) => {
    switch(action) {
      case "confirm": return "confirmed";
      case "checkin": return "checked-in";
      case "checkout": return "checked-out";
      case "cancel": return "cancelled";
      default: return "";
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "warning";
      case "confirmed": return "success";
      case "checked-in": return "primary";
      case "checked-out": return "info";
      case "cancelled": return "error";
      default: return "default";
    }
  };

  if (loading)
    return (
      <Box style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: luxuryTheme.colors.background.main
      }}>
        <CircularProgress style={{ color: luxuryTheme.colors.primaryMain }} />
      </Box>
    );

  return (
    <Box style={{ background: luxuryTheme.colors.background.main, minHeight: '100vh', padding: '2rem' }}>
      <Container maxWidth="xl">
        <Typography style={{ fontSize: '2rem', fontWeight: 700, color: luxuryTheme.colors.text.primary, marginBottom: '0.5rem' }}>
          Admin Booking Panel
        </Typography>
        <Typography style={{ color: luxuryTheme.colors.text.secondary, marginBottom: '2rem', borderBottom: `1px solid ${luxuryTheme.colors.border.light}`, paddingBottom: '0.5rem' }}>
          Manage all hotel bookings efficiently
        </Typography>

        {/* Status Filter */}
        <FormControl variant="filled" style={{ minWidth: 200, marginBottom: '1.5rem' }}>
          <InputLabel style={{ color: luxuryTheme.colors.text.secondary }}>Filter by Status</InputLabel>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ background: luxuryTheme.colors.background.secondary, color: luxuryTheme.colors.text.primary }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="confirmed">Confirmed</MenuItem>
            <MenuItem value="checked-in">Check-In</MenuItem>
            <MenuItem value="checked-out">Check-Out</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
          </Select>
        </FormControl>

        {filteredBookings.length === 0 ? (
          <Alert severity="info">No bookings found for selected status</Alert>
        ) : (
          <Grid container spacing={3}>
            {filteredBookings.map((booking) => (
              <Grid item xs={12} md={6} key={booking._id}>
                <Card style={{
                  background: luxuryTheme.colors.background.secondary,
                  borderRadius: '16px',
                  border: `1px solid ${luxuryTheme.colors.border.light}`,
                  boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  cursor: 'pointer'
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.5)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.3)'; }}>
                  <CardContent>
                    <Typography variant="h6" style={{ color: luxuryTheme.colors.text.primary }}>
                      Guest: {booking.user?.name || booking.guestName}
                    </Typography>
                    <Divider sx={{ my: 1, borderColor: luxuryTheme.colors.border.light }} />
                    <Typography style={{ color: luxuryTheme.colors.text.secondary }}>Room Type: {booking.roomType}</Typography>
                    <Typography style={{ color: luxuryTheme.colors.text.secondary }}>
                      Assigned Room: {booking.assignedRoom?.roomNumber || "Wait for assigned room"}
                    </Typography>

                    {booking.upgrade && <Alert severity="success" sx={{ mt: 1 }}>Guest Upgraded 🎉</Alert>}
                    {booking.extraService && <Typography style={{ color: luxuryTheme.colors.text.secondary }}>Extra Service: {booking.extraService}</Typography>}

                    <Typography style={{ color: luxuryTheme.colors.text.secondary }}>
                      Check-In: {new Date(booking.checkInDate).toLocaleDateString()}
                    </Typography>
                    <Typography style={{ color: luxuryTheme.colors.text.secondary }}>
                      Check-Out: {new Date(booking.checkOutDate).toLocaleDateString()}
                    </Typography>

                    <Typography style={{ marginTop: '1rem', fontWeight: 600, color: luxuryTheme.colors.primaryLight }}>
                      Total: RS{booking.totalAmount?.toLocaleString() || 0}
                    </Typography>

                    <Box sx={{ mt: 1 }}>
                      <Chip label={booking.status.toUpperCase()} color={getStatusColor(booking.status)} />
                    </Box>

                    {/* ACTION BUTTONS */}
                    <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {booking.status === "pending" && (
                        <>
                          <Button
                            variant="contained"
                            style={{
                              background: luxuryTheme.colors.primaryMain,
                              color: '#fff',
                              fontWeight: 600,
                              transition: luxuryTheme.effects.transition
                            }}
                            onClick={() => handleAction(booking._id, "confirm")}
                          >
                            Confirm
                          </Button>
                          <Button
                            variant="contained"
                            style={{
                              background: '#f44336',
                              color: '#fff',
                              fontWeight: 600,
                              transition: luxuryTheme.effects.transition
                            }}
                            onClick={() => handleAction(booking._id, "cancel")}
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                      {booking.status === "confirmed" && (
                        <Button
                          variant="contained"
                          style={{
                            background: luxuryTheme.colors.primaryLight,
                            color: '#fff',
                            fontWeight: 600,
                            transition: luxuryTheme.effects.transition
                          }}
                          onClick={() => handleAction(booking._id, "checkin")}
                        >
                          Check-In
                        </Button>
                      )}
                      {booking.status === "checked-in" && (
                        <Button
                          variant="contained"
                          style={{
                            background: luxuryTheme.colors.secondary,
                            color: '#fff',
                            fontWeight: 600,
                            transition: luxuryTheme.effects.transition
                          }}
                          onClick={() => handleAction(booking._id, "checkout")}
                        >
                          Check-Out
                        </Button>
                      )}
                      {updatingId === booking._id && <CircularProgress size={20} sx={{ ml: 2 }} />}
                    </Box>
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
    </Box>
  );
}