require("dotenv").config(); // Load .env config

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const axios = require("axios");
const cors = require("cors");

// Import controller untuk CRUD
const getCancer = require("./controllers/getCancer");
const getSingleCancer = require("./controllers/getSingleCancer");
const deleteCancer = require("./controllers/deleteCancer");
const editCancer = require("./controllers/editCancer");

const Cancer = require("./models/cancerPrediction");

// CORS
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// API Key middleware
app.use((req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ detail: "Missing or invalid API Key" });
  }
  next();
});

app.use(cors({ origin: "http://localhost:3000" }));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Route test
app.get("/", (req, res) => {
  res.send("🚀 Backend is running!");
});

// POST: Prediksi kanker dan simpan ke MongoDB
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

    // Log data yang dikirim ke FastAPI untuk memastikan formatnya benar
    console.log("Data yang dikirim ke FastAPI:", req.body);

    // Kirim data ke model ML FastAPI
    const response = await axios.post(
      "http://127.0.0.1:8000/predict",
      req.body,
      { headers: { "X-API-KEY": process.env.API_KEY } }
    );

    // Log response dari FastAPI untuk memeriksa data yang diterima
    console.log("Response dari FastAPI:", response.data);

    const {
      prediction_label, // label prediksi (YES atau NO)
      prediction_value, // nilai prediksi (1 atau 0)
      probability, // nilai probabilitas
    } = response.data;

    // Cek apakah prediction_label ada dan valid
    if (!prediction_label || !probability) {
      return res.status(500).json({
        status: "failed",
        message: "Prediksi gagal, hasil tidak ditemukan",
      });
    }

    // Pastikan hanya data yang dibutuhkan yang disertakan
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
      prediction_label, // Prediksi model (YES atau NO)
      prediction_value, // Nilai prediksi (1 atau 0)
      probability, // Probabilitas prediksi
    });

    // Simpan ke MongoDB
    await cancerData.save();

    // Kirim respons dengan keterangan prediksi yang jelas
    return res.status(201).json({
      status: "success",
      data: {
        prediction_label,
        prediction_value,
        probability,
        cancerData, // Data yang disimpan
        id: cancerData._id, // ID yang baru saja disimpan
      },
    });
  } catch (error) {
    console.error("❌ Error saat prediksi:", error);
    if (error.response) {
      // Jika error datang dari FastAPI atau request
      console.error("Response Error:", error.response.data);
    } else if (error.request) {
      // Jika tidak ada response
      console.error("Request Error:", error.request);
    } else {
      // Error lain
      console.error("Error:", error.message);
    }
    return res.status(500).json({
      status: "failed",
      message: "Terjadi kesalahan saat melakukan prediksi",
      error: error.message,
    });
  }
});

// CRUD routes
app.get("/api/predict", getCancer);
app.get("/api/predict/:id", getSingleCancer);
app.delete("/api/predict/:id", deleteCancer);
app.put("/api/predict/:id", editCancer);

// PATCH: Update sebagian data
app.patch("/api/predict/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const cancerData = await Cancer.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!cancerData) {
      return res.status(404).json({
        status: "failed",
        message: "Data kanker tidak ditemukan",
      });
    }

    return res.status(200).json({
      status: "success",
      data: cancerData,
    });
  } catch (error) {
    console.error("❌ Error saat patch data:", error);
    return res.status(500).json({
      status: "failed",
      message: "Terjadi kesalahan saat mengupdate data kanker",
      error: error.message,
    });
  }
});

// Jalankan server
app.listen(5000, () => {
  console.log("✅ Server ready at http://localhost:5000");
});
