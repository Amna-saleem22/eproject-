import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { Container, Typography, Card, CardContent, Grid } from "@mui/material";

export default function AdminRegisteredUsers() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get("/auth/all"); // backend route
      setUsers(res.data.users || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
   
  return (
    <>
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Registered Users
      </Typography>

      <Grid container spacing={2}>
        {users.map((u) => (
          <Grid item xs={12} md={6} key={u._id}>
            <Card sx={{ p: 2 }}>
              <CardContent>
                <Typography variant="h6">{u.name}</Typography>
                <Typography variant="body2" color="textSecondary">{u.email}</Typography>
                <Typography variant="body2" color="gray">
                  Registered on: {new Date(u.createdAt).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>


 
    </>
  );
}