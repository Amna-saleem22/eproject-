import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Hotel as HotelIcon,
  MeetingRoom as MeetingRoomIcon,
  BookOnline as BookOnlineIcon,
  People as PeopleIcon,
  MonetizationOn as MonetizationOnIcon,
  TrendingUp as TrendingUpIcon,
  CalendarToday as CalendarTodayIcon,
  AttachMoney as AttachMoneyIcon,
  Percent as PercentIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";

export default function AdminDashboardStats() {
  const [stats, setStats] = useState(null);

  // Theme colors
  const theme = {
    primary: { light: "#0D47A1", main: "#1565C0", dark: "#0A3D91" },
    background: {
      main: "#0A0A0A",
      secondary: "#111111",
      card: "#111111",
      glass: "rgba(255, 255, 255, 0.05)",
      gradient: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
    },
    text: { primary: "#FFFFFF", secondary: "rgba(255,255,255,0.7)", muted: "rgba(255,255,255,0.5)" },
    border: { light: "rgba(255,255,255,0.08)", strong: "rgba(13,71,161,0.4)" },
    effects: { blur: "blur(10px)", bottomLine: "linear-gradient(90deg, transparent, #0D47A1, transparent)" },
  };

  // Fetch stats from backend
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

  // Loading screen
  if (!stats) {
    return (
      <div style={{
        minHeight: '100vh', background: theme.background.gradient, display: 'flex', justifyContent: 'center', alignItems: 'center'
      }}>
        <HotelIcon style={{ fontSize: 60, color: theme.primary.main, opacity: 0.8, marginBottom: 20 }} />
        <p style={{ color: theme.text.primary }}>Loading luxury experience...</p>
      </div>
    );
  }

  // Stats calculations
  const occupancyRate = stats.totalRooms
    ? ((stats.occupiedRooms / stats.totalRooms) * 100).toFixed(1)
    : 0;
  const revenueData = stats.monthlyRevenue && stats.monthlyRevenue.length
    ? stats.monthlyRevenue
    : [
        { month: "Jan", revenue: 0 },
        { month: "Feb", revenue: 0 },
        { month: "Mar", revenue: 0 },
        { month: "Apr", revenue: 0 },
        { month: "May", revenue: 0 },
        { month: "Jun", revenue: 0 },
      ];

  const formatCurrency = (value) => `RS ${value.toLocaleString('en-IN')}`;

  // Animation variants
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } };
  const cardVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }, hover: { y: -6, transition: { duration: 0.3, ease: "easeOut" } } };

  return (
    <motion.div
      variants={containerVariants} initial="hidden" animate="visible"
      style={{ minHeight: '100vh', background: theme.background.gradient, padding: '32px', fontFamily: '"Inter", "Arial", sans-serif', position: 'relative' }}
    >
      {/* Stats Cards */}
      <motion.div variants={itemVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 24, marginBottom: 40 }}>
        {/* Card template */}
        {[
          { title: 'Total Rooms', value: stats.totalRooms, icon: <HotelIcon style={{ color: theme.primary.main, fontSize: 28 }} /> },
          { title: 'Occupied Rooms', value: `${stats.occupiedRooms} (${occupancyRate}%)`, icon: <MeetingRoomIcon style={{ color: theme.primary.main, fontSize: 28 }} /> },
          { title: 'Available Rooms', value: stats.availableRooms, icon: <HotelIcon style={{ color: theme.primary.main, fontSize: 28 }} /> },
          { title: 'Total Bookings', value: stats.totalBookings, icon: <BookOnlineIcon style={{ color: theme.primary.main, fontSize: 28 }} /> },
          { title: 'Total Guests', value: stats.totalGuests, icon: <PeopleIcon style={{ color: theme.primary.main, fontSize: 28 }} /> },
          { title: 'Total Revenue', value: formatCurrency(stats.totalRevenue), icon: <MonetizationOnIcon style={{ color: theme.primary.main, fontSize: 28 }} /> },
        ].map((card, idx) => (
          <motion.div key={idx} variants={cardVariants} whileHover="hover" style={{
            background: theme.background.glass, backdropFilter: theme.effects.blur,
            border: `1px solid ${theme.border.light}`, borderRadius: 20, padding: 24, position: 'relative', overflow: 'hidden', cursor: 'pointer'
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${theme.primary.light}, ${theme.primary.main})` }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ color: theme.text.secondary, margin: '0 0 8px 0', fontSize: '0.9rem' }}>{card.title}</p>
                <h2 style={{ color: theme.text.primary, margin: 0, fontSize: '2.2rem', fontWeight: 600 }}>{card.value}</h2>
              </div>
              <div style={{
                width: 56, height: 56, borderRadius: 16, background: theme.background.glass,
                border: `1px solid ${theme.border.strong}`, display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {card.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts */}
      <motion.div variants={itemVariants} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
        {/* Revenue Chart */}
        <motion.div variants={cardVariants} whileHover="hover" style={{
          background: theme.background.glass, borderRadius: 20, padding: 24, backdropFilter: theme.effects.blur, border: `1px solid ${theme.border.light}`
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <TrendingUpIcon style={{ color: theme.primary.main }} />
            <h3 style={{ color: theme.text.primary, margin: 0 }}>Revenue Trend (Last 6 Months)</h3>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={theme.primary.main} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={theme.primary.main} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={theme.border.light} strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" stroke={theme.text.muted} tick={{ fill: theme.text.muted, fontSize: 12 }} />
              <YAxis stroke={theme.text.muted} tick={{ fill: theme.text.muted, fontSize: 12 }} tickFormatter={v => `RS ${(v/1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ background: theme.background.secondary, border: `1px solid ${theme.border.strong}`, borderRadius: 12, color: theme.text.primary }} formatter={value => [`RS ${value.toLocaleString('en-IN')}`, 'Revenue']} />
              <Area type="monotone" dataKey="revenue" stroke={theme.primary.main} strokeWidth={3} fill="url(#revenueGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Quick Overview */}
        <motion.div variants={cardVariants} whileHover="hover" style={{
          background: theme.background.glass, borderRadius: 20, padding: 24, backdropFilter: theme.effects.blur, border: `1px solid ${theme.border.light}`
        }}>
          <h3 style={{ color: theme.text.primary, marginBottom: 24 }}>Quick Overview</h3>
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <PercentIcon style={{ color: theme.primary.main }} />
              <span style={{ color: theme.text.secondary }}>Occupancy Rate</span>
            </div>
            <span style={{ color: theme.text.primary, fontSize: '2rem', fontWeight: 600 }}>{occupancyRate}%</span>
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <AttachMoneyIcon style={{ color: theme.primary.main }} />
              <span style={{ color: theme.text.secondary }}>Average Daily Rate</span>
            </div>
            <span style={{ color: theme.text.primary, fontSize: '2rem', fontWeight: 600 }}>{formatCurrency(stats.totalRevenue / (stats.totalBookings || 1))}</span>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <MonetizationOnIcon style={{ color: theme.primary.main }} />
              <span style={{ color: theme.text.secondary }}>Revenue per Room</span>
            </div>
            <span style={{ color: theme.text.primary, fontSize: '2rem', fontWeight: 600 }}>{formatCurrency(stats.totalRevenue / stats.totalRooms)}</span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}