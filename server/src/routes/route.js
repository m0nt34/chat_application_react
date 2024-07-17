import express from "express";
import authRoutes from "./authRoutes.js";

const router = express.Router();

router.use('/auth', authRoutes);

export default router;
