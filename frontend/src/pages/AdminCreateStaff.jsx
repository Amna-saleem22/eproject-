import { useEffect, useState } from "react";
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
} from "@mui/material";

export default function AdminStaff() {
  // ---------------- STAFF LIST ----------------
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStaff = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/staff/all");
      setStaffList(res.data.staff || []);
    } catch (err) {
      console.error("Staff fetch error:", err.response || err);
      alert(err.response?.data?.message || "Failed to fetch staff");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  // ---------------- CREATE STAFF ----------------
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("receptionist");
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
      setName("");
      setEmail("");
      setPassword("");
      setRole("receptionist");
      setError("");
      fetchStaff(); // refresh staff list after creating
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Container sx={{ mt: 5 }}>
      {/* ---------------- CREATE STAFF FORM ---------------- */}
      <Typography variant="h4" gutterBottom>Create Staff</Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TextField
        fullWidth
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        select
        fullWidth
        label="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        sx={{ mb: 2 }}
      >
        {roles.map((r) => (
          <MenuItem key={r} value={r}>
            {r.charAt(0).toUpperCase() + r.slice(1)}
          </MenuItem>
        ))}
      </TextField>

      <Button fullWidth variant="contained" onClick={handleSubmit} sx={{ mb: 5 }}>
        Create Staff
      </Button>

      <Snackbar open={success} autoHideDuration={4000} onClose={() => setSuccess(false)}>
        <Alert severity="success">Staff created successfully ✅</Alert>
      </Snackbar>

      {/* ---------------- STAFF LIST ---------------- */}
      <Typography variant="h4" gutterBottom>Staff List</Typography>
      {loading ? (
        <Typography>Loading staff...</Typography>
      ) : (
        <Grid container spacing={3}>
          {staffList.map((staff) => (
            <Grid item xs={12} md={6} key={staff._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{staff.name}</Typography>
                  <Typography>Email: {staff.email}</Typography>
                  <Chip label={staff.role} color="primary" sx={{ mt: 1 }} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}