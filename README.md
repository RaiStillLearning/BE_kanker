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
git clone https://github.com/username/backend-analisis-kanker.git
cd backend-analisis-kanker
Install dependensi:

bash
Salin
Edit
npm install
Buat file .env:

ini
Salin
Edit
MONGO_URL=your_mongodb_connection_string
ML_API_URL=https://your-fastapi-domain.com
API_KEY=your_secret_api_key
Jalankan server:

bash
Salin
Edit
node server.js
Server akan berjalan di http://localhost:5000

🔐 Autentikasi
Semua request harus menyertakan header berikut:

http
Salin
Edit
X-API-KEY: your_secret_api_key
