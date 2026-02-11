import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

export default function PaymentPage() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  const [cardData, setCardData] = useState({
    customerName: "",
    email: "",
    nameOnCard: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});

  // Fetch booking details
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/bookings/${id}`);
        setBooking(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Booking fetch error:", err.response?.data || err.message);
        setApiError("Failed to load booking details.");
        setLoading(false);
      }
    };
    fetchBooking();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "cardNumber") {
      let val = value.replace(/\D/g, "");
      val = val.match(/.{1,4}/g)?.join("-") || "";
      setCardData({ ...cardData, [name]: val });
      return;
    }

    if (name === "expiry") {
      let val = value.replace(/\D/g, "");
      if (val.length > 2) val = val.slice(0, 2) + (val.length > 2 ? "/" + val.slice(2, 4) : "");
      setCardData({ ...cardData, [name]: val });
      return;
    }

    setCardData({ ...cardData, [name]: value });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!/^[A-Za-z\s]+$/.test(cardData.customerName))
      newErrors.customerName = "Name must contain only letters.";

    if (!/^\S+@\S+\.\S+$/.test(cardData.email))
      newErrors.email = "Enter a valid email address.";

    if (!/^[A-Za-z\s]+$/.test(cardData.nameOnCard))
      newErrors.nameOnCard = "Card name must contain only letters.";

    const cardDigits = cardData.cardNumber.replace(/\D/g, "");
    if (!/^\d{16}$/.test(cardDigits))
      newErrors.cardNumber = "Card number must be 16 digits.";

    if (!/^\d{3}$/.test(cardData.cvv))
      newErrors.cvv = "CVV must be 3 digits.";

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardData.expiry))
      newErrors.expiry = "Expiry must be in MM/YY format.";
    else {
      const [month, year] = cardData.expiry.split("/");
      const expiryDate = new Date(`20${year}`, month);
      if (expiryDate < new Date()) newErrors.expiry = "Expiry must be a future date.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const payNow = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      await axiosInstance.post("/payments/pay", {
        bookingId: id,
        method: "Online",
        customerName: cardData.customerName,
        email: cardData.email,
        nameOnCard: cardData.nameOnCard,
        cardNumber: cardData.cardNumber,
        expiry: cardData.expiry,
      });

      setLoading(false);
      navigate(`/invoice/${id}?method=online`);
    } catch (err) {
      console.error("Payment error:", err.response?.data || err.message);
      setApiError("Payment failed. Please check your details and try again.");
      setLoading(false);
    }
  };

  if (loading) return <h2 style={{ color: "#fff", textAlign: "center" }}>Loading...</h2>;
  if (apiError) return <h2 style={{ color: "red", textAlign: "center" }}>{apiError}</h2>;
  if (!booking) return <h2 style={{ color: "#fff", textAlign: "center" }}>No booking found.</h2>;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#1e1e2f", color: "#f5f5f5", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" }}>
      <div style={{ background: "#2c2c3e", padding: "30px", borderRadius: "10px", width: "100%", maxWidth: "400px", boxShadow: "0 0 15px rgba(0,0,0,0.5)" }}>
        <h2 style={{ textAlign: "center", color: "#00e676", marginBottom: "20px" }}>💳 Online Payment</h2>
        <h3 style={{ textAlign: "center", color: "#00e676" }}>Total Amount: Rs {booking.totalAmount}</h3>

        {["customerName","email","nameOnCard","cardNumber","expiry","cvv"].map((field) => (
          <div key={field} style={{ marginBottom: "15px" }}>
            <input
              type={field === "cvv" ? "password" : "text"}
              name={field}
              placeholder={field === "cvv" ? "CVV (3 digits)" : field.replace(/([A-Z])/g, ' $1')}
              value={cardData[field]}
              onChange={handleChange}
              maxLength={field === "cvv" ? 3 : field === "cardNumber" ? 19 : field === "expiry" ? 5 : undefined}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #444",
                backgroundColor: "#1e1e2f",
                color: "#f5f5f5",
              }}
            />
            {errors[field] && <p style={{ color: "#ff5252", margin: "5px 0 0 0", fontSize: "13px" }}>{errors[field]}</p>}
          </div>
        ))}

        <button
          onClick={payNow}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#00e676",
            color: "#1e1e2f",
            fontWeight: "bold",
            fontSize: "16px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Pay Rs {booking.totalAmount}
        </button>
      </div>
    </div>
  );
}
