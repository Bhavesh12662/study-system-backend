const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  status: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Attendance", AttendanceSchema);
