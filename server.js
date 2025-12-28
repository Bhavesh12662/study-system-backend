const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Study = require("./models/Study");
const Attendance = require("./models/Attendance");

const app = express();
app.use(cors());
app.use(express.json());

// ------------------ DATABASE ------------------
mongoose
  .connect(
    "mongodb+srv://bhavesh:Bhavesh2662%40@cluster0.cw9cnqn.mongodb.net/studyapp",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("DB Error:", err));

// ------------------ STUDY ------------------
app.post("/study", async (req, res) => {
  try {
    const s = await Study.create(req.body);
    res.json(s);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/study", async (req, res) => {
  try {
    const data = await Study.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ------------------ ATTENDANCE ------------------
app.post("/attendance", async (req, res) => {
  try {
    const a = await Attendance.create(req.body);
    res.json(a);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/attendance", async (req, res) => {
  try {
    const data = await Attendance.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ------------------ SERVER ------------------
// IMPORTANT FOR RAILWAY / CUSTOM DOMAIN
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Backend running on port", PORT));

