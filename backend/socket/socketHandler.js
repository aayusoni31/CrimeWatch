// Socket.io real-time events
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const initSocket = (io) => {
  // Middleware — authenticate socket connections with JWT
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) {
        // Allow unauthenticated connections — they just don't join a user room
        socket.user = null;
        return next();
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password");
      socket.user = user;
      next();
    } catch (err) {
      // Invalid token — allow as unauthenticated
      socket.user = null;
      next();
    }
  });

  io.on("connection", (socket) => {
    console.log(
      `Socket connected: ${socket.id} | User: ${socket.user?.name || "Guest"}`,
    );

    // Join personal room for private notifications
    if (socket.user) {
      socket.join(`user_${socket.user._id}`);

      // Police join a police room for broadcast alerts
      if (socket.user.role === "police") {
        socket.join("police_room");
      }

      // Admin joins admin room
      if (socket.user.role === "admin") {
        socket.join("admin_room");
      }
    }

    // Client sends their location to get nearby incident alerts
    socket.on("subscribe_area", ({ lat, lng, radius = 5000 }) => {
      // Store location for this socket (simplified)
      socket.userLocation = { lat, lng, radius };
      console.log(`User subscribed to area: ${lat}, ${lng}`);
    });

    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });
};
