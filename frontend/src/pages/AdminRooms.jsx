// AdminRooms.jsx
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import {
  Container, Typography, Grid, Card, CardContent,
  TextField, Button, Chip, Box
} from "@mui/material";

export default function AdminRooms() {
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({
    roomType: "",
    totalRooms: 1,
    pricePerNight: 0,
    description: "",
    amenities: "",
  });

  const fetchRooms = async () => {
    try {
      const res = await axiosInstance.get("/rooms");
      setRooms(res.data.rooms || []);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to fetch rooms");
    }
  };

  useEffect(() => { fetchRooms(); }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...form,
        amenities: form.amenities.split(",").map(a => a.trim())
      };
      await axiosInstance.post("/rooms", payload);
      alert("Room created successfully ✅");
      setForm({ roomType: "", totalRooms: 1, pricePerNight: 0, description: "", amenities: "" });
      fetchRooms();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to create room");
    }
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>Hotel Rooms</Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6">Add New Room</Typography>
        <TextField label="Room Type" name="roomType" value={form.roomType} onChange={handleChange} sx={{ mr: 2, mb: 1 }} />
        <TextField label="Total Rooms" type="number" name="totalRooms" value={form.totalRooms} onChange={handleChange} sx={{ mr: 2, mb: 1 }} />
        <TextField label="Price/Night" type="number" name="pricePerNight" value={form.pricePerNight} onChange={handleChange} sx={{ mr: 2, mb: 1 }} />
        <TextField label="Description" name="description" value={form.description} onChange={handleChange} sx={{ mr: 2, mb: 1 }} />
        <TextField label="Amenities (comma separated)" name="amenities" value={form.amenities} onChange={handleChange} sx={{ mr: 2, mb: 1 }} />
        <Button variant="contained" onClick={handleSubmit}>Add Room</Button>
      </Box>

      <Typography variant="h5" gutterBottom>All Rooms</Typography>
      <Grid container spacing={3}>
        {rooms.map(r => (
          <Grid item xs={12} md={6} key={r._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{r.roomType}</Typography>
                <Typography>Total Rooms: {r.totalRooms}</Typography>
                <Typography>Price/Night: ₹{r.pricePerNight}</Typography>
                <Typography>Amenities: {r.amenities.join(", ")}</Typography>
                <Chip label={r.status.toUpperCase()} color={r.status === "available" ? "success" : "warning"} sx={{ mt: 1 }} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}