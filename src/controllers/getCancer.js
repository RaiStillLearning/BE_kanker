const Cancer = require("../models/cancerPrediction");

const getCancer = async (req, res) => {
  try {
    const cancers = await Cancer.find();

    return res.status(200).json({
      status: "success",
      message: "Data kanker berhasil diambil",
      data: cancers,
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

module.exports = getCancer;
