require("dotenv").config();
const express = require("express");
const server = express();
const mongoose = require("mongoose");
const addCancer = require("./controllers/addCancer");
const getCancer = require("./controllers/getCancer");
const getSingleCancer = require("./controllers/getSingleCancer");
const deleteCancer = require("./controllers/deleteCancer");
const editCancer = require("./controllers/editCancer");

mongoose
  .connect(process.env.MONGO_URL, {})
  .then(() => {
    console.log("berhasil terhubung ke MongoDB");
  })
  .catch((err) => {
    console.log("gagal terhubung ke MongoDB");
  });

server.use(express.json());

//models
require("./models/cancerPrediction");

//route
server.post("/api/predict", addCancer);
server.get("/api/predict", getCancer);
server.get("/api/predict/:id", getSingleCancer);
server.delete("/api/predict/:id", deleteCancer);
server.put("/api/predict/:id", editCancer);
server.patch("/api/predict/:id", editCancer);
server.listen(3000, () => {
  console.log(`server berjalan di http://localhost:3000`);
});
