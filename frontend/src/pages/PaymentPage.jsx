import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import axiosInstance from "../api/axiosInstance";

export default function PaymentPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [method, setMethod] = useState("Cash");
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await axiosInstance.get(`/bookings/${id}`);
        setBooking(res.data.booking);

        // Prefill customer info if available
        if (res.data.booking.guestName) setCustomerName(res.data.booking.guestName);
        if (res.data.booking.user?.email) setEmail(res.data.booking.user.email);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch booking data");
      }
    };
    fetchBooking();
  }, [id]);

  // ✅ Realistic validation functions
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidCardNumber = (num) =>
    /^\d{16}$/.test(num.replace(/\s+/g, "")); // 16 digits

  const isValidExpiry = (exp) =>
    /^(0[1-9]|1[0-2])\/\d{2}$/.test(exp);

  const isValidCvv = (cvv) =>
    /^\d{3,4}$/.test(cvv);

  const payNow = async () => {
    setError("");

    // Guest info validation
    if (!customerName || !email) {
      setError("Customer name and email are required");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Invalid email format");
      return;
    }

    // Card info validation for online payments
    if (method === "Online") {
      if (!nameOnCard || !cardNumber || !expiry || !cvv) {
        setError("Complete card details are required for online payment");
        return;
      }
      if (!isValidCardNumber(cardNumber)) {
        setError("Invalid card number. Must be 16 digits");
        return;
      }
      if (!isValidExpiry(expiry)) {
        setError("Invalid expiry date. Use MM/YY format");
        return;
      }
      if (!isValidCvv(cvv)) {
        setError("Invalid CVV. Must be 3 or 4 digits");
        return;
      }
    }

    try {
      await axiosInstance.post("/payments/pay", {
        bookingId: id,
        method,
        customerName,
        email,
        nameOnCard: method === "Online" ? nameOnCard : "",
        cardNumber: method === "Online" ? cardNumber : "",
        expiry: method === "Online" ? expiry : "",
        cvv: method === "Online" ? cvv : "",
      });

      navigate(`/invoice/${id}`);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Payment failed");
    }
  };

  if (!booking) return <Typography>Loading booking...</Typography>;

  return (
    <Box p={3} display="flex" justifyContent="center">
      <Paper sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" mb={2}>
          Payment
        </Typography>

        {error && <Typography color="error" mb={2}>{error}</Typography>}

        <TextField
          label="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />

        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Payment Method</InputLabel>
          <Select value={method} onChange={(e) => setMethod(e.target.value)}>
            <MenuItem value="Cash">Cash</MenuItem>
            <MenuItem value="Online">Online</MenuItem>
          </Select>
        </FormControl>

        {method === "Online" && (
          <>
            <TextField
              label="Name on Card"
              value={nameOnCard}
              onChange={(e) => setNameOnCard(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
              placeholder="1234 5678 9012 3456"
            />
            <TextField
              label="Expiry (MM/YY)"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
              placeholder="MM/YY"
            />
            <TextField
              label="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
              placeholder="3 or 4 digits"
            />
          </>
        )}

        <Button variant="contained" fullWidth onClick={payNow}>
          Pay Rs {booking.totalAmount}
        </Button>
      </Paper>
    </Box>
  );
}