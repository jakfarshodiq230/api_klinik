// controllers/dokterController.js
const Dokter = require("../models/Dokter");
const { dokterSchema, idSchema } = require("../validations/dokterValidation");

const dokterController = {
  create: async (req, res) => {
    // Validasi input menggunakan Joi
    const { error } = dokterSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details.map((detail) => detail.message).join(", "),
      });
    }

    const { nama, id_spesialisasi, no_telepon, email } = req.body;

    try {
      const dokterId = await Dokter.create(nama, id_spesialisasi, no_telepon, email);
      res.status(201).json({
        success: true,
        message: "Dokter berhasil ditambahkan.",
        data: { id: dokterId },
      });
    } catch (err) {
      console.error("Error creating dokter:", err);
      res.status(500).json({
        success: false,
        message: "Gagal menambahkan dokter.",
      });
    }
  },

  getAll: async (req, res) => {
    try {
      const dokter = await Dokter.getAll();
      res.status(200).json({
        success: true,
        data: dokter,
      });
    } catch (err) {
      console.error("Error fetching dokter:", err);
      res.status(500).json({
        success: false,
        message: "Gagal mengambil data dokter.",
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
      const dokter = await Dokter.getById(id);
      if (!dokter) {
        return res.status(404).json({
          success: false,
          message: "Dokter tidak ditemukan.",
        });
      }
      res.status(200).json({
        success: true,
        data: dokter,
      });
    } catch (err) {
      console.error("Error fetching dokter:", err);
      res.status(500).json({
        success: false,
        message: "Gagal mengambil data dokter.",
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
    const { error: bodyError } = dokterSchema.validate(req.body);
    if (bodyError) {
      return res.status(400).json({
        success: false,
        message: bodyError.details.map((detail) => detail.message).join(", "),
      });
    }

    const id = req.params.id;
    const { nama, id_spesialisasi, no_telepon, email } = req.body;

    try {
      const affectedRows = await Dokter.update(id, nama, id_spesialisasi, no_telepon, email);
      if (affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Dokter tidak ditemukan.",
        });
      }
      res.status(200).json({
        success: true,
        message: "Dokter berhasil diperbarui.",
      });
    } catch (err) {
      console.error("Error updating dokter:", err);
      res.status(500).json({
        success: false,
        message: "Gagal memperbarui dokter.",
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
      const affectedRows = await Dokter.delete(id);
      if (affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Dokter tidak ditemukan.",
        });
      }
      res.status(200).json({
        success: true,
        message: "Dokter berhasil dihapus.",
      });
    } catch (err) {
      console.error("Error deleting dokter:", err);
      res.status(500).json({
        success: false,
        message: "Gagal menghapus dokter.",
      });
    }
  },
};

module.exports = dokterController;
