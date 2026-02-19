// import { useState } from "react";
// import axiosInstance from "../api/axiosInstance";
// import { useNavigate } from "react-router-dom";

// export default function LoginPage() {
//   const navigate = useNavigate(); // ✅ useNavigate for redirect

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleLogin = async (e) => {
//     if (e?.preventDefault) e.preventDefault();
//     if (loading) return;

//     setLoading(true);
//     try {
//       const res = await axiosInstance.post("/auth/login", formData, {
//         timeout: 10000,
//       });

//       if (!res.data?.token) {
//         alert("Invalid response: no token received");
//         return;
//       }

//       localStorage.setItem("token", res.data.token);
//       alert("Login Successful ✅");
//       navigate("/dashboard");
//     } catch (error) {
//       const msg =
//         error.response?.data?.message ||
//         error.message ||
//         (error.code === "ERR_NETWORK" ? "Cannot reach server. Is backend running on port 5000?" : "Login Failed ❌");
//       console.error("Login Error:", error.response?.data || error.message);
//       alert(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={boxStyle}>
//       <h2 style={{ color: "gold" }}>🔐 Login</h2>

//       <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
//       <input
//         style={inputStyle}
//         placeholder="Email"
//         name="email"
//         value={formData.email}
//         onChange={handleChange}
//       />

//       <input
//         style={inputStyle}
//         placeholder="Password"
//         name="password"
//         type="password"
//         value={formData.password}
//         onChange={handleChange}
//       />

//       <button
//         type="submit"
//         style={{ ...btnStyle, opacity: loading ? 0.7 : 1, cursor: loading ? "wait" : "pointer" }}
//         disabled={loading}
//       >
//         {loading ? "Loading..." : "Login"}
//       </button>
//       </form>
//     </div>
//   );
// }

// // ✅ Styling
// const boxStyle = {
//   maxWidth: "400px",
//   margin: "80px auto",
//   padding: "30px",
//   background: "#222",
//   borderRadius: "10px",
//   display: "flex",
//   flexDirection: "column",
//   gap: "15px",
//   textAlign: "center",
// };

// const inputStyle = {
//   padding: "10px",
//   borderRadius: "5px",
//   border: "1px solid gray",
// };

// const btnStyle = {
//   padding: "12px",
//   background: "gold",
//   border: "none",
//   fontWeight: "bold",
//   cursor: "pointer",
//   borderRadius: "5px",
// 




// };
// import { useState } from "react";
// import axiosInstance from "../api/axiosInstance";
// import { useNavigate } from "react-router-dom";

// export default function LoginPage() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleLogin = async () => {
//     try {
//       const res = await axiosInstance.post("/auth/login", formData);

//       localStorage.setItem("token", res.data.token);

//       alert("Login Successful ✅");

//       // ✅ Role Based Redirect
//       // if (res.data.user.role === "staff") {
//       //   navigate("/staff-dashboard");
//       // } else {
//         navigate("/dashboard");
//       // }
//     } catch (error) {
//       alert(error.response?.data?.message || "Login Failed ❌");
//     }
//   };

//   return (
//     <div style={boxStyle}>
//       <h2 style={{ color: "gold" }}>🔐 Login</h2>

//       <input
//         placeholder="Email"
//         name="email"
//         value={formData.email}
//         onChange={handleChange}
//       />

//       <input
//         placeholder="Password"
//         type="password"
//         name="password"
//         value={formData.password}
//         onChange={handleChange}
//       />

//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// }

// const boxStyle = {
//   maxWidth: "400px",
//   margin: "80px auto",
//   padding: "30px",
//   background: "#222",
//   borderRadius: "10px",
//   display: "flex",
//   flexDirection: "column",
//   gap: "15px",
// };


























import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Link,
  InputAdornment,
  IconButton,
  Divider,
  Checkbox,
  FormControlLabel,
  Alert,
  Stack,
} from "@mui/material";
import { motion } from "framer-motion";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DiamondIcon from "@mui/icons-material/Diamond";
import axiosInstance from "../api/axiosInstance";

export default function LoginPage() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rememberMe" ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    return newErrors;
  };

  // ✅ YOUR ORIGINAL LOGIN LOGIC ADDED HERE
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length !== 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);

      const res = await axiosInstance.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", res.data.token);

      alert("Login Successful ✅");

      navigate("/dashboard"); // role based logic bhi laga sakte ho
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0a0a0a 0%, #111111 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={24}
          sx={{
            p: 5,
            background:
              "linear-gradient(135deg, rgba(18,18,18,0.95) 0%, rgba(10,10,10,0.95) 100%)",
            border: "1px solid rgba(13,71,161,0.3)",
            borderRadius: 4,
          }}
        >
          {/* Logo */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 4,
            }}
          >
            <DiamondIcon sx={{ fontSize: 40, color: "#0d47a1", mr: 1 }} />
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                background: "linear-gradient(135deg, #fff 30%, #0d47a1 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              LUXURY STAY
            </Typography>
          </Box>

          <Typography
            variant="h5"
            align="center"
            sx={{ color: "white", mb: 3 }}
          >
            Welcome Back
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              {/* Email */}
              <TextField
                fullWidth
                name="email"
                label="Email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: "#0d47a1" }} />
                    </InputAdornment>
                  ),
                }}
                sx={darkFieldStyle}
              />

              {/* Password */}
              <TextField
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: "#0d47a1" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        sx={{ color: "white" }}
                      >
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={darkFieldStyle}
              />

              {/* Remember Me */}
              <FormControlLabel
                control={
                  <Checkbox
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    sx={{
                      color: "#0d47a1",
                      "&.Mui-checked": { color: "#0d47a1" },
                    }}
                  />
                }
                label={
                  <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
                    Remember me
                  </Typography>
                }
              />

              {/* Login Button */}
              <motion.div whileHover={{ scale: 1.02 }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  sx={{
                    background:
                      "linear-gradient(135deg, #0d47a1 30%, #1565c0 90%)",
                    py: 1.5,
                    fontWeight: 600,
                  }}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </Button>
              </motion.div>

              <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />

              {/* Register Link */}
              <Typography
                align="center"
                sx={{ color: "rgba(255,255,255,0.7)" }}
              >
                Don’t have an account?{" "}
                <Link
                  component={RouterLink}
                  to="/register"
                  sx={{ color: "#0d47a1", fontWeight: 600 }}
                >
                  Create Account
                </Link>
              </Typography>
            </Stack>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}

const darkFieldStyle = {
  "& .MuiOutlinedInput-root": {
    color: "white",
    "& fieldset": {
      borderColor: "rgba(13,71,161,0.3)",
    },
    "&:hover fieldset": {
      borderColor: "#0d47a1",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#0d47a1",
    },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255,255,255,0.7)",
    "&.Mui-focused": {
      color: "#0d47a1",
    },
  },
};
