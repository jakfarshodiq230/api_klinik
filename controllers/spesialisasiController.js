// controllers/spesialisasiController.js
const Spesialisasi = require("../models/Spesialisasi");
const { spesialisasiSchema, idSchema } = require("../validations/spesialisasiValidation");

const spesialisasiController = {
  create: async (req, res) => {
    // Validasi input menggunakan Joi
    const { error } = spesialisasiSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details.map((detail) => detail.message).join(", "),
      });
    }

    const { nama_spesialisasi } = req.body;

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
    const { error } = idSchema.validate(req.params.id);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details.map((detail) => detail.message).join(", "),
      });
    }

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
    // Validasi ID
    const { error: idError } = idSchema.validate(req.params.id);
    if (idError) {
      return res.status(400).json({
        success: false,
        message: idError.details.map((detail) => detail.message).join(", "),
      });
    }

    // Validasi body
    const { error: bodyError } = spesialisasiSchema.validate(req.body);
    if (bodyError) {
      return res.status(400).json({
        success: false,
        message: bodyError.details.map((detail) => detail.message).join(", "),
      });
    }

    const id = req.params.id;
    const { nama_spesialisasi } = req.body;

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
    const { error } = idSchema.validate(req.params.id);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details.map((detail) => detail.message).join(", "),
      });
    }

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
