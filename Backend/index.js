// import dotenv from "dotenv";
// dotenv.config(); // ✅ Load env first so JWT_SECRET etc. are available

// import express from "express";
// import cors from "cors";
// import { createServer } from "http"; // 👈 Add this
// import { Server } from "socket.io"; // 👈 Add this
// import connectDB from "./db.js";
// import authRoutes from "./routes/authRoutes.js";
// import serviceRoutes from "./routes/serviceRoutes.js";
// import feedbackRoutes from "./routes/feedbackRoutes.js";
// import bookingRoutes from "./routes/bookingRoutes.js";
// import roomRoutes from "./routes/roomRoutes.js"; // 👈 Add this
// import staffRoutes from "./routes/staffRoutes.js";
// import paymentRoutes from "./routes/paymentRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";
// import jwt from "jsonwebtoken"; // 👈 Add for socket authentication
// import User from "./models/User.js"; // 👈 Add for user verification
// import chatRoutes from "./routes/chatRoutes.js"; // 👈 Add this

// const app = express();

// // ✅ Middleware
// app.use(cors({
//   origin: process.env.CLIENT_URL || "http://localhost:3000",
//   credentials: true
// }));
// app.use(express.json());

// // ✅ Connect to MongoDB
// connectDB();

// // ✅ Create HTTP server
// const httpServer = createServer(app);

// // ✅ Initialize Socket.io
// const io = new Server(httpServer, {
//   cors: {
//     origin: process.env.CLIENT_URL || "http://localhost:3000",
//     credentials: true,
//     methods: ["GET", "POST"]
//   }
// });

// // ✅ Socket.io authentication middleware
// io.use(async (socket, next) => {
//   try {
//     const token = socket.handshake.auth.token;
    
//     if (!token) {
//       return next(new Error("Authentication error: No token provided"));
//     }

//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id).select("-password");
    
//     if (!user) {
//       return next(new Error("Authentication error: User not found"));
//     }

//     // Attach user to socket
//     socket.user = user;
//     next();
//   } catch (error) {
//     console.error("Socket authentication error:", error.message);
//     next(new Error("Authentication error: Invalid token"));
//   }
// });

// // ✅ Socket.io connection handling
// io.on("connection", (socket) => {
//   console.log(`✅ New client connected: ${socket.id}`);
//   console.log(`👤 User: ${socket.user?.name} (${socket.user?.email})`);

//   // Join user-specific room for private updates
//   socket.on("join-user-room", (userId) => {
//     if (socket.user._id.toString() === userId || socket.user.role === "admin") {
//       socket.join(`user-${userId}`);
//       console.log(`📌 User ${userId} joined their room`);
      
//       // Send confirmation
//       socket.emit("room-joined", { room: `user-${userId}`, success: true });
//     } else {
//       console.log(`❌ Unauthorized attempt to join user room: ${userId}`);
//       socket.emit("error", { message: "Not authorized to join this room" });
//     }
//   });

//   // Admin joins admin room
//   socket.on("join-admin-room", () => {
//     if (socket.user.role === "admin") {
//       socket.join("admin-room");
//       console.log(`👑 Admin ${socket.user.name} joined admin room`);
      
//       // Send confirmation
//       socket.emit("room-joined", { room: "admin-room", success: true });
//     } else {
//       console.log(`❌ Unauthorized attempt to join admin room by user: ${socket.user.email}`);
//       socket.emit("error", { message: "Admin access only" });
//     }
//   });

//   // Leave user room
//   socket.on("leave-user-room", (userId) => {
//     socket.leave(`user-${userId}`);
//     console.log(`📌 User ${userId} left their room`);
//   });

//   // Leave admin room
//   socket.on("leave-admin-room", () => {
//     socket.leave("admin-room");
//     console.log(`👑 Admin ${socket.user.name} left admin room`);
//   });

//   // Handle disconnection
//   socket.on("disconnect", () => {
//     console.log(`❌ Client disconnected: ${socket.id} (${socket.user?.email})`);
//   });

//   // Handle errors
//   socket.on("error", (error) => {
//     console.error(`Socket error for ${socket.id}:`, error);
//   });
// });

// // ✅ Make io accessible to routes
// app.set("io", io);
// // 💬 Handle Send Message
// socket.on("send-message", async ({ receiverId, text }) => {
//   try {
//     const Message = (await import("./models/Message.js")).default;

//     const newMessage = await Message.create({
//       senderId: socket.user._id,
//       receiverId,
//       text,
//     });

//     const populatedMessage = await newMessage.populate("senderId", "name role");

//     // Send to receiver private room
//     io.to(`user-${receiverId}`).emit("receive-message", populatedMessage);

//     // Also send back to sender
//     io.to(`user-${socket.user._id}`).emit("receive-message", populatedMessage);

//   } catch (error) {
//     console.error("Chat error:", error);
//   }
// });

// // ✅ Routes
// app.use("/api/staff", staffRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/chat",chatRoutes); // 👈 Add chat routes
// app.use("/api/rooms", roomRoutes);
// app.use("/api/services", serviceRoutes);
// app.use("/api/feedbacks", feedbackRoutes);
// app.use("/api/bookings", bookingRoutes);
// app.use("/api/payments", paymentRoutes);

// // ✅ Health check route
// app.get("/", (req, res) => {
//   res.json({ 
//     message: "Hotel Booking API is running 🚀",
//     socketio: "enabled",
//     timestamp: new Date().toISOString()
//   });
// });

// // ✅ Error handling middleware
// app.use((err, req, res, next) => {
//   console.error("Server error:", err.stack);
//   res.status(500).json({ 
//     success: false, 
//     message: "Something went wrong!",
//     error: process.env.NODE_ENV === "development" ? err.message : undefined
//   });
// });

// // ✅ Start server
// const PORT = process.env.PORT || 5000;
// httpServer.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   console.log(`🔌 Socket.io enabled for real-time updates`);
//   console.log(`📡 Client URL: ${process.env.CLIENT_URL || "http://localhost:3000"}`);
// });

// export { io }; // Export for use in controllers



import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import connectDB from "./db.js";
import jwt from "jsonwebtoken";
import User from "./models/User.js";
import Message from "./models/Message.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import staffRoutes from "./routes/staffRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

const app = express();

// ✅ Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true
}));
app.use(express.json());

// ✅ Connect DB
connectDB();

// ✅ Create HTTP server
const httpServer = createServer(app);

// ✅ Initialize Socket.io
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST"]
  }
});


// =====================================================
// 🔐 SOCKET AUTHENTICATION
// =====================================================

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error("Authentication error: No token"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return next(new Error("Authentication error: User not found"));
    }

    socket.user = user;
    next();

  } catch (error) {
    console.error("Socket auth error:", error.message);
    next(new Error("Authentication error"));
  }
});


// =====================================================
// 🔌 SOCKET CONNECTION
// =====================================================

io.on("connection", (socket) => {
  console.log(`✅ Connected: ${socket.id}`);
  console.log(`👤 User: ${socket.user.name} (${socket.user.role})`);


  // ===============================
  // 👤 USER ROOM JOIN
  // ===============================
  socket.on("join-user-room", (userId) => {
    if (
      socket.user._id.toString() === userId ||
      socket.user.role === "admin"
    ) {
      socket.join(`user-${userId}`);
      console.log(`📌 Joined room: user-${userId}`);
      socket.emit("room-joined", { success: true });
    } else {
      socket.emit("error", { message: "Unauthorized room access" });
    }
  });


  // ===============================
  // 👑 ADMIN ROOM JOIN
  // ===============================
  socket.on("join-admin-room", () => {
    if (socket.user.role === "admin") {
      socket.join("admin-room");
      console.log("👑 Admin joined admin-room");
      socket.emit("room-joined", { success: true });
    } else {
      socket.emit("error", { message: "Admin access only" });
    }
  });


  // ===============================
  // 💬 SEND MESSAGE (REAL-TIME CHAT)
  // ===============================
  socket.on("send-message", async ({ receiverId, text }) => {
    try {
      if (!text || !receiverId) return;

      const newMessage = await Message.create({
        senderId: socket.user._id,
        receiverId,
        text,
      });

      const populatedMessage = await newMessage.populate(
        "senderId",
        "name role"
      );

      // Send to receiver
      io.to(`user-${receiverId}`).emit(
        "receive-message",
        populatedMessage
      );

      // Send back to sender
      io.to(`user-${socket.user._id}`).emit(
        "receive-message",
        populatedMessage
      );

      console.log("💬 Message sent successfully");

    } catch (error) {
      console.error("Chat error:", error.message);
    }
  });


  // ===============================
  // ❌ DISCONNECT
  // ===============================
  socket.on("disconnect", () => {
    console.log(`❌ Disconnected: ${socket.id}`);
  });

});


// =====================================================
// 🔁 MAKE IO AVAILABLE IN ROUTES
// =====================================================

app.set("io", io);


// =====================================================
// 📌 ROUTES
// =====================================================

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/feedbacks", feedbackRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/chat", chatRoutes);


// =====================================================
// 🩺 HEALTH CHECK
// =====================================================

app.get("/", (req, res) => {
  res.json({
    message: "Hotel Booking API is running 🚀",
    socketio: "enabled",
    timestamp: new Date().toISOString()
  });
});


// =====================================================
// 🚨 ERROR HANDLER
// =====================================================

app.use((err, req, res, next) => {
  console.error("Server error:", err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!"
  });
});


// =====================================================
// 🚀 START SERVER
// =====================================================

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔌 Socket.io enabled`);
});