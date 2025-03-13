const Cancer = require("../models/cancerPrediction");

const deleteCancer = async (req, res) => {
  try {
    const { id } = req.params;

    // Cari dan hapus data berdasarkan ID
    const deletedCancer = await Cancer.findByIdAndDelete(id);

    // Jika data tidak ditemukan
    if (!deletedCancer) {
      return res.status(404).json({
        status: "failed",
        message: `Data kanker dengan ID ${id} tidak ditemukan`,
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Data kanker berhasil dihapus",
      data: deletedCancer,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Terjadi kesalahan saat menghapus data",
      error: error.message,
    });
  }
};

module.exports = deleteCancer;
