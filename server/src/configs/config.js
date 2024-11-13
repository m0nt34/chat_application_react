import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

const configureApp = (app) => {
  app.use(
    cors({
      origin: [
        "http://localhost:5173",
        "https://chat-app-react-express.netlify.app",
        process.env.HOST_SERVER_URL,
      ],
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(cookieParser());
};

export default configureApp;
