import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function SummaryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    axiosInstance.get(`/bookings/${id}`).then((res) => setBooking(res.data));
  }, [id]);

  if (!booking) return <p style={{ color: "#fff", textAlign: "center" }}>Loading...</p>;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#1e1e2f", color: "#f5f5f5", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" }}>
      <div style={{ backgroundColor: "#2c2c3e", padding: "30px", borderRadius: "10px", width: "100%", maxWidth: "400px", boxShadow: "0 0 15px rgba(0,0,0,0.5)" }}>
        <h2 style={{ textAlign: "center", color: "#00e676", marginBottom: "20px" }}>📝 Booking Summary</h2>

        <p><b>Total Guests:</b> {booking.totalGuests}</p>
        <p><b>Room Type:</b> {booking.roomType}</p>
        <p><b>Food Package:</b> {booking.foodPackage}</p>
        <h3>Total Amount: Rs {booking.totalAmount}</h3>

        <button
          onClick={() => navigate(`/checkout/${booking._id}`)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "20px",
            backgroundColor: "#00e676",
            color: "#1e1e2f",
            fontWeight: "bold",
            fontSize: "16px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
