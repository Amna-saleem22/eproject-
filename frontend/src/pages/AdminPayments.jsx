// src/pages/AdminPayments.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import {
  Container, Typography, Table, TableHead, TableRow, TableCell,
  TableBody, CircularProgress, Grid, TextField, Button, Box
} from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Luxury Theme
const luxuryTheme = {
  colors: {
    primaryMain: '#1565C0',
    primaryLight: '#0D47A1',
    background: { main: '#0A0A0A', secondary: '#111111' },
    text: { primary: '#FFFFFF', secondary: 'rgba(255,255,255,0.5)' },
    border: { light: 'rgba(255,255,255,0.08)', strong: 'rgba(13,71,161,0.4)' },
    gradient: { glow: 'radial-gradient(circle at 0% 50%, #0d47a1 0%, transparent 50%)' }
  },
  effects: { transition: '0.3s ease' }
};

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalRooms, setTotalRooms] = useState(50); // Example, should fetch real value from stats API
  const [occupiedRooms, setOccupiedRooms] = useState(35); // Example
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const fetchPayments = async () => {
    setLoading(true);
    try {
      let url = `/payments/all`;
      if (fromDate && toDate) url += `?fromDate=${fromDate}&toDate=${toDate}`;
      const res = await axiosInstance.get(url);
      setPayments(res.data.payments || []);
      setTotalRevenue(res.data.totalRevenue || 0);

      // Optional: set occupancy data dynamically if API provides
      setTotalRooms(res.data.totalRooms || 50);
      setOccupiedRooms(res.data.occupiedRooms || 35);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // Pie Chart Data
  const occupancyData = [
    { name: "Occupied", value: occupiedRooms },
    { name: "Available", value: totalRooms - occupiedRooms }
  ];
  const COLORS = [luxuryTheme.colors.primaryMain, '#4caf50'];

  return (
    <Box style={{
      minHeight: '100vh',
      background: luxuryTheme.colors.background.main,
      padding: '2rem 1rem',
      color: luxuryTheme.colors.text.primary,
      fontFamily: 'Arial, sans-serif'
    }}>
      <Container maxWidth="xl">

        {/* Header with floating pie chart */}
        <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', position: 'relative' }}>
          <Box>
            <Typography style={{ fontSize: '2.2rem', fontWeight: 700 }}>Payments Dashboard</Typography>
            <Typography style={{
              color: luxuryTheme.colors.text.secondary,
              borderBottom: `1px solid ${luxuryTheme.colors.border.light}`,
              paddingBottom: '0.5rem',
              marginTop: '0.3rem'
            }}>
              Review all hotel payments in one place
            </Typography>
          </Box>
          {/* Floating Pie Chart */}
          <Box style={{
            width: '200px', height: '200px',
            background: luxuryTheme.colors.background.secondary,
            borderRadius: '16px',
            border: `1px solid ${luxuryTheme.colors.border.light}`,
            boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
            padding: '1rem'
          }}>
            <Typography style={{ color: luxuryTheme.colors.text.secondary, fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.3rem', textAlign: 'center' }}>
              Occupancy Rate
            </Typography>
            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Pie
                  data={occupancyData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  fill={luxuryTheme.colors.primaryMain}
                  paddingAngle={3}
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                  isAnimationActive={true}
                >
                  {occupancyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: luxuryTheme.colors.background.secondary, border: `1px solid ${luxuryTheme.colors.border.light}`, color: luxuryTheme.colors.text.primary }}
                />
                <Legend wrapperStyle={{ color: luxuryTheme.colors.text.secondary, fontSize: '0.75rem' }} />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Box>

        {/* Date Filter */}
        <Grid container spacing={2} style={{ marginBottom: '1.5rem' }}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              type="date"
              label="From"
              InputLabelProps={{ shrink: true }}
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              fullWidth
              style={{
                background: luxuryTheme.colors.background.secondary,
                borderRadius: '8px',
                input: { color: luxuryTheme.colors.text.primary }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              type="date"
              label="To"
              InputLabelProps={{ shrink: true }}
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              fullWidth
              style={{
                background: luxuryTheme.colors.background.secondary,
                borderRadius: '8px',
                input: { color: luxuryTheme.colors.text.primary }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              onClick={fetchPayments}
              style={{
                background: luxuryTheme.colors.primaryMain,
                color: '#fff',
                fontWeight: 600,
                padding: '0.7rem 1.5rem',
                borderRadius: '8px',
                textTransform: 'none',
                transition: luxuryTheme.effects.transition,
                cursor: 'pointer'
              }}
            >
              Filter
            </Button>
          </Grid>
        </Grid>

        {/* Total Revenue Card */}
        <Box style={{
          background: luxuryTheme.colors.background.secondary,
          padding: '1.8rem',
          borderRadius: '12px',
          marginBottom: '2rem',
          border: `1px solid ${luxuryTheme.colors.border.light}`,
          boxShadow: `0 10px 25px rgba(0,0,0,0.5)`,
          transition: '0.3s ease',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <Typography style={{ fontSize: '1.3rem', color: luxuryTheme.colors.text.secondary, marginBottom: '0.5rem' }}>
            Total Revenue
          </Typography>
          <Typography style={{ fontSize: '2rem', fontWeight: 700, color: luxuryTheme.colors.primaryLight }}>
            Rs {(totalRevenue || 0).toLocaleString()}
          </Typography>
          {/* Animated glow */}
          <Box style={{
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: luxuryTheme.colors.gradient.glow,
            filter: 'blur(60px)',
            opacity: 0.2,
            zIndex: 0
          }} />
        </Box>

        {/* Payment Table */}
        <Box style={{
          background: luxuryTheme.colors.background.secondary,
          borderRadius: '12px',
          overflowX: 'auto',
          border: `1px solid ${luxuryTheme.colors.border.light}`,
          boxShadow: `0 10px 25px rgba(0,0,0,0.5)`,
          padding: '1rem',
          transition: '0.3s ease'
        }}>
          {loading ? (
            <Box style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
              <CircularProgress style={{ color: luxuryTheme.colors.primaryMain }} />
            </Box>
          ) : (
            <Table style={{ minWidth: '900px' }}>
              <TableHead style={{ borderBottom: `2px solid ${luxuryTheme.colors.border.strong}` }}>
                <TableRow>
                  {["Booking ID", "Customer", "Amount", "Status", "Method", "Date"].map((head, i) => (
                    <TableCell key={i} style={{ color: luxuryTheme.colors.text.secondary, fontWeight: 600 }}>{head}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {payments.map((p) => (
                  <TableRow key={p._id} style={{
                    transition: '0.2s ease',
                    cursor: 'pointer',
                    '&:hover': { background: 'rgba(21,101,192,0.1)' }
                  }}>
                    <TableCell style={{ color: luxuryTheme.colors.text.primary }}>{p.bookingId?._id || p.bookingId}</TableCell>
                    <TableCell style={{ color: luxuryTheme.colors.text.primary }}>{p.customerName || p.bookingId?.customerName}</TableCell>
                    <TableCell style={{ color: luxuryTheme.colors.text.primary }}>Rs {p.amount?.toLocaleString()}</TableCell>
                    <TableCell style={{
                      color: p.paymentStatus === 'paid' ? '#4caf50' : '#f44336',
                      fontWeight: 600
                    }}>{p.paymentStatus}</TableCell>
                    <TableCell style={{ color: luxuryTheme.colors.text.primary }}>{p.method}</TableCell>
                    <TableCell style={{ color: luxuryTheme.colors.text.primary }}>{new Date(p.createdAt).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Box>
      </Container>
    </Box>
  );
}