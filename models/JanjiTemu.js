// models/JanjiTemu.js
const db = require("../config/db");

class JanjiTemu {
  static async create(id_pasien, id_dokter, tanggal, waktu, keluhan) {
    const query = `
            INSERT INTO JanjiTemu (id_pasien, id_dokter, tanggal, waktu, keluhan)
            VALUES (?, ?, ?, ?, ?)
        `;
    const [result] = await db.promise().execute(query, [id_pasien, id_dokter, tanggal, waktu, keluhan]);
    return result.insertId;
  }

  static async getAll() {
    const query = "SELECT * FROM JanjiTemu";
    const [rows] = await db.promise().execute(query);
    return rows;
  }

  static async getById(id) {
    const query = "SELECT * FROM JanjiTemu WHERE id = ?";
    const [rows] = await db.promise().execute(query, [id]);
    return rows[0];
  }

  static async update(id, id_pasien, id_dokter, tanggal, waktu, keluhan, status) {
    const query = `
            UPDATE JanjiTemu 
            SET id_pasien = ?, id_dokter = ?, tanggal = ?, waktu = ?, keluhan = ?, status = ?
            WHERE id = ?
        `;
    const [result] = await db.promise().execute(query, [id_pasien, id_dokter, tanggal, waktu, keluhan, status, id]);
    return result.affectedRows;
  }

  static async delete(id) {
    const query = "DELETE FROM JanjiTemu WHERE id = ?";
    const [result] = await db.promise().execute(query, [id]);
    return result.affectedRows;
  }
}

module.exports = JanjiTemu;
