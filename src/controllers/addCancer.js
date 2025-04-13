const axios = require("axios");
const Cancer = require("../models/cancerPrediction");

const addCancer = async (req, res) => {
  const {
    age,
    smoking,
    yellow_fingers,
    anxiety,
    peer_pressure,
    chronic_disease,
    fatigue,
    allergy,
    wheezing,
    alcohol_consuming,
    coughing,
    shortness_of_breath,
    swallowing_difficulty,
    chest_pain,
  } = req.body;

  try {
    // Validasi input
    if (
      !age ||
      smoking === undefined ||
      yellow_fingers === undefined ||
      anxiety === undefined ||
      peer_pressure === undefined ||
      chronic_disease === undefined ||
      fatigue === undefined ||
      allergy === undefined ||
      wheezing === undefined ||
      alcohol_consuming === undefined ||
      coughing === undefined ||
      shortness_of_breath === undefined ||
      swallowing_difficulty === undefined ||
      chest_pain === undefined
    ) {
      return res.status(400).json({
        status: "failed",
        message: "Semua field gejala harus diisi",
      });
    }

    // Kirim data gejala ke FastAPI untuk prediksi
    const response = await axios.post("http://127.0.0.1:8000/predict", {
      age,
      smoking,
      yellow_fingers,
      anxiety,
      peer_pressure,
      chronic_disease,
      fatigue,
      allergy,
      wheezing,
      alcohol_consuming,
      coughing,
      shortness_of_breath,
      swallowing_difficulty,
      chest_pain,
    });

    // Periksa apakah FastAPI mengembalikan response dengan prediksi dan akurasi
    if (
      !response.data ||
      !response.data.prediction ||
      !response.data.accuracy
    ) {
      return res.status(500).json({
        status: "failed",
        message: "Terjadi kesalahan saat menerima data dari FastAPI",
      });
    }

    // Menyimpan data prediksi ke MongoDB
    const newCancer = await Cancer.create({
      cancerType: response.data.prediction, // prediksi dari FastAPI
      features: req.body, // data gejala yang dikirim
      prediction: response.data.prediction, // prediksi dari FastAPI
      accuracy: response.data.accuracy, // akurasi dari FastAPI
    });

    return res.status(200).json({
      status: "success",
      message: "Data kanker berhasil ditambahkan",
      data: newCancer,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Terjadi kesalahan saat menyimpan data",
      error: error.message,
    });
  }
};

module.exports = addCancer;
