const mongoose = require("mongoose");

const StudySchema = new mongoose.Schema({
  subject: String,
  startTime: Number,
  endTime: Number,
  duration: Number
}, { timestamps: true });

module.exports = mongoose.model("Study", StudySchema);
