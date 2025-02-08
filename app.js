require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const setupSwagger = require("./swagger"); // Import konfigurasi Swagger

const authRoutes = require("./routes/authRoutes");
const klinikRoutes = require("./routes/klinikRoutes");
const pasienRoutes = require("./routes/pasienRoutes");
const dokterRoutes = require("./routes/dokterRoutes");
const spesialisasiRoutes = require("./routes/spesialisasiRoutes");
const janjiTemuRoutes = require("./routes/janjiTemuRoutes");
const rekamMedisRoutes = require("./routes/rekamMedisRoutes");
const pembayaranRoutes = require("./routes/pembayaranRoutes");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/klinik", klinikRoutes);
app.use("/api/pasien", pasienRoutes);
app.use("/api/dokter", dokterRoutes);
app.use("/api/spesialisasi", spesialisasiRoutes);
app.use("/api/janji-temu", janjiTemuRoutes);
app.use("/api/rekam-medis", rekamMedisRoutes);
app.use("/api/pembayaran", pembayaranRoutes);

// Setup Swagger
setupSwagger(app);

// Jalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
