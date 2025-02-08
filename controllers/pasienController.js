// controllers/pasienController.js
const Pasien = require("../models/Pasien");
const { pasienSchema, idSchema } = require("../validations/pasienValidation");

const pasienController = {
  create: async (req, res) => {
    // Validasi input menggunakan Joi
    const { error } = pasienSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details.map((detail) => detail.message).join(", "),
      });
    }

    const { nama, tanggal_lahir, jenis_kelamin, alamat, no_telepon, email } = req.body;

    try {
      const pasienId = await Pasien.create(nama, tanggal_lahir, jenis_kelamin, alamat, no_telepon, email);
      res.status(201).json({
        success: true,
        message: "Pasien berhasil ditambahkan.",
        data: { id: pasienId },
      });
    } catch (err) {
      console.error("Error creating pasien:", err);
      res.status(500).json({
        success: false,
        message: "Gagal menambahkan pasien.",
      });
    }
  },

  getAll: async (req, res) => {
    try {
      const pasien = await Pasien.getAll();
      res.status(200).json({
        success: true,
        data: pasien,
      });
    } catch (err) {
      console.error("Error fetching pasien:", err);
      res.status(500).json({
        success: false,
        message: "Gagal mengambil data pasien.",
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
      const pasien = await Pasien.getById(id);
      if (!pasien) {
        return res.status(404).json({
          success: false,
          message: "Pasien tidak ditemukan.",
        });
      }
      res.status(200).json({
        success: true,
        data: pasien,
      });
    } catch (err) {
      console.error("Error fetching pasien:", err);
      res.status(500).json({
        success: false,
        message: "Gagal mengambil data pasien.",
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
    const { error: bodyError } = pasienSchema.validate(req.body);
    if (bodyError) {
      return res.status(400).json({
        success: false,
        message: bodyError.details.map((detail) => detail.message).join(", "),
      });
    }

    const id = req.params.id;
    const { nama, tanggal_lahir, jenis_kelamin, alamat, no_telepon, email } = req.body;

    try {
      const affectedRows = await Pasien.update(id, nama, tanggal_lahir, jenis_kelamin, alamat, no_telepon, email);
      if (affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Pasien tidak ditemukan.",
        });
      }
      res.status(200).json({
        success: true,
        message: "Pasien berhasil diperbarui.",
      });
    } catch (err) {
      console.error("Error updating pasien:", err);
      res.status(500).json({
        success: false,
        message: "Gagal memperbarui pasien.",
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
      const affectedRows = await Pasien.delete(id);
      if (affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Pasien tidak ditemukan.",
        });
      }
      res.status(200).json({
        success: true,
        message: "Pasien berhasil dihapus.",
      });
    } catch (err) {
      console.error("Error deleting pasien:", err);
      res.status(500).json({
        success: false,
        message: "Gagal menghapus pasien.",
      });
    }
  },
};

module.exports = pasienController;
