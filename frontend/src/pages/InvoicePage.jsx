import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Paper, Typography } from "@mui/material";
import axiosInstance from "../api/axiosInstance";

export default function InvoicePage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingRes = await axiosInstance.get(`/bookings/${id}`);
        setBooking(bookingRes.data.booking);

        const paymentRes = await axiosInstance.get(`/payments/${id}`);
        setPayment(paymentRes.data.payment);
      } catch (err) {
        console.error("Invoice fetch error:", err);
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  if (loading) return <Typography>Loading...</Typography>;
  if (!booking) return <Typography>No booking found.</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5">Final Invoice</Typography>
        <Typography>Guest Name: {booking.guestName}</Typography>
        <Typography>Phone: {booking.phoneNumber}</Typography>
        <Typography>Number of Guests: {booking.numberOfGuests}</Typography>
        <Typography>Rooms Requested: {booking.roomRequested}</Typography>
        <Typography>Room Type: {booking.roomType}</Typography>
        <Typography>Assigned Room: {booking.roomAssigned || "Not assigned yet"}</Typography>
        <Typography>Total Amount: Rs {booking.totalAmount}</Typography>
        <Typography>Payment Method: {payment?.method}</Typography>
        <Typography>Payment Status: {payment?.paymentStatus}</Typography>
      </Paper>
    </Box>
  );
}