const Cancer = require("../models/cancerPrediction");

const editCancer = async (req, res) => {
  try {
    const { id } = req.params;
    const { cancerType, features, prediction, accuracy } = req.body;

    // Validasi input
    if (!cancerType || !features || !prediction || !accuracy) {
      return res.status(400).json({
        status: "failed",
        message:
          "Semua field harus diisi (cancerType, features, prediction, accuracy)",
      });
    }

    // Cari dan update data berdasarkan ID
    const updatedCancer = await Cancer.findByIdAndUpdate(
      id,
      {
        cancerType,
        features,
        prediction,
        accuracy,
      },
      { new: true } // Mengembalikan data yang sudah diupdate
    );

    // Jika data tidak ditemukan
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
    console.error("Error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Terjadi kesalahan saat mengupdate data",
      error: error.message,
    });
  }
};

module.exports = editCancer;
