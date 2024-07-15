import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import configs from "./src/configs/config.js";

dotenv.config();
const app = express();

app.use(configs);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to database!");
    app.listen(process.env.PORT, () => {
      console.log("Server is running on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log("Connection error:", err);
  });
