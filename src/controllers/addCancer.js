const Cancer = require("../models/cancerPrediction");

const addCancer = async (req, res) => {
  try {
    const {
      age,
      smoking,
      yellow_fingers,
      anxiety,
      peer_pressure,
      chronic_disease,
      fatigue,
      allergy,
      wheezing,
      alcohol_consuming,
      coughing,
      shortness_of_breath,
      swallowing_difficulty,
      chest_pain,
      cancerType,
    } = req.body;

    // Validasi jika cancerType tidak dikirimkan
    if (!cancerType) {
      return res
        .status(400)
        .json({ status: "failed", message: "Jenis kanker harus disertakan" });
    }

    const newPrediction = new Cancer({
      age,
      smoking,
      yellow_fingers,
      anxiety,
      peer_pressure,
      chronic_disease,
      fatigue,
      allergy,
      wheezing,
      alcohol_consuming,
      coughing,
      shortness_of_breath,
      swallowing_difficulty,
      chest_pain,
      cancerType,
    });

    const savedPrediction = await newPrediction.save();

    return res.status(201).json({
      status: "success",
      data: savedPrediction,
    });
  } catch (error) {
    console.error("Error saat menambah data kanker:", error);
    return res.status(500).json({
      status: "failed",
      message: "Gagal menambah data kanker",
      error: error.message,
    });
  }
};

module.exports = addCancer;
