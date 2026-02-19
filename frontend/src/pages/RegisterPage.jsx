









// import { useState } from "react";
// import axiosInstance from "../api/axiosInstance";
// import { useNavigate, Link as RouterLink } from "react-router-dom";
// import {
//   Box,
//   Container,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   InputAdornment,
//   IconButton,
//   Link,
//   Alert,
// } from "@mui/material";
// import { motion } from "framer-motion";
// import PersonIcon from "@mui/icons-material/Person";
// import EmailIcon from "@mui/icons-material/Email";
// import LockIcon from "@mui/icons-material/Lock";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";

// export default function RegisterPage() {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axiosInstance.post("/auth/register", formData);
//       localStorage.setItem("token", res.data.token);

//       setSuccess("Registration Successful ✅");
//       setError("");

//       setTimeout(() => {
//         navigate("/dashboard");
//       }, 1500);
//     } catch (error) {
//       setError(error.response?.data?.message || "Registration Failed ❌");
//       setSuccess("");
//     }
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg, #0a0a0a, #111827)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <Container maxWidth="sm">
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <Paper
//             elevation={10}
//             sx={{
//               p: 5,
//               background:
//                 "linear-gradient(145deg, rgba(18,18,18,0.95), rgba(10,10,10,0.95))",
//               borderRadius: 4,
//               border: "1px solid rgba(25,118,210,0.3)",
//               boxShadow: "0 0 30px rgba(25,118,210,0.2)",
//             }}
//           >
//             <Typography
//               variant="h4"
//               align="center"
//               sx={{
//                 color: "white",
//                 fontWeight: 700,
//                 mb: 3,
//                 background:
//                   "linear-gradient(90deg,#fff,#1976d2)",
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//               }}
//             >
//               Create Account
//             </Typography>

//             {error && (
//               <Alert severity="error" sx={{ mb: 2 }}>
//                 {error}
//               </Alert>
//             )}

//             {success && (
//               <Alert severity="success" sx={{ mb: 2 }}>
//                 {success}
//               </Alert>
//             )}

//             <form onSubmit={handleRegister}>
//               <TextField
//                 fullWidth
//                 label="Full Name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 margin="normal"
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <PersonIcon sx={{ color: "#1976d2" }} />
//                     </InputAdornment>
//                   ),
//                 }}
//                 sx={inputStyle}
//               />

//               <TextField
//                 fullWidth
//                 label="Email Address"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 margin="normal"
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <EmailIcon sx={{ color: "#1976d2" }} />
//                     </InputAdornment>
//                   ),
//                 }}
//                 sx={inputStyle}
//               />

//               <TextField
//                 fullWidth
//                 label="Password"
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 margin="normal"
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <LockIcon sx={{ color: "#1976d2" }} />
//                     </InputAdornment>
//                   ),
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton
//                         onClick={() => setShowPassword(!showPassword)}
//                         sx={{ color: "white" }}
//                       >
//                         {showPassword ? <VisibilityOff /> : <Visibility />}
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//                 sx={inputStyle}
//               />

//               <motion.div whileHover={{ scale: 1.05 }}>
//                 <Button
//                   type="submit"
//                   fullWidth
//                   variant="contained"
//                   sx={{
//                     mt: 3,
//                     py: 1.3,
//                     background:
//                       "linear-gradient(90deg,#1976d2,#0d47a1)",
//                     fontWeight: 600,
//                     "&:hover": {
//                       boxShadow: "0 0 20px rgba(25,118,210,0.6)",
//                     },
//                   }}
//                 >
//                   Register
//                 </Button>
//               </motion.div>

//               <Typography
//                 variant="body2"
//                 align="center"
//                 sx={{ color: "rgba(255,255,255,0.7)", mt: 3 }}
//               >
//                 Already have an account?{" "}
//                 <Link
//                   component={RouterLink}
//                   to="/login"
//                   sx={{
//                     color: "#1976d2",
//                     fontWeight: 600,
//                     textDecoration: "none",
//                   }}
//                 >
//                   Login
//                 </Link>
//               </Typography>
//             </form>
//           </Paper>
//         </motion.div>
//       </Container>
//     </Box>
//   );
// }

// const inputStyle = {
//   "& .MuiOutlinedInput-root": {
//     color: "white",
//     "& fieldset": {
//       borderColor: "rgba(25,118,210,0.3)",
//     },
//     "&:hover fieldset": {
//       borderColor: "#1976d2",
//     },
//     "&.Mui-focused fieldset": {
//       borderColor: "#1976d2",
//     },
//   },
//   "& .MuiInputLabel-root": {
//     color: "rgba(255,255,255,0.7)",
//     "&.Mui-focused": {
//       color: "#1976d2",
//     },
//   },
// };



















import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Link,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { SPACING, CONTAINER, COLORS, FORM, BUTTON } from "../theme/designSystem";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // ----------------------------
  // Validation function
  // ----------------------------
  const validateForm = () => {
    const { name, email, password } = formData;

    // Name validation
    if (!name.trim()) return "Full name is required";
    if (!/^[a-zA-Z\s]+$/.test(name)) return "Name can only contain letters and spaces";

    // Email validation
    if (!email.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Invalid email address";

    // Password validation
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    if (!/[A-Z]/.test(password)) return "Password must contain at least 1 uppercase letter";
    if (!/[a-z]/.test(password)) return "Password must contain at least 1 lowercase letter";
    if (!/[0-9]/.test(password)) return "Password must contain at least 1 number";
    if (!/[!@#$%^&*]/.test(password)) return "Password must contain at least 1 special character (!@#$%^&*)";

    return null; // No validation errors
  };

  // ----------------------------
  // Registration handler
  // ----------------------------
  const handleRegister = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setSuccess("");
      return;
    }

    try {
      const res = await axiosInstance.post("/auth/register", formData);
      localStorage.setItem("token", res.data.token);

      setSuccess("Registration Successful ✅");
      setError("");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Registration Failed ❌");
      setSuccess("");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${COLORS.background}, #111827)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: SPACING.sectionY,
        px: SPACING.sectionX,
      }}
    >
      <Container maxWidth={CONTAINER.form}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper
            elevation={10}
            sx={{
              p: SPACING.cardPadding,
              background: COLORS.backgroundElevated,
              borderRadius: 2,
              border: `1px solid ${COLORS.borderStrong}`,
              boxShadow: `0 0 30px ${COLORS.border}`,
            }}
          >
            <Typography
              variant="h4"
              align="center"
              sx={{
                color: COLORS.text,
                fontWeight: 700,
                mb: SPACING.formSectionGap,
                background: `linear-gradient(90deg, ${COLORS.text}, ${COLORS.primary})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Create Account
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: SPACING.formFieldGap }}>
                {error}
              </Alert>
            )}

            {success && (
              <Alert severity="success" sx={{ mb: SPACING.formFieldGap }}>
                {success}
              </Alert>
            )}

            <form onSubmit={handleRegister}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ color: COLORS.primary }} />
                    </InputAdornment>
                  ),
                }}
                sx={FORM.inputStyle}
              />

              <TextField
                fullWidth
                label="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: COLORS.primary }} />
                    </InputAdornment>
                  ),
                }}
                sx={FORM.inputStyle}
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: COLORS.primary }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        sx={{ color: COLORS.text }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={FORM.inputStyle}
              />

              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: SPACING.formSectionGap,
                    ...BUTTON.large,
                    borderRadius: BUTTON.borderRadius,
                    background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
                    fontWeight: 600,
                    "&:hover": {
                      boxShadow: `0 0 20px ${COLORS.borderStrong}`,
                    },
                  }}
                >
                  Register
                </Button>
              </motion.div>

              <Typography
                variant="body2"
                align="center"
                sx={{ color: COLORS.textSecondary, mt: SPACING.formSectionGap }}
              >
                Already have an account?{" "}
                <Link
                  component={RouterLink}
                  to="/login"
                  sx={{
                    color: COLORS.primary,
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  Login
                </Link>
              </Typography>
            </form>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}