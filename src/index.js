require("dotenv").config();
const express = require("express");
const app = express();
const serverless = require("serverless-http");
const mongoose = require("mongoose");
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
app.post("/api/predict", addCancer);
app.get("/api/predict", getCancer);
app.get("/api/predict/:id", getSingleCancer);
app.delete("/api/predict/:id", deleteCancer);
app.put("/api/predict/:id", editCancer);
app.patch("/api/predict/:id", editCancer);
app.listen(3000, () => {
  console.log(`app berjalan di http://localhost:3000`);
});


module.exports = app;
module.exports.handler = serverless(app);