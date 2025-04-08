const serverless = require("serverless-http");
const app = require("../src/index"); // manggil express utama lu

module.exports = app;
module.exports.handler = serverless(app);
