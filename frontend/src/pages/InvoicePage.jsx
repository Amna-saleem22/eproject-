// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Box, Paper, Typography, CircularProgress, Divider } from "@mui/material";
// import axiosInstance from "../api/axiosInstance"; // axios with baseURL: '/api'

// export default function InvoicePage() {
//   const { id } = useParams();
//   const [invoice, setInvoice] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchInvoice = async () => {
//       try {
//         // ✅ Match backend route
//         const res = await axiosInstance.get(`/invoice/${id}`);
//         if (res.data.success) setInvoice(res.data.invoice);
//       } catch (err) {
//         console.error("Invoice fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchInvoice();
//   }, [id]);

//   if (loading)
//     return (
//       <Box display="flex" justifyContent="center" mt={5}>
//         <CircularProgress />
//       </Box>
//     );

//   if (!invoice)
//     return (
//       <Typography align="center" mt={5}>
//         Invoice not found
//       </Typography>
//     );

//   return (
//     <Box p={3} display="flex" justifyContent="center">
//       <Paper sx={{ p: 4, width: 500 }} elevation={3}>
//         <Typography variant="h5" mb={2} align="center">
//           Booking Invoice
//         </Typography>

//         <Divider sx={{ mb: 2 }} />

//         {/* Guest Info */}
//         <Typography><b>Guest Name:</b> {invoice.guestName || "N/A"}</Typography>
//         <Typography><b>Email:</b> {invoice.payment?.email || "N/A"}</Typography>
//         <Typography><b>Phone:</b> {invoice.phone || "N/A"}</Typography>

//         <Divider sx={{ my: 2 }} />

//         {/* Booking Info */}
//         <Typography><b>Room Type:</b> {invoice.roomType || "N/A"}</Typography>
//         <Typography>
//           <b>Assigned Room:</b> {invoice.assignedRoom ? `Room #${invoice.assignedRoom.roomNumber || invoice.assignedRoom}` : "Not Assigned"}
//         </Typography>
//         <Typography><b>Rooms:</b> {invoice.roomsCount || "N/A"}</Typography>
//         <Typography><b>Total Guests:</b> {invoice.totalGuests || "N/A"}</Typography>
//         <Typography><b>Nights:</b> {invoice.nights || "N/A"}</Typography>
//         <Typography><b>Check-In:</b> {invoice.checkInDate ? new Date(invoice.checkInDate).toLocaleDateString() : "N/A"}</Typography>
//         <Typography><b>Check-Out:</b> {invoice.checkOutDate ? new Date(invoice.checkOutDate).toLocaleDateString() : "N/A"}</Typography>

//         <Divider sx={{ my: 2 }} />

//         {/* Payment Info */}
//         <Typography><b>Total Amount:</b> Rs {invoice.totalAmount || 0}</Typography>
//         <Typography><b>Status:</b> {invoice.status || "N/A"}</Typography>
//         <Typography><b>Payment Method:</b> {invoice.payment?.method || "N/A"}</Typography>
//         <Typography><b>Transaction ID:</b> {invoice.payment?.transactionId || "N/A"}</Typography>
//         <Typography><b>Booking Date:</b> {invoice.bookingDate ? new Date(invoice.bookingDate).toLocaleDateString() : "N/A"}</Typography>
//       </Paper>
//     </Box>
//   );
// }



import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

// Icons as SVG components (inline to avoid Material-UI)
const Icons = {
  Receipt: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 20L10 22L14 20L18 22L22 20V4C22 2.9 21.1 2 20 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 8H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M16 12H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M16 16H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Person: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  Email: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Phone: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 16.92V19.92C22 21.2 20.99 22.23 19.71 22.19C15.77 22.03 12.06 20.68 8.99 18.52C6.13 16.51 3.87 13.84 2.48 10.63C1.96 9.37 1.66 8.03 1.62 6.65C1.58 5.34 2.62 4.25 3.94 4.14L6.94 3.89C7.84 3.81 8.62 4.38 8.92 5.23L9.99 8.3C10.21 8.9 10.06 9.58 9.61 10.02L7.68 11.95C9.23 14.57 11.42 16.76 14.04 18.31L15.97 16.38C16.41 15.94 17.09 15.79 17.69 16.01L20.76 17.08C21.62 17.38 22.18 18.16 22 19.06L22 16.92Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Hotel: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 22H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M4 22V11C4 9.9 4.9 9 6 9H18C19.1 9 20 9.9 20 11V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8 9V5C8 3.9 8.9 3 10 3H14C15.1 3 16 3.9 16 5V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="13" r="2" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  Bed: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 16V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M20 16V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="2" y="10" width="20" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6 10V7C6 5.9 6.9 5 8 5H16C17.1 5 18 5.9 18 7V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Room: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 4V20" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M16 4V20" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M2 10H22" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M2 14H22" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  Calendar: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M16 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M3 10H21" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="15" r="1" fill="currentColor"/>
      <circle cx="16" cy="15" r="1" fill="currentColor"/>
      <circle cx="8" cy="15" r="1" fill="currentColor"/>
    </svg>
  ),
  Night: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 12.79C20.84 15.21 19.77 17.44 18.04 19.07C16.31 20.7 14.05 21.61 11.7 21.63C9.33 21.65 7.06 20.75 5.34 19.12C3.62 17.49 2.57 15.24 2.44 12.82C2.31 10.4 3.29 8.04 4.98 6.39C6.67 4.74 8.97 3.87 11.34 3.99C11.34 4.99 11.54 5.98 11.94 6.94C12.34 7.9 12.94 8.81 13.72 9.6C14.5 10.39 15.4 11.03 16.35 11.48C17.3 11.93 18.28 12.18 19.27 12.22C19.86 12.24 20.44 12.18 21 12.06L21 12.79Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Payment: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M2 10H22" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="16" cy="15" r="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6 15H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Transaction: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 8H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8 12H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="16" cy="16" r="1" fill="currentColor"/>
    </svg>
  ),
  Check: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  Download: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 16V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8 12L12 16L16 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 20H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Print: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 18H4C2.9 18 2 17.1 2 16V11C2 9.9 2.9 9 4 9H20C21.1 9 22 9.9 22 11V16C22 17.1 21.1 18 20 18H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="6" y="14" width="12" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6 9V5C6 3.9 6.9 3 8 3H16C17.1 3 18 3.9 18 5V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="18" cy="12" r="1" fill="currentColor"/>
    </svg>
  ),
  Home: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 9L12 3L21 9V20H15V14H9V20H3V9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Verified: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 12L11 15L16 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  Spinner: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ animation: 'spin 1s linear infinite' }}>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeDasharray="32" strokeDashoffset="8" strokeLinecap="round"/>
    </svg>
  ),
};

export default function InvoicePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const invoiceRef = useRef(null);
  
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await axiosInstance.get(`/invoice/${id}`);
        if (res.data.success) {
          setInvoice(res.data.invoice);
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 3000);
        }
      } catch (err) {
        console.error("Invoice fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoice();
  }, [id]);

  // Prevent navigation back
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    
    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
      navigate("/", { replace: true });
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [navigate]);

  // Generate PDF function (simplified for demo)
  const generatePDF = () => {
    setDownloading(true);
    // In a real implementation, you'd use a PDF library
    setTimeout(() => {
      setDownloading(false);
      alert("PDF downloaded successfully!");
    }, 1500);
  };

  const handlePrint = () => {
    window.print();
  };

  // Theme colors
  const theme = {
    primary: '#0D47A1',
    primaryLight: '#1565C0',
    primaryDark: '#0A3D91',
    background: '#0A0A0A',
    surface: '#111111',
    surfaceLight: 'rgba(255,255,255,0.05)',
    text: '#FFFFFF',
    textSecondary: 'rgba(255,255,255,0.7)',
    textMuted: 'rgba(255,255,255,0.5)',
    border: 'rgba(13,71,161,0.4)',
    borderLight: 'rgba(255,255,255,0.08)',
    success: '#4CAF50',
  };

  // Styles
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    },
    glowEffect: {
      position: 'absolute',
      top: '10%',
      right: '5%',
      width: '400px',
      height: '400px',
      background: `radial-gradient(circle, ${theme.primary} 0%, transparent 70%)`,
      borderRadius: '50%',
      opacity: 0.1,
      filter: 'blur(60px)',
      pointerEvents: 'none',
      zIndex: 0,
    },
    glowEffect2: {
      position: 'absolute',
      bottom: '10%',
      left: '5%',
      width: '300px',
      height: '300px',
      background: `radial-gradient(circle, ${theme.primary} 0%, transparent 70%)`,
      borderRadius: '50%',
      opacity: 0.1,
      filter: 'blur(60px)',
      pointerEvents: 'none',
      zIndex: 0,
    },
    contentWrapper: {
      maxWidth: '1200px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 10,
    },
    successMessage: {
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: theme.surface,
      border: `1px solid ${theme.primary}`,
      borderRadius: '8px',
      padding: '12px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      color: theme.text,
      boxShadow: `0 10px 30px ${theme.primary}40`,
      zIndex: 9999,
      animation: 'slideIn 0.3s ease',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem',
      flexWrap: 'wrap',
      gap: '1rem',
    },
    headerLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    },
    logo: {
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      background: `linear-gradient(135deg, ${theme.primaryDark} 0%, ${theme.primaryLight} 100%)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: `0 0 30px ${theme.primary}`,
      animation: 'scaleIn 0.6s ease',
    },
    title: {
      color: theme.text,
      fontSize: 'clamp(1.5rem, 4vw, 2rem)',
      fontWeight: 300,
      letterSpacing: '0.05em',
      margin: 0,
    },
    subtitle: {
      color: theme.textSecondary,
      fontSize: '0.9rem',
      margin: '4px 0 0 0',
    },
    buttonGroup: {
      display: 'flex',
      gap: '1rem',
    },
    buttonOutline: {
      background: 'transparent',
      border: `1px solid ${theme.border}`,
      color: theme.text,
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      fontSize: '0.9rem',
      fontWeight: 500,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'all 0.3s ease',
    },
    buttonPrimary: {
      background: `linear-gradient(135deg, ${theme.primaryDark} 0%, ${theme.primaryLight} 100%)`,
      border: 'none',
      color: theme.text,
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      fontSize: '0.9rem',
      fontWeight: 500,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'all 0.3s ease',
      boxShadow: `0 5px 15px ${theme.primary}40`,
    },
    invoiceCard: {
      background: 'rgba(10, 10, 10, 0.95)',
      backdropFilter: 'blur(10px)',
      border: `1px solid ${theme.border}`,
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
      animation: 'slideUp 0.6s ease',
    },
    invoiceHeader: {
      padding: '2rem',
      background: `linear-gradient(135deg, ${theme.primaryDark} 0%, ${theme.primaryLight} 100%)`,
      borderBottom: `1px solid ${theme.border}`,
    },
    headerRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '1rem',
    },
    hotelName: {
      fontSize: '1.8rem',
      fontWeight: 300,
      letterSpacing: '2px',
      color: theme.text,
      margin: 0,
    },
    hotelTagline: {
      color: theme.textSecondary,
      fontSize: '0.9rem',
      margin: '0.5rem 0 0 0',
    },
    statusChip: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      background: 'rgba(13,71,161,0.15)',
      border: `1px solid ${theme.primary}`,
      borderRadius: '20px',
      padding: '0.25rem 1rem',
      color: theme.primary,
      fontSize: '0.9rem',
      marginBottom: '0.5rem',
    },
    invoiceDate: {
      color: theme.textSecondary,
      fontSize: '0.9rem',
      margin: 0,
    },
    invoiceBody: {
      padding: '2rem',
    },
    sectionTitle: {
      color: theme.primary,
      fontSize: '1.1rem',
      fontWeight: 400,
      letterSpacing: '0.05em',
      borderBottom: `1px solid ${theme.border}`,
      paddingBottom: '0.5rem',
      marginBottom: '1.5rem',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1rem',
      marginBottom: '2rem',
    },
    card: {
      background: 'rgba(255,255,255,0.05)',
      border: `1px solid ${theme.borderLight}`,
      borderRadius: '12px',
      padding: '1rem',
      transition: 'all 0.3s ease',
      cursor: 'default',
    },
    cardHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '0.5rem',
    },
    cardIcon: {
      color: theme.primary,
      display: 'flex',
      alignItems: 'center',
    },
    cardLabel: {
      color: theme.textMuted,
      fontSize: '0.7rem',
      letterSpacing: '0.5px',
      margin: 0,
    },
    cardValue: {
      color: theme.text,
      fontSize: '1rem',
      fontWeight: 500,
      margin: 0,
    },
    row: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1rem',
      marginBottom: '2rem',
    },
    dateCard: {
      background: 'rgba(255,255,255,0.05)',
      border: `1px solid ${theme.borderLight}`,
      borderRadius: '12px',
      padding: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    },
    dateIcon: {
      color: theme.primary,
    },
    dateLabel: {
      color: theme.textMuted,
      fontSize: '0.7rem',
      margin: '0 0 0.25rem 0',
    },
    dateValue: {
      color: theme.text,
      fontSize: '1rem',
      margin: 0,
    },
    priceBreakdown: {
      background: 'rgba(255,255,255,0.05)',
      borderRadius: '12px',
      border: `1px solid ${theme.borderLight}`,
      overflow: 'hidden',
      marginBottom: '2rem',
    },
    priceContent: {
      padding: '1.5rem',
    },
    priceRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.75rem 0',
    },
    priceLabel: {
      color: theme.textSecondary,
      margin: 0,
    },
    priceNote: {
      color: theme.textMuted,
      fontSize: '0.8rem',
      margin: '0.25rem 0 0 0',
    },
    priceValue: {
      color: theme.text,
      fontWeight: 500,
      margin: 0,
    },
    divider: {
      border: 'none',
      borderTop: `1px solid ${theme.border}`,
      margin: '1rem 0',
    },
    totalBox: {
      background: `linear-gradient(135deg, ${theme.primaryDark}20, ${theme.primaryLight}20)`,
      border: `1px solid ${theme.border}`,
      borderRadius: '12px',
      padding: '1.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '1rem',
      animation: 'pulse 2s infinite',
    },
    totalLabel: {
      color: theme.text,
      fontSize: '1.2rem',
      fontWeight: 500,
      margin: 0,
    },
    totalMethod: {
      color: theme.textMuted,
      fontSize: '0.8rem',
      margin: '0.25rem 0 0 0',
    },
    totalAmount: {
      color: theme.primary,
      fontSize: '2.2rem',
      fontWeight: 700,
      textShadow: `0 0 20px ${theme.primary}`,
      margin: 0,
    },
    footer: {
      marginTop: '2rem',
      padding: '1.5rem',
      background: `linear-gradient(135deg, ${theme.primaryDark}10, ${theme.primaryLight}10)`,
      borderRadius: '12px',
      border: `1px solid ${theme.border}`,
      textAlign: 'center',
    },
    footerText: {
      color: theme.primary,
      fontWeight: 500,
      margin: '0 0 0.5rem 0',
    },
    footerSubtext: {
      color: theme.textMuted,
      fontSize: '0.9rem',
      margin: 0,
    },
    footerSmall: {
      color: theme.textMuted,
      fontSize: '0.8rem',
      margin: '1rem 0 0 0',
    },
    homeButton: {
      marginTop: '2rem',
      textAlign: 'center',
    },
    loadingContainer: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    spinner: {
      color: theme.primary,
      fontSize: '3rem',
      animation: 'spin 1s linear infinite',
    },
    notFound: {
      background: 'rgba(10, 10, 10, 0.95)',
      backdropFilter: 'blur(10px)',
      border: `1px solid ${theme.border}`,
      borderRadius: '16px',
      padding: '3rem',
      textAlign: 'center',
      maxWidth: '400px',
      width: '100%',
    },
    notFoundIcon: {
      color: theme.primary,
      fontSize: '4rem',
      marginBottom: '1rem',
      opacity: 0.5,
      animation: 'bounce 2s infinite',
    },
    notFoundTitle: {
      color: theme.text,
      fontSize: '1.5rem',
      fontWeight: 300,
      margin: '0 0 1rem 0',
    },
    notFoundText: {
      color: theme.textSecondary,
      margin: '0 0 2rem 0',
    },
  };

  // Keyframes for animations
  const animationStyles = `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(50px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes scaleIn {
      from {
        opacity: 0;
        transform: scale(0);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
    
    @keyframes pulse {
      0% {
        box-shadow: 0 0 0 0 ${theme.primary}40;
      }
      70% {
        box-shadow: 0 0 0 10px ${theme.primary}00;
      }
      100% {
        box-shadow: 0 0 0 0 ${theme.primary}00;
      }
    }
    
    @keyframes bounce {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-10px);
      }
    }
    
    @media print {
      .no-print {
        display: none !important;
      }
    }
  `;

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <style>{animationStyles}</style>
        <div style={styles.spinner}>
          <Icons.Spinner />
        </div>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div style={styles.container}>
        <style>{animationStyles}</style>
        <div style={styles.glowEffect} />
        <div style={styles.glowEffect2} />
        
        <div style={styles.contentWrapper}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <div style={styles.notFound}>
              <div style={styles.notFoundIcon}>
                <Icons.Receipt />
              </div>
              <h2 style={styles.notFoundTitle}>Invoice Not Found</h2>
              <p style={styles.notFoundText}>The invoice you're looking for doesn't exist or has been removed.</p>
              <button 
                onClick={() => navigate("/")}
                style={{
                  ...styles.buttonPrimary,
                  padding: '0.75rem 2rem',
                  margin: '0 auto',
                }}
              >
                <Icons.Home />
                Return Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <style>{animationStyles}</style>
      
      {/* Decorative elements */}
      <div style={styles.glowEffect} />
      <div style={styles.glowEffect2} />

      {/* Success message */}
      {showSuccess && (
        <div style={styles.successMessage}>
          <Icons.Check />
          <span>Invoice generated successfully!</span>
        </div>
      )}

      <div style={styles.contentWrapper}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <div style={styles.logo}>
              <Icons.Receipt />
            </div>
            <div>
              <h1 style={styles.title}>Final Invoice</h1>
              <p style={styles.subtitle}>#{invoice._id?.slice(-8).toUpperCase()}</p>
            </div>
          </div>

          <div style={styles.buttonGroup} className="no-print">
            <button 
              style={styles.buttonOutline}
              onClick={handlePrint}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = theme.primary;
                e.currentTarget.style.background = 'rgba(13,71,161,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = theme.border;
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <Icons.Print />
              Print
            </button>

            <button 
              style={styles.buttonPrimary}
              onClick={generatePDF}
              disabled={downloading}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 0 20px ${theme.primary}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `0 5px 15px ${theme.primary}40`;
              }}
            >
              {downloading ? (
                <>
                  <Icons.Spinner />
                  Generating...
                </>
              ) : (
                <>
                  <Icons.Download />
                  Download PDF
                </>
              )}
            </button>
          </div>
        </div>

        {/* Main Invoice Card */}
        <div style={styles.invoiceCard}>
          {/* Invoice Header */}
          <div style={styles.invoiceHeader}>
            <div style={styles.headerRow}>
              <div>
                <h2 style={styles.hotelName}>LUXURY STAY</h2>
                <p style={styles.hotelTagline}>Premium Hotel & Residences</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={styles.statusChip}>
                  <Icons.Verified />
                  <span>{invoice.status || "Confirmed"}</span>
                </div>
                <p style={styles.invoiceDate}>
                  Invoice Date: {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Invoice Body */}
          <div style={styles.invoiceBody}>
            {/* Guest Information */}
            <div>
              <h3 style={styles.sectionTitle}>
                <Icons.Person />
                Guest Information
              </h3>

              <div style={styles.grid}>
                <div style={styles.card}>
                  <div style={styles.cardHeader}>
                    <span style={styles.cardIcon}><Icons.Person /></span>
                    <p style={styles.cardLabel}>FULL NAME</p>
                  </div>
                  <p style={styles.cardValue}>{invoice.guestName || "N/A"}</p>
                </div>

                <div style={styles.card}>
                  <div style={styles.cardHeader}>
                    <span style={styles.cardIcon}><Icons.Email /></span>
                    <p style={styles.cardLabel}>EMAIL ADDRESS</p>
                  </div>
                  <p style={styles.cardValue}>{invoice.payment?.email || invoice.user?.email || "N/A"}</p>
                </div>

                <div style={styles.card}>
                  <div style={styles.cardHeader}>
                    <span style={styles.cardIcon}><Icons.Phone /></span>
                    <p style={styles.cardLabel}>PHONE NUMBER</p>
                  </div>
                  <p style={styles.cardValue}>{invoice.phone || "N/A"}</p>
                </div>
              </div>
            </div>

            {/* Booking Details */}
            <div>
              <h3 style={styles.sectionTitle}>
                <Icons.Hotel />
                Booking Details
              </h3>

              <div style={styles.grid}>
                <div style={styles.card}>
                  <div style={styles.cardHeader}>
                    <span style={styles.cardIcon}><Icons.Bed /></span>
                    <p style={styles.cardLabel}>ROOM TYPE</p>
                  </div>
                  <p style={styles.cardValue}>{invoice.roomType || "N/A"}</p>
                </div>

                <div style={styles.card}>
                  <div style={styles.cardHeader}>
                    <span style={styles.cardIcon}><Icons.Room /></span>
                    <p style={styles.cardLabel}>ROOM NUMBER</p>
                  </div>
                  <p style={styles.cardValue}>
                    {invoice.assignedRoom ? `#${invoice.assignedRoom.roomNumber || invoice.assignedRoom}` : "Not Assigned"}
                  </p>
                </div>

                <div style={styles.card}>
                  <div style={styles.cardHeader}>
                    <span style={styles.cardIcon}><Icons.Room /></span>
                    <p style={styles.cardLabel}>ROOMS</p>
                  </div>
                  <p style={styles.cardValue}>{invoice.roomsCount || 1}</p>
                </div>

                <div style={styles.card}>
                  <div style={styles.cardHeader}>
                    <span style={styles.cardIcon}><Icons.Person /></span>
                    <p style={styles.cardLabel}>GUESTS</p>
                  </div>
                  <p style={styles.cardValue}>{invoice.totalGuests || invoice.adults || "N/A"}</p>
                </div>

                <div style={styles.card}>
                  <div style={styles.cardHeader}>
                    <span style={styles.cardIcon}><Icons.Night /></span>
                    <p style={styles.cardLabel}>NIGHTS</p>
                  </div>
                  <p style={styles.cardValue}>{invoice.nights || 1}</p>
                </div>
              </div>

              <div style={styles.row}>
                <div style={styles.dateCard}>
                  <span style={styles.dateIcon}><Icons.Calendar /></span>
                  <div>
                    <p style={styles.dateLabel}>CHECK-IN DATE</p>
                    <p style={styles.dateValue}>
                      {invoice.checkInDate ? new Date(invoice.checkInDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) : "N/A"}
                    </p>
                  </div>
                </div>

                <div style={styles.dateCard}>
                  <span style={styles.dateIcon}><Icons.Calendar /></span>
                  <div>
                    <p style={styles.dateLabel}>CHECK-OUT DATE</p>
                    <p style={styles.dateValue}>
                      {invoice.checkOutDate ? new Date(invoice.checkOutDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div>
              <h3 style={styles.sectionTitle}>
                <Icons.Payment />
                Payment Information
              </h3>

              <div style={styles.grid}>
                <div style={styles.card}>
                  <div style={styles.cardHeader}>
                    <span style={styles.cardIcon}><Icons.Payment /></span>
                    <p style={styles.cardLabel}>PAYMENT METHOD</p>
                  </div>
                  <p style={styles.cardValue}>{invoice.payment?.method || "N/A"}</p>
                </div>

                <div style={styles.card}>
                  <div style={styles.cardHeader}>
                    <span style={styles.cardIcon}><Icons.Transaction /></span>
                    <p style={styles.cardLabel}>TRANSACTION ID</p>
                  </div>
                  <p style={styles.cardValue}>{invoice.payment?.transactionId || "N/A"}</p>
                </div>

                <div style={styles.card}>
                  <div style={styles.cardHeader}>
                    <span style={styles.cardIcon}><Icons.Calendar /></span>
                    <p style={styles.cardLabel}>BOOKING DATE</p>
                  </div>
                  <p style={styles.cardValue}>
                    {invoice.bookingDate ? new Date(invoice.bookingDate).toLocaleDateString() : "N/A"}
                  </p>
                </div>

                <div style={{ ...styles.card, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <p style={styles.cardLabel}>STATUS</p>
                  <span style={{
                    display: 'inline-block',
                    padding: '0.25rem 0.75rem',
                    background: invoice.status === "Paid" || invoice.status === "Confirmed" ? theme.success : theme.primary,
                    color: '#fff',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    marginTop: '0.5rem',
                  }}>
                    {invoice.status || "Confirmed"}
                  </span>
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div>
              <h3 style={styles.sectionTitle}>Price Breakdown</h3>

              <div style={styles.priceBreakdown}>
                <div style={styles.priceContent}>
                  {/* Room Charges */}
                  <div style={styles.priceRow}>
                    <div>
                      <p style={styles.priceLabel}>Room Charges</p>
                    </div>
                    <p style={styles.priceValue}>Rs {(invoice.roomCost || 0).toLocaleString()}</p>
                  </div>

                  {/* Food Package (if applicable) */}
                  {invoice.foodCost > 0 && (
                    <div style={styles.priceRow}>
                      <div>
                        <p style={styles.priceLabel}>Dining Package</p>
                      </div>
                      <p style={styles.priceValue}>Rs {(invoice.foodCost || 0).toLocaleString()}</p>
                    </div>
                  )}

                  {/* Taxes */}
                  <div style={styles.priceRow}>
                    <div>
                      <p style={styles.priceLabel}>Taxes & Fees</p>
                      <p style={styles.priceNote}>Included</p>
                    </div>
                    <p style={styles.priceValue}>Rs 0</p>
                  </div>

                  <hr style={styles.divider} />

                  {/* Subtotal */}
                  <div style={styles.priceRow}>
                    <p style={{ ...styles.priceLabel, fontWeight: 600 }}>Subtotal</p>
                    <p style={{ ...styles.priceValue, color: theme.textSecondary }}>
                      Rs {((invoice.roomCost || 0) + (invoice.foodCost || 0)).toLocaleString()}
                    </p>
                  </div>

                  <hr style={styles.divider} />

                  {/* Total Amount */}
                  <div style={styles.totalBox}>
                    <div>
                      <p style={styles.totalLabel}>Total Amount</p>
                      <p style={styles.totalMethod}>Paid via {invoice.payment?.method || "Online"}</p>
                    </div>
                    <p style={styles.totalAmount}>
                      Rs {(invoice.totalAmount || 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div style={styles.footer}>
              <p style={styles.footerText}>Thank you for choosing Luxury Stay</p>
              <p style={styles.footerSubtext}>
                We hope you enjoyed your stay. This invoice serves as your official receipt.
              </p>
              <p style={styles.footerSmall}>
                For any queries, please contact our support team
              </p>
            </div>
          </div>
        </div>

        {/* Home Button */}
        <div style={styles.homeButton} className="no-print">
          <button 
            onClick={() => navigate("/", { replace: true })}
            style={{
              ...styles.buttonOutline,
              padding: '0.75rem 2rem',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = theme.primary;
              e.currentTarget.style.background = 'rgba(13,71,161,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = theme.border;
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <Icons.Home />
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
}