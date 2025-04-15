📦 Backend Analisis Kanker
Ini adalah backend berbasis Express.js untuk aplikasi prediksi kanker, terhubung dengan model Machine Learning (FastAPI) dan MongoDB.

🚀 Fitur Utama
Prediksi kanker berdasarkan gejala dan faktor risiko

Menyimpan data prediksi ke MongoDB

Mendukung operasi CRUD (Create, Read, Update, Delete)

Autentikasi sederhana menggunakan API Key

Terintegrasi dengan FastAPI untuk inference model Machine Learning

📂 Struktur Folder
bash
Salin
Edit
.
├── controllers/       # CRUD logic
├── models/            # Skema Mongoose
├── .env               # Variabel lingkungan
├── server.js          # Entry point
🛠️ Cara Menjalankan
Clone repo ini:

bash
Salin
Edit
git clone https://github.com/RaiStillLearning/BE_kanker.git
cd BE_kanker
Install dependensi:
npm install

Buat file .env:

MONGO_URL=your_mongodb_connection_string         # untuk koneksi database
ML_API_URL=https://your-fastapi-domain.com       # url machine learning yang sudah di deploy
API_KEY=your_secret_api_key                      # API dari machine learning
Jalankan server:

bash
Salin
Edit
npm start
Server akan berjalan di http://localhost:5000

🔐 Autentikasi
Semua request harus menyertakan header berikut:
X-API-KEY: your_secret_api_key


test di postman dengan url berikut
http://localhost:5000/api/predict
pastikan headers terisi dengan
X-API-KEY:"VALUE YOUR API"
content-type: applicattion/json

isi format raw json di postman
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

