// controllers/pembayaranController.js
const Pembayaran = require("../models/Pembayaran");

const pembayaranController = {
  create: async (req, res) => {
    const { id_janji_temu, jumlah, metode_pembayaran, status } = req.body;

    if (!id_janji_temu || !jumlah || !metode_pembayaran || !status) {
      return res.status(400).json({
        success: false,
        message: "Semua field harus diisi.",
      });
    }

    try {
      const pembayaranId = await Pembayaran.create(id_janji_temu, jumlah, metode_pembayaran, status);
      res.status(201).json({
        success: true,
        message: "Pembayaran berhasil ditambahkan.",
        data: { id: pembayaranId },
      });
    } catch (err) {
      console.error("Error creating pembayaran:", err);
      res.status(500).json({
        success: false,
        message: "Gagal menambahkan pembayaran.",
      });
    }
  },

  getAll: async (req, res) => {
    try {
      const pembayaran = await Pembayaran.getAll();
      res.status(200).json({
        success: true,
        data: pembayaran,
      });
    } catch (err) {
      console.error("Error fetching pembayaran:", err);
      res.status(500).json({
        success: false,
        message: "Gagal mengambil data pembayaran.",
      });
    }
  },

  getById: async (req, res) => {
    const id = req.params.id;

    try {
      const pembayaran = await Pembayaran.getById(id);
      if (!pembayaran) {
        return res.status(404).json({
          success: false,
          message: "Pembayaran tidak ditemukan.",
        });
      }
      res.status(200).json({
        success: true,
        data: pembayaran,
      });
    } catch (err) {
      console.error("Error fetching pembayaran:", err);
      res.status(500).json({
        success: false,
        message: "Gagal mengambil data pembayaran.",
      });
    }
  },

  update: async (req, res) => {
    const id = req.params.id;
    const { id_janji_temu, jumlah, metode_pembayaran, status } = req.body;

    if (!id_janji_temu || !jumlah || !metode_pembayaran || !status) {
      return res.status(400).json({
        success: false,
        message: "Semua field harus diisi.",
      });
    }

    try {
      const affectedRows = await Pembayaran.update(id, id_janji_temu, jumlah, metode_pembayaran, status);
      if (affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Pembayaran tidak ditemukan.",
        });
      }
      res.status(200).json({
        success: true,
        message: "Pembayaran berhasil diperbarui.",
      });
    } catch (err) {
      console.error("Error updating pembayaran:", err);
      res.status(500).json({
        success: false,
        message: "Gagal memperbarui pembayaran.",
      });
    }
  },

  delete: async (req, res) => {
    const id = req.params.id;

    try {
      const affectedRows = await Pembayaran.delete(id);
      if (affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Pembayaran tidak ditemukan.",
        });
      }
      res.status(200).json({
        success: true,
        message: "Pembayaran berhasil dihapus.",
      });
    } catch (err) {
      console.error("Error deleting pembayaran:", err);
      res.status(500).json({
        success: false,
        message: "Gagal menghapus pembayaran.",
      });
    }
  },
};

module.exports = pembayaranController;
