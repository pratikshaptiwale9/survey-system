const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const surveyRoutes = require("./routes/surveys"); // <-- this is your routes file

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/survey_analysis", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log(err));

// Routes
app.use("/api/surveys", surveyRoutes);

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
