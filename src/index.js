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

// Middleware untuk validasi API Key
app.use((req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ detail: "Missing or invalid API Key" });
  }
  next();
});

mongoose
  .connect(process.env.MONGO_URL, {})
  .then(() => {
    console.log("Berhasil terhubung ke MongoDB");
  })
  .catch((err) => {
    console.error("Gagal terhubung ke MongoDB:", err);
  });

app.use(express.json());

// Load model
require("./models/cancerPrediction");

// Route untuk prediksi
app.post("/api/predict", async (req, res) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/predict", // Ganti dengan endpoint yang sesuai
      req.body,
      {
        headers: {
          "X-API-KEY": process.env.API_KEY, // Mengambil API Key dari file .env
        },
      }
    );

    return res.status(200).json({
      status: "success",
      prediction: response.data.prediction,
      accuracy: response.data.accuracy,
    });
  } catch (error) {
    console.error("Error during prediction:", error);

    if (error.response) {
      console.error("Response error:", error.response.data);
      console.error("Response status:", error.response.status);
    } else if (error.request) {
      console.error("Request error:", error.request);
    } else {
      console.error("General error:", error.message);
    }

    return res.status(500).json({
      status: "failed",
      message: "Terjadi kesalahan dalam melakukan prediksi",
      error: error.message,
    });
  }
});

// Route untuk CRUD data kanker
app.get("/api/predict", getCancer);
app.get("/api/predict/:id", getSingleCancer);
app.delete("/api/predict/:id", deleteCancer);
app.put("/api/predict/:id", editCancer);
app.patch("/api/predict/:id", editCancer);

app.listen(3000, () => {
  console.log(`App berjalan di http://localhost:3000`);
});
