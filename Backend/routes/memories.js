import express from "express";
import { createMemory, getMemories } from "../controllers/memoryController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, createMemory);
router.get("/", verifyToken, getMemories);

export default router;
