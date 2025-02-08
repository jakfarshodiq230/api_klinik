// validations/pembayaranValidation.js
const Joi = require("joi");

// Skema validasi untuk create dan update pembayaran
const pembayaranSchema = Joi.object({
  id_janji_temu: Joi.number().integer().positive().required().messages({
    "number.base": "ID Janji Temu harus berupa angka.",
    "number.integer": "ID Janji Temu harus berupa bilangan bulat.",
    "number.positive": "ID Janji Temu harus berupa bilangan positif.",
    "any.required": "ID Janji Temu wajib diisi.",
  }),
  jumlah: Joi.number().positive().required().messages({
    "number.base": "Jumlah harus berupa angka.",
    "number.positive": "Jumlah harus berupa bilangan positif.",
    "any.required": "Jumlah wajib diisi.",
  }),
  metode_pembayaran: Joi.string().valid("Tunai", "Transfer Bank", "Kartu Kredit").required().messages({
    "string.empty": "Metode pembayaran tidak boleh kosong.",
    "any.only": "Metode pembayaran harus berupa 'Tunai', 'Transfer Bank', atau 'Kartu Kredit'.",
    "any.required": "Metode pembayaran wajib diisi.",
  }),
  status: Joi.string().valid("Menunggu", "Berhasil", "Gagal").required().messages({
    "string.empty": "Status tidak boleh kosong.",
    "any.only": "Status harus berupa 'Menunggu', 'Berhasil', atau 'Gagal'.",
    "any.required": "Status wajib diisi.",
  }),
});

// Skema validasi untuk ID (digunakan di getById, update, delete)
const idSchema = Joi.number().integer().positive().required().messages({
  "number.base": "ID harus berupa angka.",
  "number.integer": "ID harus berupa bilangan bulat.",
  "number.positive": "ID harus berupa bilangan positif.",
  "any.required": "ID wajib diisi.",
});

module.exports = {
  pembayaranSchema,
  idSchema,
};
