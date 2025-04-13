require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const axios = require("axios");
const addCancer = require("./controllers/addCancer");
const getCancer = require("./controllers/getCancer");
const getSingleCancer = require("./controllers/getSingleCancer");
const deleteCancer = require("./controllers/deleteCancer");
const editCancer = require("./controllers/editCancer");

app.get("/", (req, res) => {
  res.send("Berhasil terhubung ke app");
});

mongoose
  .connect(process.env.MONGO_URL, {})
  .then(() => {
    console.log("berhasil terhubung ke MongoDB");
  })
  .catch((err) => {
    console.log("gagal terhubung ke MongoDB");
  });

app.use(express.json());

//models
require("./models/cancerPrediction");

//route
app.post("/api/predict", async (req, res) => {
  try {
    // Ambil data dari body request
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

    // Kirim data ke FastAPI untuk prediksi
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

    // Cek response dari FastAPI
    console.log("Response dari FastAPI:", response.data); // Ini akan mencetak hasil prediksi

    // Validasi data dari FastAPI
    if (
      !response.data ||
      !response.data.prediction ||
      !response.data.accuracy
    ) {
      return res.status(500).json({
        status: "failed",
        message: "Data dari FastAPI tidak lengkap",
      });
    }

    // Kirimkan response dari FastAPI kembali ke client
    return res.status(200).json({
      status: "success",
      prediction: response.data.prediction,
      accuracy: response.data.accuracy,
    });
  } catch (error) {
    console.error("Error during prediction:", error);
    return res.status(500).json({
      status: "failed",
      message: "Terjadi kesalahan dalam melakukan prediksi",
      error: error.message,
    });
  }
});

app.get("/api/predict", getCancer);
app.get("/api/predict/:id", getSingleCancer);
app.delete("/api/predict/:id", deleteCancer);
app.put("/api/predict/:id", editCancer);
app.patch("/api/predict/:id", editCancer);

app.listen(3000, () => {
  console.log(`app berjalan di http://localhost:3000`);
});
