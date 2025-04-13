const axios = require("axios");
const Cancer = require("../models/cancerPrediction");

const editCancer = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body; // Ambil data yang ingin diupdate

    const cancer = await Cancer.findByIdAndUpdate(id, updateData, {
      new: true, // Mengembalikan data yang sudah diperbarui
    });

    if (!cancer) {
      return res.status(404).json({ message: "Data kanker tidak ditemukan" });
    }

    return res
      .status(200)
      .json({ message: "Data kanker berhasil diupdate", data: cancer });
  } catch (error) {
    console.error("Error saat update data kanker:", error);
    return res.status(500).json({
      message: "Terjadi kesalahan saat mengupdate data kanker",
      error: error.message,
    });
  }
};

module.exports = editCancer;
