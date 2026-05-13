import express from "express";
import authMiddleware from "../middlewares/authmiddleware.js";
import { createNote, getNotes, updateNote, deleteNote } from "../controllers/notes.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createNote);
router.get("/", authMiddleware, getNotes);
router.put("/:id", authMiddleware, updateNote);
router.delete("/:id",authMiddleware,deleteNote);

export default router;