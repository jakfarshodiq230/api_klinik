// validations/authValidation.js
const Joi = require("joi");

// Skema validasi untuk register
const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    "string.empty": "Username tidak boleh kosong.",
    "string.min": "Username harus memiliki minimal 3 karakter.",
    "string.max": "Username tidak boleh lebih dari 30 karakter.",
    "any.required": "Username wajib diisi.",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password tidak boleh kosong.",
    "string.min": "Password harus memiliki minimal 6 karakter.",
    "any.required": "Password wajib diisi.",
  }),
});

// Skema validasi untuk login
const loginSchema = Joi.object({
  username: Joi.string().required().messages({
    "string.empty": "Username tidak boleh kosong.",
    "any.required": "Username wajib diisi.",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password tidak boleh kosong.",
    "any.required": "Password wajib diisi.",
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
};
