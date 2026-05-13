import express from "express";
import { getCurrentUser, signUp } from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/authmiddleware.js";

const router = express.Router();

router.post("/signup", signUp);
router.get("/profile", authMiddleware, getCurrentUser);

export default router;