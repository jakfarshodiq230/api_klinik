const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/register", [body("username").notEmpty().withMessage("Username is required"), body("password").notEmpty().withMessage("Password is required")], authController.register);

router.post("/login", [body("username").notEmpty().withMessage("Username is required"), body("password").notEmpty().withMessage("Password is required")], authController.login);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Autentikasi
 *   description: Manajemen autentikasi pengguna
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login untuk mendapatkan token JWT
 *     tags: [Autentikasi]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Sukses login, kembalikan token JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 token:
 *                   type: string
 *       400:
 *         description: Username atau password salah
 */
