// routes/janjiTemuRoutes.js
const express = require("express");
const { body } = require("express-validator");
const janjiTemuController = require("../controllers/janjiTemuController");
const authenticateToken = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Janji Temu
 *   description: Manajemen data janji temu
 */

/**
 * @swagger
 * /api/janji-temu:
 *   get:
 *     summary: Mendapatkan semua data janji temu
 *     tags: [Janji Temu]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sukses mendapatkan data janji temu
 *       500:
 *         description: Terjadi kesalahan server
 */
router.get("/", authenticateToken, janjiTemuController.getAll);

/**
 * @swagger
 * /api/janji-temu/{id}:
 *   get:
 *     summary: Mendapatkan data janji temu berdasarkan ID
 *     tags: [Janji Temu]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID janji temu
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sukses mendapatkan data janji temu
 *       404:
 *         description: Janji temu tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan server
 */
router.get("/:id", authenticateToken, janjiTemuController.getById);

/**
 * @swagger
 * /api/janji-temu:
 *   post:
 *     summary: Menambahkan data janji temu baru
 *     tags: [Janji Temu]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_pasien:
 *                 type: integer
 *               id_dokter:
 *                 type: integer
 *               tanggal:
 *                 type: string
 *                 format: date
 *               waktu:
 *                 type: string
 *                 format: time
 *               keluhan:
 *                 type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Janji temu berhasil ditambahkan
 *       400:
 *         description: Data tidak valid
 *       500:
 *         description: Terjadi kesalahan server
 */
router.post(
  "/",
  [
    body("id_pasien").notEmpty().withMessage("ID Pasien harus diisi."),
    body("id_dokter").notEmpty().withMessage("ID Dokter harus diisi."),
    body("tanggal").notEmpty().withMessage("Tanggal harus diisi."),
    body("waktu").notEmpty().withMessage("Waktu harus diisi."),
    body("keluhan").notEmpty().withMessage("Keluhan harus diisi."),
  ],
  authenticateToken,
  janjiTemuController.create
);

/**
 * @swagger
 * /api/janji-temu/{id}:
 *   put:
 *     summary: Memperbarui data janji temu
 *     tags: [Janji Temu]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID janji temu
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_pasien:
 *                 type: integer
 *               id_dokter:
 *                 type: integer
 *               tanggal:
 *                 type: string
 *                 format: date
 *               waktu:
 *                 type: string
 *                 format: time
 *               keluhan:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [Menunggu, Selesai, Dibatalkan]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Janji temu berhasil diperbarui
 *       404:
 *         description: Janji temu tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan server
 */
router.put(
  "/:id",
  [
    body("id_pasien").notEmpty().withMessage("ID Pasien harus diisi."),
    body("id_dokter").notEmpty().withMessage("ID Dokter harus diisi."),
    body("tanggal").notEmpty().withMessage("Tanggal harus diisi."),
    body("waktu").notEmpty().withMessage("Waktu harus diisi."),
    body("keluhan").notEmpty().withMessage("Keluhan harus diisi."),
    body("status").notEmpty().withMessage("Status harus diisi."),
  ],
  authenticateToken,
  janjiTemuController.update
);

/**
 * @swagger
 * /api/janji-temu/{id}:
 *   delete:
 *     summary: Menghapus data janji temu
 *     tags: [Janji Temu]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID janji temu
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Janji temu berhasil dihapus
 *       404:
 *         description: Janji temu tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan server
 */
router.delete("/:id", authenticateToken, janjiTemuController.delete);

module.exports = router;
