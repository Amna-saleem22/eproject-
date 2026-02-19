import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function CheckoutPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setError("Invalid booking ID");
      setLoading(false);
      return;
    }

    const fetchBooking = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await axiosInstance.get(`/bookings/${id}`);
        setBooking(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Checkout fetch error:", err.response?.data || err.message);
        setError(err.response?.data?.message || "Failed to load booking.");
        setLoading(false);
      }
    };
    fetchBooking();
  }, [id]);

  if (loading) return <h2 style={{ color:"#fff", textAlign:"center" }}>Loading...</h2>;
  if (error) return <h2 style={{ color:"red", textAlign:"center" }}>{error}</h2>;
  if (!booking) return null;

  return (
    <div style={{ minHeight:"100vh", backgroundColor:"#1e1e2f", color:"#f5f5f5", display:"flex", justifyContent:"center", alignItems:"center", padding:"20px" }}>
      <div style={{ backgroundColor:"#2c2c3e", padding:"30px", borderRadius:"10px", width:"100%", maxWidth:"400px", boxShadow:"0 0 15px rgba(0,0,0,0.5)" }}>
        <h2 style={{ textAlign:"center", color:"#00e676", marginBottom:"20px" }}>📋 Checkout</h2>

        <p><b>Guest Name:</b> {booking.guestName}</p>
        <p><b>Phone:</b> {booking.phone}</p>
        <p><b>Total Guests:</b> {booking.totalGuests}</p>
        <p><b>Room Type:</b> {booking.roomType}</p>
        <p><b>Food Package:</b> {booking.foodPackage}</p>
        <p><b>Check-In:</b> {booking.checkInDate}</p>
        <p><b>Check-Out:</b> {booking.checkOutDate}</p>
        <h3 style={{ color:"#00e676" }}>Total Amount: Rs {booking.totalAmount}</h3>

        <button
          onClick={() => navigate(`/payment/${booking._id}`)}
          style={{
            width:"100%",
            padding:"12px",
            marginTop:"20px",
            backgroundColor:"#00e676",
            color:"#1e1e2f",
            fontWeight:"bold",
            fontSize:"16px",
            border:"none",
            borderRadius:"5px",
            cursor:"pointer",
          }}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}
