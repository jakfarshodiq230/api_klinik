// controllers/rekamMedisController.js
const RekamMedis = require("../models/RekamMedis");
const { rekamMedisSchema, idSchema } = require("../validations/rekamMedisValidation");

const rekamMedisController = {
  create: async (req, res) => {
    // Validasi input menggunakan Joi
    const { error } = rekamMedisSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details.map((detail) => detail.message).join(", "),
      });
    }

    const { id_pasien, id_dokter, diagnosa, resep, catatan } = req.body;

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
    const { error } = idSchema.validate(req.params.id);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details.map((detail) => detail.message).join(", "),
      });
    }

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
    // Validasi ID
    const { error: idError } = idSchema.validate(req.params.id);
    if (idError) {
      return res.status(400).json({
        success: false,
        message: idError.details.map((detail) => detail.message).join(", "),
      });
    }

    // Validasi body
    const { error: bodyError } = rekamMedisSchema.validate(req.body);
    if (bodyError) {
      return res.status(400).json({
        success: false,
        message: bodyError.details.map((detail) => detail.message).join(", "),
      });
    }

    const id = req.params.id;
    const { id_pasien, id_dokter, diagnosa, resep, catatan } = req.body;

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
    const { error } = idSchema.validate(req.params.id);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details.map((detail) => detail.message).join(", "),
      });
    }

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
