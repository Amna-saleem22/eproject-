import express from "express";
import cors from "cors";
import connectDB from "./db.js";

import bookingRoutes from "./routes/bookingRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);

app.listen(5000, () => console.log("Server Running on Port 5000 🚀"));
