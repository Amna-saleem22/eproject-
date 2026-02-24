import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Backend token from localStorage
  const token = localStorage.getItem("token");

  // Fetch pending bookings
  const fetchBookings = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/admin/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(data.bookings);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching bookings:", error.response?.data || error.message);
      setLoading(false);
    }
  };

  // Confirm booking
  const confirmBooking = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/admin/bookings/${id}/confirm`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Refresh bookings after confirmation
      fetchBookings();
    } catch (error) {
      console.error("Error confirming booking:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) return <div>Loading bookings...</div>;

  return (
    <div>
      <h1>Admin Dashboard 👑</h1>
      {bookings.length === 0 ? (
        <p>No pending bookings</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Guest Name</th>
              <th>Guest Email</th>
              <th>Service</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.guestId.name}</td>
                <td>{booking.guestId.email}</td>
                <td>{booking.service}</td>
                <td>{booking.status}</td>
                <td>
                  {booking.status === "pending" && (
                    <button onClick={() => confirmBooking(booking._id)}>Confirm</button>
                  )}
                  {booking.status === "confirmed" && <span>Confirmed ✅</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;