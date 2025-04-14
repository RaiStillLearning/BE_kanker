const mongoose = require("mongoose");

const cancerPredictionSchema = new mongoose.Schema({
  cancerType: { type: String, required: true },
  age: { type: Number, required: true },
  smoking: { type: Boolean, required: true },
  yellow_fingers: { type: Boolean, required: true },
  anxiety: { type: Boolean, required: true },
  peer_pressure: { type: Boolean, required: true },
  chronic_disease: { type: Boolean, required: true },
  fatigue: { type: Boolean, required: true },
  allergy: { type: Boolean, required: true },
  wheezing: { type: Boolean, required: true },
  alcohol_consuming: { type: Boolean, required: true },
  coughing: { type: Boolean, required: true },
  shortness_of_breath: { type: Boolean, required: true },
  swallowing_difficulty: { type: Boolean, required: true },
  chest_pain: { type: Boolean, required: true },
  prediction_label: { type: String, required: true }, // YES or NO
  prediction_value: { type: Number, required: true }, // 1 or 0
  probability: { type: Number, required: true },
});

// Gunakan nama model "Cancer" agar lebih sesuai
const Cancer = mongoose.model("predict", cancerPredictionSchema);

module.exports = Cancer;
