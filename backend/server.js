import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import incidentRoutes from "./routes/incidentRoutes.js";
import policeRoutes from "./routes/policeRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import { initSocket } from "./socket/socketHandler.js";

dotenv.config();

const app = express();
const httpServer = http.createServer(app);

// Socket.io setup — allows frontend on port 5173 to connect
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Connect MongoDB Atlas
connectDB();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173" }));
app.use(express.json({ limit: "10mb" })); // 10mb allows base64 images
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/incidents", incidentRoutes);
app.use("/api/police", policeRoutes);
app.use("/api/admin", adminRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "CrimeWatch API running" });
});

// Initialize Socket.io handlers
initSocket(io);

// Make io accessible in routes via req.io
app.use((req, res, next) => {
  req.io = io;
  next();
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`CrimeWatch server running on port ${PORT}`);
});
