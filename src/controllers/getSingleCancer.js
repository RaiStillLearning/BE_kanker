//untuk post prediksi data kanker

const Cancer = require("../models/cancerPrediction");

const getSingleCancer = async (req, res) => {
  try {
    const { id } = req.params;

    const cancer = await Cancer.findById(id);

    if (!cancer) {
      return res.status(404).json({
        status: "failed",
        message: `Data kanker dengan ID ${id} tidak ditemukan`,
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Data kanker berhasil diambil",
      data: cancer,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Terjadi kesalahan saat mengambil data",
      error: error.message,
    });
  }
};

module.exports = getSingleCancer;
