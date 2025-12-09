const express = require("express");
const router = express.Router();
const Survey = require("../models/Survey");

// Add a new survey
router.post("/add", async (req, res) => {
  try {
    const { name, description, question, answers } = req.body;
    const survey = new Survey({ name, description, question, answers });
    await survey.save();
    res.status(200).json({ message: "Survey added successfully", survey });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all surveys
router.get("/", async (req, res) => {
  try {
    const surveys = await Survey.find();
    res.status(200).json(surveys);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
