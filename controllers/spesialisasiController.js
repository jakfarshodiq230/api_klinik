// controllers/spesialisasiController.js
const Spesialisasi = require("../models/Spesialisasi");

const spesialisasiController = {
  create: async (req, res) => {
    const { nama_spesialisasi } = req.body;

    // Validasi input
    if (!nama_spesialisasi) {
      return res.status(400).json({
        success: false,
        message: "Nama spesialisasi harus diisi.",
      });
    }

    try {
      const spesialisasiId = await Spesialisasi.create(nama_spesialisasi);
      res.status(201).json({
        success: true,
        message: "Spesialisasi berhasil ditambahkan.",
        data: { id: spesialisasiId },
      });
    } catch (err) {
      console.error("Error creating spesialisasi:", err);
      res.status(500).json({
        success: false,
        message: "Gagal menambahkan spesialisasi.",
      });
    }
  },

  getAll: async (req, res) => {
    try {
      const spesialisasi = await Spesialisasi.getAll();
      res.status(200).json({
        success: true,
        data: spesialisasi,
      });
    } catch (err) {
      console.error("Error fetching spesialisasi:", err);
      res.status(500).json({
        success: false,
        message: "Gagal mengambil data spesialisasi.",
      });
    }
  },

  getById: async (req, res) => {
    const id = req.params.id;

    try {
      const spesialisasi = await Spesialisasi.getById(id);
      if (!spesialisasi) {
        return res.status(404).json({
          success: false,
          message: "Spesialisasi tidak ditemukan.",
        });
      }
      res.status(200).json({
        success: true,
        data: spesialisasi,
      });
    } catch (err) {
      console.error("Error fetching spesialisasi:", err);
      res.status(500).json({
        success: false,
        message: "Gagal mengambil data spesialisasi.",
      });
    }
  },

  update: async (req, res) => {
    const id = req.params.id;
    const { nama_spesialisasi } = req.body;

    // Validasi input
    if (!nama_spesialisasi) {
      return res.status(400).json({
        success: false,
        message: "Nama spesialisasi harus diisi.",
      });
    }

    try {
      const affectedRows = await Spesialisasi.update(id, nama_spesialisasi);
      if (affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Spesialisasi tidak ditemukan.",
        });
      }
      res.status(200).json({
        success: true,
        message: "Spesialisasi berhasil diperbarui.",
      });
    } catch (err) {
      console.error("Error updating spesialisasi:", err);
      res.status(500).json({
        success: false,
        message: "Gagal memperbarui spesialisasi.",
      });
    }
  },

  delete: async (req, res) => {
    const id = req.params.id;

    try {
      const affectedRows = await Spesialisasi.delete(id);
      if (affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Spesialisasi tidak ditemukan.",
        });
      }
      res.status(200).json({
        success: true,
        message: "Spesialisasi berhasil dihapus.",
      });
    } catch (err) {
      console.error("Error deleting spesialisasi:", err);
      res.status(500).json({
        success: false,
        message: "Gagal menghapus spesialisasi.",
      });
    }
  },
};

module.exports = spesialisasiController;
