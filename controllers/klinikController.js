// controllers/klinikController.js
const Klinik = require("../models/Klinik");
const { klinikSchema, idSchema } = require("../validations/klinikValidation");

const klinikController = {
  getAll: async (req, res) => {
    try {
      const klinik = await Klinik.getAll();
      res.status(200).json({ success: true, data: klinik });
    } catch (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ success: false, message: "Terjadi kesalahan server." });
    }
  },

  getById: async (req, res) => {
    try {
      // Validasi ID
      const { error } = idSchema.validate(req.params.id);
      if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
      }

      const id = req.params.id;
      const klinik = await Klinik.getById(id);
      if (!klinik) {
        return res.status(404).json({ success: false, message: "Klinik tidak ditemukan." });
      }
      res.status(200).json({ success: true, data: klinik });
    } catch (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ success: false, message: "Terjadi kesalahan server." });
    }
  },

  create: async (req, res) => {
    try {
      // Validasi input
      const { error } = klinikSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
      }

      const { nama, alamat } = req.body;
      const klinikId = await Klinik.create(nama, alamat);
      res.status(201).json({ success: true, data: { id: klinikId, nama, alamat } });
    } catch (err) {
      console.error("Error creating data:", err);
      res.status(500).json({ success: false, message: "Terjadi kesalahan server." });
    }
  },

  update: async (req, res) => {
    try {
      // Validasi ID
      const { error: idError } = idSchema.validate(req.params.id);
      if (idError) {
        return res.status(400).json({ success: false, message: idError.details[0].message });
      }

      // Validasi input
      const { error: bodyError } = klinikSchema.validate(req.body);
      if (bodyError) {
        return res.status(400).json({ success: false, message: bodyError.details[0].message });
      }

      const id = req.params.id;
      const { nama, alamat } = req.body;
      const affectedRows = await Klinik.update(id, nama, alamat);
      if (affectedRows === 0) {
        return res.status(404).json({ success: false, message: "Klinik tidak ditemukan." });
      }
      res.status(200).json({ success: true, message: "Klinik berhasil diperbarui." });
    } catch (err) {
      console.error("Error updating data:", err);
      res.status(500).json({ success: false, message: "Terjadi kesalahan server." });
    }
  },

  delete: async (req, res) => {
    try {
      // Validasi ID
      const { error } = idSchema.validate(req.params.id);
      if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
      }

      const id = req.params.id;
      const affectedRows = await Klinik.delete(id);
      if (affectedRows === 0) {
        return res.status(404).json({ success: false, message: "Klinik tidak ditemukan." });
      }
      res.status(200).json({ success: true, message: "Klinik berhasil dihapus." });
    } catch (err) {
      console.error("Error deleting data:", err);
      res.status(500).json({ success: false, message: "Terjadi kesalahan server." });
    }
  },
};

module.exports = klinikController;
