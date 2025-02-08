// controllers/janjiTemuController.js
const JanjiTemu = require("../models/JanjiTemu");
const { janjiTemuSchema, idSchema } = require("../validations/janjiTemuValidation");

const janjiTemuController = {
  create: async (req, res) => {
    // Validasi input menggunakan Joi
    const { error } = janjiTemuSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details.map((detail) => detail.message).join(", "),
      });
    }

    const { id_pasien, id_dokter, tanggal, waktu, keluhan } = req.body;

    try {
      const janjiTemuId = await JanjiTemu.create(id_pasien, id_dokter, tanggal, waktu, keluhan);
      res.status(201).json({
        success: true,
        message: "Janji temu berhasil ditambahkan.",
        data: { id: janjiTemuId },
      });
    } catch (err) {
      console.error("Error creating janji temu:", err);
      res.status(500).json({
        success: false,
        message: "Gagal menambahkan janji temu.",
      });
    }
  },

  getAll: async (req, res) => {
    try {
      const janjiTemu = await JanjiTemu.getAll();
      res.status(200).json({
        success: true,
        data: janjiTemu,
      });
    } catch (err) {
      console.error("Error fetching janji temu:", err);
      res.status(500).json({
        success: false,
        message: "Gagal mengambil data janji temu.",
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
      const janjiTemu = await JanjiTemu.getById(id);
      if (!janjiTemu) {
        return res.status(404).json({
          success: false,
          message: "Janji temu tidak ditemukan.",
        });
      }
      res.status(200).json({
        success: true,
        data: janjiTemu,
      });
    } catch (err) {
      console.error("Error fetching janji temu:", err);
      res.status(500).json({
        success: false,
        message: "Gagal mengambil data janji temu.",
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
    const { error: bodyError } = janjiTemuSchema.validate(req.body);
    if (bodyError) {
      return res.status(400).json({
        success: false,
        message: bodyError.details.map((detail) => detail.message).join(", "),
      });
    }

    const id = req.params.id;
    const { id_pasien, id_dokter, tanggal, waktu, keluhan, status } = req.body;

    try {
      const affectedRows = await JanjiTemu.update(id, id_pasien, id_dokter, tanggal, waktu, keluhan, status);
      if (affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Janji temu tidak ditemukan.",
        });
      }
      res.status(200).json({
        success: true,
        message: "Janji temu berhasil diperbarui.",
      });
    } catch (err) {
      console.error("Error updating janji temu:", err);
      res.status(500).json({
        success: false,
        message: "Gagal memperbarui janji temu.",
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
      const affectedRows = await JanjiTemu.delete(id);
      if (affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Janji temu tidak ditemukan.",
        });
      }
      res.status(200).json({
        success: true,
        message: "Janji temu berhasil dihapus.",
      });
    } catch (err) {
      console.error("Error deleting janji temu:", err);
      res.status(500).json({
        success: false,
        message: "Gagal menghapus janji temu.",
      });
    }
  },
};

module.exports = janjiTemuController;
