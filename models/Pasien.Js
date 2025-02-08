// models/Pasien.js
const db = require("../config/db");

class Pasien {
  static async create(nama, tanggal_lahir, jenis_kelamin, alamat, no_telepon, email) {
    const query = `
            INSERT INTO Pasien (nama, tanggal_lahir, jenis_kelamin, alamat, no_telepon, email)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
    const [result] = await db.promise().execute(query, [nama, tanggal_lahir, jenis_kelamin, alamat, no_telepon, email]);
    return result.insertId;
  }

  static async getAll() {
    const query = "SELECT * FROM Pasien";
    const [rows] = await db.promise().execute(query);
    return rows;
  }

  static async getById(id) {
    const query = "SELECT * FROM Pasien WHERE id = ?";
    const [rows] = await db.promise().execute(query, [id]);
    return rows[0];
  }

  static async update(id, nama, tanggal_lahir, jenis_kelamin, alamat, no_telepon, email) {
    const query = `
            UPDATE Pasien 
            SET nama = ?, tanggal_lahir = ?, jenis_kelamin = ?, alamat = ?, no_telepon = ?, email = ?
            WHERE id = ?
        `;
    const [result] = await db.promise().execute(query, [nama, tanggal_lahir, jenis_kelamin, alamat, no_telepon, email, id]);
    return result.affectedRows;
  }

  static async delete(id) {
    const query = "DELETE FROM Pasien WHERE id = ?";
    const [result] = await db.promise().execute(query, [id]);
    return result.affectedRows;
  }
}

module.exports = Pasien;
