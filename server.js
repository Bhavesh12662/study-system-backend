const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Study = require("./models/Study");
const Attendance = require("./models/Attendance");

const app = express();
app.use(cors());
app.use(express.json());

// ---------- DB CONNECTION ----------
mongoose
  .connect(
    "mongodb+srv://bhavesh:Bhavesh2662%40@cluster0.cw9cnqn.mongodb.net/studyapp"
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("DB Error:", err));


// ---------- STUDY ----------
app.post("/study", async (req, res) => {
  try {
    const s = await Study.create(req.body);
    res.json(s);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/study", async (req, res) => {
  try {
    const s = await Study.find().sort({ createdAt: -1 });
    res.json(s);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


// ---------- ATTENDANCE ----------
app.post("/attendance", async (req, res) => {
  try {
    const a = await Attendance.create(req.body);
    res.json(a);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/attendance", async (req, res) => {
  try {
    const a = await Attendance.find().sort({ date: -1 });
    res.json(a);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


// ---------- SERVER ----------
app.listen(5000, () =>
  console.log("Backend running on port 5000")
);

app.use(cors({
  origin: ["https://promptify.tech", "http://localhost:3000"], 
  methods: ["GET","POST"],
}));

