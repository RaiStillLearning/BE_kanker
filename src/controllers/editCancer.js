const axios = require("axios");
const Cancer = require("../models/cancerPrediction");

const editCancer = async (req, res) => {
  try {
    const { id } = req.params;
    const { cancerType, features } = req.body;

    // Validasi input
    if (!cancerType || !features) {
      return res.status(400).json({
        status: "failed",
        message: "Field cancerType dan features harus diisi",
      });
    }

    // Kirim ulang fitur ke FastAPI untuk dapatkan prediksi baru
    const response = await axios.post(
      "http://localhost:8000/predict",
      features
    );
    const { prediction, accuracy } = response.data;

    // Update data
    const updatedCancer = await Cancer.findByIdAndUpdate(
      id,
      {
        cancerType,
        features,
        prediction,
        accuracy,
      },
      { new: true }
    );

    if (!updatedCancer) {
      return res.status(404).json({
        status: "failed",
        message: `Data kanker dengan ID ${id} tidak ditemukan`,
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Data kanker berhasil diupdate",
      data: updatedCancer,
    });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({
      status: "failed",
      message: "Terjadi kesalahan saat mengupdate data",
      error: error.message,
    });
  }
};

module.exports = editCancer;
