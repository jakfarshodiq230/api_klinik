// validations/spesialisasiValidation.js
const Joi = require("joi");

// Skema validasi untuk create dan update spesialisasi
const spesialisasiSchema = Joi.object({
  nama_spesialisasi: Joi.string().required().messages({
    "string.empty": "Nama spesialisasi tidak boleh kosong.",
    "any.required": "Nama spesialisasi wajib diisi.",
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
  spesialisasiSchema,
  idSchema,
};
