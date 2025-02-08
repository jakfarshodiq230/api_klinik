// controllers/pembayaranController.js
const Pembayaran = require("../models/Pembayaran");
const { pembayaranSchema, idSchema } = require("../validations/pembayaranValidation");

const pembayaranController = {
  create: async (req, res) => {
    // Validasi input menggunakan Joi
    const { error } = pembayaranSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details.map((detail) => detail.message).join(", "),
      });
    }

    const { id_janji_temu, jumlah, metode_pembayaran, status } = req.body;

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
    const { error } = idSchema.validate(req.params.id);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details.map((detail) => detail.message).join(", "),
      });
    }

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
    // Validasi ID
    const { error: idError } = idSchema.validate(req.params.id);
    if (idError) {
      return res.status(400).json({
        success: false,
        message: idError.details.map((detail) => detail.message).join(", "),
      });
    }

    // Validasi body
    const { error: bodyError } = pembayaranSchema.validate(req.body);
    if (bodyError) {
      return res.status(400).json({
        success: false,
        message: bodyError.details.map((detail) => detail.message).join(", "),
      });
    }

    const id = req.params.id;
    const { id_janji_temu, jumlah, metode_pembayaran, status } = req.body;

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
    const { error } = idSchema.validate(req.params.id);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details.map((detail) => detail.message).join(", "),
      });
    }

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
