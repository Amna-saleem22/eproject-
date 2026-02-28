import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function AdminRooms() {
  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState({
    roomNumber: "",
    floor: "",
    type: "Standard",
    price: "",
    description: "",
  });

  const fetchRooms = async () => {
    try {
      const { data } = await axiosInstance.get("/rooms");
      setRooms(data);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/rooms", formData);
      alert("Room Added Successfully ✅");
      setFormData({
        roomNumber: "",
        floor: "",
        type: "Standard",
        price: "",
        description: "",
      });
      fetchRooms();
    } catch (error) {
      alert(error.response?.data?.message || "Error creating room");
    }
  };

  const changeStatus = async (id, status) => {
    try {
      await axiosInstance.put(`/rooms/${id}/status`, { status });
      fetchRooms();
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="container">
      <h2>Hotel Rooms Management</h2>

      {/* Add Room Form */}
      <form onSubmit={handleSubmit} className="room-form">
        <input
          type="number"
          name="roomNumber"
          placeholder="Room Number"
          value={formData.roomNumber}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="floor"
          placeholder="Floor"
          value={formData.floor}
          onChange={handleChange}
          required
        />
        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="Standard">Standard</option>
          <option value="Deluxe">Deluxe</option>
          <option value="Suite">Suite</option>
        </select>
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <button type="submit">Add Room</button>
      </form>

      {/* Rooms List */}
      <div className="grid">
        {rooms.map((room) => (
          <div key={room._id} className="card">
            <h3>Room {room.roomNumber}</h3>
            <p>Type: {room.type}</p>
            <p>Floor: {room.floor}</p>
            <p>Price: Rs {room.price}</p>
            <p>Status: <strong>{room.status}</strong></p>

            {/* Only allow Maintenance <-> Available */}
            {room.status === "available" && (
              <button onClick={() => changeStatus(room._id, "maintenance")}>
                Set Maintenance
              </button>
            )}
            {room.status === "maintenance" && (
              <button onClick={() => changeStatus(room._id, "available")}>
                Set Available
              </button>
            )}

            {/* No manual Occupied button */}
          </div>
        ))}
      </div>
    </div>
  );
}