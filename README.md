# 📦 Backend Analisis Kanker

Ini adalah backend berbasis **Express.js** untuk aplikasi prediksi kanker, terhubung dengan model Machine Learning (FastAPI) dan MongoDB.

---

## 🚀 Fitur Utama

- Prediksi kanker berdasarkan gejala dan faktor risiko
- Menyimpan data prediksi ke MongoDB
- Mendukung operasi CRUD (Create, Read, Update, Delete)
- Autentikasi sederhana menggunakan API Key
- Terintegrasi dengan FastAPI untuk inference model Machine Learning

---

```bash
git clone https://github.com/RaiStillLearning/BE_kanker.git
cd BE_kanker
npm install
```

---

```bash
# buat file .env dan isi
MONGO_URL=your_mongodb_connection_string      # untuk koneksi database
ML_API_URL=https://your-fastapi-domain.com    # URL FastAPI yang sudah dideploy
API_KEY=your_secret_api_key                   # API Key dari backend ML
```

---


## Isi body raw json
{
  "cancerType": "kanker paru paru",
  "age": 40,
  "smoking": 1,
  "yellow_fingers": 1,
  "anxiety": 1,
  "peer_pressure": 1,
  "chronic_disease": 1,
  "fatigue": 1,
  "allergy": 1,
  "wheezing": 1,
  "alcohol_consuming": 1,
  "coughing": 1,
  "shortness_of_breath": 0,
  "swallowing_difficulty": 0,
  "chest_pain": 0
}

