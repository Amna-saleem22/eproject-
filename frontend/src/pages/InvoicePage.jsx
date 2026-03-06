import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Paper, Typography, CircularProgress, Divider } from "@mui/material";
import axiosInstance from "../api/axiosInstance"; // axios with baseURL: '/api'

export default function InvoicePage() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        // ✅ Match backend route
        const res = await axiosInstance.get(`/invoice/${id}`);
        if (res.data.success) setInvoice(res.data.invoice);
      } catch (err) {
        console.error("Invoice fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoice();
  }, [id]);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );

  if (!invoice)
    return (
      <Typography align="center" mt={5}>
        Invoice not found
      </Typography>
    );

  return (
    <Box p={3} display="flex" justifyContent="center">
      <Paper sx={{ p: 4, width: 500 }} elevation={3}>
        <Typography variant="h5" mb={2} align="center">
          Booking Invoice
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {/* Guest Info */}
        <Typography><b>Guest Name:</b> {invoice.guestName || "N/A"}</Typography>
        <Typography><b>Email:</b> {invoice.payment?.email || "N/A"}</Typography>
        <Typography><b>Phone:</b> {invoice.phone || "N/A"}</Typography>

        <Divider sx={{ my: 2 }} />

        {/* Booking Info */}
        <Typography><b>Room Type:</b> {invoice.roomType || "N/A"}</Typography>
        <Typography>
          <b>Assigned Room:</b> {invoice.assignedRoom ? `Room #${invoice.assignedRoom.roomNumber || invoice.assignedRoom}` : "Not Assigned"}
        </Typography>
        <Typography><b>Rooms:</b> {invoice.roomsCount || "N/A"}</Typography>
        <Typography><b>Total Guests:</b> {invoice.totalGuests || "N/A"}</Typography>
        <Typography><b>Nights:</b> {invoice.nights || "N/A"}</Typography>
        <Typography><b>Check-In:</b> {invoice.checkInDate ? new Date(invoice.checkInDate).toLocaleDateString() : "N/A"}</Typography>
        <Typography><b>Check-Out:</b> {invoice.checkOutDate ? new Date(invoice.checkOutDate).toLocaleDateString() : "N/A"}</Typography>

        <Divider sx={{ my: 2 }} />

        {/* Payment Info */}
        <Typography><b>Total Amount:</b> Rs {invoice.totalAmount || 0}</Typography>
        <Typography><b>Status:</b> {invoice.status || "N/A"}</Typography>
        <Typography><b>Payment Method:</b> {invoice.payment?.method || "N/A"}</Typography>
        <Typography><b>Transaction ID:</b> {invoice.payment?.transactionId || "N/A"}</Typography>
        <Typography><b>Booking Date:</b> {invoice.bookingDate ? new Date(invoice.bookingDate).toLocaleDateString() : "N/A"}</Typography>
      </Paper>
    </Box>
  );
}