// routes/rekamMedisRoutes.js
const express = require("express");
const { body } = require("express-validator");
const rekamMedisController = require("../controllers/rekamMedisController");
const authenticateToken = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Rekam Medis
 *   description: Manajemen data rekam medis
 */

/**
 * @swagger
 * /api/rekam-medis:
 *   get:
 *     summary: Mendapatkan semua data rekam medis
 *     tags: [Rekam Medis]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sukses mendapatkan data rekam medis
 *       500:
 *         description: Terjadi kesalahan server
 */
router.get("/", authenticateToken, rekamMedisController.getAll);

/**
 * @swagger
 * /api/rekam-medis/{id}:
 *   get:
 *     summary: Mendapatkan data rekam medis berdasarkan ID
 *     tags: [Rekam Medis]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID rekam medis
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sukses mendapatkan data rekam medis
 *       404:
 *         description: Rekam medis tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan server
 */
router.get("/:id", authenticateToken, rekamMedisController.getById);

/**
 * @swagger
 * /api/rekam-medis:
 *   post:
 *     summary: Menambahkan data rekam medis baru
 *     tags: [Rekam Medis]
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
 *               diagnosa:
 *                 type: string
 *               resep:
 *                 type: string
 *               catatan:
 *                 type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Rekam medis berhasil ditambahkan
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
    body("diagnosa").notEmpty().withMessage("Diagnosa harus diisi."),
    body("resep").notEmpty().withMessage("Resep harus diisi."),
    body("catatan").notEmpty().withMessage("Catatan harus diisi."),
  ],
  authenticateToken,
  rekamMedisController.create
);

/**
 * @swagger
 * /api/rekam-medis/{id}:
 *   put:
 *     summary: Memperbarui data rekam medis
 *     tags: [Rekam Medis]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID rekam medis
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
 *               diagnosa:
 *                 type: string
 *               resep:
 *                 type: string
 *               catatan:
 *                 type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Rekam medis berhasil diperbarui
 *       404:
 *         description: Rekam medis tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan server
 */
router.put(
  "/:id",
  [
    body("id_pasien").notEmpty().withMessage("ID Pasien harus diisi."),
    body("id_dokter").notEmpty().withMessage("ID Dokter harus diisi."),
    body("diagnosa").notEmpty().withMessage("Diagnosa harus diisi."),
    body("resep").notEmpty().withMessage("Resep harus diisi."),
    body("catatan").notEmpty().withMessage("Catatan harus diisi."),
  ],
  authenticateToken,
  rekamMedisController.update
);

/**
 * @swagger
 * /api/rekam-medis/{id}:
 *   delete:
 *     summary: Menghapus data rekam medis
 *     tags: [Rekam Medis]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID rekam medis
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Rekam medis berhasil dihapus
 *       404:
 *         description: Rekam medis tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan server
 */
router.delete("/:id", authenticateToken, rekamMedisController.delete);

module.exports = router;
