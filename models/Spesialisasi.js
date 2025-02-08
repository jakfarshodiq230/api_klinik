// models/Spesialisasi.js
const db = require("../config/db");

class Spesialisasi {
  static async create(nama_spesialisasi) {
    const query = "INSERT INTO Spesialisasi (nama_spesialisasi) VALUES (?)";
    const [result] = await db.promise().execute(query, [nama_spesialisasi]);
    return result.insertId;
  }

  static async getAll() {
    const query = "SELECT * FROM Spesialisasi";
    const [rows] = await db.promise().execute(query);
    return rows;
  }

  static async getById(id) {
    const query = "SELECT * FROM Spesialisasi WHERE id = ?";
    const [rows] = await db.promise().execute(query, [id]);
    return rows[0];
  }

  static async update(id, nama_spesialisasi) {
    const query = "UPDATE Spesialisasi SET nama_spesialisasi = ? WHERE id = ?";
    const [result] = await db.promise().execute(query, [nama_spesialisasi, id]);
    return result.affectedRows;
  }

  static async delete(id) {
    const query = "DELETE FROM Spesialisasi WHERE id = ?";
    const [result] = await db.promise().execute(query, [id]);
    return result.affectedRows;
  }
}

module.exports = Spesialisasi;
