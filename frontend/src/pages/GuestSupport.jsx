import { useEffect, useState, useRef } from "react";
import {
  initializeSocket,
  getSocket,
  joinUserRoom,
} from "../socket/socket";
import axiosInstance from "../api/axiosInstance";

export default function GuestSupport() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [socketReady, setSocketReady] = useState(false);
  const messagesEndRef = useRef(null);

  // 🔹 Get current logged-in user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user?._id) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    // 🔹 Initialize socket
    const socket = initializeSocket(token);
    joinUserRoom(user._id);
    setSocketReady(true);

    // 🔹 Listen for incoming messages
    socket.on("receive-message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    // 🔹 Fetch previous messages from backend (if API exists)
    axiosInstance
      .get("/chat") // backend route: /api/chat
      .then((res) => setMessages(res.data.messages))
      .catch(() => console.warn("Failed to load messages"));

    return () => {
      socket.off("receive-message");
    };
  }, [user]);

  // 🔹 Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;
    if (!socketReady) return;

    const socket = getSocket();

    socket.emit("send-message", {
      receiverId: "ADMIN_USER_ID", // 🔹 Replace with your admin _id
      text: message,
    });

    setMessage("");
  };

  if (!user?._id) return <div>Loading user...</div>;

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Guest Support Chat</h2>

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
          const isOwn = msg.senderId?._id === user._id;
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

      <div style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ flex: 1, padding: "8px" }}
        />
        <button onClick={sendMessage} style={{ padding: "8px 12px" }}>
          Send
        </button>
      </div>
    </div>
  );
}