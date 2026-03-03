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
  Select,
  FormControl,
  InputLabel,
  Tooltip,
  FormHelperText,
} from "@mui/material";
import {
  Hotel as HotelIcon,
  MeetingRoom as RoomIcon,
  Add as AddIcon,
  Close as CloseIcon,
  KingBed as KingBedIcon,
  AcUnit as AcUnitIcon,
  Wifi as WifiIcon,
  LocalParking as ParkingIcon,
  Restaurant as RestaurantIcon,
  Pool as PoolIcon,
  FitnessCenter as GymIcon,
  Spa as SpaIcon,
  CheckCircle as CheckCircleIcon,
  Build as BuildIcon,
  Block as BlockIcon,
  Diamond as DiamondIcon,
  Info as InfoIcon,
} from "@mui/icons-material";

export default function AdminRooms() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    roomNumber: "",
    floor: "",
    type: "Standard",
    price: "",
    description: "",
    amenities: [],
  });
  const [formErrors, setFormErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Luxury Stay Theme Colors
  const themeColors = {
    primaryLight: "#0D47A1",
    primaryMain: "#1565C0",
    primaryDark: "#0A3D91",
    backgroundMain: "#0A0A0A",
    backgroundSecondary: "#111111",
    footerGradient: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
    glassEffect: "rgba(255,255,255,0.05)",
    textPrimary: "#FFFFFF",
    textSecondary: "rgba(255,255,255,0.7)",
    textMuted: "rgba(255,255,255,0.5)",
    borderLight: "rgba(255,255,255,0.08)",
    borderStrong: "rgba(13,71,161,0.4)",
  };

  const roomTypes = [
    { value: "Standard", label: "Standard Room", icon: <KingBedIcon /> },
    { value: "Deluxe", label: "Deluxe Room", icon: <HotelIcon /> },
    { value: "Suite", label: "Luxury Suite", icon: <SpaIcon /> },
  ];

  const amenitiesList = [
    { value: "ac", label: "Air Conditioning", icon: <AcUnitIcon /> },
    { value: "wifi", label: "Free WiFi", icon: <WifiIcon /> },
    { value: "parking", label: "Parking", icon: <ParkingIcon /> },
    { value: "restaurant", label: "Restaurant", icon: <RestaurantIcon /> },
    { value: "pool", label: "Swimming Pool", icon: <PoolIcon /> },
    { value: "gym", label: "Fitness Center", icon: <GymIcon /> },
    { value: "spa", label: "Spa", icon: <SpaIcon /> },
  ];

  // Status colors matching theme
  const statusColors = {
    available: "#0D47A1", // primary light
    occupied: "#1565C0", // primary main
    maintenance: "rgba(255,255,255,0.5)", // text muted
  };

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get("/rooms");
      setRooms(data);
    } catch (error) {
      console.error(error.response?.data || error.message);
      setError("Failed to load rooms");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  const handleAmenityChange = (amenity) => {
    const updatedAmenities = formData.amenities.includes(amenity)
      ? formData.amenities.filter((a) => a !== amenity)
      : [...formData.amenities, amenity];
    setFormData({ ...formData, amenities: updatedAmenities });
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.roomNumber) errors.roomNumber = "Room number is required";
    else if (formData.roomNumber < 1) errors.roomNumber = "Invalid room number";
    
    if (!formData.floor) errors.floor = "Floor is required";
    else if (formData.floor < 0) errors.floor = "Invalid floor";
    
    if (!formData.price) errors.price = "Price is required";
    else if (formData.price < 0) errors.price = "Price must be positive";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axiosInstance.post("/rooms", {
        ...formData,
        price: Number(formData.price),
        roomNumber: Number(formData.roomNumber),
        floor: Number(formData.floor),
      });
      setSuccess(true);
      setFormData({
        roomNumber: "",
        floor: "",
        type: "Standard",
        price: "",
        description: "",
        amenities: [],
      });
      setFormErrors({});
      fetchRooms();
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      setError(error.response?.data?.message || "Error creating room");
    }
  };

  const changeStatus = async (id, status) => {
    try {
      await axiosInstance.put(`/rooms/${id}/status`, { status });
      fetchRooms();
    } catch (error) {
      console.error(error.response?.data || error.message);
      setError("Failed to update room status");
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case "available": return <CheckCircleIcon />;
      case "occupied": return <BlockIcon />;
      case "maintenance": return <BuildIcon />;
      default: return <InfoIcon />;
    }
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
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hover: {
      y: -6,
      scale: 1.02,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.02,
      boxShadow: "0 12px 30px rgba(13,71,161,0.4)",
      transition: { duration: 0.3, ease: "easeOut" },
    },
    tap: {
      scale: 0.98,
    },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: themeColors.backgroundMain,
        position: "relative",
        overflow: "hidden",
        py: { xs: 4, md: 6 },
        px: { xs: 2, md: 3 },
      }}
    >
      {/* Radial Glow Effect - From PDF */}
      <Box
        sx={{
          position: "absolute",
          top: "0%",
          left: "0%",
          width: "100%",
          height: "100%",
          background: "radial-gradient(circle at 0% 50%, #0D47A1 0%, transparent 50%)",
          opacity: 0.1,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Particle Effects - From PDF */}
      {[...Array(20)].map((_, i) => (
        <Box
          key={i}
          component={motion.div}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 10 + i,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.5,
          }}
          sx={{
            position: "absolute",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: 4,
            height: 4,
            borderRadius: "50%",
            backgroundColor: "#0D47A1",
            opacity: 0.1,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      ))}

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 10 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Page Header - Updated with Theme */}
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
                  background: `linear-gradient(135deg, ${themeColors.primaryDark} 0%, ${themeColors.primaryMain} 100%)`,
                  color: themeColors.textPrimary,
                  boxShadow: "0 8px 20px rgba(13,71,161,0.3)",
                }}
              >
                <DiamondIcon sx={{ fontSize: 35 }} />
              </Avatar>
              <Box>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: "2.2rem", md: "3.2rem" },
                    fontWeight: 700,
                    background: `linear-gradient(135deg, ${themeColors.textPrimary} 30%, ${themeColors.primaryLight} 90%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    mb: 1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Rooms Management
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: themeColors.textSecondary,
                    fontSize: "1rem",
                    maxWidth: 600,
                  }}
                >
                  Manage hotel rooms, availability, and amenities
                </Typography>
              </Box>
            </Box>
          </motion.div>

          {/* Add Room Form - Updated with Theme */}
          <motion.div variants={itemVariants}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                mb: 6,
                background: themeColors.backgroundSecondary,
                backdropFilter: "blur(10px)",
                border: `1px solid ${themeColors.borderStrong}`,
                borderRadius: 3,
                boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Avatar
                  sx={{
                    bgcolor: themeColors.primaryLight,
                    width: 48,
                    height: 48,
                    mr: 2,
                  }}
                >
                  <AddIcon />
                </Avatar>
                <Box>
                  <Typography variant="h5" sx={{ color: themeColors.textPrimary, fontWeight: 600 }}>
                    Add New Room
                  </Typography>
                  <Typography variant="body2" sx={{ color: themeColors.textMuted }}>
                    Fill in the details to add a new room to your hotel
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
                      backgroundColor: "rgba(211,47,47,0.1)",
                      color: "#f44336",
                      border: "1px solid rgba(211,47,47,0.3)",
                      borderRadius: 2,
                    }}
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => setError("")}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                  >
                    {error}
                  </Alert>
                </motion.div>
              )}

              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  {/* Room Number and Floor */}
                  <Grid item xs={12} md={6}>
                    <motion.div variants={itemVariants}>
                      <TextField
                        fullWidth
                        type="number"
                        name="roomNumber"
                        label="Room Number"
                        value={formData.roomNumber}
                        onChange={handleChange}
                        error={!!formErrors.roomNumber}
                        helperText={formErrors.roomNumber}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <RoomIcon sx={{ color: themeColors.primaryLight }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            color: themeColors.textPrimary,
                            backgroundColor: themeColors.glassEffect,
                            borderRadius: 2,
                            "& fieldset": {
                              borderColor: formErrors.roomNumber 
                                ? "#f44336" 
                                : themeColors.borderLight,
                            },
                            "&:hover fieldset": {
                              borderColor: formErrors.roomNumber ? "#f44336" : themeColors.primaryLight,
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: themeColors.primaryLight,
                              borderWidth: 2,
                            },
                          },
                          "& .MuiInputLabel-root": {
                            color: themeColors.textMuted,
                            "&.Mui-focused": {
                              color: themeColors.primaryLight,
                            },
                          },
                          "& .MuiFormHelperText-root": {
                            color: "#f44336",
                          },
                        }}
                      />
                    </motion.div>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <motion.div variants={itemVariants}>
                      <TextField
                        fullWidth
                        type="number"
                        name="floor"
                        label="Floor"
                        value={formData.floor}
                        onChange={handleChange}
                        error={!!formErrors.floor}
                        helperText={formErrors.floor}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <HotelIcon sx={{ color: themeColors.primaryLight }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            color: themeColors.textPrimary,
                            backgroundColor: themeColors.glassEffect,
                            borderRadius: 2,
                            "& fieldset": {
                              borderColor: formErrors.floor 
                                ? "#f44336" 
                                : themeColors.borderLight,
                            },
                            "&:hover fieldset": {
                              borderColor: formErrors.floor ? "#f44336" : themeColors.primaryLight,
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: themeColors.primaryLight,
                              borderWidth: 2,
                            },
                          },
                          "& .MuiInputLabel-root": {
                            color: themeColors.textMuted,
                            "&.Mui-focused": {
                              color: themeColors.primaryLight,
                            },
                          },
                        }}
                      />
                    </motion.div>
                  </Grid>

                  {/* Room Type and Price */}
                  <Grid item xs={12} md={6}>
                    <motion.div variants={itemVariants}>
                      <FormControl fullWidth error={!!formErrors.type}>
                        <InputLabel sx={{ color: themeColors.textMuted }}>
                          Room Type
                        </InputLabel>
                        <Select
                          name="type"
                          value={formData.type}
                          onChange={handleChange}
                          label="Room Type"
                          sx={{
                            color: themeColors.textPrimary,
                            backgroundColor: themeColors.glassEffect,
                            borderRadius: 2,
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: themeColors.borderLight,
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                              borderColor: themeColors.primaryLight,
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: themeColors.primaryLight,
                              borderWidth: 2,
                            },
                            "& .MuiSvgIcon-root": {
                              color: themeColors.textPrimary,
                            },
                          }}
                        >
                          {roomTypes.map((type) => (
                            <MenuItem key={type.value} value={type.value}>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Box sx={{ color: themeColors.primaryLight }}>{type.icon}</Box>
                                <span>{type.label}</span>
                              </Box>
                            </MenuItem>
                          ))}
                        </Select>
                        {formErrors.type && (
                          <FormHelperText sx={{ color: "#f44336" }}>
                            {formErrors.type}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </motion.div>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <motion.div variants={itemVariants}>
                      <TextField
                        fullWidth
                        type="number"
                        name="price"
                        label="Price per Night"
                        value={formData.price}
                        onChange={handleChange}
                        error={!!formErrors.price}
                        helperText={formErrors.price}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <span style={{ color: themeColors.primaryLight, fontWeight: 600 }}>Rs</span>
                            </InputAdornment>
                          ),
                        }}
                        placeholder="5000"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            color: themeColors.textPrimary,
                            backgroundColor: themeColors.glassEffect,
                            borderRadius: 2,
                            "& fieldset": {
                              borderColor: formErrors.price 
                                ? "#f44336" 
                                : themeColors.borderLight,
                            },
                            "&:hover fieldset": {
                              borderColor: formErrors.price ? "#f44336" : themeColors.primaryLight,
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: themeColors.primaryLight,
                              borderWidth: 2,
                            },
                          },
                          "& .MuiInputLabel-root": {
                            color: themeColors.textMuted,
                            "&.Mui-focused": {
                              color: themeColors.primaryLight,
                            },
                          },
                        }}
                      />
                    </motion.div>
                  </Grid>

                  {/* Description */}
                  <Grid item xs={12}>
                    <motion.div variants={itemVariants}>
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        name="description"
                        label="Room Description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe the room features, view, size, etc."
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            color: themeColors.textPrimary,
                            backgroundColor: themeColors.glassEffect,
                            borderRadius: 2,
                            "& fieldset": {
                              borderColor: themeColors.borderLight,
                            },
                            "&:hover fieldset": {
                              borderColor: themeColors.primaryLight,
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: themeColors.primaryLight,
                              borderWidth: 2,
                            },
                          },
                          "& .MuiInputLabel-root": {
                            color: themeColors.textMuted,
                            "&.Mui-focused": {
                              color: themeColors.primaryLight,
                            },
                          },
                        }}
                      />
                    </motion.div>
                  </Grid>

                  {/* Amenities Section */}
                  <Grid item xs={12}>
                    <motion.div variants={itemVariants}>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            color: themeColors.textPrimary,
                            fontWeight: 600,
                            mb: 1,
                          }}
                        >
                          Room Amenities
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: themeColors.textMuted,
                            display: "block",
                            mb: 2,
                          }}
                        >
                          Select amenities available in this room
                        </Typography>
                      </Box>
                      
                      <Grid container spacing={1.5}>
                        {amenitiesList.map((amenity) => (
                          <Grid item xs={6} sm={4} md={3} key={amenity.value}>
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Paper
                                onClick={() => handleAmenityChange(amenity.value)}
                                sx={{
                                  p: 1.5,
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1.5,
                                  backgroundColor: formData.amenities.includes(amenity.value)
                                    ? `rgba(13,71,161,0.15)`
                                    : themeColors.glassEffect,
                                  border: `1px solid ${
                                    formData.amenities.includes(amenity.value)
                                      ? themeColors.primaryLight
                                      : themeColors.borderLight
                                  }`,
                                  borderRadius: 2,
                                  cursor: "pointer",
                                  transition: "all 0.2s ease",
                                  "&:hover": {
                                    backgroundColor: formData.amenities.includes(amenity.value)
                                      ? "rgba(13,71,161,0.25)"
                                      : "rgba(13,71,161,0.1)",
                                    borderColor: themeColors.primaryLight,
                                  },
                                }}
                              >
                                <Box
                                  sx={{
                                    color: formData.amenities.includes(amenity.value)
                                      ? themeColors.primaryLight
                                      : themeColors.textMuted,
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  {amenity.icon}
                                </Box>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: formData.amenities.includes(amenity.value)
                                      ? themeColors.primaryLight
                                      : themeColors.textMuted,
                                    fontWeight: formData.amenities.includes(amenity.value) ? 600 : 400,
                                    fontSize: { xs: "0.8rem", sm: "0.9rem" },
                                  }}
                                >
                                  {amenity.label}
                                </Typography>
                              </Paper>
                            </motion.div>
                          </Grid>
                        ))}
                      </Grid>

                      {formData.amenities.length > 0 && (
                        <Box
                          sx={{
                            mt: 2,
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <Chip
                            size="small"
                            label={`${formData.amenities.length} amenities selected`}
                            sx={{
                              backgroundColor: `rgba(13,71,161,0.15)`,
                              color: themeColors.primaryLight,
                              border: `1px solid ${themeColors.borderStrong}`,
                            }}
                          />
                        </Box>
                      )}
                    </motion.div>
                  </Grid>

                  {/* Add Room Button */}
                  <Grid item xs={12}>
                    <motion.div
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      style={{ marginTop: "8px" }}
                    >
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        startIcon={<AddIcon />}
                        sx={{
                          background: `linear-gradient(135deg, ${themeColors.primaryDark} 0%, ${themeColors.primaryMain} 100%)`,
                          color: themeColors.textPrimary,
                          py: 1.8,
                          borderRadius: 2,
                          fontSize: "1.1rem",
                          fontWeight: 600,
                          textTransform: "none",
                          letterSpacing: "0.5px",
                          boxShadow: "0 8px 20px rgba(13,71,161,0.3)",
                          "&:hover": {
                            background: `linear-gradient(135deg, ${themeColors.primaryMain} 0%, ${themeColors.primaryLight} 100%)`,
                            boxShadow: "0 12px 30px rgba(13,71,161,0.5)",
                          },
                        }}
                      >
                        Add New Room
                      </Button>
                    </motion.div>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </motion.div>

          {/* Rooms List Section */}
          <motion.div variants={itemVariants}>
            <Box sx={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "space-between", 
              mb: 3,
              flexWrap: "wrap",
              gap: 2
            }}>
              <Typography variant="h4" sx={{ color: themeColors.textPrimary, fontWeight: 600 }}>
                Hotel Rooms
                <Typography
                  component="span"
                  sx={{
                    ml: 2,
                    fontSize: "1rem",
                    color: themeColors.textMuted,
                    fontWeight: "normal",
                  }}
                >
                  {rooms.length} {rooms.length === 1 ? 'room' : 'rooms'} available
                </Typography>
              </Typography>
              
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                <Chip
                  icon={<CheckCircleIcon />}
                  label={`Available: ${rooms.filter(r => r.status === "available").length}`}
                  sx={{
                    backgroundColor: "rgba(13,71,161,0.15)",
                    color: themeColors.primaryLight,
                    border: `1px solid ${themeColors.borderStrong}`,
                  }}
                />
                <Chip
                  icon={<BlockIcon />}
                  label={`Occupied: ${rooms.filter(r => r.status === "occupied").length}`}
                  sx={{
                    backgroundColor: "rgba(21,101,192,0.15)",
                    color: themeColors.primaryMain,
                    border: `1px solid ${themeColors.borderStrong}`,
                  }}
                />
                <Chip
                  icon={<BuildIcon />}
                  label={`Maintenance: ${rooms.filter(r => r.status === "maintenance").length}`}
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    color: themeColors.textMuted,
                    border: `1px solid ${themeColors.borderLight}`,
                  }}
                />
              </Box>
            </Box>

            {loading ? (
              <Box sx={{ width: "100%", py: 8 }}>
                <LinearProgress 
                  sx={{
                    backgroundColor: "rgba(13,71,161,0.1)",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: themeColors.primaryLight,
                    },
                    borderRadius: 2,
                    height: 6,
                  }}
                />
                <Typography sx={{ color: themeColors.textMuted, textAlign: "center", mt: 2 }}>
                  Loading rooms...
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={3}>
                <AnimatePresence>
                  {rooms.map((room) => (
                    <Grid item xs={12} sm={6} md={4} key={room._id}>
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
                            background: themeColors.backgroundSecondary,
                            backdropFilter: "blur(10px)",
                            border: `1px solid ${themeColors.borderLight}`,
                            borderRadius: 3,
                            overflow: "hidden",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              border: `1px solid ${themeColors.borderStrong}`,
                              boxShadow: "0 20px 30px rgba(0,0,0,0.5)",
                            },
                          }}
                        >
                          <CardContent sx={{ p: 3 }}>
                            {/* Room Header */}
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Avatar
                                  sx={{
                                    bgcolor: `rgba(13,71,161,0.15)`,
                                    color: themeColors.primaryLight,
                                    width: 40,
                                    height: 40,
                                  }}
                                >
                                  <RoomIcon />
                                </Avatar>
                                <Box>
                                  <Typography variant="h6" sx={{ color: themeColors.textPrimary, fontWeight: 600 }}>
                                    Room {room.roomNumber}
                                  </Typography>
                                  <Typography variant="caption" sx={{ color: themeColors.textMuted }}>
                                    Floor {room.floor}
                                  </Typography>
                                </Box>
                              </Box>
                              <Chip
                                icon={getStatusIcon(room.status)}
                                label={room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                                size="small"
                                sx={{
                                  backgroundColor: room.status === "available" 
                                    ? "rgba(13,71,161,0.15)"
                                    : room.status === "occupied"
                                    ? "rgba(21,101,192,0.15)"
                                    : "rgba(255,255,255,0.05)",
                                  color: room.status === "available"
                                    ? themeColors.primaryLight
                                    : room.status === "occupied"
                                    ? themeColors.primaryMain
                                    : themeColors.textMuted,
                                  border: `1px solid ${
                                    room.status === "available"
                                      ? themeColors.borderStrong
                                      : room.status === "occupied"
                                      ? "rgba(21,101,192,0.3)"
                                      : themeColors.borderLight
                                  }`,
                                  fontWeight: 500,
                                  "& .MuiChip-icon": {
                                    color: "inherit",
                                  },
                                }}
                              />
                            </Box>

                            <Divider sx={{ borderColor: themeColors.borderLight, my: 2 }} />

                            {/* Room Details */}
                            <Box sx={{ mb: 2 }}>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                                <KingBedIcon sx={{ color: themeColors.primaryLight, fontSize: 18 }} />
                                <Typography variant="body2" sx={{ color: themeColors.textMuted }}>
                                  Type:
                                </Typography>
                                <Typography variant="body2" sx={{ color: themeColors.textPrimary, fontWeight: 500 }}>
                                  {room.type}
                                </Typography>
                              </Box>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <span style={{ color: themeColors.primaryLight, fontSize: 18 }}>Rs</span>
                                <Typography variant="body2" sx={{ color: themeColors.textMuted }}>
                                  Price:
                                </Typography>
                                <Typography variant="body2" sx={{ color: themeColors.primaryLight, fontWeight: 600 }}>
                                  Rs {room.price?.toLocaleString()}/night
                                </Typography>
                              </Box>
                            </Box>

                            {/* Description */}
                            {room.description && (
                              <Box sx={{ mb: 2 }}>
                                <Typography variant="caption" sx={{ color: themeColors.textMuted }}>
                                  {room.description.length > 60 
                                    ? `${room.description.substring(0, 60)}...` 
                                    : room.description}
                                </Typography>
                              </Box>
                            )}

                            {/* Action Buttons */}
                            <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                              {room.status === "available" && (
                                <Tooltip title="Set to Maintenance">
                                  <Button
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    onClick={() => changeStatus(room._id, "maintenance")}
                                    startIcon={<BuildIcon />}
                                    sx={{
                                      borderColor: themeColors.borderLight,
                                      color: themeColors.textMuted,
                                      "&:hover": {
                                        borderColor: themeColors.primaryLight,
                                        backgroundColor: "rgba(13,71,161,0.1)",
                                      },
                                    }}
                                  >
                                    Maintenance
                                  </Button>
                                </Tooltip>
                              )}
                              {room.status === "maintenance" && (
                                <Tooltip title="Set to Available">
                                  <Button
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    onClick={() => changeStatus(room._id, "available")}
                                    startIcon={<CheckCircleIcon />}
                                    sx={{
                                      borderColor: themeColors.primaryLight,
                                      color: themeColors.primaryLight,
                                      "&:hover": {
                                        borderColor: themeColors.primaryMain,
                                        backgroundColor: "rgba(13,71,161,0.1)",
                                      },
                                    }}
                                  >
                                    Available
                                  </Button>
                                </Tooltip>
                              )}
                              {room.status === "occupied" && (
                                <Button
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                  disabled
                                  sx={{
                                    borderColor: themeColors.borderLight,
                                    color: themeColors.textMuted,
                                  }}
                                >
                                  Currently Occupied
                                </Button>
                              )}
                            </Box>

                            {/* Room Footer */}
                            <Box
                              sx={{
                                mt: 2,
                                pt: 2,
                                borderTop: `1px dashed ${themeColors.borderLight}`,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <Typography
                                variant="caption"
                                sx={{
                                  color: themeColors.textMuted,
                                  fontSize: "0.7rem",
                                  fontFamily: "monospace",
                                }}
                              >
                                ID: {room._id.slice(-6).toUpperCase()}
                              </Typography>
                              <Box sx={{ display: "flex", gap: 0.5 }}>
                                {room.amenities?.slice(0, 3).map((amenity, i) => {
                                  const amenityObj = amenitiesList.find(a => a.value === amenity);
                                  return amenityObj ? (
                                    <Tooltip key={i} title={amenityObj.label}>
                                      <Avatar
                                        sx={{
                                          width: 24,
                                          height: 24,
                                          bgcolor: "rgba(13,71,161,0.15)",
                                          color: themeColors.primaryLight,
                                          fontSize: 14,
                                        }}
                                      >
                                        {amenityObj.icon}
                                      </Avatar>
                                    </Tooltip>
                                  ) : null;
                                })}
                                {room.amenities?.length > 3 && (
                                  <Avatar
                                    sx={{
                                      width: 24,
                                      height: 24,
                                      bgcolor: themeColors.glassEffect,
                                      color: themeColors.textMuted,
                                      fontSize: 10,
                                    }}
                                  >
                                    +{room.amenities.length - 3}
                                  </Avatar>
                                )}
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

            {!loading && rooms.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Paper
                  sx={{
                    p: 6,
                    textAlign: "center",
                    background: themeColors.backgroundSecondary,
                    backdropFilter: "blur(10px)",
                    border: `1px solid ${themeColors.borderLight}`,
                    borderRadius: 3,
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: `rgba(13,71,161,0.15)`,
                      color: themeColors.primaryLight,
                      width: 80,
                      height: 80,
                      mx: "auto",
                      mb: 2,
                    }}
                  >
                    <HotelIcon sx={{ fontSize: 40 }} />
                  </Avatar>
                  <Typography variant="h6" sx={{ color: themeColors.textPrimary, mb: 1 }}>
                    No Rooms Added Yet
                  </Typography>
                  <Typography variant="body2" sx={{ color: themeColors.textMuted, maxWidth: 400, mx: "auto" }}>
                    Start building your hotel inventory by adding your first room using the form above
                  </Typography>
                </Paper>
              </motion.div>
            )}
          </motion.div>

          {/* Room Stats Summary */}
          {!loading && rooms.length > 0 && (
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
                {roomTypes.map((type) => {
                  const count = rooms.filter(r => r.type === type.value).length;
                  if (count === 0) return null;
                  return (
                    <Paper
                      key={type.value}
                      sx={{
                        px: 3,
                        py: 1.5,
                        background: themeColors.backgroundSecondary,
                        backdropFilter: "blur(10px)",
                        border: `1px solid ${themeColors.borderLight}`,
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Box sx={{ color: themeColors.primaryLight }}>
                        {type.icon}
                      </Box>
                      <Typography sx={{ color: themeColors.textMuted, fontWeight: 500 }}>
                        {type.label}:
                      </Typography>
                      <Typography sx={{ color: themeColors.primaryLight, fontWeight: 700 }}>
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
        autoHideDuration={3000}
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
              backgroundColor: "rgba(13,71,161,0.2)",
              color: themeColors.primaryLight,
              border: `1px solid ${themeColors.borderStrong}`,
              borderRadius: 2,
              backdropFilter: "blur(10px)",
            }}
          >
            Room added successfully
          </Alert>
        </motion.div>
      </Snackbar>
    </Box>
  );
}