const serverless = require("serverless-http");
const app = require("../src/index");

module.exports = app;
module.exports.handler = serverless(app);
