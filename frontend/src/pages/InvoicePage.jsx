import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import jsPDF from "jspdf";

export default function InvoicePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ---------------- Fetch Booking & Payment ----------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const bookingRes = await axiosInstance.get(`/bookings/${id}`);
        setBooking(bookingRes.data);

        const paymentRes = await axiosInstance.get(`/payments/booking/${id}`);
        setPayment(paymentRes.data);

        setLoading(false);

        // Disable back button after invoice loaded
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener("popstate", handleBackButton);

      } catch (err) {
        console.error("Invoice fetch error:", err.response?.data || err.message);
        setError("Failed to load invoice data. Please check booking/payment.");
        setLoading(false);
      }
    };

    fetchData();
    return () => window.removeEventListener("popstate", handleBackButton);
  }, [id]);

  const handleBackButton = () => {
    window.history.pushState(null, document.title, window.location.href);
  };

  if (loading) return <h2 style={{ color: "#fff", textAlign: "center" }}>Loading Invoice...</h2>;
  if (error) return <h2 style={{ color: "red", textAlign: "center" }}>{error}</h2>;

  const maskedCard = payment?.cardNumber
    ? payment.cardNumber.replace(/\d(?=\d{4})/g, "*")
    : "N/A";

  const downloadPDF = () => {
    if (!booking || !payment) return;

    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("🧾 Hotel Booking Invoice", 20, 20);

    doc.setFontSize(12);
    doc.text(`Booking ID: ${booking._id}`, 20, 40);
    doc.text(`Guest Name: ${booking.guestName || "N/A"}`, 20, 50);
    doc.text(`Phone: ${booking.phone || "N/A"}`, 20, 60);
    doc.text(`Total Guests: ${booking.totalGuests || "N/A"}`, 20, 70);
    doc.text(`Room Type: ${booking.roomType || "N/A"}`, 20, 80);
    doc.text(`Food Package: ${booking.foodPackage || "N/A"}`, 20, 90);
    doc.text(`Check-In: ${booking.checkInDate || "N/A"}`, 20, 100);
    doc.text(`Check-Out: ${booking.checkOutDate || "N/A"}`, 20, 110);
    doc.text(`Nights: ${booking.nights || 0}`, 20, 120);
    doc.text(`Room Cost: Rs ${booking.roomCost || 0}`, 20, 130);
    doc.text(`Food Cost: Rs ${booking.foodCost || 0}`, 20, 140);
    doc.text(`Total Amount: Rs ${booking.totalAmount || 0}`, 20, 150);

    doc.text(`Payment Method: ${payment.method || "N/A"}`, 20, 160);
    doc.text(`Payment Status: ${payment.paymentStatus || "N/A"}`, 20, 170);

    if (payment.method === "Online") {
      doc.text(`Paid By: ${payment.nameOnCard || "N/A"}`, 20, 180);
      doc.text(`Email: ${payment.email || "N/A"}`, 20, 190);
      doc.text(`Card Number: ${maskedCard}`, 20, 200);
      doc.text(`Expiry: ${payment.expiry || "N/A"}`, 20, 210);
    }

    doc.text("✅ Booking Confirmed", 20, 230);

    doc.save(`Invoice-${booking._id}.pdf`);
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#1e1e2f",
        color: "#f5f5f5",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#00e676" }}>
        🧾 Invoice
      </h2>

      <div style={{ maxWidth: "700px", margin: "0 auto", background: "#2c2c3e", padding: "20px", borderRadius: "10px", boxShadow: "0 0 10px rgba(0,0,0,0.5)" }}>
        <p><b>Booking ID:</b> {booking._id}</p>
        <p><b>Guest Name:</b> {booking.guestName || "N/A"}</p>
        <p><b>Phone:</b> {booking.phone || "N/A"}</p>
        <p><b>Total Guests:</b> {booking.totalGuests || "N/A"}</p>
        <p><b>Room Type:</b> {booking.roomType || "N/A"}</p>
        <p><b>Food Package:</b> {booking.foodPackage || "N/A"}</p>
        <p><b>Check-In:</b> {booking.checkInDate || "N/A"}</p>
        <p><b>Check-Out:</b> {booking.checkOutDate || "N/A"}</p>
        <p><b>Nights:</b> {booking.nights || 0}</p>
        <p><b>Room Cost:</b> Rs {booking.roomCost || 0}</p>
        <p><b>Food Cost:</b> Rs {booking.foodCost || 0}</p>
        <h3 style={{ color: "#00e676" }}>Total Amount: Rs {booking.totalAmount || 0}</h3>

        <h3>Payment Method: {payment.method || "N/A"}</h3>
        <p>Payment Status: {payment.paymentStatus || "N/A"}</p>

        {payment.method === "Online" && (
          <>
            <p>Paid By: {payment.nameOnCard || "N/A"}</p>
            <p>Email: {payment.email || "N/A"}</p>
            <p>Card Number: {maskedCard}</p>
            <p>Expiry: {payment.expiry || "N/A"}</p>
          </>
        )}

        {payment.paymentStatus !== "Paid" && payment.method === "Cash" && (
          <p style={{ color: "#ff5252", marginTop: "15px" }}>
            Payment Pending. Please pay at hotel reception.
          </p>
        )}

        <button
          onClick={downloadPDF}
          style={{
            padding: "12px 20px",
            marginTop: "20px",
            background: "#00e676",
            color: "#1e1e2f",
            fontWeight: "bold",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            width: "100%",
            fontSize: "16px",
          }}
        >
          Download Invoice PDF
        </button>
      </div>
    </div>
  );
}
