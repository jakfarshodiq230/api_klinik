// validations/janjiTemuValidation.js
const Joi = require("joi");

// Skema validasi untuk create dan update janji temu
const janjiTemuSchema = Joi.object({
  id_pasien: Joi.number().integer().positive().required().messages({
    "number.base": "ID Pasien harus berupa angka.",
    "number.integer": "ID Pasien harus berupa bilangan bulat.",
    "number.positive": "ID Pasien harus berupa bilangan positif.",
    "any.required": "ID Pasien wajib diisi.",
  }),
  id_dokter: Joi.number().integer().positive().required().messages({
    "number.base": "ID Dokter harus berupa angka.",
    "number.integer": "ID Dokter harus berupa bilangan bulat.",
    "number.positive": "ID Dokter harus berupa bilangan positif.",
    "any.required": "ID Dokter wajib diisi.",
  }),
  tanggal: Joi.date().iso().required().messages({
    "date.base": "Tanggal harus berupa format tanggal yang valid.",
    "date.format": "Tanggal harus dalam format ISO (YYYY-MM-DD).",
    "any.required": "Tanggal wajib diisi.",
  }),
  waktu: Joi.string()
    .pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .required()
    .messages({
      "string.empty": "Waktu tidak boleh kosong.",
      "string.pattern.base": "Waktu harus dalam format HH:MM.",
      "any.required": "Waktu wajib diisi.",
    }),
  keluhan: Joi.string().required().messages({
    "string.empty": "Keluhan tidak boleh kosong.",
    "any.required": "Keluhan wajib diisi.",
  }),
  status: Joi.string().valid("Menunggu", "Selesai", "Dibatalkan").required().messages({
    "string.empty": "Status tidak boleh kosong.",
    "any.only": "Status harus berupa 'Menunggu', 'Selesai', atau 'Dibatalkan'.",
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
  janjiTemuSchema,
  idSchema,
};
