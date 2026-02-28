// import React, { useEffect, useState } from "react";
// import axiosInstance from "../api/axiosInstance";
// import { Box, Card, Typography, Grid } from "@mui/material";

// export default function AdminDashboardStats() {
//   const [stats, setStats] = useState(null);

//   const fetchStats = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axiosInstance.get("/admin/stats", {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setStats(res.data.stats);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchStats();
//   }, []);

//   if (!stats) return <Typography>Loading stats...</Typography>;

//   return (
//     <Grid container spacing={3}>
//       <Grid item xs={12} md={4}>
//         <Card sx={{ p: 2 }}>
//           <Typography variant="h6">Total Rooms</Typography>
//           <Typography variant="h4">{stats.totalRooms}</Typography>
//         </Card>
//       </Grid>
//       <Grid item xs={12} md={4}>
//         <Card sx={{ p: 2 }}>
//           <Typography variant="h6">Occupied Rooms</Typography>
//           <Typography variant="h4">{stats.occupiedRooms}</Typography>
//         </Card>
//       </Grid>
//       <Grid item xs={12} md={4}>
//         <Card sx={{ p: 2 }}>
//           <Typography variant="h6">Available Rooms</Typography>
//           <Typography variant="h4">{stats.availableRooms}</Typography>
//         </Card>
//       </Grid>
//       <Grid item xs={12} md={4}>
//         <Card sx={{ p: 2 }}>
//           <Typography variant="h6">Total Bookings</Typography>
//           <Typography variant="h4">{stats.totalBookings}</Typography>
//         </Card>
//       </Grid>
//       <Grid item xs={12} md={4}>
//         <Card sx={{ p: 2 }}>
//           <Typography variant="h6">Total Guests</Typography>
//           <Typography variant="h4">{stats.totalGuests}</Typography>
//         </Card>
//       </Grid>
//       <Grid item xs={12} md={4}>
//         <Card sx={{ p: 2 }}>
//           <Typography variant="h6">Total Revenue</Typography>
//           <Typography variant="h4">₹{stats.totalRevenue.toLocaleString()}</Typography>
//         </Card>
//       </Grid>
//     </Grid>
//   );
// }







































































import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { Box, Card, Typography, Grid } from "@mui/material";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function AdminDashboardStats() {
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.get("/admin/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(res.data.stats);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (!stats) return <Typography>Loading stats...</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2 }}>
            <Typography>Total Rooms</Typography>
            <Typography variant="h4">{stats.totalRooms}</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2 }}>
            <Typography>Occupied Rooms</Typography>
            <Typography variant="h4">{stats.occupiedRooms}</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2 }}>
            <Typography>Available Rooms</Typography>
            <Typography variant="h4">{stats.availableRooms}</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2 }}>
            <Typography>Total Bookings</Typography>
            <Typography variant="h4">{stats.totalBookings}</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2 }}>
            <Typography>Total Guests</Typography>
            <Typography variant="h4">{stats.totalGuests}</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2 }}>
            <Typography>Total Revenue</Typography>
            <Typography variant="h4">₹{stats.totalRevenue.toLocaleString()}</Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Monthly Revenue Chart */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          Monthly Revenue (Last 6 Months)
        </Typography>
        <Card sx={{ p: 2, height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stats.monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={value => `₹${value.toLocaleString()}`} />
              <Line type="monotone" dataKey="revenue" stroke="#1976d2" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </Box>
    </Box>
  );
}