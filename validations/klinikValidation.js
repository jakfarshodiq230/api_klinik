// validations/klinikValidation.js
const Joi = require("joi");

// Schema untuk validasi input klinik
const klinikSchema = Joi.object({
  nama: Joi.string().required().messages({
    "string.empty": "Nama tidak boleh kosong.",
    "any.required": "Nama harus diisi.",
  }),
  alamat: Joi.string().required().messages({
    "string.empty": "Alamat tidak boleh kosong.",
    "any.required": "Alamat harus diisi.",
  }),
});

// Schema untuk validasi ID (digunakan di GET, PUT, DELETE)
const idSchema = Joi.number().integer().positive().required().messages({
  "number.base": "ID harus berupa angka.",
  "number.integer": "ID harus berupa bilangan bulat.",
  "number.positive": "ID harus berupa bilangan positif.",
  "any.required": "ID harus diisi.",
});

module.exports = {
  klinikSchema,
  idSchema,
};
