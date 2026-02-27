import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { Container, Typography, Grid, Card, CardContent, Chip } from "@mui/material";

export default function AdminStaff() {
  const [staffList, setStaffList] = useState([]);

 const fetchStaff = async () => {
  try {
    console.log("Fetching staff...");
    const res = await axiosInstance.get("/staff/all");
    console.log(res.data);
    setStaffList(res.data.staff || []);
  } catch (err) {
    console.error("Staff fetch error:", err.response || err);
    alert(err.response?.data?.message || "Failed to fetch staff");
  }
};
  useEffect(() => {
    fetchStaff();
  }, []);

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Staff List
      </Typography>

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
    </Container>
  );
}