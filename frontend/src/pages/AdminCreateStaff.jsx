import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { Container, Typography, TextField, Button, MenuItem, Alert, Snackbar, Box } from "@mui/material";

export default function AdminCreateStaff() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("receptionist"); // default
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const roles = ["receptionist", "housekeeping", "manager", "admin"];

  const handleSubmit = async () => {
    if (!name || !email || !password || !role) {
      setError("All fields are required");
      return;
    }

    try {
      await axiosInstance.post("/staff/create", { name, email, password, role });
      setSuccess(true);
      setName(""); setEmail(""); setPassword(""); setRole("receptionist"); setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Container sx={{ mt: 5, maxWidth: "sm" }}>
      <Typography variant="h4" gutterBottom>Create Staff</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TextField fullWidth label="Name" value={name} onChange={(e) => setName(e.target.value)} sx={{ mb: 2 }} />
      <TextField fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} sx={{ mb: 2 }} />
      <TextField fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} sx={{ mb: 2 }} />

      <TextField
        select
        fullWidth
        label="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        sx={{ mb: 2 }}
      >
        {roles.map((r) => (
          <MenuItem key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</MenuItem>
        ))}
      </TextField>

      <Button fullWidth variant="contained" onClick={handleSubmit}>Create Staff</Button>

      <Snackbar open={success} autoHideDuration={4000} onClose={() => setSuccess(false)}>
        <Alert severity="success">Staff created successfully ✅</Alert>
      </Snackbar>
    </Container>
  );
}