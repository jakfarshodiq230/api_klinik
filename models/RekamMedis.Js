// models/RekamMedis.js
const db = require("../config/db");

class RekamMedis {
  static async create(id_pasien, id_dokter, diagnosa, resep, catatan) {
    const query = `
            INSERT INTO RekamMedis (id_pasien, id_dokter, diagnosa, resep, catatan)
            VALUES (?, ?, ?, ?, ?)
        `;
    const [result] = await db.promise().execute(query, [id_pasien, id_dokter, diagnosa, resep, catatan]);
    return result.insertId;
  }

  static async getAll() {
    const query = "SELECT * FROM RekamMedis";
    const [rows] = await db.promise().execute(query);
    return rows;
  }

  static async getById(id) {
    const query = "SELECT * FROM RekamMedis WHERE id = ?";
    const [rows] = await db.promise().execute(query, [id]);
    return rows[0];
  }

  static async update(id, id_pasien, id_dokter, diagnosa, resep, catatan) {
    const query = `
            UPDATE RekamMedis 
            SET id_pasien = ?, id_dokter = ?, diagnosa = ?, resep = ?, catatan = ?
            WHERE id = ?
        `;
    const [result] = await db.promise().execute(query, [id_pasien, id_dokter, diagnosa, resep, catatan, id]);
    return result.affectedRows;
  }

  static async delete(id) {
    const query = "DELETE FROM RekamMedis WHERE id = ?";
    const [result] = await db.promise().execute(query, [id]);
    return result.affectedRows;
  }
}

module.exports = RekamMedis;
