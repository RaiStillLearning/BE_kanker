const express = require("express");
const serverless = require("serverless-http");

const app = express();

// contoh route
app.get("/", (req, res) => {
  res.send("Hello from Vercel Express!");
});

// Export buat Vercel
module.exports = app;
module.exports.handler = serverless(app);
