import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import connectDB from "./config/db.js";

dotenv.config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });

const app = express();

app.use(express.json());

// Connect to DB when app is imported (tests rely on this)
connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

export default app;