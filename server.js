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
const StudySchema = new mongoose.Schema({
  subject: String,
  startTime: Number,
  endTime: Number,
  duration: Number,
});

const AttendanceSchema = new mongoose.Schema({
  status: String,
  date: Date,
});

const Study = mongoose.model("Study", StudySchema);
const Attendance = mongoose.model("Attendance", AttendanceSchema);


// ------------ ROUTES ------------

// STUDY
app.post("/study", async (req, res) => {
  const s = await Study.create(req.body);
  res.json(s);
});

app.get("/study", async (req, res) => {
  const s = await Study.find().sort({ _id: -1 });
  res.json(s);
});

// ATTENDANCE
app.post("/attendance", async (req, res) => {
  const a = await Attendance.create(req.body);
  res.json(a);
});

app.get("/attendance", async (req, res) => {
  const a = await Attendance.find().sort({ _id: -1 });
  res.json(a);
});


// ------------ SERVER ------------
const PORT = process.env.PORT || 8080;

app.listen(PORT, () =>
  console.log(`Backend running on port ${PORT}`)
);
