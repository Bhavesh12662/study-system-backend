const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Study = require("./models/Study");
const Attendance = require("./models/Attendance");

const app = express();

// CORS
app.use(
  cors({
    origin: ["https://promptify.tech", "http://localhost:3000"],
    methods: ["GET", "POST"],
  })
);

app.use(express.json());

// DB
mongoose
  .connect("mongodb+srv://bhavesh:Bhavesh2662%40@cluster0.cw9cnqn.mongodb.net/studyapp")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("DB Error:", err));

// Routes
app.post("/study", async (req, res) => {
  const s = await Study.create(req.body);
  res.json(s);
});

app.get("/study", async (req, res) => {
  const s = await Study.find();
  res.json(s);
});

app.post("/attendance", async (req, res) => {
  const a = await Attendance.create(req.body);
  res.json(a);
});

app.get("/attendance", async (req, res) => {
  const a = await Attendance.find();
  res.json(a);
});

// Test
app.get("/", (req, res) => res.send("API is running"));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
