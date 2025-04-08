require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const addCancer = require("./controllers/addCancer");
const getCancer = require("./controllers/getCancer");
const getSingleCancer = require("./controllers/getSingleCancer");
const deleteCancer = require("./controllers/deleteCancer");
const editCancer = require("./controllers/editCancer");

const app = express();

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URL, {})
  .then(() => {
    console.log("Berhasil terhubung ke MongoDB");
  })
  .catch((err) => {
    console.log("Gagal terhubung ke MongoDB");
  });

app.use(express.json());

// Models
require("./models/cancerPrediction");

// Routes
app.get("/", (req, res) => {
  res.send("Berhasil terhubung ke app");
});

app.post("/api/predict", addCancer);
app.get("/api/predict", getCancer);
app.get("/api/predict/:id", getSingleCancer);
app.delete("/api/predict/:id", deleteCancer);
app.put("/api/predict/:id", editCancer);
app.patch("/api/predict/:id", editCancer);

module.exports = app; // ini WAJIB buat Vercel

// Biar local bisa jalan
if (require.main === module) {
  app.listen(3000, () => {
    console.log(`App berjalan di http://localhost:3000`);
  });
}
