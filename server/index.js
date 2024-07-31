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

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(configs);
app.use("/", routes);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  //console.log(`Socket connected: ${socket.id}`);

  socket.on("user_connected", (userId, callback) => {
    //console.log(`User connected: ${userId}`);
    socket.userId = userId;
    if (callback) callback('User connected successfully');
  });

  socket.on("join_room", (roomId, callback) => {
    socket.join(roomId);
    if (callback) callback(`Joined room ${roomId}`);
  });

  socket.on("leave_room", (roomId, callback) => {
    socket.leave(roomId);
    if (callback) callback(`Left room ${roomId}`);
  });

  socket.on("send_message", (data,callback) => {
    socket.to(data.room).emit("receive_message", data);
    if(callback)callback(data)
  });

  socket.on("disconnect", () => {
    //console.log(`User disconnected: ${socket.userId}`);
  });
});
 
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to database!");
    server.listen(process.env.PORT, () => {
      console.log("Server is running on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log("Connection error:", err);
  });