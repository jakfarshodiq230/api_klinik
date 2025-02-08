// validations/rekamMedisValidation.js
const Joi = require("joi");

// Skema validasi untuk create dan update rekam medis
const rekamMedisSchema = Joi.object({
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
  diagnosa: Joi.string().required().messages({
    "string.empty": "Diagnosa tidak boleh kosong.",
    "any.required": "Diagnosa wajib diisi.",
  }),
  resep: Joi.string().required().messages({
    "string.empty": "Resep tidak boleh kosong.",
    "any.required": "Resep wajib diisi.",
  }),
  catatan: Joi.string().required().messages({
    "string.empty": "Catatan tidak boleh kosong.",
    "any.required": "Catatan wajib diisi.",
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
  rekamMedisSchema,
  idSchema,
};
