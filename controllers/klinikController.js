const Klinik = require("../models/Klinik");

const klinikController = {
  getAll: async (req, res) => {
    try {
      const klinik = await Klinik.getAll();
      res.json(klinik);
    } catch (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getById: async (req, res) => {
    const id = req.params.id;
    try {
      const klinik = await Klinik.getById(id);
      if (!klinik) {
        return res.status(404).json({ message: "Klinik not found" });
      }
      res.json(klinik);
    } catch (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  create: async (req, res) => {
    const { nama, alamat } = req.body;

    // Validasi input (opsional, jika diperlukan)
    if (!nama || !alamat) {
      return res.status(400).json({
        success: false,
        message: "Nama dan alamat harus diisi.",
      });
    }

    try {
      // Lakukan proses create
      const klinikId = await Klinik.create(nama, alamat);

      // Jika berhasil, kirim respons sukses
      res.status(201).json({
        success: true,
        message: "Data klinik berhasil ditambahkan.",
        data: { id: klinikId, nama, alamat },
      });
    } catch (err) {
      console.error("Error inserting data:", err);

      // Jika terjadi error, kirim respons error
      res.status(500).json({
        success: false,
        message: "Gagal menambahkan data klinik.",
        error: err.message, // Opsional: tambahkan pesan error untuk debugging
      });
    }
  },

  update: async (req, res) => {
    const id = req.params.id;
    const { nama, alamat } = req.body;
    try {
      const affectedRows = await Klinik.update(id, nama, alamat);
      if (affectedRows === 0) {
        return res.status(404).json({ message: "Klinik not found" });
      }
      res.json({ id, nama, alamat });
    } catch (err) {
      console.error("Error updating data:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  delete: async (req, res) => {
    const id = req.params.id;
    try {
      const affectedRows = await Klinik.delete(id);
      if (affectedRows === 0) {
        return res.status(404).json({ message: "Klinik not found" });
      }
      res.status(204).send();
    } catch (err) {
      console.error("Error deleting data:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = klinikController;
