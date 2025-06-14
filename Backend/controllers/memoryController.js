import Memory from "../models/Memory.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createMemory = async (req, res) => {
    const { title, description, emotion, date } = req.body;
    const image = req.files?.image;

    if (!image) {
        return res.status(400).json({ msg: "Please upload an image" });
    }

    const uploadsDir = path.join(__dirname, "../uploads");
    const imagePath = path.join(uploadsDir, image.name);

    await image.mv(imagePath);

    const newMemory = new Memory({
        title,
        description,
        emotion,
        date,
        image: `uploads/${image.name}`,
        user: req.userId,
    });

    try {
        const savedMemory = await newMemory.save();
        res.json(savedMemory);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getMemories = async (req, res) => {
  try {
    const memories = await Memory.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(memories);
  } catch (err) {
    res.status(500).json({ error: "Error fetching memories" });
  }
};
