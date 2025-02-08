// routes/dokterRoutes.js
const express = require("express");
const { body } = require("express-validator");
const dokterController = require("../controllers/dokterController");
const authenticateToken = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Dokter
 *   description: Manajemen data dokter
 */

/**
 * @swagger
 * /api/dokter:
 *   get:
 *     summary: Mendapatkan semua data dokter
 *     tags: [Dokter]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sukses mendapatkan data dokter
 *       500:
 *         description: Terjadi kesalahan server
 */
router.get("/", authenticateToken, dokterController.getAll);

/**
 * @swagger
 * /api/dokter/{id}:
 *   get:
 *     summary: Mendapatkan data dokter berdasarkan ID
 *     tags: [Dokter]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID dokter
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sukses mendapatkan data dokter
 *       404:
 *         description: Dokter tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan server
 */
router.get("/:id", authenticateToken, dokterController.getById);

/**
 * @swagger
 * /api/dokter:
 *   post:
 *     summary: Menambahkan data dokter baru
 *     tags: [Dokter]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nama:
 *                 type: string
 *               id_spesialisasi:
 *                 type: integer
 *               no_telepon:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Dokter berhasil ditambahkan
 *       400:
 *         description: Data tidak valid
 *       500:
 *         description: Terjadi kesalahan server
 */
router.post(
  "/",
  [
    body("nama").notEmpty().withMessage("Nama harus diisi."),
    body("id_spesialisasi").notEmpty().withMessage("Spesialisasi harus diisi."),
    body("no_telepon").notEmpty().withMessage("No. telepon harus diisi."),
    body("email").isEmail().withMessage("Email tidak valid."),
  ],
  authenticateToken,
  dokterController.create
);

/**
 * @swagger
 * /api/dokter/{id}:
 *   put:
 *     summary: Memperbarui data dokter
 *     tags: [Dokter]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID dokter
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nama:
 *                 type: string
 *               id_spesialisasi:
 *                 type: integer
 *               no_telepon:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dokter berhasil diperbarui
 *       404:
 *         description: Dokter tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan server
 */
router.put(
  "/:id",
  [
    body("nama").notEmpty().withMessage("Nama harus diisi."),
    body("id_spesialisasi").notEmpty().withMessage("Spesialisasi harus diisi."),
    body("no_telepon").notEmpty().withMessage("No. telepon harus diisi."),
    body("email").isEmail().withMessage("Email tidak valid."),
  ],
  authenticateToken,
  dokterController.update
);

/**
 * @swagger
 * /api/dokter/{id}:
 *   delete:
 *     summary: Menghapus data dokter
 *     tags: [Dokter]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID dokter
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dokter berhasil dihapus
 *       404:
 *         description: Dokter tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan server
 */
router.delete("/:id", authenticateToken, dokterController.delete);

module.exports = router;
