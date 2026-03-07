
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "../api/axiosInstance";
import {
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  Alert,
  Snackbar,
  Box,
  Grid,
  Card,
  CardContent,
  Chip,
  Avatar,
  IconButton,
  InputAdornment,
  Paper,
  useTheme,
  useMediaQuery,
  Divider,
  LinearProgress,
} from "@mui/material";
import {
  PersonAdd as PersonAddIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Badge as BadgeIcon,
  AdminPanelSettings as AdminIcon,
  Receipt as ReceptionistIcon,
  CleaningServices as HousekeepingIcon,
  BusinessCenter as ManagerIcon,
  Close as CloseIcon,
  Visibility,
  VisibilityOff,
  Hotel as HotelIcon,
  Key as KeyIcon,
} from "@mui/icons-material";

export default function AdminStaff() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  // Luxury Stay Theme Colors from PDF
  const luxuryTheme = {
    primary: {
      light: '#0D47A1',
      main: '#1565C0',
      dark: '#0A3D91',
    },
    background: {
      main: '#0A0A0A',
      secondary: '#111111',
      footer: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
      glass: 'rgba(255, 255, 255, 0.05)',
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.5)',
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
      transition: '0.3s ease',
    },
  };

  // ---------------- STAFF LIST ----------------
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);

  // ---------------- CREATE STAFF ----------------
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("receptionist");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const roles = ["receptionist", "housekeeping", "manager", "admin"];

  // Role icons mapping - Hotel appropriate icons
  const roleIcons = {
    receptionist: <ReceptionistIcon />,
    housekeeping: <HousekeepingIcon />,
    manager: <ManagerIcon />,
    admin: <AdminIcon />,
  };

  const fetchStaff = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/staff/all");
      setStaffList(res.data.staff || []);
    } catch (err) {
      console.error("Staff fetch error:", err.response || err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const validateForm = () => {
    const errors = {};
    
    if (!name.trim()) errors.name = "Name is required";
    else if (name.length < 2) errors.name = "Name must be at least 2 characters";
    
    if (!email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Invalid email format";
    
    if (!password) errors.password = "Password is required";
    else if (password.length < 6) errors.password = "Password must be at least 6 characters";
    
    if (!role) errors.role = "Role is required";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      await axiosInstance.post("/staff/create", { name, email, password, role });
      setSuccess(true);
      setName("");
      setEmail("");
      setPassword("");
      setRole("receptionist");
      setError("");
      setFormErrors({});
      fetchStaff();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleCloseError = () => {
    setError("");
  };

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

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: luxuryTheme.background.footer,
        position: "relative",
        overflow: "hidden",
        py: { xs: 4, md: 6 },
        px: { xs: 2, md: 3 },
      }}
    >
      {/* Luxury Stay Decorative Effects */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          background: luxuryTheme.effects.radialGlow,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Particle Effect - Dots */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.05,
          backgroundImage: `radial-gradient(circle at 2px 2px, ${luxuryTheme.primary.light} 1px, transparent 0)`,
          backgroundSize: "40px 40px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 10 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Page Header with Luxury Stay styling */}
          <motion.div variants={itemVariants}>
            <Box sx={{ 
              mb: 5, 
              display: "flex", 
              alignItems: "center", 
              gap: 2,
              flexDirection: { xs: "column", md: "row" },
              textAlign: { xs: "center", md: "left" }
            }}>
              <Avatar
                sx={{
                  width: 70,
                  height: 70,
                  bgcolor: luxuryTheme.background.glass,
                  color: luxuryTheme.primary.main,
                  border: `1px solid ${luxuryTheme.border.strong}`,
                  backdropFilter: luxuryTheme.effects.blur,
                }}
              >
                <HotelIcon sx={{ fontSize: 35 }} />
              </Avatar>
              <Box>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: "2.2rem", md: "3.2rem" },
                    fontWeight: 700,
                    color: luxuryTheme.text.primary,
                    mb: 1,
                    letterSpacing: "-0.02em",
                    position: "relative",
                    display: "inline-block",
                    "&:after": {
                      content: '""',
                      position: "absolute",
                      bottom: -8,
                      left: 0,
                      width: "80px",
                      height: "3px",
                      background: luxuryTheme.effects.bottomLine,
                    }
                  }}
                >
                  Staff Management
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: luxuryTheme.text.secondary,
                    fontSize: "1rem",
                    maxWidth: 600,
                  }}
                >
                  Manage your hotel team, assign roles, and control access permissions
                </Typography>
              </Box>
            </Box>
          </motion.div>

          {/* Create Staff Section - Luxury Stay Styled */}
          <motion.div variants={itemVariants}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                mb: 6,
                background: luxuryTheme.background.glass,
                backdropFilter: luxuryTheme.effects.blur,
                border: `1px solid ${luxuryTheme.border.strong}`,
                borderRadius: 4,
                boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Avatar
                  sx={{
                    bgcolor: luxuryTheme.background.glass,
                    color: luxuryTheme.primary.main,
                    width: 48,
                    height: 48,
                    mr: 2,
                    border: `1px solid ${luxuryTheme.border.strong}`,
                  }}
                >
                  <KeyIcon />
                </Avatar>
                <Box>
                  <Typography variant="h5" sx={{ color: luxuryTheme.text.primary, fontWeight: 600 }}>
                    Add New Staff Member
                  </Typography>
                  <Typography variant="body2" sx={{ color: luxuryTheme.text.secondary }}>
                    Fill in the details to create a new staff account
                  </Typography>
                </Box>
              </Box>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Alert
                    severity="error"
                    sx={{
                      mb: 3,
                      backgroundColor: luxuryTheme.background.glass,
                      color: "#ef4444",
                      border: `1px solid ${luxuryTheme.border.light}`,
                      borderRadius: 2,
                      backdropFilter: luxuryTheme.effects.blur,
                    }}
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={handleCloseError}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                  >
                    {error}
                  </Alert>
                </motion.div>
              )}

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <motion.div variants={itemVariants}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      error={!!formErrors.name}
                      helperText={formErrors.name}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon sx={{ color: luxuryTheme.primary.main }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: luxuryTheme.text.primary,
                          backgroundColor: luxuryTheme.background.glass,
                          borderRadius: 3,
                          "& fieldset": {
                            borderColor: formErrors.name 
                              ? "#ef4444" 
                              : luxuryTheme.border.light,
                          },
                          "&:hover fieldset": {
                            borderColor: formErrors.name ? "#ef4444" : luxuryTheme.primary.main,
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: luxuryTheme.primary.main,
                            borderWidth: 2,
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: luxuryTheme.text.secondary,
                          "&.Mui-focused": {
                            color: luxuryTheme.primary.main,
                          },
                        },
                        "& .MuiFormHelperText-root": {
                          color: "#ef4444",
                        },
                      }}
                    />
                  </motion.div>
                </Grid>

                <Grid item xs={12} md={6}>
                  <motion.div variants={itemVariants}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      error={!!formErrors.email}
                      helperText={formErrors.email}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon sx={{ color: luxuryTheme.primary.main }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: luxuryTheme.text.primary,
                          backgroundColor: luxuryTheme.background.glass,
                          borderRadius: 3,
                          "& fieldset": {
                            borderColor: formErrors.email 
                              ? "#ef4444" 
                              : luxuryTheme.border.light,
                          },
                          "&:hover fieldset": {
                            borderColor: formErrors.email ? "#ef4444" : luxuryTheme.primary.main,
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: luxuryTheme.primary.main,
                            borderWidth: 2,
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: luxuryTheme.text.secondary,
                          "&.Mui-focused": {
                            color: luxuryTheme.primary.main,
                          },
                        },
                      }}
                    />
                  </motion.div>
                </Grid>

                <Grid item xs={12} md={6}>
                  <motion.div variants={itemVariants}>
                    <TextField
                      fullWidth
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      error={!!formErrors.password}
                      helperText={formErrors.password}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon sx={{ color: luxuryTheme.primary.main }} />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                              sx={{ color: luxuryTheme.text.secondary }}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: luxuryTheme.text.primary,
                          backgroundColor: luxuryTheme.background.glass,
                          borderRadius: 3,
                          "& fieldset": {
                            borderColor: formErrors.password 
                              ? "#ef4444" 
                              : luxuryTheme.border.light,
                          },
                          "&:hover fieldset": {
                            borderColor: formErrors.password ? "#ef4444" : luxuryTheme.primary.main,
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: luxuryTheme.primary.main,
                            borderWidth: 2,
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: luxuryTheme.text.secondary,
                          "&.Mui-focused": {
                            color: luxuryTheme.primary.main,
                          },
                        },
                      }}
                    />
                  </motion.div>
                </Grid>

                <Grid item xs={12} md={6}>
                  <motion.div variants={itemVariants}>
                    <TextField
                      select
                      fullWidth
                      label="Role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      error={!!formErrors.role}
                      helperText={formErrors.role}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <BadgeIcon sx={{ color: luxuryTheme.primary.main }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: luxuryTheme.text.primary,
                          backgroundColor: luxuryTheme.background.glass,
                          borderRadius: 3,
                          "& fieldset": {
                            borderColor: formErrors.role 
                              ? "#ef4444" 
                              : luxuryTheme.border.light,
                          },
                          "&:hover fieldset": {
                            borderColor: formErrors.role ? "#ef4444" : luxuryTheme.primary.main,
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: luxuryTheme.primary.main,
                            borderWidth: 2,
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: luxuryTheme.text.secondary,
                          "&.Mui-focused": {
                            color: luxuryTheme.primary.main,
                          },
                        },
                        "& .MuiSelect-icon": {
                          color: luxuryTheme.text.primary,
                        },
                      }}
                    >
                      {roles.map((r) => (
                        <MenuItem 
                          key={r} 
                          value={r}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Box sx={{ color: luxuryTheme.primary.main }}>
                              {roleIcons[r]}
                            </Box>
                            <span>{r.charAt(0).toUpperCase() + r.slice(1)}</span>
                          </Box>
                        </MenuItem>
                      ))}
                    </TextField>
                  </motion.div>
                </Grid>

                <Grid item xs={12}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={handleSubmit}
                      startIcon={<PersonAddIcon />}
                      sx={{
                        background: luxuryTheme.primary.main,
                        color: luxuryTheme.text.primary,
                        py: 1.8,
                        borderRadius: 3,
                        fontSize: "1rem",
                        fontWeight: 600,
                        textTransform: "none",
                        boxShadow: `0 8px 20px ${luxuryTheme.primary.dark}`,
                        border: `1px solid ${luxuryTheme.border.strong}`,
                        transition: luxuryTheme.effects.transition,
                        "&:hover": {
                          background: luxuryTheme.primary.light,
                          boxShadow: `0 12px 30px ${luxuryTheme.primary.dark}`,
                        },
                      }}
                    >
                      Create Staff Member
                    </Button>
                  </motion.div>
                </Grid>
              </Grid>
            </Paper>
          </motion.div>

          {/* Staff List Section */}
          <motion.div variants={itemVariants}>
            <Box sx={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "space-between", 
              mb: 3,
              flexWrap: "wrap",
              gap: 2
            }}>
              <Typography variant="h4" sx={{ color: luxuryTheme.text.primary, fontWeight: 600 }}>
                Hotel Staff Directory
                <Typography
                  component="span"
                  sx={{
                    ml: 2,
                    fontSize: "1rem",
                    color: luxuryTheme.text.muted,
                    fontWeight: "normal",
                  }}
                >
                  {staffList.length} {staffList.length === 1 ? 'member' : 'members'}
                </Typography>
              </Typography>
              
              <Chip
                icon={<HotelIcon />}
                label="Active Staff"
                sx={{
                  backgroundColor: luxuryTheme.background.glass,
                  color: luxuryTheme.primary.main,
                  border: `1px solid ${luxuryTheme.border.strong}`,
                  backdropFilter: luxuryTheme.effects.blur,
                }}
              />
            </Box>

            {loading ? (
              <Box sx={{ width: "100%", py: 8 }}>
                <LinearProgress 
                  sx={{
                    backgroundColor: luxuryTheme.background.glass,
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: luxuryTheme.primary.main,
                    },
                    borderRadius: 2,
                    height: 6,
                  }}
                />
                <Typography sx={{ color: luxuryTheme.text.muted, textAlign: "center", mt: 2 }}>
                  Loading staff directory...
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={3}>
                <AnimatePresence>
                  {staffList.map((staff) => (
                    <Grid item xs={12} sm={6} md={4} key={staff._id}>
                      <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        exit={{ opacity: 0, scale: 0.9 }}
                        layout
                      >
                        <Card
                          sx={{
                            background: luxuryTheme.background.glass,
                            backdropFilter: luxuryTheme.effects.blur,
                            border: `1px solid ${luxuryTheme.border.light}`,
                            borderRadius: 4,
                            overflow: "hidden",
                            transition: luxuryTheme.effects.transition,
                            "&:hover": {
                              border: `1px solid ${luxuryTheme.border.strong}`,
                              boxShadow: "0 20px 30px rgba(0,0,0,0.5)",
                              background: luxuryTheme.background.secondary,
                            },
                          }}
                        >
                          <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                              <Avatar
                                sx={{
                                  bgcolor: luxuryTheme.background.glass,
                                  color: luxuryTheme.primary.main,
                                  width: 52,
                                  height: 52,
                                  mr: 2,
                                  border: `2px solid ${luxuryTheme.border.strong}`,
                                }}
                              >
                                {roleIcons[staff.role] || <PersonIcon />}
                              </Avatar>
                              <Box sx={{ flex: 1 }}>
                                <Typography
                                  variant="h6"
                                  sx={{
                                    color: luxuryTheme.text.primary,
                                    fontWeight: 600,
                                    fontSize: "1.1rem",
                                    lineHeight: 1.2,
                                    mb: 0.5,
                                  }}
                                >
                                  {staff.name}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: luxuryTheme.text.secondary,
                                    fontSize: "0.85rem",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 0.5,
                                  }}
                                >
                                  <EmailIcon sx={{ fontSize: 14, color: luxuryTheme.primary.main }} />
                                  {staff.email}
                                </Typography>
                              </Box>
                            </Box>

                            <Divider sx={{ borderColor: luxuryTheme.border.light, my: 2 }} />

                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                              <Chip
                                icon={roleIcons[staff.role]}
                                label={staff.role.charAt(0).toUpperCase() + staff.role.slice(1)}
                                size="small"
                                sx={{
                                  backgroundColor: luxuryTheme.background.glass,
                                  color: luxuryTheme.primary.main,
                                  border: `1px solid ${luxuryTheme.border.strong}`,
                                  fontWeight: 500,
                                  "& .MuiChip-icon": {
                                    color: luxuryTheme.primary.main,
                                    fontSize: 16,
                                  },
                                }}
                              />
                              <Typography
                                variant="caption"
                                sx={{
                                  color: luxuryTheme.text.muted,
                                  fontSize: "0.75rem",
                                  fontFamily: "monospace",
                                }}
                              >
                                ID: {staff._id.slice(-6).toUpperCase()}
                              </Typography>
                            </Box>

                            {/* Staff badge with Luxury Stay bottom line effect */}
                            <Box
                              sx={{
                                mt: 2,
                                pt: 2,
                                borderTop: `1px dashed ${luxuryTheme.border.light}`,
                                position: "relative",
                                "&:after": {
                                  content: '""',
                                  position: "absolute",
                                  bottom: -1,
                                  left: 0,
                                  right: 0,
                                  height: "1px",
                                  background: luxuryTheme.effects.bottomLine,
                                }
                              }}
                            >
                              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
                                <HotelIcon sx={{ color: luxuryTheme.primary.main, fontSize: 14, opacity: 0.5 }} />
                                <Typography
                                  variant="caption"
                                  sx={{
                                    color: luxuryTheme.text.muted,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.5px",
                                    fontSize: "0.7rem",
                                  }}
                                >
                                  Hotel Staff • Active
                                </Typography>
                              </Box>
                            </Box>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Grid>
                  ))}
                </AnimatePresence>
              </Grid>
            )}

            {!loading && staffList.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Paper
                  sx={{
                    p: 6,
                    textAlign: "center",
                    background: luxuryTheme.background.glass,
                    backdropFilter: luxuryTheme.effects.blur,
                    border: `1px solid ${luxuryTheme.border.light}`,
                    borderRadius: 4,
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: luxuryTheme.background.glass,
                      color: luxuryTheme.primary.main,
                      width: 80,
                      height: 80,
                      mx: "auto",
                      mb: 2,
                      border: `2px solid ${luxuryTheme.border.strong}`,
                    }}
                  >
                    <HotelIcon sx={{ fontSize: 40 }} />
                  </Avatar>
                  <Typography variant="h6" sx={{ color: luxuryTheme.text.primary, mb: 1 }}>
                    No Staff Members Yet
                  </Typography>
                  <Typography variant="body2" sx={{ color: luxuryTheme.text.secondary, maxWidth: 400, mx: "auto" }}>
                    Start building your hotel team by adding your first staff member using the form above
                  </Typography>
                </Paper>
              </motion.div>
            )}
          </motion.div>

          {/* Staff Summary Stats - Luxury Stay Styled */}
          {!loading && staffList.length > 0 && (
            <motion.div variants={itemVariants}>
              <Box
                sx={{
                  mt: 4,
                  display: "flex",
                  gap: 2,
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {roles.map((r) => {
                  const count = staffList.filter(s => s.role === r).length;
                  if (count === 0) return null;
                  return (
                    <Paper
                      key={r}
                      sx={{
                        px: 3,
                        py: 1.5,
                        background: luxuryTheme.background.glass,
                        backdropFilter: luxuryTheme.effects.blur,
                        border: `1px solid ${luxuryTheme.border.strong}`,
                        borderRadius: 3,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Box sx={{ color: luxuryTheme.primary.main }}>
                        {roleIcons[r]}
                      </Box>
                      <Typography sx={{ color: luxuryTheme.text.primary, fontWeight: 500 }}>
                        {r.charAt(0).toUpperCase() + r.slice(1)}:
                      </Typography>
                      <Typography sx={{ color: luxuryTheme.primary.main, fontWeight: 700 }}>
                        {count}
                      </Typography>
                    </Paper>
                  );
                })}
              </Box>
            </motion.div>
          )}
        </motion.div>
      </Container>

      {/* Success Snackbar */}
      <Snackbar
        open={success}
        autoHideDuration={4000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
        >
          <Alert
            severity="success"
            sx={{
              backgroundColor: luxuryTheme.background.glass,
              color: "#10b981",
              border: `1px solid ${luxuryTheme.border.strong}`,
              borderRadius: 3,
              backdropFilter: luxuryTheme.effects.blur,
            }}
          >
            Staff member created successfully
          </Alert>
        </motion.div>
      </Snackbar>
    </Box>
  );
}