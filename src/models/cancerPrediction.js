const mongoose = require("mongoose");

const cancerPredictionSchema = new mongoose.Schema({
  cancerType: { type: String, required: true },
  age: Number,
  smoking: Number,
  yellow_fingers: Number,
  anxiety: Number,
  peer_pressure: Number,
  chronic_disease: Number,
  fatigue: Number,
  allergy: Number,
  wheezing: Number,
  alcohol_consuming: Number,
  coughing: Number,
  shortness_of_breath: Number,
  swallowing_difficulty: Number,
  chest_pain: Number,
});

// Gunakan nama model "Cancer" agar konsisten dengan controller lu
const Cancer = mongoose.model("predict", cancerPredictionSchema);

module.exports = Cancer;
