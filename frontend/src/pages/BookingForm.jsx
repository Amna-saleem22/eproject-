import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function BookingForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    guestName: "",
    phone: "",
    checkInDate: "",
    checkOutDate: "",
    adults: 1,
    children: 0,
    seniors: 0,
    roomType: "Standard",
    roomsCount: 1,
    foodPackage: "Breakfast",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBooking = async () => {
    if (!formData.checkInDate || !formData.checkOutDate) {
      alert("Please select dates!");
      return;
    }

    const adults = Number(formData.adults);
    const children = Number(formData.children);
    const seniors = Number(formData.seniors);
    const totalGuests = adults + children + seniors;

    const roomPrices = { Standard: 5000, Deluxe: 8000, Suite: 12000 };
    const foodPrices = { NoFood: 0, Breakfast: 500, HalfBoard: 1500, FullBoard: 2500 };

    const checkIn = new Date(formData.checkInDate);
    const checkOut = new Date(formData.checkOutDate);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    if (nights <= 0) {
      alert("Check-Out date must be after Check-In date");
      return;
    }

    const roomCost = roomPrices[formData.roomType] * nights * Number(formData.roomsCount);
    const foodCost = foodPrices[formData.foodPackage] * totalGuests * nights;
    const totalAmount = roomCost + foodCost;

    const bookingData = { ...formData, totalGuests, nights, roomCost, foodCost, totalAmount };
    const res = await axiosInstance.post("/bookings/create", bookingData);
    navigate(`/summary/${res.data.booking._id}`);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#1e1e2f", color: "#f5f5f5", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" }}>
      <div style={{ backgroundColor: "#2c2c3e", padding: "30px", borderRadius: "10px", width: "100%", maxWidth: "450px", boxShadow: "0 0 15px rgba(0,0,0,0.5)" }}>
        <h2 style={{ textAlign: "center", color: "#00e676", marginBottom: "20px" }}>🏨 Hotel Booking</h2>

        {["guestName","phone"].map((field) => (
          <div key={field} style={{ marginBottom: "15px" }}>
            <input
              placeholder={field === "guestName" ? "Guest Name" : "Phone"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #444",
                backgroundColor: "#1e1e2f",
                color: "#f5f5f5",
              }}
            />
          </div>
        ))}

        <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", marginBottom: "15px" }}>
          {["adults","children","seniors","roomsCount"].map((field) => (
            <div key={field} style={{ flex: 1 }}>
              <input
                type="number"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                min="0"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #444",
                  backgroundColor: "#1e1e2f",
                  color: "#f5f5f5",
                }}
              />
            </div>
          ))}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Room Type:</label>
          <select
            name="roomType"
            value={formData.roomType}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #444", backgroundColor: "#1e1e2f", color: "#f5f5f5", marginTop: "5px" }}
          >
            <option>Standard</option>
            <option>Deluxe</option>
            <option>Suite</option>
          </select>
        </div>

        <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
          <div style={{ flex: 1 }}>
            <label>Check-In Date:</label>
            <input
              type="date"
              name="checkInDate"
              value={formData.checkInDate}
              onChange={handleChange}
              style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #444", backgroundColor: "#1e1e2f", color: "#f5f5f5" }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label>Check-Out Date:</label>
            <input
              type="date"
              name="checkOutDate"
              value={formData.checkOutDate}
              onChange={handleChange}
              style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #444", backgroundColor: "#1e1e2f", color: "#f5f5f5" }}
            />
          </div>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Food Package:</label>
          <select
            name="foodPackage"
            value={formData.foodPackage}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #444", backgroundColor: "#1e1e2f", color: "#f5f5f5", marginTop: "5px" }}
          >
            <option value="NoFood">No Food</option>
            <option value="Breakfast">Breakfast</option>
            <option value="HalfBoard">Half Board</option>
            <option value="FullBoard">Full Board</option>
          </select>
        </div>

        <button
          onClick={handleBooking}
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
          Continue
        </button>
      </div>
    </div>
  );
}
