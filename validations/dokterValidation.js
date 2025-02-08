// validations/dokterValidation.js
const Joi = require("joi");

// Skema validasi untuk create dan update dokter
const dokterSchema = Joi.object({
  nama: Joi.string().required().messages({
    "string.empty": "Nama tidak boleh kosong.",
    "any.required": "Nama wajib diisi.",
  }),
  id_spesialisasi: Joi.number().integer().positive().required().messages({
    "number.base": "ID Spesialisasi harus berupa angka.",
    "number.integer": "ID Spesialisasi harus berupa bilangan bulat.",
    "number.positive": "ID Spesialisasi harus berupa bilangan positif.",
    "any.required": "ID Spesialisasi wajib diisi.",
  }),
  no_telepon: Joi.string()
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      "string.empty": "Nomor telepon tidak boleh kosong.",
      "string.pattern.base": "Nomor telepon harus berupa angka.",
      "any.required": "Nomor telepon wajib diisi.",
    }),
  email: Joi.string().email().required().messages({
    "string.email": "Email harus berupa format email yang valid.",
    "string.empty": "Email tidak boleh kosong.",
    "any.required": "Email wajib diisi.",
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
  dokterSchema,
  idSchema,
};
