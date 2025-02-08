// validations/pasienValidation.js
const Joi = require("joi");

// Skema validasi untuk create dan update pasien
const pasienSchema = Joi.object({
  nama: Joi.string().required().messages({
    "string.empty": "Nama tidak boleh kosong.",
    "any.required": "Nama wajib diisi.",
  }),
  tanggal_lahir: Joi.date().iso().required().messages({
    "date.base": "Tanggal lahir harus berupa format tanggal yang valid.",
    "date.format": "Tanggal lahir harus dalam format ISO (YYYY-MM-DD).",
    "any.required": "Tanggal lahir wajib diisi.",
  }),
  jenis_kelamin: Joi.string().valid("Laki-laki", "Perempuan").required().messages({
    "string.empty": "Jenis kelamin tidak boleh kosong.",
    "any.only": "Jenis kelamin harus berupa 'Laki-laki' atau 'Perempuan'.",
    "any.required": "Jenis kelamin wajib diisi.",
  }),
  alamat: Joi.string().required().messages({
    "string.empty": "Alamat tidak boleh kosong.",
    "any.required": "Alamat wajib diisi.",
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
  pasienSchema,
  idSchema,
};
