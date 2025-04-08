const app = require("../api/index"); // manggil dari api/index.js
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running locally at http://localhost:${PORT}`);
});
