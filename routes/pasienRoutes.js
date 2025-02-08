// routes/pasienRoutes.js
const express = require("express");
const { body } = require("express-validator");
const pasienController = require("../controllers/pasienController");
const authenticateToken = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Pasien
 *   description: Manajemen data pasien
 */

/**
 * @swagger
 * /api/pasien:
 *   get:
 *     summary: Mendapatkan semua data pasien
 *     tags: [Pasien]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sukses mendapatkan data pasien
 *       500:
 *         description: Terjadi kesalahan server
 */
router.get("/", authenticateToken, pasienController.getAll);

/**
 * @swagger
 * /api/pasien/{id}:
 *   get:
 *     summary: Mendapatkan data pasien berdasarkan ID
 *     tags: [Pasien]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID pasien
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sukses mendapatkan data pasien
 *       404:
 *         description: Pasien tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan server
 */
router.get("/:id", authenticateToken, pasienController.getById);

/**
 * @swagger
 * /api/pasien:
 *   post:
 *     summary: Menambahkan data pasien baru
 *     tags: [Pasien]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nama:
 *                 type: string
 *               tanggal_lahir:
 *                 type: string
 *                 format: date
 *               jenis_kelamin:
 *                 type: string
 *                 enum: [L, P]
 *               alamat:
 *                 type: string
 *               no_telepon:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Pasien berhasil ditambahkan
 *       400:
 *         description: Data tidak valid
 *       500:
 *         description: Terjadi kesalahan server
 */
router.post(
  "/",
  [
    body("nama").notEmpty().withMessage("Nama harus diisi."),
    body("tanggal_lahir").notEmpty().withMessage("Tanggal lahir harus diisi."),
    body("jenis_kelamin").notEmpty().withMessage("Jenis kelamin harus diisi."),
    body("alamat").notEmpty().withMessage("Alamat harus diisi."),
    body("no_telepon").notEmpty().withMessage("No. telepon harus diisi."),
    body("email").isEmail().withMessage("Email tidak valid."),
  ],
  authenticateToken,
  pasienController.create
);

/**
 * @swagger
 * /api/pasien/{id}:
 *   put:
 *     summary: Memperbarui data pasien
 *     tags: [Pasien]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID pasien
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nama:
 *                 type: string
 *               tanggal_lahir:
 *                 type: string
 *                 format: date
 *               jenis_kelamin:
 *                 type: string
 *                 enum: [L, P]
 *               alamat:
 *                 type: string
 *               no_telepon:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Pasien berhasil diperbarui
 *       404:
 *         description: Pasien tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan server
 */
router.put(
  "/:id",
  [
    body("nama").notEmpty().withMessage("Nama harus diisi."),
    body("tanggal_lahir").notEmpty().withMessage("Tanggal lahir harus diisi."),
    body("jenis_kelamin").notEmpty().withMessage("Jenis kelamin harus diisi."),
    body("alamat").notEmpty().withMessage("Alamat harus diisi."),
    body("no_telepon").notEmpty().withMessage("No. telepon harus diisi."),
    body("email").isEmail().withMessage("Email tidak valid."),
  ],
  authenticateToken,
  pasienController.update
);

/**
 * @swagger
 * /api/pasien/{id}:
 *   delete:
 *     summary: Menghapus data pasien
 *     tags: [Pasien]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID pasien
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Pasien berhasil dihapus
 *       404:
 *         description: Pasien tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan server
 */
router.delete("/:id", authenticateToken, pasienController.delete);

module.exports = router;
