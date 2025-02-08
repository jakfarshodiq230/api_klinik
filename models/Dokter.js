// models/Dokter.js
const db = require("../config/db");

class Dokter {
  static async create(nama, id_spesialisasi, no_telepon, email) {
    const query = `
            INSERT INTO Dokter (nama, id_spesialisasi, no_telepon, email)
            VALUES (?, ?, ?, ?)
        `;
    const [result] = await db.promise().execute(query, [nama, id_spesialisasi, no_telepon, email]);
    return result.insertId;
  }

  static async getAll() {
    const query = "SELECT * FROM Dokter";
    const [rows] = await db.promise().execute(query);
    return rows;
  }

  static async getById(id) {
    const query = "SELECT * FROM Dokter WHERE id = ?";
    const [rows] = await db.promise().execute(query, [id]);
    return rows[0];
  }

  static async update(id, nama, id_spesialisasi, no_telepon, email) {
    const query = `
            UPDATE Dokter 
            SET nama = ?, id_spesialisasi = ?, no_telepon = ?, email = ?
            WHERE id = ?
        `;
    const [result] = await db.promise().execute(query, [nama, id_spesialisasi, no_telepon, email, id]);
    return result.affectedRows;
  }

  static async delete(id) {
    const query = "DELETE FROM Dokter WHERE id = ?";
    const [result] = await db.promise().execute(query, [id]);
    return result.affectedRows;
  }
}

module.exports = Dokter;
