import express from "express";
import cors from "cors";
import authRouter from "./Routes/auth.route.js";
import messagesRouter from "./Routes/messages.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import { app,server } from "./lib/socket.js";

dotenv.config();

const PORT = 5000;
await connectDB();
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRouter);
app.use("/api/messages", messagesRouter);

server.listen(PORT, () => {
  console.log("Server is running on port" + `http://localhost:${PORT}`);
});
