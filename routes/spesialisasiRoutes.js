// routes/spesialisasiRoutes.js
const express = require("express");
const { body } = require("express-validator");
const spesialisasiController = require("../controllers/spesialisasiController");
const authenticateToken = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Spesialisasi
 *   description: Manajemen data spesialisasi dokter
 */

/**
 * @swagger
 * /api/spesialisasi:
 *   get:
 *     summary: Mendapatkan semua data spesialisasi
 *     tags: [Spesialisasi]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sukses mendapatkan data spesialisasi
 *       500:
 *         description: Terjadi kesalahan server
 */
router.get("/", authenticateToken, spesialisasiController.getAll);

/**
 * @swagger
 * /api/spesialisasi/{id}:
 *   get:
 *     summary: Mendapatkan data spesialisasi berdasarkan ID
 *     tags: [Spesialisasi]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID spesialisasi
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sukses mendapatkan data spesialisasi
 *       404:
 *         description: Spesialisasi tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan server
 */
router.get("/:id", authenticateToken, spesialisasiController.getById);

/**
 * @swagger
 * /api/spesialisasi:
 *   post:
 *     summary: Menambahkan data spesialisasi baru
 *     tags: [Spesialisasi]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nama_spesialisasi:
 *                 type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Spesialisasi berhasil ditambahkan
 *       400:
 *         description: Data tidak valid
 *       500:
 *         description: Terjadi kesalahan server
 */
router.post("/", [body("nama_spesialisasi").notEmpty().withMessage("Nama spesialisasi harus diisi.")], authenticateToken, spesialisasiController.create);

/**
 * @swagger
 * /api/spesialisasi/{id}:
 *   put:
 *     summary: Memperbarui data spesialisasi
 *     tags: [Spesialisasi]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID spesialisasi
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nama_spesialisasi:
 *                 type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Spesialisasi berhasil diperbarui
 *       404:
 *         description: Spesialisasi tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan server
 */
router.put("/:id", [body("nama_spesialisasi").notEmpty().withMessage("Nama spesialisasi harus diisi.")], authenticateToken, spesialisasiController.update);

/**
 * @swagger
 * /api/spesialisasi/{id}:
 *   delete:
 *     summary: Menghapus data spesialisasi
 *     tags: [Spesialisasi]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID spesialisasi
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Spesialisasi berhasil dihapus
 *       404:
 *         description: Spesialisasi tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan server
 */
router.delete("/:id", authenticateToken, spesialisasiController.delete);

module.exports = router;
