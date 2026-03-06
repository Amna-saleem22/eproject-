import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Paper, Button, CircularProgress } from "@mui/material";
import axiosInstance from "../api/axiosInstance";

export default function SummaryPage() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchBooking = async () => {

      try {

     const res = await axiosInstance.get(`/bookings/${id}`);

        if (res.data.success) {
         setBooking(res.data.booking);
        }

      } catch (error) {

        console.error("Booking fetch error:", error);

      } finally {
        setLoading(false);
      }

    };

    fetchBooking();

  }, [id]);


  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (!booking) {
    return (
      <Typography align="center" mt={5}>
        Booking not found
      </Typography>
    );
  }

  return (
    <Box p={3} display="flex" justifyContent="center">
      <Paper sx={{ p: 4, width: 400 }} elevation={3}>

        <Typography variant="h5" mb={2}>
          Booking Summary
        </Typography>

        <Typography>Guest: {booking.guestName}</Typography>
        <Typography>Phone: {booking.phone}</Typography>
        <Typography>Room Type: {booking.roomType}</Typography>
     <Typography>Rooms: {booking.roomsCount || 1}</Typography>
<Typography>Total Guests: {booking.totalGuests || booking.adults}</Typography>
<Typography>Nights: {booking.nights || 1}</Typography>
<Typography>Check-In: {booking.checkInDate ? new Date(booking.checkInDate).toLocaleDateString() : "N/A"}</Typography>
<Typography>Check-Out: {booking.checkOutDate ? new Date(booking.checkOutDate).toLocaleDateString() : "N/A"}</Typography>

        <Typography sx={{ mt: 2 }}>
          Total Amount: <b>Rs {booking.totalAmount}</b>
        </Typography>

        <Typography>Status: {booking.status}</Typography>

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3 }}
          onClick={() => navigate(`/payment/${booking._id}`)}
        >
          Proceed to Payment
        </Button>

      </Paper>
    </Box>
  );
}