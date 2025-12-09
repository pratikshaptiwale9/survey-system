const mongoose = require("mongoose");

const SurveySchema = new mongoose.Schema({
  name: String,
  description: String,
  question: String,
  answers: String, // store as comma-separated string
});

module.exports = mongoose.model("Survey", SurveySchema);
