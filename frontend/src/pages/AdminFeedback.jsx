import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { Container, Typography, Card, CardContent, Grid, Paper, Rating } from "@mui/material";

export default function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedbacks = async () => {
    try {
      const res = await axiosInstance.get("/feedbacks/all"); // fetch all feedbacks
      setFeedbacks(res.data.feedbacks || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Guest Feedback
      </Typography>

      <Grid container spacing={2}>
        {feedbacks.map((fb) => (
          <Grid item xs={12} key={fb._id}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">{fb.user?.name || "Guest"}</Typography>
              <Rating value={fb.rating} readOnly />
              <Typography sx={{ mt: 1 }}>{fb.message}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}