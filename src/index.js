const express = require("express");
const serverless = require("serverless-http");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

const addCancer = require("../src/controllers/addCancer");
const getCancer = require("../src/controllers/getCancer");
const getSingleCancer = require("../src/controllers/getSingleCancer");
const deleteCancer = require("../src/controllers/deleteCancer");
const editCancer = require("../src/controllers/editCancer");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API ANALISIS KANKER JALAN BRO!!");
});

// Koneksi DB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(() => console.log("MongoDB Failed to Connect"));

// Route API
app.post("/api/predict", addCancer);
app.get("/api/predict", getCancer);
app.get("/api/predict/:id", getSingleCancer);
app.delete("/api/predict/:id", deleteCancer);
app.put("/api/predict/:id", editCancer);
app.patch("/api/predict/:id", editCancer);

module.exports = app;
module.exports.handler = serverless(app);
