import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

const router = express.Router();
router.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
router.use(express.json());
router.use(cookieParser());

export default router;
