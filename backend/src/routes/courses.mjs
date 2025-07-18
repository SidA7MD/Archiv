import express from "express";
import courses from "../data/courses.js";

const router = express.Router();

// Get all courses
router.get("/", (req, res) => {
  res.json(courses);
});

// Get course by ID (slug)
router.get("/:id", (req, res) => {
  const course = courses.find(c => c.id === req.params.id);
  if (!course) {
    return res.status(404).json({ error: "Cours introuvable." });
  }
  res.json(course);
});

export default router;
