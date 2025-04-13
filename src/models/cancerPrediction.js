// Schema untuk prediksi kanker

const mongoose = require("mongoose");

const cancerPredictionSchema = new mongoose.Schema({
  cancerType: {
    type: String,
    required: true,
  },
  features: {
    type: Map,
    of: mongoose.Schema.Types.Mixed, // Bisa menyimpan berbagai tipe data (boolean, number, dll)
    required: true,
  },
  prediction: {
    type: String,
    enum: ["YES", "NO"], // Hanya bisa YES atau NO
    required: true,
    default: "Pending", // Bisa default ke Pending, kalau belum diproses
  },
  accuracy: {
    type: Number,
    required: true,
    default: 0, // Default accuracy 0, karena bisa dihitung dari FastAPI
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const cancerPrediction = mongoose.model("predict", cancerPredictionSchema);

module.exports = cancerPrediction;
