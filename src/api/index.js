const express = require("express");
const serverless = require("serverless-http");
require("dotenv").config();
const mongoose = require("mongoose");

const addCancer = require("../src/controllers/addCancer");
const getCancer = require("../src/controllers/getCancer");
const getSingleCancer = require("../src/controllers/getSingleCancer");
const deleteCancer = require("../src/controllers/deleteCancer");
const editCancer = require("../src/controllers/editCancer");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API ANALISIS KANKER ONLINE NIH!");
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error", err));

app.post("/api/predict", addCancer);
app.get("/api/predict", getCancer);
app.get("/api/predict/:id", getSingleCancer);
app.delete("/api/predict/:id", deleteCancer);
app.put("/api/predict/:id", editCancer);
app.patch("/api/predict/:id", editCancer);

module.exports = app;
module.exports.handler = serverless(app);
