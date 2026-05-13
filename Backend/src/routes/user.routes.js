import express from "express";
import { deleteUser, getCurrentUser, signUp, updateUser } from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/authmiddleware.js";

const router = express.Router();

router.post("/signup", signUp);
router.get("/profile", authMiddleware, getCurrentUser);
router.put("/update/:id", authMiddleware, updateUser);
router.delete("/delete/:id", authMiddleware, deleteUser);

export default router;
