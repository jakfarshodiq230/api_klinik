const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const authController = {
  register: async (req, res) => {
    const { username, password } = req.body;

    // Validasi manual (jika diperlukan)
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username dan password harus diisi.",
      });
    }

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
    const { username, password } = req.body;

    // Validasi manual (jika diperlukan)
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username dan password harus diisi.",
      });
    }

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
