import { io } from "socket.io-client";

let socket = null;

export const initializeSocket = (token) => {
  if (!socket) {
    socket = io(process.env.REACT_APP_API_URL || "http://localhost:5000", {
      auth: {
        token: token
      },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });

    socket.on('connect', () => {
      console.log('✅ Socket connected');
    });

    socket.on('connect_error', (error) => {
      console.error('❌ Socket connection error:', error.message);
    });

    socket.on('disconnect', (reason) => {
      console.log('❌ Socket disconnected:', reason);
      if (reason === 'io server disconnect') {
        // Reconnect if server disconnected
        socket.connect();
      }
    });

    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
  }
  return socket;
};

export const getSocket = () => {
  if (!socket) {
    throw new Error('Socket not initialized. Call initializeSocket first.');
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const joinUserRoom = (userId) => {
  if (socket && socket.connected) {
    socket.emit('join-user-room', userId);
  }
};

export const joinAdminRoom = () => {
  if (socket && socket.connected) {
    socket.emit('join-admin-room');
  }
};

export const leaveUserRoom = (userId) => {
  if (socket && socket.connected) {
    socket.emit('leave-user-room', userId);
  }
};

export const leaveAdminRoom = () => {
  if (socket && socket.connected) {
    socket.emit('leave-admin-room');
  }
};