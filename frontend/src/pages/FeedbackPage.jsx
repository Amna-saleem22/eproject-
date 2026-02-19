// import { useState } from "react";
// import axiosInstance from "../api/axiosInstance";

// export default function FeedbackPage() {
//   const [message, setMessage] = useState("");

//   const submitFeedback = async () => {
//     await axiosInstance.post("/feedback", {
//       message,
//       rating: 5,
//     });

//     alert("Feedback Submitted ✅");
//   };

//   return (
//     <div style={{ padding: 40, color: "white" }}>
//       <h2>Give Feedback</h2>

//       <textarea
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Write feedback..."
//         style={{ width: "100%", height: 100 }}
//       />

//       <button
//         onClick={submitFeedback}
//         style={{
//           marginTop: 15,
//           padding: 12,
//           background: "#00e676",
//           border: "none",
//         }}
//       >
//         Submit
//       </button>
//     </div>
//   );
// }









import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Alert,
  Snackbar,
} from "@mui/material";
import { motion } from "framer-motion";
import FeedbackIcon from "@mui/icons-material/Feedback";
import SendIcon from "@mui/icons-material/Send";
import { SPACING, CONTAINER, COLORS, FORM, BUTTON } from "../theme/designSystem";

export default function FeedbackPage() {
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  // ✅ YOUR ORIGINAL BACKEND LOGIC
  const submitFeedback = async () => {
    if (!message.trim()) {
      setError("Feedback cannot be empty ❌");
      return;
    }

    try {
      await axiosInstance.post("/feedback", {
        message,
        rating: 5,
      });

      setOpen(true);
      setMessage("");
      setError("");
    } catch (err) {
      setError("Something went wrong ❌");
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
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper
            elevation={20}
            sx={{
              p: SPACING.cardPadding,
              borderRadius: 2,
              background: COLORS.backgroundElevated,
              backdropFilter: "blur(15px)",
              border: `1px solid ${COLORS.borderStrong}`,
              boxShadow: `0 0 30px ${COLORS.border}`,
              textAlign: "center",
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <FeedbackIcon
                sx={{
                  fontSize: 60,
                  color: COLORS.primary,
                  mb: SPACING.titleToBody,
                  filter: `drop-shadow(0 0 15px ${COLORS.borderStrong})`,
                }}
              />
            </motion.div>

            <Typography
              variant="h4"
              sx={{
                color: COLORS.text,
                fontWeight: 600,
                mb: SPACING.inlineGap,
              }}
            >
              Share Your Experience
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: COLORS.textSecondary, mb: SPACING.formSectionGap }}
            >
              Your feedback helps us improve our luxury services.
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: SPACING.formFieldGap }}>
                {error}
              </Alert>
            )}

            <TextField
              fullWidth
              multiline
              rows={5}
              placeholder="Write your feedback here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              sx={{ mb: SPACING.formSectionGap, ...FORM.inputStyle }}
            />

            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                fullWidth
                variant="contained"
                endIcon={<SendIcon />}
                onClick={submitFeedback}
                sx={{
                  ...BUTTON.large,
                  fontWeight: 600,
                  borderRadius: BUTTON.borderRadius,
                  background: `linear-gradient(135deg, ${COLORS.primaryLight} 30%, ${COLORS.primary} 90%)`,
                  boxShadow: `0 8px 20px ${COLORS.border}`,
                  "&:hover": {
                    boxShadow: `0 12px 30px ${COLORS.borderStrong}`,
                  },
                }}
              >
                Submit Feedback
              </Button>
            </motion.div>
          </Paper>
        </motion.div>
      </Container>

      {/* Success Snackbar */}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
      >
        <Alert
          severity="success"
          sx={{
            backgroundColor: COLORS.primaryLight,
            color: COLORS.text,
          }}
        >
          Feedback Submitted Successfully ✅
        </Alert>
      </Snackbar>
    </Box>
  );
}
