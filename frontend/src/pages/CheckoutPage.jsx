import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

export default function CheckoutPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const cashPayment = async () => {
    await axiosInstance.post("/payments/pay", { bookingId: id, method: "Cash" });
    navigate(`/invoice/${id}?method=cash`);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#1e1e2f", color: "#f5f5f5", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" }}>
      <div style={{ background: "#2c2c3e", padding: "30px", borderRadius: "10px", width: "100%", maxWidth: "400px", boxShadow: "0 0 15px rgba(0,0,0,0.5)" }}>
        <h2 style={{ textAlign: "center", color: "#00e676", marginBottom: "20px" }}>💰 Checkout Page</h2>
        <h3 style={{ textAlign: "center", color: "#00e676" }}>Select Payment Method</h3>

        <button
          onClick={cashPayment}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "15px",
            backgroundColor: "#ff5252",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Pay Cash at Hotel
        </button>

        <button
          onClick={() => navigate(`/payment/${id}`)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "15px",
            backgroundColor: "#00e676",
            color: "#1e1e2f",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Pay Online (Card)
        </button>
      </div>
    </div>
  );
}
