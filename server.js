const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ------------ MIDDLEWARE ------------
app.use(express.json());

app.use(
  cors({
    origin: [
      "https://promptify.tech",
      "https://study-system-frontend.vercel.app"
    ],
    methods: ["GET", "POST"],
  })
);

// ------------ DATABASE ------------
mongoose
  .connect(
    "mongodb+srv://bhavesh:Bhavesh2662%40@cluster0.cw9cnqn.mongodb.net/studyapp"
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("DB Error:", err));

// ------------ MODELS ------------
const Study = mongoose.model(
  "Study",
  new mongoose.Schema({
    subject: String,
    startTime: Number,
    endTime: Number,
    duration: Number,
  })
);

const Attendance = mongoose.model(
  "Attendance",
  new mongoose.Schema({
    status: String,
    date: Date,
  })
);

// ------------ ROUTES ------------

// STUDY
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
    const data = await Study.find().sort({ _id: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ATTENDANCE
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
    const data = await Attendance.find().sort({ _id: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ------------ SERVER ------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Backend running on port ${PORT}`)
);
