import { useEffect, useState, useRef } from "react";
import {
  initializeSocket,
  getSocket,
  joinAdminRoom,
} from "../socket/socket";
import axiosInstance from "../api/axiosInstance";

export default function AdminSupport() {
  const [admin, setAdmin] = useState(null);
  const [socketReady, setSocketReady] = useState(false);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // 🔹 Load admin from localStorage or API
  useEffect(() => {
    const storedAdmin = JSON.parse(localStorage.getItem("admin"));
    if (storedAdmin) {
      setAdmin(storedAdmin);
    } else {
      axiosInstance
        .get("/auth/me")
        .then((res) => setAdmin(res.data.user))
        .catch(() => console.warn("Admin not found"));
    }
  }, []);

  // 🔹 Initialize socket and fetch messages
  useEffect(() => {
    if (!admin?._id) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    initializeSocket(token);
    const socket = getSocket();

    joinAdminRoom(); // ✅ Admin joins admin-room

    // 🔹 Fetch previous messages from backend
    axiosInstance
      .get("/chat")
      .then((res) => setMessages(res.data.messages))
      .catch(() => console.warn("Failed to load messages"));

    // 🔹 Listen for real-time messages
    socket.on("receive-message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    setSocketReady(true);

    return () => socket.off("receive-message");
  }, [admin]);

  // 🔹 Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!admin) return <div>Loading admin...</div>;

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Admin Chat Panel</h2>

      <div
        style={{
          height: "400px",
          overflowY: "auto",
          border: "1px solid #ddd",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        {messages.map((msg, i) => {
          const isOwn = msg.senderId?._id === admin._id;
          return (
            <div
              key={i}
              style={{
                textAlign: isOwn ? "right" : "left",
                marginBottom: "8px",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  padding: "8px 12px",
                  borderRadius: "10px",
                  background: isOwn ? "#2196F3" : "#eee",
                  color: isOwn ? "#fff" : "#000",
                }}
              >
                {msg.text}
              </span>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}