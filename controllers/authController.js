// controllers/authController.js
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const { registerSchema, loginSchema } = require("../validations/authValidation");

const authController = {
  register: async (req, res) => {
    // Validasi input menggunakan Joi
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details.map((detail) => detail.message).join(", "),
      });
    }

    const { username, password } = req.body;

    try {
      const userId = await User.create(username, password);
      res.status(201).json({
        success: true,
        message: "User registered successfully",
        userId,
      });
    } catch (err) {
      console.error("Error registering user:", err);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  login: async (req, res) => {
    // Validasi input menggunakan Joi
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details.map((detail) => detail.message).join(", "),
      });
    }

    const { username, password } = req.body;

    try {
      const user = await User.findByUsername(username);
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Invalid username or password",
        });
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({
          success: false,
          message: "Invalid username or password",
        });
      }

      const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "12h" });
      res.json({
        success: true,
        token,
      });
    } catch (err) {
      console.error("Error logging in:", err);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
};

module.exports = authController;
