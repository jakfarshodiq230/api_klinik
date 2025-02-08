// models/Pembayaran.js
const db = require("../config/db");

class Pembayaran {
  static async create(id_janji_temu, jumlah, metode_pembayaran, status) {
    const query = `
            INSERT INTO Pembayaran (id_janji_temu, jumlah, metode_pembayaran, status)
            VALUES (?, ?, ?, ?)
        `;
    const [result] = await db.promise().execute(query, [id_janji_temu, jumlah, metode_pembayaran, status]);
    return result.insertId;
  }

  static async getAll() {
    const query = "SELECT * FROM Pembayaran";
    const [rows] = await db.promise().execute(query);
    return rows;
  }

  static async getById(id) {
    const query = "SELECT * FROM Pembayaran WHERE id = ?";
    const [rows] = await db.promise().execute(query, [id]);
    return rows[0];
  }

  static async update(id, id_janji_temu, jumlah, metode_pembayaran, status) {
    const query = `
            UPDATE Pembayaran 
            SET id_janji_temu = ?, jumlah = ?, metode_pembayaran = ?, status = ?
            WHERE id = ?
        `;
    const [result] = await db.promise().execute(query, [id_janji_temu, jumlah, metode_pembayaran, status, id]);
    return result.affectedRows;
  }

  static async delete(id) {
    const query = "DELETE FROM Pembayaran WHERE id = ?";
    const [result] = await db.promise().execute(query, [id]);
    return result.affectedRows;
  }
}

module.exports = Pembayaran;
