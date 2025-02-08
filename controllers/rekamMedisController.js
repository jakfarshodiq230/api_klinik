// controllers/rekamMedisController.js
const RekamMedis = require("../models/RekamMedis");

const rekamMedisController = {
  create: async (req, res) => {
    const { id_pasien, id_dokter, diagnosa, resep, catatan } = req.body;

    if (!id_pasien || !id_dokter || !diagnosa || !resep || !catatan) {
      return res.status(400).json({
        success: false,
        message: "Semua field harus diisi.",
      });
    }

    try {
      const rekamMedisId = await RekamMedis.create(id_pasien, id_dokter, diagnosa, resep, catatan);
      res.status(201).json({
        success: true,
        message: "Rekam medis berhasil ditambahkan.",
        data: { id: rekamMedisId },
      });
    } catch (err) {
      console.error("Error creating rekam medis:", err);
      res.status(500).json({
        success: false,
        message: "Gagal menambahkan rekam medis.",
      });
    }
  },

  getAll: async (req, res) => {
    try {
      const rekamMedis = await RekamMedis.getAll();
      res.status(200).json({
        success: true,
        data: rekamMedis,
      });
    } catch (err) {
      console.error("Error fetching rekam medis:", err);
      res.status(500).json({
        success: false,
        message: "Gagal mengambil data rekam medis.",
      });
    }
  },

  getById: async (req, res) => {
    const id = req.params.id;

    try {
      const rekamMedis = await RekamMedis.getById(id);
      if (!rekamMedis) {
        return res.status(404).json({
          success: false,
          message: "Rekam medis tidak ditemukan.",
        });
      }
      res.status(200).json({
        success: true,
        data: rekamMedis,
      });
    } catch (err) {
      console.error("Error fetching rekam medis:", err);
      res.status(500).json({
        success: false,
        message: "Gagal mengambil data rekam medis.",
      });
    }
  },

  update: async (req, res) => {
    const id = req.params.id;
    const { id_pasien, id_dokter, diagnosa, resep, catatan } = req.body;

    if (!id_pasien || !id_dokter || !diagnosa || !resep || !catatan) {
      return res.status(400).json({
        success: false,
        message: "Semua field harus diisi.",
      });
    }

    try {
      const affectedRows = await RekamMedis.update(id, id_pasien, id_dokter, diagnosa, resep, catatan);
      if (affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Rekam medis tidak ditemukan.",
        });
      }
      res.status(200).json({
        success: true,
        message: "Rekam medis berhasil diperbarui.",
      });
    } catch (err) {
      console.error("Error updating rekam medis:", err);
      res.status(500).json({
        success: false,
        message: "Gagal memperbarui rekam medis.",
      });
    }
  },

  delete: async (req, res) => {
    const id = req.params.id;

    try {
      const affectedRows = await RekamMedis.delete(id);
      if (affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Rekam medis tidak ditemukan.",
        });
      }
      res.status(200).json({
        success: true,
        message: "Rekam medis berhasil dihapus.",
      });
    } catch (err) {
      console.error("Error deleting rekam medis:", err);
      res.status(500).json({
        success: false,
        message: "Gagal menghapus rekam medis.",
      });
    }
  },
};

module.exports = rekamMedisController;
