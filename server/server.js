import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cookieParser from "cookie-parser";

import connectDB from "./config/connectDB.js";
import socketInit from './utils/socketInit.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config({ quiet: true });
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  },
});

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// // Socket
socketInit(io);

// Start server
server.listen(process.env.PORT || 5000, () => {
  console.log("Server started at port:", process.env.PORT || 5000);
  connectDB();
});
