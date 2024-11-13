import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import http from "http";
import configs from "./src/configs/config.js";
import routes from "./src/routes/route.js";
import cors from "cors";
import { Server } from "socket.io";

dotenv.config();

const app = express();

app.use(configs);
app.use("/", routes);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://chat-app-react-express.netlify.app",
      process.env.HOST_SERVER_URL,
    ],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("user_connected", (userId, callback) => {
    socket.userId = userId;
    if (callback) callback("User connected successfully");
  });

  socket.on("join_room", (roomId, callback) => {
    socket.join(roomId);
    if (callback) callback(`Joined room ${roomId}`);
  });

  socket.on("leave_room", (roomId, callback) => {
    socket.leave(roomId);
    if (callback) callback(`Left room ${roomId}`);
  });

  socket.on("send_message", (data, callback) => {
    socket.to(data.room).emit("receive_message", data);
    if (callback) callback(data);
  });

  socket.on("disconnect", () => {});
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to database!");
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
      console.log("Server is running on port", PORT);
    });
  })
  .catch((err) => {
    console.log("Connection error:", err);
  });
