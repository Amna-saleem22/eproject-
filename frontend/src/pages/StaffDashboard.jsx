import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function StaffDashboard() {
  const [bookings, setBookings] = useState([]);

  // Fetch all pending bookings
  useEffect(() => {
    const fetchBookings = async () => {
      const res = await axiosInstance.get("/bookings/pending");
      setBookings(res.data);
    };

    fetchBookings();
  }, []);

  // Confirm booking
  const handleConfirm = async (id) => {
    await axiosInstance.patch(`/bookings/${id}/confirm`);
    alert("Booking Confirmed ✅");

    // Remove confirmed booking from list
    setBookings(bookings.filter((b) => b._id !== id));
  };

  // Cancel booking
  const handleCancel = async (id) => {
    await axiosInstance.patch(`/bookings/${id}/cancel`);
    alert("Booking Cancelled ❌");

    setBookings(bookings.filter((b) => b._id !== id));
  };

  return (
    <div>
      <h2>Staff Dashboard - Pending Bookings</h2>

      {bookings.map((booking) => (
        <div key={booking._id} style={{ border: "1px solid gray", margin: 10, padding: 10 }}>
          <p>Guest: {booking.guestName}</p>
          <p>Status: {booking.status}</p>

          <button onClick={() => handleConfirm(booking._id)}>
            Confirm ✅
          </button>

          <button onClick={() => handleCancel(booking._id)}>
            Cancel ❌
          </button>
        </div>
      ))}
    </div>
  );
}
