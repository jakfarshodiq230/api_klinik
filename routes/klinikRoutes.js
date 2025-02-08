const express = require("express");
const { body } = require("express-validator");
const klinikController = require("../controllers/klinikController");
const authenticateToken = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Klinik
 *   description: Manajemen data klinik
 */

// Semua endpoint di bawah ini memerlukan autentikasi
router.use(authenticateToken);

/**
 * @swagger
 * /api/klinik:
 *   get:
 *     summary: Mendapatkan semua data klinik
 *     tags: [Klinik]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sukses mendapatkan data klinik
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   nama:
 *                     type: string
 *                     example: Klinik Sehat
 *                   alamat:
 *                     type: string
 *                     example: Jl. Kesehatan No. 123
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     example: 2023-10-25T10:00:00Z
 *                   updated_at:
 *                     type: string
 *                     format: date-time
 *                     example: 2023-10-25T10:00:00Z
 *       500:
 *         description: Terjadi kesalahan server
 */
router.get("/", klinikController.getAll);

/**
 * @swagger
 * /api/klinik/{id}:
 *   get:
 *     summary: Mendapatkan data klinik berdasarkan ID
 *     tags: [Klinik]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID klinik
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sukses mendapatkan data klinik
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 nama:
 *                   type: string
 *                   example: Klinik Sehat
 *                 alamat:
 *                   type: string
 *                   example: Jl. Kesehatan No. 123
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: 2023-10-25T10:00:00Z
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                   example: 2023-10-25T10:00:00Z
 *       404:
 *         description: Klinik tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan server
 */
router.get("/:id", klinikController.getById);

/**
 * @swagger
 * /api/klinik:
 *   post:
 *     summary: Menambahkan data klinik baru
 *     tags: [Klinik]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nama:
 *                 type: string
 *                 example: Klinik Sehat
 *               alamat:
 *                 type: string
 *                 example: Jl. Kesehatan No. 123
 *             required:
 *               - nama
 *               - alamat
 *     responses:
 *       201:
 *         description: Klinik berhasil ditambahkan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 nama:
 *                   type: string
 *                   example: Klinik Sehat
 *                 alamat:
 *                   type: string
 *                   example: Jl. Kesehatan No. 123
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: 2023-10-25T10:00:00Z
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                   example: 2023-10-25T10:00:00Z
 *       400:
 *         description: Data tidak valid
 *       500:
 *         description: Terjadi kesalahan server
 */
router.post("/", [body("nama").notEmpty().withMessage("Nama harus diisi."), body("alamat").notEmpty().withMessage("Alamat harus diisi.")], klinikController.create);

/**
 * @swagger
 * /api/klinik/{id}:
 *   put:
 *     summary: Memperbarui data klinik
 *     tags: [Klinik]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID klinik
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nama:
 *                 type: string
 *                 example: Klinik Sehat Baru
 *               alamat:
 *                 type: string
 *                 example: Jl. Kesehatan No. 789
 *             required:
 *               - nama
 *               - alamat
 *     responses:
 *       200:
 *         description: Klinik berhasil diperbarui
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 nama:
 *                   type: string
 *                   example: Klinik Sehat Baru
 *                 alamat:
 *                   type: string
 *                   example: Jl. Kesehatan No. 789
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: 2023-10-25T10:00:00Z
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                   example: 2023-10-25T10:10:00Z
 *       404:
 *         description: Klinik tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan server
 */
router.put("/:id", [body("nama").notEmpty().withMessage("Nama harus diisi."), body("alamat").notEmpty().withMessage("Alamat harus diisi.")], klinikController.update);

/**
 * @swagger
 * /api/klinik/{id}:
 *   delete:
 *     summary: Menghapus data klinik
 *     tags: [Klinik]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID klinik
 *     responses:
 *       200:
 *         description: Klinik berhasil dihapus
 *       404:
 *         description: Klinik tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan server
 */
router.delete("/:id", klinikController.delete);

module.exports = router;
