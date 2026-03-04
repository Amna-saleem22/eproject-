import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Paper, Button } from "@mui/material";
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
        setBooking(res.data.booking);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [id]);

  if (loading) return <Typography>Loading...</Typography>;
  if (!booking) return <Typography>No booking found.</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Booking Summary</Typography>

        <Typography>Guest Name: {booking.guestName}</Typography>
        <Typography>Phone: {booking.phone}</Typography>
        <Typography>Check-in: {new Date(booking.checkInDate).toLocaleDateString()}</Typography>
        <Typography>Check-out: {new Date(booking.checkOutDate).toLocaleDateString()}</Typography>
        <Typography>Adults: {booking.adults}</Typography>
        <Typography>Children: {booking.children}</Typography>
        <Typography>Room Type: {booking.roomType}</Typography>
        <Typography>Total Amount: Rs {booking.totalAmount}</Typography>
        <Typography>Status: {booking.status}</Typography>
        {booking.assignedRoom && <Typography>Assigned Room: {booking.assignedRoom}</Typography>}
        {booking.extraService && <Typography>Extra Service: {booking.extraService}</Typography>}
        <Typography>Upgrade: {booking.upgrade ? "Yes" : "No"}</Typography>

        {/* Proceed to Payment Button */}
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          onClick={() => navigate(`/payment/${id}`)}
        >
          Proceed to Payment
        </Button>
      </Paper>
    </Box>
  );
}