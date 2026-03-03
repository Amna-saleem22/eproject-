// import React, { useEffect, useState } from "react";
// import axiosInstance from "../api/axiosInstance";
// import { Container, Typography, Card, CardContent, Grid, Paper, Rating } from "@mui/material";

// export default function AdminFeedback() {
//   const [feedbacks, setFeedbacks] = useState([]);

//   const fetchFeedbacks = async () => {
//     try {
//       const res = await axiosInstance.get("/feedbacks/all"); // fetch all feedbacks
//       setFeedbacks(res.data.feedbacks || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchFeedbacks();
//   }, []);

//   return (
//     <Container sx={{ mt: 5 }}>
//       <Typography variant="h4" gutterBottom>
//         Guest Feedback
//       </Typography>

//       <Grid container spacing={2}>
//         {feedbacks.map((fb) => (
//           <Grid item xs={12} key={fb._id}>
//             <Paper sx={{ p: 2 }}>
//               <Typography variant="h6">{fb.user?.name || "Guest"}</Typography>
//               <Rating value={fb.rating} readOnly />
//               <Typography sx={{ mt: 1 }}>{fb.message}</Typography>
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// }



import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { Container, Typography, Rating, Box } from "@mui/material";
import "./AdminFeedback.css";

export default function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedbacks = async () => {
    try {
      const res = await axiosInstance.get("/feedbacks/all");
      setFeedbacks(res.data.feedbacks || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <Container className="feedback-container">
      <Typography variant="h4" className="feedback-header">
        Guest Feedback
        <span className="header-accent"></span>
      </Typography>

      <div className="feedback-grid">
        {feedbacks.map((fb) => (
          <div key={fb._id} className="feedback-card">
            <div className="card-content">
              <div className="card-header">
                <span className="guest-name">{fb.user?.name || "Guest"}</span>
                <div className="rating-wrapper">
                  <Rating 
                    value={fb.rating} 
                    readOnly 
                    precision={0.5}
                    size="small"
                  />
                </div>
              </div>
              <div className="remark-text">
                {fb.message || "No remarks provided"}
              </div>
              {fb.roomNumber && (
                <div className="room-info">
                  Room {fb.roomNumber} • {new Date(fb.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}