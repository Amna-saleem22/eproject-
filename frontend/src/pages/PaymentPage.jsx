import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import axiosInstance from "../api/axiosInstance";

export default function PaymentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [method, setMethod] = useState("Cash"); // default Cash
  const [cardData, setCardData] = useState({
    customerName: "",
    email: "",
    nameOnCard: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  // Fetch booking
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await axiosInstance.get(`/bookings/${id}`);
        setBooking(res.data.booking);
      } catch (err) {
        console.error("Booking fetch error:", err);
        alert("Failed to fetch booking data.");
      }
      setLoading(false);
    };
    fetchBooking();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardData({ ...cardData, [name]: value });
  };

  const validateForm = () => {
    if (method === "Cash") return true;
    let newErrors = {};
    if (!cardData.customerName) newErrors.customerName = "Required";
    if (!cardData.email) newErrors.email = "Required";
    if (!cardData.nameOnCard) newErrors.nameOnCard = "Required";
    if (!cardData.cardNumber) newErrors.cardNumber = "Required";
    if (!cardData.expiry) newErrors.expiry = "Required";
    if (!cardData.cvv) newErrors.cvv = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const payNow = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);
    try {
      // 1️⃣ Make payment
      const res = await axiosInstance.post("/payments/pay", {
        bookingId: id,
        method,
        ...cardData,
      });

      if (!res.data.success) throw new Error(res.data.message || "Payment failed");

      // 2️⃣ Assign rooms (make sure axios baseURL has /api)
      const assignRes = await axiosInstance.post("/bookings/assign-rooms", {
        bookingId: id,
      });

      if (!assignRes.data.success) {
        alert("Payment done, but room assignment failed. Contact admin.");
      }

      // 3️⃣ Redirect to final invoice
      navigate(`/invoice/${id}`);
    } catch (err) {
      console.error("Payment Error:", err);
      alert(err.response?.data?.message || err.message || "Payment failed. Please try again.");
    }
    setIsProcessing(false);
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (!booking) return <Typography>No booking found.</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5">Payment</Typography>

        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Payment Method</InputLabel>
          <Select value={method} onChange={(e) => setMethod(e.target.value)}>
            <MenuItem value="Online">Online</MenuItem>
            <MenuItem value="Cash">Cash</MenuItem>
          </Select>
        </FormControl>

        {method === "Online" && (
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              name="customerName"
              label="Full Name"
              value={cardData.customerName}
              onChange={handleChange}
              sx={{ mb: 1 }}
              error={!!errors.customerName}
              helperText={errors.customerName}
            />
            <TextField
              fullWidth
              name="email"
              label="Email"
              value={cardData.email}
              onChange={handleChange}
              sx={{ mb: 1 }}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              fullWidth
              name="nameOnCard"
              label="Name on Card"
              value={cardData.nameOnCard}
              onChange={handleChange}
              sx={{ mb: 1 }}
              error={!!errors.nameOnCard}
              helperText={errors.nameOnCard}
            />
            <TextField
              fullWidth
              name="cardNumber"
              label="Card Number"
              value={cardData.cardNumber}
              onChange={handleChange}
              sx={{ mb: 1 }}
              error={!!errors.cardNumber}
              helperText={errors.cardNumber}
            />
            <TextField
              fullWidth
              name="expiry"
              label="Expiry"
              value={cardData.expiry}
              onChange={handleChange}
              sx={{ mb: 1 }}
              error={!!errors.expiry}
              helperText={errors.expiry}
            />
            <TextField
              fullWidth
              name="cvv"
              label="CVV"
              type="password"
              value={cardData.cvv}
              onChange={handleChange}
              sx={{ mb: 1 }}
              error={!!errors.cvv}
              helperText={errors.cvv}
            />
          </Box>
        )}

        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={payNow}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : `Pay Rs ${booking.totalAmount}`}
        </Button>
      </Paper>
    </Box>
  );
}