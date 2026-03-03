// import React, { useEffect, useState } from "react";
// import axiosInstance from "../api/axiosInstance";
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import HotelIcon from '@mui/icons-material/Hotel';
// import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
// import BookOnlineIcon from '@mui/icons-material/BookOnline';
// import PeopleIcon from '@mui/icons-material/People';
// import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
// import TrendingUpIcon from '@mui/icons-material/TrendingUp';
// import "./AdminDashboard.css"; // custom CSS file

// export default function AdminDashboardStats() {
//   const [stats, setStats] = useState(null);

//   const fetchStats = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axiosInstance.get("/admin/stats", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setStats(res.data.stats);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchStats();
//   }, []);

//   if (!stats) {
//     return (
//       <div className="dashboard-loading">
//         <p>Loading luxury experience...</p>
//       </div>
//     );
//   }

//   const revenueData = stats.monthlyRevenue || [];
//   const occupancyRate = stats.totalRooms
//     ? ((stats.occupiedRooms / stats.totalRooms) * 100).toFixed(1)
//     : 0;

//   return (
//     <div className="dashboard">
//       {/* Header */}
//       <div className="dashboard-header">
//         <h1>Dashboard Overview</h1>
//         <p>Welcome back to your luxury hotel management suite</p>
//       </div>

//       {/* Stats Cards */}
//       <div className="stats-cards">
//         <div className="stat-card">
//           <div>
//             <p className="stat-title">Total Rooms</p>
//             <h2 className="stat-value">{stats.totalRooms}</h2>
//           </div>
//           <HotelIcon className="stat-icon" />
//         </div>

//         <div className="stat-card gradient">
//           <div>
//             <p className="stat-title">Occupied Rooms</p>
//             <h2 className="stat-value">
//               {stats.occupiedRooms} ({occupancyRate}%)
//             </h2>
//           </div>
//           <MeetingRoomIcon className="stat-icon" />
//         </div>

//         <div className="stat-card">
//           <div>
//             <p className="stat-title">Available Rooms</p>
//             <h2 className="stat-value">{stats.availableRooms}</h2>
//           </div>
//           <HotelIcon className="stat-icon" />
//         </div>

//         <div className="stat-card gradient">
//           <div>
//             <p className="stat-title">Total Bookings</p>
//             <h2 className="stat-value">{stats.totalBookings}</h2>
//           </div>
//           <BookOnlineIcon className="stat-icon" />
//         </div>

//         <div className="stat-card">
//           <div>
//             <p className="stat-title">Total Guests</p>
//             <h2 className="stat-value">{stats.totalGuests}</h2>
//           </div>
//           <PeopleIcon className="stat-icon" />
//         </div>

//         <div className="stat-card gradient">
//           <div>
//             <p className="stat-title">Total Revenue</p>
//             <h2 className="stat-value">
//               RS{stats.totalRevenue.toLocaleString()}
//             </h2>
//           </div>
//           <MonetizationOnIcon className="stat-icon" />
//         </div>
//       </div>

//       {/* Charts Section */}
//       <div className="charts-section">
//         <div className="chart-card revenue-chart">
//           <div className="chart-header">
//             <TrendingUpIcon className="chart-icon" />
//             <h3>Revenue Trend (Last 6 Months)</h3>
//           </div>
//           <ResponsiveContainer width="100%" height={350}>
//             <AreaChart data={revenueData}>
//               <defs>
//                 <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="#1565C0" stopOpacity={0.3} />
//                   <stop offset="95%" stopColor="#1565C0" stopOpacity={0} />
//                 </linearGradient>
//               </defs>
//               <CartesianGrid stroke="#444" strokeDasharray="3 3" />
//               <XAxis dataKey="month" stroke="#888" />
//               <YAxis stroke="#888" tickFormatter={(v) => `RS${v / 1000}k`} />
//               <Tooltip />
//               <Area
//                 type="monotone"
//                 dataKey="revenue"
//                 stroke="#1565C0"
//                 strokeWidth={3}
//                 fill="url(#revenueGradient)"
//               />
//             </AreaChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="chart-card quick-overview">
//           <h3>Quick Overview</h3>
//           <div className="overview-item">
//             <p>Occupancy Rate</p>
//             <span>{occupancyRate}%</span>
//           </div>
//           <div className="overview-item">
//             <p>Average Daily Rate</p>
//             <span>RS{(stats.totalRevenue / (stats.totalBookings || 1)).toFixed(0)}</span>
//           </div>
//           <div className="overview-item">
//             <p>Revenue per Room</p>
//             <span>RS{(stats.totalRevenue / stats.totalRooms).toFixed(0)}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


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
import HotelIcon from '@mui/icons-material/Hotel';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import PeopleIcon from '@mui/icons-material/People';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PercentIcon from '@mui/icons-material/Percent';
import { motion } from "framer-motion";

export default function AdminDashboardStats() {
  const [stats, setStats] = useState(null);

  // Luxury Stay Theme Colors
  const theme = {
    primary: {
      light: '#0D47A1',
      main: '#1565C0',
      dark: '#0A3D91',
    },
    background: {
      main: '#0A0A0A',
      secondary: '#111111',
      card: '#111111',
      glass: 'rgba(255, 255, 255, 0.05)',
      gradient: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.7)',
      muted: 'rgba(255, 255, 255, 0.5)',
    },
    border: {
      light: 'rgba(255, 255, 255, 0.08)',
      strong: 'rgba(13, 71, 161, 0.4)',
    },
    effects: {
      radialGlow: 'radial-gradient(circle at 0% 50%, #0d47a1 0%, transparent 50%)',
      bottomLine: 'linear-gradient(90deg, transparent, #0D47A1, transparent)',
      blur: 'blur(10px)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    },
  };

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hover: {
      y: -6,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  if (!stats) {
    return (
      <div style={{
        minHeight: '100vh',
        background: theme.background.gradient,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative elements */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          background: theme.effects.radialGlow,
        }} />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.05,
          backgroundImage: `radial-gradient(circle at 2px 2px, ${theme.primary.light} 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            background: theme.background.glass,
            backdropFilter: theme.effects.blur,
            border: `1px solid ${theme.border.strong}`,
            borderRadius: '16px',
            padding: '40px',
            textAlign: 'center',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <HotelIcon style={{ 
            fontSize: 60, 
            color: theme.primary.main,
            marginBottom: '20px',
            opacity: 0.8,
          }} />
          <p style={{
            color: theme.text.primary,
            fontSize: '1.2rem',
            marginBottom: '20px',
            fontFamily: '"Playfair Display", serif',
          }}>
            Loading luxury experience...
          </p>
          <div style={{
            width: '200px',
            height: '4px',
            background: theme.background.glass,
            borderRadius: '2px',
            overflow: 'hidden',
            margin: '0 auto',
          }}>
            <motion.div
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                width: '50%',
                height: '100%',
                background: `linear-gradient(90deg, transparent, ${theme.primary.main}, transparent)`,
              }}
            />
          </div>
        </motion.div>
      </div>
    );
  }

  const revenueData = stats.monthlyRevenue || [];
  const occupancyRate = stats.totalRooms
    ? ((stats.occupiedRooms / stats.totalRooms) * 100).toFixed(1)
    : 0;

  // Fixed currency formatting function
  const formatCurrency = (value) => {
    return `RS ${value.toLocaleString('en-IN')}`;
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        minHeight: '100vh',
        background: theme.background.gradient,
        position: 'relative',
        overflow: 'hidden',
        padding: '32px',
        fontFamily: '"Inter", "Arial", sans-serif',
      }}
    >
      {/* Decorative background effects */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.1,
        background: theme.effects.radialGlow,
        pointerEvents: 'none',
      }} />
      
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.05,
        backgroundImage: `radial-gradient(circle at 2px 2px, ${theme.primary.light} 1px, transparent 0)`,
        backgroundSize: '40px 40px',
        pointerEvents: 'none',
      }} />

      {/* Floating orbs */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.primary.light} 0%, transparent 70%)`,
          filter: 'blur(60px)',
          opacity: 0.15,
          pointerEvents: 'none',
        }}
      />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
          x: [0, -50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.primary.dark} 0%, transparent 70%)`,
          filter: 'blur(80px)',
          opacity: 0.1,
          pointerEvents: 'none',
        }}
      />

      {/* Main content */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div variants={itemVariants} style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '16px',
              background: theme.background.glass,
              backdropFilter: theme.effects.blur,
              border: `1px solid ${theme.border.strong}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <HotelIcon style={{ color: theme.primary.main, fontSize: '30px' }} />
            </div>
            <div>
              <h1 style={{
                color: theme.text.primary,
                fontSize: '2.5rem',
                fontWeight: 700,
                margin: 0,
                fontFamily: '"Playfair Display", serif',
                position: 'relative',
                display: 'inline-block',
              }}>
                Dashboard Overview
                <span style={{
                  position: 'absolute',
                  bottom: '-8px',
                  left: 0,
                  width: '80px',
                  height: '3px',
                  background: theme.effects.bottomLine,
                  borderRadius: '2px',
                }} />
              </h1>
              <p style={{
                color: theme.text.secondary,
                fontSize: '1rem',
                marginTop: '12px',
                marginBottom: 0,
              }}>
                Welcome back to your luxury hotel management suite
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div variants={itemVariants} style={{ marginBottom: '40px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}>
            {/* Total Rooms Card */}
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              style={{
                background: theme.background.glass,
                backdropFilter: theme.effects.blur,
                border: `1px solid ${theme.border.light}`,
                borderRadius: '20px',
                padding: '24px',
                transition: theme.effects.transition,
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: `linear-gradient(90deg, ${theme.primary.light}, ${theme.primary.main})`,
              }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ color: theme.text.secondary, margin: '0 0 8px 0', fontSize: '0.9rem' }}>
                    Total Rooms
                  </p>
                  <h2 style={{ color: theme.text.primary, fontSize: '2.2rem', margin: 0, fontWeight: 600 }}>
                    {stats.totalRooms}
                  </h2>
                </div>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: theme.background.glass,
                  border: `1px solid ${theme.border.strong}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <HotelIcon style={{ color: theme.primary.main, fontSize: '28px' }} />
                </div>
              </div>
              <div style={{
                marginTop: '16px',
                paddingTop: '16px',
                borderTop: `1px solid ${theme.border.light}`,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: theme.primary.main,
                }} />
                <span style={{ color: theme.text.muted, fontSize: '0.85rem' }}>
                  Total hotel capacity
                </span>
              </div>
            </motion.div>

            {/* Occupied Rooms Card */}
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              style={{
                background: theme.background.glass,
                backdropFilter: theme.effects.blur,
                border: `1px solid ${theme.border.strong}`,
                borderRadius: '20px',
                padding: '24px',
                transition: theme.effects.transition,
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: `linear-gradient(90deg, ${theme.primary.light}, ${theme.primary.main})`,
              }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ color: theme.text.secondary, margin: '0 0 8px 0', fontSize: '0.9rem' }}>
                    Occupied Rooms
                  </p>
                  <h2 style={{ color: theme.text.primary, fontSize: '2.2rem', margin: 0, fontWeight: 600 }}>
                    {stats.occupiedRooms}
                  </h2>
                </div>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: theme.background.glass,
                  border: `1px solid ${theme.border.strong}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <MeetingRoomIcon style={{ color: theme.primary.main, fontSize: '28px' }} />
                </div>
              </div>
              <div style={{
                marginTop: '16px',
                paddingTop: '16px',
                borderTop: `1px solid ${theme.border.light}`,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: theme.primary.main,
                }} />
                <span style={{ color: theme.text.muted, fontSize: '0.85rem' }}>
                  Occupancy rate: {occupancyRate}%
                </span>
              </div>
            </motion.div>

            {/* Available Rooms Card */}
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              style={{
                background: theme.background.glass,
                backdropFilter: theme.effects.blur,
                border: `1px solid ${theme.border.light}`,
                borderRadius: '20px',
                padding: '24px',
                transition: theme.effects.transition,
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: `linear-gradient(90deg, ${theme.primary.light}, ${theme.primary.main})`,
              }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ color: theme.text.secondary, margin: '0 0 8px 0', fontSize: '0.9rem' }}>
                    Available Rooms
                  </p>
                  <h2 style={{ color: theme.text.primary, fontSize: '2.2rem', margin: 0, fontWeight: 600 }}>
                    {stats.availableRooms}
                  </h2>
                </div>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: theme.background.glass,
                  border: `1px solid ${theme.border.strong}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <HotelIcon style={{ color: theme.primary.main, fontSize: '28px' }} />
                </div>
              </div>
              <div style={{
                marginTop: '16px',
                paddingTop: '16px',
                borderTop: `1px solid ${theme.border.light}`,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: theme.primary.main,
                }} />
                <span style={{ color: theme.text.muted, fontSize: '0.85rem' }}>
                  Ready for booking
                </span>
              </div>
            </motion.div>

            {/* Total Bookings Card */}
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              style={{
                background: theme.background.glass,
                backdropFilter: theme.effects.blur,
                border: `1px solid ${theme.border.strong}`,
                borderRadius: '20px',
                padding: '24px',
                transition: theme.effects.transition,
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: `linear-gradient(90deg, ${theme.primary.light}, ${theme.primary.main})`,
              }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ color: theme.text.secondary, margin: '0 0 8px 0', fontSize: '0.9rem' }}>
                    Total Bookings
                  </p>
                  <h2 style={{ color: theme.text.primary, fontSize: '2.2rem', margin: 0, fontWeight: 600 }}>
                    {stats.totalBookings}
                  </h2>
                </div>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: theme.background.glass,
                  border: `1px solid ${theme.border.strong}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <BookOnlineIcon style={{ color: theme.primary.main, fontSize: '28px' }} />
                </div>
              </div>
              <div style={{
                marginTop: '16px',
                paddingTop: '16px',
                borderTop: `1px solid ${theme.border.light}`,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: theme.primary.main,
                }} />
                <span style={{ color: theme.text.muted, fontSize: '0.85rem' }}>
                  Lifetime bookings
                </span>
              </div>
            </motion.div>

            {/* Total Guests Card */}
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              style={{
                background: theme.background.glass,
                backdropFilter: theme.effects.blur,
                border: `1px solid ${theme.border.light}`,
                borderRadius: '20px',
                padding: '24px',
                transition: theme.effects.transition,
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: `linear-gradient(90deg, ${theme.primary.light}, ${theme.primary.main})`,
              }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ color: theme.text.secondary, margin: '0 0 8px 0', fontSize: '0.9rem' }}>
                    Total Guests
                  </p>
                  <h2 style={{ color: theme.text.primary, fontSize: '2.2rem', margin: 0, fontWeight: 600 }}>
                    {stats.totalGuests}
                  </h2>
                </div>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: theme.background.glass,
                  border: `1px solid ${theme.border.strong}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <PeopleIcon style={{ color: theme.primary.main, fontSize: '28px' }} />
                </div>
              </div>
              <div style={{
                marginTop: '16px',
                paddingTop: '16px',
                borderTop: `1px solid ${theme.border.light}`,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: theme.primary.main,
                }} />
                <span style={{ color: theme.text.muted, fontSize: '0.85rem' }}>
                  Unique visitors
                </span>
              </div>
            </motion.div>

            {/* Total Revenue Card */}
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              style={{
                background: theme.background.glass,
                backdropFilter: theme.effects.blur,
                border: `1px solid ${theme.border.strong}`,
                borderRadius: '20px',
                padding: '24px',
                transition: theme.effects.transition,
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: `linear-gradient(90deg, ${theme.primary.light}, ${theme.primary.main})`,
              }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ color: theme.text.secondary, margin: '0 0 8px 0', fontSize: '0.9rem' }}>
                    Total Revenue
                  </p>
                  <h2 style={{ color: theme.text.primary, fontSize: '2.2rem', margin: 0, fontWeight: 600 }}>
                    {formatCurrency(stats.totalRevenue)}
                  </h2>
                </div>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: theme.background.glass,
                  border: `1px solid ${theme.border.strong}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <MonetizationOnIcon style={{ color: theme.primary.main, fontSize: '28px' }} />
                </div>
              </div>
              <div style={{
                marginTop: '16px',
                paddingTop: '16px',
                borderTop: `1px solid ${theme.border.light}`,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: theme.primary.main,
                }} />
                <span style={{ color: theme.text.muted, fontSize: '0.85rem' }}>
                  Lifetime earnings
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Charts Section */}
        <motion.div variants={itemVariants}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '24px',
          }}>
            {/* Revenue Chart */}
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              style={{
                background: theme.background.glass,
                backdropFilter: theme.effects.blur,
                border: `1px solid ${theme.border.light}`,
                borderRadius: '20px',
                padding: '24px',
                transition: theme.effects.transition,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  background: theme.background.glass,
                  border: `1px solid ${theme.border.strong}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <TrendingUpIcon style={{ color: theme.primary.main }} />
                </div>
                <h3 style={{ color: theme.text.primary, margin: 0, fontSize: '1.2rem', fontWeight: 500 }}>
                  Revenue Trend (Last 6 Months)
                </h3>
              </div>
              
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={theme.primary.main} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={theme.primary.main} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid 
                    stroke={theme.border.light} 
                    strokeDasharray="3 3" 
                    vertical={false}
                  />
                  <XAxis 
                    dataKey="month" 
                    stroke={theme.text.muted}
                    tick={{ fill: theme.text.muted, fontSize: 12 }}
                  />
                  <YAxis 
                    stroke={theme.text.muted}
                    tick={{ fill: theme.text.muted, fontSize: 12 }}
                    tickFormatter={(v) => `RS ${(v/1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      background: theme.background.secondary,
                      border: `1px solid ${theme.border.strong}`,
                      borderRadius: '12px',
                      color: theme.text.primary,
                    }}
                    formatter={(value) => [`RS ${value.toLocaleString('en-IN')}`, 'Revenue']}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke={theme.primary.main}
                    strokeWidth={3}
                    fill="url(#revenueGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Quick Overview */}
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              style={{
                background: theme.background.glass,
                backdropFilter: theme.effects.blur,
                border: `1px solid ${theme.border.light}`,
                borderRadius: '20px',
                padding: '24px',
                transition: theme.effects.transition,
              }}
            >
              <h3 style={{ 
                color: theme.text.primary, 
                margin: '0 0 24px 0', 
                fontSize: '1.2rem',
                fontWeight: 500,
                position: 'relative',
                display: 'inline-block',
              }}>
                Quick Overview
                <span style={{
                  position: 'absolute',
                  bottom: '-4px',
                  left: 0,
                  width: '40px',
                  height: '2px',
                  background: theme.effects.bottomLine,
                }} />
              </h3>

              {/* Occupancy Rate */}
              <div style={{
                padding: '20px',
                background: theme.background.glass,
                border: `1px solid ${theme.border.light}`,
                borderRadius: '16px',
                marginBottom: '16px',
                transition: theme.effects.transition,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <PercentIcon style={{ color: theme.primary.main }} />
                  <span style={{ color: theme.text.secondary }}>Occupancy Rate</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                  <span style={{ color: theme.text.primary, fontSize: '2rem', fontWeight: 600 }}>
                    {occupancyRate}%
                  </span>
                  <div style={{
                    padding: '4px 12px',
                    background: theme.background.glass,
                    border: `1px solid ${theme.border.strong}`,
                    borderRadius: '20px',
                    color: theme.primary.main,
                    fontSize: '0.85rem',
                  }}>
                    {stats.occupiedRooms}/{stats.totalRooms} rooms
                  </div>
                </div>
              </div>

              {/* Average Daily Rate */}
              <div style={{
                padding: '20px',
                background: theme.background.glass,
                border: `1px solid ${theme.border.light}`,
                borderRadius: '16px',
                marginBottom: '16px',
                transition: theme.effects.transition,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <AttachMoneyIcon style={{ color: theme.primary.main }} />
                  <span style={{ color: theme.text.secondary }}>Average Daily Rate</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                  <span style={{ color: theme.text.primary, fontSize: '2rem', fontWeight: 600 }}>
                    {formatCurrency(stats.totalRevenue / (stats.totalBookings || 1))}
                  </span>
                  <span style={{ color: theme.text.muted, fontSize: '0.85rem' }}>
                    per booking
                  </span>
                </div>
              </div>

              {/* Revenue per Room */}
              <div style={{
                padding: '20px',
                background: theme.background.glass,
                border: `1px solid ${theme.border.light}`,
                borderRadius: '16px',
                transition: theme.effects.transition,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <MonetizationOnIcon style={{ color: theme.primary.main }} />
                  <span style={{ color: theme.text.secondary }}>Revenue per Room</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                  <span style={{ color: theme.text.primary, fontSize: '2rem', fontWeight: 600 }}>
                    {formatCurrency(stats.totalRevenue / stats.totalRooms)}
                  </span>
                  <span style={{ color: theme.text.muted, fontSize: '0.85rem' }}>
                    lifetime
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}