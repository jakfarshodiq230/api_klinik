// routes/pembayaranRoutes.js
const express = require("express");
const { body } = require("express-validator");
const pembayaranController = require("../controllers/pembayaranController");
const authenticateToken = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Pembayaran
 *   description: Manajemen data pembayaran
 */

/**
 * @swagger
 * /api/pembayaran:
 *   get:
 *     summary: Mendapatkan semua data pembayaran
 *     tags: [Pembayaran]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sukses mendapatkan data pembayaran
 *       500:
 *         description: Terjadi kesalahan server
 */
router.get("/", authenticateToken, pembayaranController.getAll);

/**
 * @swagger
 * /api/pembayaran/{id}:
 *   get:
 *     summary: Mendapatkan data pembayaran berdasarkan ID
 *     tags: [Pembayaran]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID pembayaran
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sukses mendapatkan data pembayaran
 *       404:
 *         description: Pembayaran tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan server
 */
router.get("/:id", authenticateToken, pembayaranController.getById);

/**
 * @swagger
 * /api/pembayaran:
 *   post:
 *     summary: Menambahkan data pembayaran baru
 *     tags: [Pembayaran]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_janji_temu:
 *                 type: integer
 *               jumlah:
 *                 type: number
 *               metode_pembayaran:
 *                 type: string
 *                 enum: [Tunai, Transfer, Kartu Kredit]
 *               status:
 *                 type: string
 *                 enum: [Lunas, Belum Lunas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Pembayaran berhasil ditambahkan
 *       400:
 *         description: Data tidak valid
 *       500:
 *         description: Terjadi kesalahan server
 */
router.post(
  "/",
  [
    body("id_janji_temu").notEmpty().withMessage("ID Janji Temu harus diisi."),
    body("jumlah").notEmpty().withMessage("Jumlah harus diisi."),
    body("metode_pembayaran").notEmpty().withMessage("Metode pembayaran harus diisi."),
    body("status").notEmpty().withMessage("Status harus diisi."),
  ],
  authenticateToken,
  pembayaranController.create
);

/**
 * @swagger
 * /api/pembayaran/{id}:
 *   put:
 *     summary: Memperbarui data pembayaran
 *     tags: [Pembayaran]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID pembayaran
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_janji_temu:
 *                 type: integer
 *               jumlah:
 *                 type: number
 *               metode_pembayaran:
 *                 type: string
 *                 enum: [Tunai, Transfer, Kartu Kredit]
 *               status:
 *                 type: string
 *                 enum: [Lunas, Belum Lunas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Pembayaran berhasil diperbarui
 *       404:
 *         description: Pembayaran tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan server
 */
router.put(
  "/:id",
  [
    body("id_janji_temu").notEmpty().withMessage("ID Janji Temu harus diisi."),
    body("jumlah").notEmpty().withMessage("Jumlah harus diisi."),
    body("metode_pembayaran").notEmpty().withMessage("Metode pembayaran harus diisi."),
    body("status").notEmpty().withMessage("Status harus diisi."),
  ],
  authenticateToken,
  pembayaranController.update
);

/**
 * @swagger
 * /api/pembayaran/{id}:
 *   delete:
 *     summary: Menghapus data pembayaran
 *     tags: [Pembayaran]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID pembayaran
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Pembayaran berhasil dihapus
 *       404:
 *         description: Pembayaran tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan server
 */
router.delete("/:id", authenticateToken, pembayaranController.delete);

module.exports = router;
