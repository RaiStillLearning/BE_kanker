require("dotenv").config(); // Memuat konfigurasi dari .env
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const axios = require("axios");
const cors = require("cors");

// Mengimpor controller untuk CRUD
const addCancer = require("./controllers/addCancer");
const getCancer = require("./controllers/getCancer");
const getSingleCancer = require("./controllers/getSingleCancer");
const deleteCancer = require("./controllers/deleteCancer");
const editCancer = require("./controllers/editCancer");
const Cancer = require("./models/cancerPrediction"); // Pastikan mengimpor model ini

// Routing untuk pengecekan dasar
app.get("/", (req, res) => {
  res.send("Berhasil terhubung ke app");
});

// CORS
app.use(
  cors({
    origin: "http://localhost:3000", // Pastikan frontend berjalan di port yang benar
  })
);

// Middleware untuk validasi API Key
app.use((req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ detail: "Missing or invalid API Key" });
  }
  next();
});

// Koneksi ke MongoDB
mongoose
  .connect(process.env.MONGO_URL, {})
  .then(() => {
    console.log("Berhasil terhubung ke MongoDB");
  })
  .catch((err) => {
    console.error("Gagal terhubung ke MongoDB:", err);
  });

// Middleware untuk parsing JSON
app.use(express.json());

// Route untuk prediksi kanker
app.post("/api/predict", async (req, res) => {
  try {
    const {
      cancerType,
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

    // Cek apakah jenis kanker sudah ada dalam database
    let cancerData = await Cancer.findOne({ cancerType });

    // Jika data kanker belum ada, simpan data baru ke MongoDB
    if (!cancerData) {
      cancerData = new Cancer({
        cancerType,
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
      await cancerData.save(); // Simpan data baru
    }

    // Lakukan prediksi ke model machine learning
    const response = await axios.post(
      "http://127.0.0.1:8000/predict", // URL ML model
      req.body, // Kirim data untuk prediksi
      {
        headers: {
          "X-API-KEY": process.env.API_KEY,
        },
      }
    );

    const { prediction_label, probability, processed_features_for_prediction } =
      response.data;

    // Kembalikan hasil prediksi
    if (prediction_label && probability !== undefined) {
      return res.status(200).json({
        status: "success",
        prediction: prediction_label,
        probability: probability,
        features_used: processed_features_for_prediction,
      });
    } else {
      return res.status(500).json({
        status: "failed",
        message: "Prediksi tidak tersedia",
        raw: response.data,
      });
    }
  } catch (error) {
    console.error("Error saat prediksi:", error);
    return res.status(500).json({
      status: "failed",
      message: "Terjadi kesalahan saat melakukan prediksi",
      error: error.message,
    });
  }
});

// Route untuk menambah jenis kanker baru
app.post("/api/cancer", async (req, res) => {
  try {
    const {
      cancerType,
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

    // Menyimpan data kanker baru ke MongoDB
    const cancerData = new Cancer({
      cancerType,
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

    await cancerData.save(); // Simpan data kanker baru
    return res.status(201).json({ status: "success", data: cancerData });
  } catch (error) {
    console.error("Error saat menambah data kanker:", error);
    return res.status(500).json({
      status: "failed",
      message: "Terjadi kesalahan saat menambah data kanker",
      error: error.message,
    });
  }
});

// Route untuk CRUD data kanker
app.get("/api/predict", getCancer);
app.get("/api/predict/:id", getSingleCancer);
app.delete("/api/predict/:id", deleteCancer);
app.put("/api/predict/:id", editCancer);
app.patch("/api/predict/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body; // Ambil data yang akan diupdate

    // Cek apakah data dengan id tersebut ada
    let cancerData = await Cancer.findById(id);

    if (!cancerData) {
      return res.status(404).json({
        status: "failed",
        message: "Data kanker tidak ditemukan",
      });
    }

    // Update data kanker
    cancerData = await Cancer.findByIdAndUpdate(id, updateData, {
      new: true, // Mengembalikan data yang sudah diupdate
    });

    return res.status(200).json({
      status: "success",
      data: cancerData,
    });
  } catch (error) {
    console.error("Error saat mengupdate data kanker:", error);
    return res.status(500).json({
      status: "failed",
      message: "Terjadi kesalahan saat mengupdate data kanker",
      error: error.message,
    });
  }
});

// Menjalankan server
app.listen(3000, () => {
  console.log("App berjalan di http://localhost:3000");
});
