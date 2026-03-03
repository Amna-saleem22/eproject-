// import React, { useEffect, useState } from "react";
// import axiosInstance from "../api/axiosInstance";
// import { Container, Typography, Card, CardContent, Grid } from "@mui/material";

// export default function AdminRegisteredUsers() {
//   const [users, setUsers] = useState([]);

//   const fetchUsers = async () => {
//     try {
//       const res = await axiosInstance.get("/auth/all"); // backend route
//       setUsers(res.data.users || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);
   
//   return (
//     <>
//     <Container sx={{ mt: 5 }}>
//       <Typography variant="h4" gutterBottom>
//         Registered Users
//       </Typography>

//       <Grid container spacing={2}>
//         {users.map((u) => (
//           <Grid item xs={12} md={6} key={u._id}>
//             <Card sx={{ p: 2 }}>
//               <CardContent>
//                 <Typography variant="h6">{u.name}</Typography>
//                 <Typography variant="body2" color="textSecondary">{u.email}</Typography>
//                 <Typography variant="body2" color="gray">
//                   Registered on: {new Date(u.createdAt).toLocaleDateString()}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>


 
//     </>
//   );
// }





import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { Container, Typography } from "@mui/material";

export default function AdminRegisteredUsers() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get("/auth/all");
      setUsers(res.data.users || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Theme colors from Luxury Stay PDF
  const theme = {
    colors: {
      primaryLight: '#0D47A1',
      primaryMain: '#1565C0',
      primaryDark: '#0A3D91',
      background: {
        main: '#0A0A0A',
        secondary: '#111111',
        card: '#111111',
        glass: 'rgba(255, 255, 255, 0.05)'
      },
      text: {
        primary: '#FFFFFF',
        secondary: 'rgba(255, 255, 255, 0.7)',
        muted: 'rgba(255, 255, 255, 0.5)'
      },
      border: {
        light: 'rgba(255, 255, 255, 0.08)',
        strong: 'rgba(13, 71, 161, 0.4)'
      }
    },
    gradients: {
      footer: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
      glow: 'radial-gradient(circle at 0% 50%, #0d47a1 0%, transparent 50%)'
    },
    effects: {
      blur: 'blur(10px)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    }
  };

  // Inline styles
  const styles = {
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '32px',
      background: theme.colors.background.main,
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden'
    },
    header: {
      color: theme.colors.text.primary,
      fontFamily: '"Playfair Display", "Times New Roman", serif',
      fontWeight: 600,
      fontSize: '2.5rem',
      letterSpacing: '-0.5px',
      marginBottom: '32px',
      position: 'relative',
      display: 'inline-block'
    },
    headerAccent: {
      position: 'absolute',
      bottom: '-10px',
      left: '0',
      width: '80px',
      height: '3px',
      background: `linear-gradient(90deg, ${theme.colors.primaryLight}, ${theme.colors.primaryMain})`,
      borderRadius: '3px'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '24px',
      marginTop: '24px'
    },
    card: {
      background: theme.colors.background.card,
      borderRadius: '16px',
      padding: '24px',
      border: `1px solid ${theme.colors.border.light}`,
      transition: theme.effects.transition,
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
      backdropFilter: theme.effects.blur,
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)'
    },
    cardHover: {
      transform: 'translateY(-4px)',
      borderColor: theme.colors.border.strong,
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
      background: '#1A1A1A'
    },
    cardGlow: {
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      height: '2px',
      background: `linear-gradient(90deg, transparent, ${theme.colors.primaryMain}, transparent)`
    },
    name: {
      color: theme.colors.text.primary,
      fontFamily: '"Montserrat", "Helvetica", sans-serif',
      fontWeight: 600,
      fontSize: '1.25rem',
      marginBottom: '8px',
      position: 'relative',
      paddingLeft: '12px'
    },
    nameAccent: {
      position: 'absolute',
      left: '0',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '4px',
      height: '20px',
      background: `linear-gradient(180deg, ${theme.colors.primaryLight}, ${theme.colors.primaryMain})`,
      borderRadius: '2px'
    },
    email: {
      color: theme.colors.text.secondary,
      fontFamily: '"Inter", "Arial", sans-serif',
      fontSize: '0.95rem',
      marginBottom: '12px',
      padding: '8px 0',
      borderBottom: `1px solid ${theme.colors.border.light}`,
      borderTop: `1px solid ${theme.colors.border.light}`,
      wordBreak: 'break-all'
    },
    dateContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginTop: '8px'
    },
    dateIcon: {
      width: '16px',
      height: '16px',
      background: theme.colors.primaryLight,
      borderRadius: '50%',
      opacity: 0.5
    },
    dateText: {
      color: theme.colors.text.muted,
      fontFamily: '"Inter", "Arial", sans-serif',
      fontSize: '0.85rem',
      letterSpacing: '0.3px'
    },
    cardFooter: {
      marginTop: '16px',
      display: 'flex',
      justifyContent: 'flex-end'
    },
    role: {
      background: theme.colors.background.glass,
      padding: '4px 12px',
      borderRadius: '20px',
      color: theme.colors.text.muted,
      fontSize: '0.75rem',
      border: `1px solid ${theme.colors.border.light}`,
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    
    // Responsive breakpoints
    mediaQueries: {
      tablet: {
        gridTemplateColumns: 'repeat(2, 1fr)'
      },
      mobile: {
        gridTemplateColumns: '1fr',
        container: {
          padding: '16px'
        },
        header: {
          fontSize: '2rem'
        }
      }
    }
  };

  // Add responsive styles with JavaScript
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get responsive grid columns
  const getGridColumns = () => {
    if (windowWidth <= 768) return '1fr';
    if (windowWidth <= 1024) return 'repeat(2, 1fr)';
    return 'repeat(3, 1fr)';
  };

  // Get responsive container padding
  const getContainerPadding = () => {
    if (windowWidth <= 768) return '16px';
    return '32px';
  };

  return (
    <div style={{
      ...styles.container,
      padding: getContainerPadding(),
      background: theme.gradients.footer,
      position: 'relative'
    }}>
      {/* Background glow effect */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: theme.gradients.glow,
        pointerEvents: 'none',
        opacity: 0.3
      }} />
      
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={styles.header}>
          Registered Users
          <span style={styles.headerAccent} />
        </div>

        <div style={{
          ...styles.grid,
          gridTemplateColumns: getGridColumns()
        }}>
          {users.map((user, index) => (
            <div
              key={user._id || index}
              style={styles.card}
              onMouseEnter={(e) => {
                Object.assign(e.currentTarget.style, styles.cardHover);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.borderColor = styles.card.borderColor;
                e.currentTarget.style.boxShadow = styles.card.boxShadow;
                e.currentTarget.style.background = styles.card.background;
              }}
            >
              {/* Card glow effect */}
              <div style={styles.cardGlow} />
              
              <div style={styles.name}>
                <span style={styles.nameAccent} />
                {user.name || 'Guest User'}
              </div>
              
              <div style={styles.email}>
                {user.email || 'No email provided'}
              </div>
              
              <div style={styles.dateContainer}>
                <div style={styles.dateIcon} />
                <span style={styles.dateText}>
                  Registered: {user.createdAt 
                    ? new Date(user.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })
                    : 'Date unavailable'
                  }
                </span>
              </div>
              
              <div style={styles.cardFooter}>
                <span style={styles.role}>
                  {user.role || 'Guest'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {users.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '48px',
            color: theme.colors.text.muted,
            border: `1px dashed ${theme.colors.border.light}`,
            borderRadius: '16px',
            marginTop: '24px'
          }}>
            No registered users found
          </div>
        )}
      </div>
    </div>
  );
}