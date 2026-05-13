import express from "express";
import { delteUser, getCurrentUser, signUp, updateUser } from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/authmiddleware.js";

const router = express.Router();

router.post("/signup", signUp);
router.get("/profile", authMiddleware, getCurrentUser);
router.put("/update/:id", updateUser );
router.delete("/delete/:id", delteUser);

export default router;