













// import { useState, useEffect } from "react";
// import {
//   Box,
//   Container,
//   Paper,
//   Typography,
//   TextField,
//   Select,
//   MenuItem,
//   Button,
//   Grid,
//   InputAdornment,
//   FormControl,
//   InputLabel,
//   Avatar,
//   Divider,
//   Stack,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../api/axiosInstance";
// import PersonIcon from "@mui/icons-material/Person";
// import PhoneIcon from "@mui/icons-material/Phone";
// import ChildCareIcon from "@mui/icons-material/ChildCare";
// import ElderlyIcon from "@mui/icons-material/Elderly";
// import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
// import HotelIcon from "@mui/icons-material/Hotel";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import RestaurantIcon from "@mui/icons-material/Restaurant";
// import DiamondIcon from "@mui/icons-material/Diamond";
// import KingBedIcon from "@mui/icons-material/KingBed";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import { SPACING, CONTAINER, COLORS, FORM, BUTTON } from "../theme/designSystem";

// export default function BookingForm() {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     guestName: "",
//     phone: "",
//     email: "",           // Optional email field
//     checkInDate: "",
//     checkOutDate: "",
//     adults: 1,
//     children: 0,
//     seniors: 0,
//     roomType: "Standard",
//     roomsCount: 1,
//     foodPackage: "Breakfast",
//   });

//   const [touched, setTouched] = useState({});

//   useEffect(() => {
//     if (!localStorage.getItem("token")) navigate("/login");
//   }, [navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleBlur = (field) => {
//     setTouched({ ...touched, [field]: true });
//   };

//   const validateForm = () => {
//     // Name validation
//     if (!formData.guestName.trim()) return "Guest name is required";
//     if (!/^[a-zA-Z\s]+$/.test(formData.guestName)) return "Guest name can only contain letters";

//     // Phone validation
//     if (!formData.phone.trim()) return "Phone number is required";
//     if (!/^\d{10,15}$/.test(formData.phone)) return "Phone number must be 10-15 digits";

//     // Email validation (optional)
//     if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
//       return "Invalid email address";

//     // Date validation
//     if (!formData.checkInDate || !formData.checkOutDate)
//       return "Check-in and Check-out dates are required";
//     const checkIn = new Date(formData.checkInDate);
//     const checkOut = new Date(formData.checkOutDate);
//     const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
//     if (nights <= 0) return "Check-Out date must be after Check-In date";

//     // Guests and rooms
//     const adults = Number(formData.adults);
//     const children = Number(formData.children);
//     const seniors = Number(formData.seniors);
//     const roomsCount = Number(formData.roomsCount);
//     if (adults + children + seniors < 1) return "At least one guest is required";
//     if (roomsCount < 1) return "At least one room is required";

//     // Room & Food validation
//     const roomPrices = { Standard: 5000, Deluxe: 8000, Suite: 12000 };
//     const foodPrices = { NoFood: 0, Breakfast: 500, HalfBoard: 1500, FullBoard: 2500 };
//     if (!roomPrices[formData.roomType]) return "Please select a valid room type";
//     if (!foodPrices.hasOwnProperty(formData.foodPackage)) return "Please select a valid food package";

//     return null; // No errors
//   };

//   const handleBooking = async () => {
//     const validationError = validateForm();
//     if (validationError) {
//       alert(validationError);
//       return;
//     }

//     const adults = Number(formData.adults);
//     const children = Number(formData.children);
//     const seniors = Number(formData.seniors);
//     const totalGuests = adults + children + seniors;
//     const roomsCount = Number(formData.roomsCount);

//     const roomPrices = { Standard: 5000, Deluxe: 8000, Suite: 12000 };
//     const foodPrices = { NoFood: 0, Breakfast: 500, HalfBoard: 1500, FullBoard: 2500 };

//     const checkIn = new Date(formData.checkInDate);
//     const checkOut = new Date(formData.checkOutDate);
//     const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

//     const roomCost = roomPrices[formData.roomType] * nights * roomsCount;
//     const foodCost = foodPrices[formData.foodPackage] * totalGuests * nights;
//     const totalAmount = roomCost + foodCost;

//     const bookingData = { ...formData, totalGuests, nights, roomCost, foodCost, totalAmount };

//     try {
//       const res = await axiosInstance.post("/bookings", bookingData);
//       if (!res.data?.booking?._id) {
//         alert("Booking created but failed to get booking ID");
//         return;
//       }
//       navigate(`/summary/${res.data.booking._id}`);
//     } catch (err) {
//       console.error("Booking error:", err.response?.data || err.message);
//       alert("Booking failed. Please try again.");
//     }
//   };

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2,
//       },
//     },
//   };
//   const itemVariants = {
//    hidden: { opacity: 0, y: 20 },
//      visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.5, ease: "easeOut" },
//     },
//   };

//   const cardVariants = {
//     hidden: { opacity: 0, y: 50, scale: 0.95 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       scale: 1,
//       transition: { duration: 0.6, ease: "easeOut" },
//     },
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: `linear-gradient(135deg, ${COLORS.background} 0%, #111827 100%)`,
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         py: SPACING.sectionY,
//         px: SPACING.sectionX,
//         position: "relative",
//         overflow: "hidden",
//       }}
//     >
//       {/* Animated background particles */}
//        {[...Array(15)].map((_, i) => (
//         <Box
//            key={i}
//            component={motion.div}
//     animate={{
//              y: [0, -40, 0],
//            x: [0, 30, 0],
//             rotate: [0, 180, 360],
//            }}
//           transition={{
//             duration: 20 + i,
//             repeat: Infinity,
//             ease: "linear",
//             delay: i * 0.5,
//           }}
//           sx={{
//             position: "absolute",
//             left: `${Math.random() * 100}%`,
//             top: `${Math.random() * 100}%`,
//             width: 8,
//             height: 8,
//             borderRadius: "50%",
//             background: "radial-gradient(circle, #1976d2 0%, transparent 70%)",
//             opacity: 0.1,
//             pointerEvents: "none",
//             zIndex: 0,
//           }}
//         />
//       ))}

// //       {/* Floating glow orb */}
//       <Box         component={motion.div}
//         animate={{
//            scale: [1, 1.2, 1],
//            opacity: [0.3, 0.5, 0.3],
//          }}
//                   transition={{
//           duration: 8,
//            repeat: Infinity,
//            ease: "easeInOut",
//          }}
//         sx={{
//           position: "absolute",
//           top: "20%",
//           right: "10%",
//           width: 300,
//           height: 300,
//           borderRadius: "50%",
//           background: "radial-gradient(circle, rgba(25,118,210,0.15) 0%, transparent 70%)",
//           filter: "blur(60px)",
//           zIndex: 0,
//         }}
//       />

//       <Container maxWidth={CONTAINER.form} sx={{ position: "relative", zIndex: 10 }}>
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           {/* Header */}
//           <motion.div variants={itemVariants}>
//             <Box sx={{ textAlign: "center", mb: 4 }}>
//               <motion.div
//                 initial={{ scale: 0, rotate: -180 }}
//                 animate={{ scale: 1, rotate: 0 }}
//                 transition={{ 
//                   delay: 0.2, 
//                   type: "spring", 
//                   stiffness: 200,
//                   damping: 15
//                 }}
//               >
//                 <Avatar
//                   sx={{
//                     width: 80,
//                     height: 80,
//                     bgcolor: COLORS.primary,
//                     mx: "auto",
//                     mb: SPACING.titleToBody,
//                     boxShadow: `0 0 30px ${COLORS.borderStrong}`,
//                   }}
//                 >
//                   <DiamondIcon sx={{ fontSize: 40 }} />
//                 </Avatar>
//               </motion.div>

//               <Typography
//                 variant="h3"
//                 sx={{
//                   color: COLORS.text,
//                   fontWeight: 600,
//                   mb: SPACING.inlineGap,
//                   fontSize: { xs: "1.8rem", md: "2.2rem" },
//                   textShadow: "0 2px 10px rgba(0,0,0,0.3)",
//                 }}
//               >
//                 Luxury Room Reservation
//               </Typography>

//               <Typography
//                 variant="body1"
//                 sx={{
//                   color: COLORS.textSecondary,
//                   maxWidth: 500,
//                   mx: "auto",
//                 }}
//               >
//                 Book your unforgettable stay with us
//               </Typography>
//             </Box>
//           </motion.div>

//           {/* Main Form Card */}
//           <motion.div variants={cardVariants}>
//             <Paper
//               elevation={24}
//               sx={{
//                 p: SPACING.cardPadding,
//                 background: COLORS.backgroundElevated,
//                 backdropFilter: "blur(20px)",
//                 border: `1px solid ${COLORS.border}`,
//                 borderRadius: 2,
//                 boxShadow: `0 20px 40px rgba(0,0,0,0.4), 0 0 30px ${COLORS.border}`,
//               }}
//             >
//               <form onSubmit={(e) => e.preventDefault()}>
//                 <Grid container spacing={SPACING.formFieldGap}>
//                   {/* Guest Name */}
//                   <Grid item xs={12} sm={6}>
//                     <motion.div variants={itemVariants}>
//                       <TextField
//                         fullWidth
//                         name="guestName"
//                         label="Guest Name"
//                         value={formData.guestName}
//                         onChange={handleChange}
//                         onBlur={() => handleBlur("guestName")}
//                         InputProps={{
//                           startAdornment: (
//                             <InputAdornment position="start">
//                               <PersonIcon sx={{ color: "#1976d2" }} />
//                             </InputAdornment>
//                           ),
//                         }}
//                         sx={{
//                           "& .MuiOutlinedInput-root": {
//                             color: "white",
//                             "& fieldset": {
//                               borderColor: "rgba(25,118,210,0.3)",
//                             },
//                             "&:hover fieldset": {
//                               borderColor: "#1976d2",
//                             },
//                             "&.Mui-focused fieldset": {
//                               borderColor: "#1976d2",
//                               borderWidth: 2,
//                               boxShadow: "0 0 10px rgba(25,118,210,0.3)",
//                             },
//                           },
//                           "& .MuiInputLabel-root": {
//                             color: "rgba(255,255,255,0.7)",
//                             "&.Mui-focused": {
//                               color: "#1976d2",
//                             },
//                           },
//                         }}
//                       />
//                     </motion.div>
//                   </Grid>

//                   {/* Phone */}
//                   <Grid item xs={12} sm={6}>
//                     <motion.div variants={itemVariants}>
//                       <TextField
//                         fullWidth
//                         name="phone"
//                         label="Phone Number"
//                         value={formData.phone}
//                         onChange={handleChange}
//                         onBlur={() => handleBlur("phone")}
//                         InputProps={{
//                           startAdornment: (
//                             <InputAdornment position="start">
//                               <PhoneIcon sx={{ color: "#1976d2" }} />
//                             </InputAdornment>
//                           ),
//                         }}
//                         sx={{
//                           "& .MuiOutlinedInput-root": {
//                             color: "white",
//                             "& fieldset": {
//                               borderColor: "rgba(25,118,210,0.3)",
//                             },
//                             "&:hover fieldset": {
//                               borderColor: "#1976d2",
//                             },
//                             "&.Mui-focused fieldset": {
//                               borderColor: "#1976d2",
//                               borderWidth: 2,
//                               boxShadow: "0 0 10px rgba(25,118,210,0.3)",
//                             },
//                           },
//                           "& .MuiInputLabel-root": {
//                             color: "rgba(255,255,255,0.7)",
//                             "&.Mui-focused": {
//                               color: "#1976d2",
//                             },
//                           },
//                         }}
//                       />
//                     </motion.div>
//                   </Grid>

//                   {/* Guest Counts */}
//                   <Grid item xs={12}>
//                     <motion.div variants={itemVariants}>
//                       <Typography
//                         variant="subtitle2"
//                         sx={{
//                           color: "rgba(255,255,255,0.7)",
//                           mb: 1,
//                           ml: 1,
//                         }}
//                       >
//                         Number of Guests
//                       </Typography>
//                     </motion.div>
//                   </Grid>

//                   <Grid item xs={4} sm={3}>
//                      <motion.div variants={itemVariants}>
//                       <TextField
//                          fullWidth
//                          type="number"
//                        name="adults"
//                         label="Adults"
//                      value={formData.adults}
//                    onChange={handleChange}
//                         inputProps={{ min: 0 }}
//                         InputProps={{
//                           startAdornment: (
//                             <InputAdornment position="start">
//                               <PersonIcon sx={{ color: "#1976d2", fontSize: 20 }} />
//                             </InputAdornment>
//                           ),
//                         }}
//                         sx={{
//                           "& .MuiOutlinedInput-root": {
//                             color: "white",
//                             "& fieldset": {
//                               borderColor: "rgba(25,118,210,0.3)",
//                             },
//                             "&:hover fieldset": {
//                               borderColor: "#1976d2",
//                             },
//                             "&.Mui-focused fieldset": {
//                               borderColor: "#1976d2",
//                             },
//                           },
//                           "& .MuiInputLabel-root": {
//                             color: "rgba(255,255,255,0.7)",
//                             "&.Mui-focused": {
//                               color: "#1976d2",
//                             },
//                           },
//                         }}
//                       />
//                     </motion.div>
//                   </Grid>

//                   <Grid item xs={4} sm={3}>
//                     <motion.div variants={itemVariants}>
//                       <TextField
//                         fullWidth
//                         type="number"
//                         name="children"
//                         label="Children"
//                         value={formData.children}
//                         onChange={handleChange}
//                         inputProps={{ min: 0 }}
//                         InputProps={{
//                           startAdornment: (
//                             <InputAdornment position="start">
//                               <ChildCareIcon sx={{ color: "#1976d2", fontSize: 20 }} />
//                            </InputAdornment>
//                           ),
//                         }}
//                         sx={{
//                           "& .MuiOutlinedInput-root": {
//                             color: "white",
//                             "& fieldset": {
//                               borderColor: "rgba(25,118,210,0.3)",
//                             },
//                             "&:hover fieldset": {
//                               borderColor: "#1976d2",
//                             },
//                             "&.Mui-focused fieldset": {
//                               borderColor: "#1976d2",
//                             },
//                           },
//                           "& .MuiInputLabel-root": {
//                             color: "rgba(255,255,255,0.7)",
//                             "&.Mui-focused": {
//                               color: "#1976d2",
//                             },
//                           },
//                         }}
//                       />
//                     </motion.div>
//                   </Grid>

//                  <Grid item xs={4} sm={3}>
//                     <motion.div variants={itemVariants}>
//                        <TextField
//                         fullWidth
//                        type="number"
//                          name="seniors"
//                       label="Seniors"
//                          value={formData.seniors}
//                          onChange={handleChange}
//                          inputProps={{ min: 0 }}
//                         InputProps={{
//                           startAdornment: (
//                             <InputAdornment position="start">
//                               <ElderlyIcon sx={{ color: "#1976d2", fontSize: 20 }} />
//                             </InputAdornment>
//                           ),
//                         }}
//                        sx={{
//                          "& .MuiOutlinedInput-root": {
//                           color: "white",
//                             "& fieldset": {
//                               borderColor: "rgba(25,118,210,0.3)",
//                             },
//                             "&:hover fieldset": {
//                               borderColor: "#1976d2",
//                             },
//                             "&.Mui-focused fieldset": {
//                               borderColor: "#1976d2",
//                             },
//                           },
//                           "& .MuiInputLabel-root": {
//                             color: "rgba(255,255,255,0.7)",
//                             "&.Mui-focused": {
//                               color: "#1976d2",
//                             },
//                           },
//                         }}
//                       />
//                     </motion.div>
//                   </Grid>

//                   <Grid item xs={12} sm={3}>
//                     <motion.div variants={itemVariants}>
//                       <TextField
//                         fullWidth
//                         type="number"
//                         name="roomsCount"
//                         label="Rooms"
//                         value={formData.roomsCount}
//                         onChange={handleChange}
//                         inputProps={{ min: 1 }}
//                         InputProps={{
//                           startAdornment: (
//                             <InputAdornment position="start">
//                               <MeetingRoomIcon sx={{ color: "#1976d2", fontSize: 20 }} />
//                             </InputAdornment>
//                           ),
//                         }}
//                         sx={{
//                           "& .MuiOutlinedInput-root": {
//                             color: "white",
//                             "& fieldset": {
//                               borderColor: "rgba(25,118,210,0.3)",
//                             },
//                             "&:hover fieldset": {
//                               borderColor: "#1976d2",
//                             },
//                             "&.Mui-focused fieldset": {
//                               borderColor: "#1976d2",
//                             },
//                           },
//                           "& .MuiInputLabel-root": {
//                             color: "rgba(255,255,255,0.7)",
//                             "&.Mui-focused": {
//                               color: "#1976d2",
//                             },
//                           },
//                         }}
//                       />
//                     </motion.div>
//                   </Grid>

//                    {/* Room Type */}
//                <Grid item xs={12} sm={6}>
//                     <motion.div variants={itemVariants}>
//                       <FormControl fullWidth>
//                       <InputLabel sx={{ color: "rgba(255,255,255,0.7)" }}>
//                        Room Type
//                         </InputLabel>
//                        <Select
//                           name="roomType"
//                          value={formData.roomType}
//                         onChange={handleChange}
//                          label="Room Type"
//                            sx={{
//                             color: "white",
//                             "& .MuiOutlinedInput-notchedOutline": {
//                             borderColor: "rgba(25,118,210,0.3)",
//                             },
//                            "&:hover .MuiOutlinedInput-notchedOutline": {
//                             borderColor: "#1976d2",
//                            },
//                              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                                borderColor: "#1976d2",
//                              borderWidth: 2,

//                                boxShadow: "0 0 10px rgba(25,118,210,0.3)",

//                            },

//                            "& .MuiSvgIcon-root": {

//                            color: "white",

//                         },

//                          }}

//                       >

//                         <MenuItem value="Standard">


//                              <Stack direction="row" alignItems="center" spacing={1}>

//                             <KingBedIcon sx={{ color: "#1976d2" }} />

//                              <span>Standard Room</span>

//                            </Stack>

//                         </MenuItem>

//                         <MenuItem value="Deluxe">

//                           <Stack direction="row" alignItems="center" spacing={1}>

//                             <HotelIcon sx={{ color: "#1976d2" }} />

//                            <span>Deluxe Room</span>

//                              </Stack>

//                          </MenuItem>
//                         <MenuItem value="Suite">
//                              <Stack direction="row" alignItems="center" spacing={1}>
//                                <DiamondIcon sx={{ color: "#1976d2" }} />

//                             <span>Presidential Suite</span>

//                            </Stack>

//                        </MenuItem>

//                         </Select>

//                     </FormControl>

//                      </motion.div>

//                  </Grid>


//                 {/* Food Package */}

//                <Grid item xs={12} sm={6}>

//                  <motion.div variants={itemVariants}>

//                     <FormControl fullWidth>

//                         <InputLabel sx={{ color: "rgba(255,255,255,0.7)" }}>

//                           Food Package

//                     </InputLabel>

//                       <Select

//                           name="foodPackage"

//                         value={formData.foodPackage}
//                           onChange={handleChange}
//                         label="Food Package"
//                           sx={{
//                            color: "white",
//                             "& .MuiOutlinedInput-notchedOutline": {
//                               borderColor: "rgba(25,118,210,0.3)",
//                          },
//                              "&:hover .MuiOutlinedInput-notchedOutline": {
//                             borderColor: "#1976d2",
//                              },
//                              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                            borderColor: "#1976d2",
//                                borderWidth: 2,
//                             boxShadow: "0 0 10px rgba(25,118,210,0.3)",


                           



// },

//                             "& .MuiSvgIcon-root": {

//                              color: "white",


//                         },
//                          }}
//                          >
//                          <MenuItem value="NoFood">
//                           <Stack direction="row" alignItems="center" spacing={1}>
//                               <RestaurantIcon sx={{ color: "#1976d2" }} />
//                               <span>No Food</span>
//                         </Stack>
//                            </MenuItem>
//                          <MenuItem value="Breakfast">
//                           <Stack direction="row" alignItems="center" spacing={1}>
//                             <RestaurantIcon sx={{ color: "#1976d2" }} />
//                               <span>Breakfast Only</span>
//                           </Stack>
//                      </MenuItem>
//                          <MenuItem value="HalfBoard">
//                          <Stack direction="row" alignItems="center" spacing={1}>
//                              <RestaurantIcon sx={{ color: "#1976d2" }} />
//                            <span>Half Board (B+D)</span>
//                           </Stack>
//                        </MenuItem>
//                            <MenuItem value="FullBoard">
//                          <Stack direction="row" alignItems="center" spacing={1}>
//                              <RestaurantIcon sx={{ color: "#1976d2" }} />
//                            <span>Full Board (B+L+D)</span>
//                              </Stack>
//                           </MenuItem>
//                      </Select>
//                 </FormControl>




//                     </motion.div>
//                </Grid>

//                  {/* Check-In / Check-Out */}
//                  <Grid item xs={12} sm={6}>
//                  <motion.div variants={itemVariants}>
//                    <TextField
//                       fullWidth
//                     type="date"
//                        name="checkInDate"
//                       label="Check-In Date"
//                      value={formData.checkInDate}
//                   onChange={handleChange}
//                       InputLabelProps={{ shrink: true }}
//                          InputProps={{
//                           startAdornment: (
//                           <InputAdornment position="start">
//                             <CalendarTodayIcon sx={{ color: "#1976d2" }} />
//                             </InputAdornment>
//                         ),
//                      }}
//                        sx={{
//                           "& .MuiOutlinedInput-root": {
//                         color: "white",
//                           "& fieldset": {

//                               borderColor: "rgba(25,118,210,0.3)",
//                              },
//                              "&:hover fieldset": {
//                              borderColor: "#1976d2",
//                              },
//                        "&.Mui-focused fieldset": {
//                                borderColor: "#1976d2",
//                               borderWidth: 2,
//                               boxShadow: "0 0 10px rgba(25,118,210,0.3)",
//                              },
//                           },
//                      "& .MuiInputLabel-root": {
//                            color: "rgba(255,255,255,0.7)",
//                            "&.Mui-focused": {
//                                color: "#1976d2",
//                              },
//                            },
//                        "& input[type=date]": {
//                           color: "white",
//                           "&::-webkit-calendar-picker-indicator": {
//                               filter: "invert(1)",
//                           opacity: 0.5,
//                             },
//                         },
//                          }}
//                      />
//                      </motion.div>
//                    </Grid>

//                 <Grid item xs={12} sm={6}>
//                      <motion.div variants={itemVariants}>
//                       <TextField
//                         fullWidth
//                          type="date"
//                          name="checkOutDate"
//                         label="Check-Out Date"
//                          value={formData.checkOutDate}
//                          onChange={handleChange}
//                          InputLabelProps={{ shrink: true }}
//                          InputProps={{
//                            startAdornment: (
//                              <InputAdornment position="start">
//                                <CalendarTodayIcon sx={{ color: "#1976d2" }} />
//                              </InputAdornment>
//                            ),
//                          }}
//                          sx={{
//                            "& .MuiOutlinedInput-root": {
//                              color: "white",
//                              "& fieldset": {
//                                borderColor: "rgba(25,118,210,0.3)",
//                              },
//                              "&:hover fieldset": {
//                                borderColor: "#1976d2",
//                          },
//                              "&.Mui-focused fieldset": {
//                                borderColor: "#1976d2",
//                             borderWidth: 2,
//                                boxShadow: "0 0 10px rgba(25,118,210,0.3)",
//                              },
//                         },
//                           "& .MuiInputLabel-root": {
//                        color: "rgba(255,255,255,0.7)",
//                            "&.Mui-focused": {
//                               color: "#1976d2",
//                            },
//                            },
//                            "& input[type=date]": {
//                             color: "white",
//                           "&::-webkit-calendar-picker-indicator": {
//                               filter: "invert(1)",
//                               opacity: 0.5,
//                              },
//                           },
//                         }}
//                        />
//                    </motion.div>
//                    </Grid>

//                    {/* Divider */}
//                   <Grid item xs={12}>
//                      <motion.div variants={itemVariants}>
//                        <Divider sx={{ borderColor: "rgba(25,118,210,0.2)", my: 1 }} />
//                      </motion.div>
//                    </Grid>

//                   {/* Submit Button */}
//                    <Grid item xs={12}>
//                      <motion.div
//                        variants={itemVariants}
//                      whileHover={{ scale: 1.02 }}
//                        whileTap={{ scale: 0.98 }}
//                    >
//                        <Button
//                         fullWidth
//                         variant="contained"
//                         size="large"
//                         onClick={handleBooking}
//                         endIcon={<ArrowForwardIcon />}
//                         sx={{
//                           ...BUTTON.large,
//                           borderRadius: BUTTON.borderRadius,
//                           background: `linear-gradient(135deg, ${COLORS.primaryLight} 30%, ${COLORS.primary} 90%)`,
//                           color: COLORS.text,
//                           position: "relative",
//                           overflow: "hidden",
//                           boxShadow: `0 8px 20px ${COLORS.border}`,
//                           "&::before": {
//                             content: '""',
//                             position: "absolute",
//                             top: 0,
//                             left: "-100%",
//                             width: "100%",
//                             height: "100%",
//                             background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
//                             transition: "left 0.5s ease",
//                           },
//                           "&:hover::before": { left: "100%" },
//                           "&:hover": {
//                             background: `linear-gradient(135deg, ${COLORS.primaryDark} 30%, #1e88e5 90%)`,
//                             boxShadow: `0 12px 30px ${COLORS.borderStrong}`,
//                           },
//                         }}
//                       >
//                         Continue to Booking Summary
//                       </Button>
//                     </motion.div>
//                   </Grid>

//                    {/* Terms */}
//                    <Grid item xs={12}>
//                      <motion.div variants={itemVariants}>
//                       <Typography
//                         variant="caption"
//                         align="center"
//                         sx={{
//                           display: "block",
//                           color: COLORS.textMuted,
//                           mt: SPACING.inlineGap,
//                         }}
//                       >
//                         By continuing, you agree to our cancellation policy and terms of service.
//                       </Typography>
//                     </motion.div>
//                   </Grid>
//                  </Grid>
//               </form>
//            </Paper>
//          </motion.div>
//        </motion.div>
//        </Container>
//      </Box>
//    );
// }



























import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Grid,
  InputAdornment,
  FormControl,
  InputLabel,
  Avatar,
  Divider,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import ElderlyIcon from "@mui/icons-material/Elderly";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import HotelIcon from "@mui/icons-material/Hotel";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import DiamondIcon from "@mui/icons-material/Diamond";
import KingBedIcon from "@mui/icons-material/KingBed";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EmailIcon from "@mui/icons-material/Email";

export default function BookingForm() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    guestName: "",
    phone: "",
    email: "",
    checkInDate: "",
    checkOutDate: "",
    adults: 1,
    children: 0,
    seniors: 0,
    roomType: "Standard",
    roomsCount: 1,
    foodPackage: "Breakfast",
  });

  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  const validateForm = () => {
    if (!formData.guestName.trim()) return "Guest name is required";
    if (!/^[a-zA-Z\s]+$/.test(formData.guestName)) return "Guest name can only contain letters";

    if (!formData.phone.trim()) return "Phone number is required";
    if (!/^\d{10,15}$/.test(formData.phone)) return "Phone number must be 10-15 digits";

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      return "Invalid email address";

    if (!formData.checkInDate || !formData.checkOutDate)
      return "Check-in and Check-out dates are required";
    const checkIn = new Date(formData.checkInDate);
    const checkOut = new Date(formData.checkOutDate);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    if (nights <= 0) return "Check-Out date must be after Check-In date";

    const adults = Number(formData.adults);
    const children = Number(formData.children);
    const seniors = Number(formData.seniors);
    const roomsCount = Number(formData.roomsCount);
    if (adults + children + seniors < 1) return "At least one guest is required";
    if (roomsCount < 1) return "At least one room is required";

    const roomPrices = { Standard: 5000, Deluxe: 8000, Suite: 12000 };
    const foodPrices = { NoFood: 0, Breakfast: 500, HalfBoard: 1500, FullBoard: 2500 };
    if (!roomPrices[formData.roomType]) return "Please select a valid room type";
    if (!foodPrices.hasOwnProperty(formData.foodPackage)) return "Please select a valid food package";

    return null;
  };

  const handleBooking = async () => {
    const validationError = validateForm();
    if (validationError) {
      alert(validationError);
      return;
    }

    const adults = Number(formData.adults);
    const children = Number(formData.children);
    const seniors = Number(formData.seniors);
    const totalGuests = adults + children + seniors;
    const roomsCount = Number(formData.roomsCount);

    const roomPrices = { Standard: 5000, Deluxe: 8000, Suite: 12000 };
    const foodPrices = { NoFood: 0, Breakfast: 500, HalfBoard: 1500, FullBoard: 2500 };

    const checkIn = new Date(formData.checkInDate);
    const checkOut = new Date(formData.checkOutDate);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

    const roomCost = roomPrices[formData.roomType] * nights * roomsCount;
    const foodCost = foodPrices[formData.foodPackage] * totalGuests * nights;
    const totalAmount = roomCost + foodCost;

    const bookingData = { ...formData, totalGuests, nights, roomCost, foodCost, totalAmount };

    try {
      const res = await axiosInstance.post("/bookings", bookingData);
      if (!res.data?.booking?._id) {
        alert("Booking created but failed to get booking ID");
        return;
      }
      navigate(`/summary/${res.data.booking._id}`);
    } catch (err) {
      console.error("Booking error:", err.response?.data || err.message);
      alert("Booking failed. Please try again.");
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
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Luxury Stay theme colors
  const luxuryTheme = {
    primaryLight: '#0D47A1',
    primaryMain: '#1565C0',
    primaryDark: '#0A3D91',
    background: '#0A0A0A',
    secondaryBg: '#111111',
    footerGradient: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
    glassBg: 'rgba(255,255,255,0.05)',
    textPrimary: '#FFFFFF',
    textSecondary: 'rgba(255,255,255,0.7)',
    textMuted: 'rgba(255,255,255,0.5)',
    borderLight: 'rgba(255,255,255,0.08)',
    borderStrong: 'rgba(13,71,161,0.4)',
    navbarBg: 'rgba(10, 10, 10, 0.9)',
    scrolledBg: 'rgba(10, 10, 10, 0.98)',
    hoverColor: '#0D47A1',
    activeBg: 'rgba(13,71,161,0.15)',
    particleColor: '#0d47a1',
  };

  // Input styles with luxury theme
  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      color: luxuryTheme.textPrimary,
      backgroundColor: luxuryTheme.glassBg,
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s ease',
      borderRadius: '12px',
      '& fieldset': {
        borderColor: luxuryTheme.borderStrong,
        borderWidth: '1px',
      },
      '&:hover fieldset': {
        borderColor: luxuryTheme.primaryLight,
      },
      '&.Mui-focused fieldset': {
        borderColor: luxuryTheme.primaryMain,
        borderWidth: '2px',
        boxShadow: `0 0 20px ${luxuryTheme.primaryLight}40`,
      },
    },
    '& .MuiInputLabel-root': {
      color: luxuryTheme.textSecondary,
      '&.Mui-focused': {
        color: luxuryTheme.primaryLight,
      },
    },
    '& .MuiInputAdornment-root .MuiSvgIcon-root': {
      color: luxuryTheme.primaryLight,
    },
    '& input[type=number]': {
      color: luxuryTheme.textPrimary,
    },
    '& input[type=date]': {
      color: luxuryTheme.textPrimary,
      '&::-webkit-calendar-picker-indicator': {
        filter: 'invert(1)',
        opacity: 0.5,
        cursor: 'pointer',
        '&:hover': {
          opacity: 1,
        },
      },
    },
  };

  const selectStyles = {
    color: luxuryTheme.textPrimary,
    backgroundColor: luxuryTheme.glassBg,
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: luxuryTheme.borderStrong,
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: luxuryTheme.primaryLight,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: luxuryTheme.primaryMain,
      borderWidth: 2,
      boxShadow: `0 0 20px ${luxuryTheme.primaryLight}40`,
    },
    '& .MuiSvgIcon-root': {
      color: luxuryTheme.primaryLight,
    },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: luxuryTheme.footerGradient,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: { xs: 4, md: 8 },
        px: { xs: 2, md: 4 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative radial glow */}
      <Box
        sx={{
          position: "absolute",
          top: "20%",
          left: "0",
          width: "600px",
          height: "600px",
          background: `radial-gradient(circle at 0% 50%, ${luxuryTheme.primaryLight} 0%, transparent 70%)`,
          opacity: 0.1,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      
      <Box
        sx={{
          position: "absolute",
          bottom: "10%",
          right: "5%",
          width: "400px",
          height: "400px",
          background: `radial-gradient(circle at 100% 50%, ${luxuryTheme.primaryLight} 0%, transparent 70%)`,
          opacity: 0.1,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Animated particles */}
      {[...Array(20)].map((_, i) => (
        <Box
          key={i}
          component={motion.div}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.sin(i) * 20, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 15 + i,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.3,
          }}
          sx={{
            position: "absolute",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: luxuryTheme.primaryLight,
            opacity: 0.1,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      ))}

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 10 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={itemVariants}>
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    bgcolor: luxuryTheme.primaryMain,
                    mx: "auto",
                    mb: 3,
                    boxShadow: `0 0 30px ${luxuryTheme.primaryLight}`,
                  }}
                >
                  <DiamondIcon sx={{ fontSize: 50, color: luxuryTheme.textPrimary }} />
                </Avatar>
              </motion.div>

              <Typography
                variant="h2"
                sx={{
                  color: luxuryTheme.textPrimary,
                  fontWeight: 300,
                  letterSpacing: '0.1em',
                  mb: 2,
                  fontSize: { xs: "2rem", md: "2.5rem" },
                  textTransform: 'uppercase',
                  textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                }}
              >
                Luxury Stay Reservation
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: luxuryTheme.textSecondary,
                  fontWeight: 300,
                  letterSpacing: '0.05em',
                  maxWidth: 600,
                  mx: "auto",
                }}
              >
                Experience unparalleled elegance and comfort
              </Typography>
            </Box>
          </motion.div>

          {/* Main Form Card */}
          <motion.div variants={cardVariants}>
            <Paper
              elevation={24}
              sx={{
                p: { xs: 3, md: 5 },
                background: luxuryTheme.navbarBg,
                backdropFilter: "blur(10px)",
                border: `1px solid ${luxuryTheme.borderStrong}`,
                borderRadius: 4,
                boxShadow: `0 30px 60px rgba(0,0,0,0.5), 0 0 30px ${luxuryTheme.primaryLight}20`,
              }}
            >
              <form onSubmit={(e) => e.preventDefault()}>
                <Grid container spacing={3}>
                  {/* Personal Information Section */}
                  <Grid item xs={12}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: luxuryTheme.primaryLight,
                        mb: 2,
                        fontWeight: 400,
                        letterSpacing: '0.05em',
                        borderBottom: `1px solid ${luxuryTheme.borderStrong}`,
                        pb: 1,
                      }}
                    >
                      Personal Information
                    </Typography>
                  </Grid>

                  {/* Guest Name */}
                  <Grid item xs={12} md={4}>
                    <motion.div variants={itemVariants}>
                      <TextField
                        fullWidth
                        name="guestName"
                        label="Full Name"
                        value={formData.guestName}
                        onChange={handleChange}
                        onBlur={() => handleBlur("guestName")}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon />
                            </InputAdornment>
                          ),
                        }}
                        sx={inputStyles}
                      />
                    </motion.div>
                  </Grid>

                  {/* Phone */}
                  <Grid item xs={12} md={4}>
                    <motion.div variants={itemVariants}>
                      <TextField
                        fullWidth
                        name="phone"
                        label="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={() => handleBlur("phone")}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PhoneIcon />
                            </InputAdornment>
                          ),
                        }}
                        sx={inputStyles}
                      />
                    </motion.div>
                  </Grid>

                  {/* Email */}
                  <Grid item xs={12} md={4}>
                    <motion.div variants={itemVariants}>
                      <TextField
                        fullWidth
                        name="email"
                        label="Email (Optional)"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={() => handleBlur("email")}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailIcon />
                            </InputAdornment>
                          ),
                        }}
                        sx={inputStyles}
                      />
                    </motion.div>
                  </Grid>

                  {/* Stay Details Section */}
                  <Grid item xs={12}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: luxuryTheme.primaryLight,
                        mt: 2,
                        mb: 2,
                        fontWeight: 400,
                        letterSpacing: '0.05em',
                        borderBottom: `1px solid ${luxuryTheme.borderStrong}`,
                        pb: 1,
                      }}
                    >
                      Stay Details
                    </Typography>
                  </Grid>

                  {/* Check-In */}
                  <Grid item xs={12} md={6}>
                    <motion.div variants={itemVariants}>
                      <TextField
                        fullWidth
                        type="date"
                        name="checkInDate"
                        label="Check-In Date"
                        value={formData.checkInDate}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <CalendarTodayIcon />
                            </InputAdornment>
                          ),
                        }}
                        sx={inputStyles}
                      />
                    </motion.div>
                  </Grid>

                  {/* Check-Out */}
                  <Grid item xs={12} md={6}>
                    <motion.div variants={itemVariants}>
                      <TextField
                        fullWidth
                        type="date"
                        name="checkOutDate"
                        label="Check-Out Date"
                        value={formData.checkOutDate}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <CalendarTodayIcon />
                            </InputAdornment>
                          ),
                        }}
                        sx={inputStyles}
                      />
                    </motion.div>
                  </Grid>

                  {/* Guest Configuration Section */}
                  <Grid item xs={12}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: luxuryTheme.primaryLight,
                        mt: 2,
                        mb: 2,
                        fontWeight: 400,
                        letterSpacing: '0.05em',
                        borderBottom: `1px solid ${luxuryTheme.borderStrong}`,
                        pb: 1,
                      }}
                    >
                      Guest Configuration
                    </Typography>
                  </Grid>

                  {/* Adults */}
                  <Grid item xs={6} md={3}>
                    <motion.div variants={itemVariants}>
                      <TextField
                        fullWidth
                        type="number"
                        name="adults"
                        label="Adults"
                        value={formData.adults}
                        onChange={handleChange}
                        inputProps={{ min: 0 }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon />
                            </InputAdornment>
                          ),
                        }}
                        sx={inputStyles}
                      />
                    </motion.div>
                  </Grid>

                  {/* Children */}
                  <Grid item xs={6} md={3}>
                    <motion.div variants={itemVariants}>
                      <TextField
                        fullWidth
                        type="number"
                        name="children"
                        label="Children"
                        value={formData.children}
                        onChange={handleChange}
                        inputProps={{ min: 0 }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <ChildCareIcon />
                            </InputAdornment>
                          ),
                        }}
                        sx={inputStyles}
                      />
                    </motion.div>
                  </Grid>

                  {/* Seniors */}
                  <Grid item xs={6} md={3}>
                    <motion.div variants={itemVariants}>
                      <TextField
                        fullWidth
                        type="number"
                        name="seniors"
                        label="Seniors"
                        value={formData.seniors}
                        onChange={handleChange}
                        inputProps={{ min: 0 }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <ElderlyIcon />
                            </InputAdornment>
                          ),
                        }}
                        sx={inputStyles}
                      />
                    </motion.div>
                  </Grid>

                  {/* Rooms */}
                  <Grid item xs={6} md={3}>
                    <motion.div variants={itemVariants}>
                      <TextField
                        fullWidth
                        type="number"
                        name="roomsCount"
                        label="Rooms"
                        value={formData.roomsCount}
                        onChange={handleChange}
                        inputProps={{ min: 1 }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <MeetingRoomIcon />
                            </InputAdornment>
                          ),
                        }}
                        sx={inputStyles}
                      />
                    </motion.div>
                  </Grid>

                  {/* Accommodation Section */}
                  <Grid item xs={12}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: luxuryTheme.primaryLight,
                        mt: 2,
                        mb: 2,
                        fontWeight: 400,
                        letterSpacing: '0.05em',
                        borderBottom: `1px solid ${luxuryTheme.borderStrong}`,
                        pb: 1,
                      }}
                    >
                      Accommodation Preferences
                    </Typography>
                  </Grid>

                  {/* Room Type */}
                  <Grid item xs={12} md={6}>
                    <motion.div variants={itemVariants}>
                      <FormControl fullWidth>
                        <InputLabel sx={{ color: luxuryTheme.textSecondary }}>
                          Room Type
                        </InputLabel>
                        <Select
                          name="roomType"
                          value={formData.roomType}
                          onChange={handleChange}
                          label="Room Type"
                          sx={selectStyles}
                          MenuProps={{
                            PaperProps: {
                              sx: {
                                backgroundColor: luxuryTheme.secondaryBg,
                                border: `1px solid ${luxuryTheme.borderStrong}`,
                              }
                            }
                          }}
                        >
                          <MenuItem value="Standard">
                            <Stack direction="row" alignItems="center" spacing={1}>
                              <KingBedIcon sx={{ color: luxuryTheme.primaryLight }} />
                              <span style={{ color: luxuryTheme.textPrimary }}>Standard Room</span>
                            </Stack>
                          </MenuItem>
                          <MenuItem value="Deluxe">
                            <Stack direction="row" alignItems="center" spacing={1}>
                              <HotelIcon sx={{ color: luxuryTheme.primaryLight }} />
                              <span style={{ color: luxuryTheme.textPrimary }}>Deluxe Room</span>
                            </Stack>
                          </MenuItem>
                          <MenuItem value="Suite">
                            <Stack direction="row" alignItems="center" spacing={1}>
                              <DiamondIcon sx={{ color: luxuryTheme.primaryLight }} />
                              <span style={{ color: luxuryTheme.textPrimary }}>Presidential Suite</span>
                            </Stack>
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </motion.div>
                  </Grid>

                  {/* Food Package */}
                  <Grid item xs={12} md={6}>
                    <motion.div variants={itemVariants}>
                      <FormControl fullWidth>
                        <InputLabel sx={{ color: luxuryTheme.textSecondary }}>
                          Dining Package
                        </InputLabel>
                        <Select
                          name="foodPackage"
                          value={formData.foodPackage}
                          onChange={handleChange}
                          label="Food Package"
                          sx={selectStyles}
                          MenuProps={{
                            PaperProps: {
                              sx: {
                                backgroundColor: luxuryTheme.secondaryBg,
                                border: `1px solid ${luxuryTheme.borderStrong}`,
                              }
                            }
                          }}
                        >
                          <MenuItem value="NoFood">
                            <Stack direction="row" alignItems="center" spacing={1}>
                              <RestaurantIcon sx={{ color: luxuryTheme.primaryLight }} />
                              <span style={{ color: luxuryTheme.textPrimary }}>Room Only</span>
                            </Stack>
                          </MenuItem>
                          <MenuItem value="Breakfast">
                            <Stack direction="row" alignItems="center" spacing={1}>
                              <RestaurantIcon sx={{ color: luxuryTheme.primaryLight }} />
                              <span style={{ color: luxuryTheme.textPrimary }}>Breakfast Included</span>
                            </Stack>
                          </MenuItem>
                          <MenuItem value="HalfBoard">
                            <Stack direction="row" alignItems="center" spacing={1}>
                              <RestaurantIcon sx={{ color: luxuryTheme.primaryLight }} />
                              <span style={{ color: luxuryTheme.textPrimary }}>Half Board (B+D)</span>
                            </Stack>
                          </MenuItem>
                          <MenuItem value="FullBoard">
                            <Stack direction="row" alignItems="center" spacing={1}>
                              <RestaurantIcon sx={{ color: luxuryTheme.primaryLight }} />
                              <span style={{ color: luxuryTheme.textPrimary }}>Full Board (B+L+D)</span>
                            </Stack>
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </motion.div>
                  </Grid>

                  {/* Decorative bottom line */}
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        height: '1px',
                        background: `linear-gradient(90deg, transparent, ${luxuryTheme.primaryLight}, transparent)`,
                        my: 2,
                      }}
                    />
                  </Grid>

                  {/* Submit Button */}
                  <Grid item xs={12}>
                    <motion.div
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        onClick={handleBooking}
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                          py: 2,
                          background: luxuryTheme.primaryMain,
                          color: luxuryTheme.textPrimary,
                          fontWeight: 500,
                          letterSpacing: '0.1em',
                          fontSize: '1.1rem',
                          borderRadius: '12px',
                          position: "relative",
                          overflow: "hidden",
                          border: `1px solid ${luxuryTheme.primaryLight}`,
                          boxShadow: `0 8px 20px ${luxuryTheme.primaryLight}40`,
                          '&::before': {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: "-100%",
                            width: "100%",
                            height: "100%",
                            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                            transition: "left 0.5s ease",
                          },
                          '&:hover::before': {
                            left: "100%",
                          },
                          '&:hover': {
                            background: luxuryTheme.primaryLight,
                            boxShadow: `0 12px 30px ${luxuryTheme.primaryLight}80`,
                          },
                        }}
                      >
                        Complete Reservation
                      </Button>
                    </motion.div>
                  </Grid>

                  {/* Terms */}
                  <Grid item xs={12}>
                    <motion.div variants={itemVariants}>
                      <Typography
                        variant="caption"
                        align="center"
                        sx={{
                          display: "block",
                          color: luxuryTheme.textMuted,
                          mt: 2,
                          fontSize: '0.8rem',
                          letterSpacing: '0.05em',
                        }}
                      >
                        By completing this reservation, you agree to our cancellation policy, 
                        terms of service, and privacy policy.
                      </Typography>
                    </motion.div>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
}