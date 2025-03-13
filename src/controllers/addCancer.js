//untuk post prediksi data kanker

const Cancer = require("../models/cancerPrediction");

const addCancer = async (req, res) => {
  const { cancerType, features, prediction, accuracy } = req.body;

  try {
    // Validasi input
    if (!cancerType || !features || !prediction || !accuracy) {
      return res.status(400).json({
        status: "failed",
        message:
          "Semua field harus diisi (cancerType, features, prediction, accuracy)",
      });
    }

    // Buat data baru menggunakan model MongoDB
    const newCancer = await Cancer.create({
      cancerType,
      features,
      prediction,
      accuracy,
    });

    return res.status(200).json({
      status: "success",
      message: "Data kanker berhasil ditambahkan",
      data: newCancer,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Terjadi kesalahan saat menyimpan data",
      error: error.message,
    });
  }
};

module.exports = addCancer;
