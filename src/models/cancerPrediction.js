// Schema untuk prediksi kanker

const mongoose = require("mongoose");

const cancerPredictionSchema = new mongoose.Schema({
  cancerType: {
    type: String,
    enum: [
      "Kanker Paru-paru",
      "kanker payudara",
      "Usus besar",
      "Prostat",
      "Getah bening",
    ],
    required: true,
  },
  features: {
    type: [{ key: String, value: Number }], //tergantung dari model yang dipake
    required: true,
  },
  prediction: {
    type: String,
    enum: ["Jinak", "Ganas"],
    required: true,
  },
  accuracy: {
    type: Number,
    required: true,
  },
  predictionDate: {
    type: Date,
    default: Date.now,
  },
});

const cancerPrediction = mongoose.model("predict", cancerPredictionSchema);

module.exports = cancerPrediction;
