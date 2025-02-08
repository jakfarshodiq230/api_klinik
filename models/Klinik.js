const db = require("../config/db");

class Klinik {
  static async getAll() {
    const query = "SELECT * FROM klinik";
    const [rows] = await db.promise().execute(query);
    return rows;
  }

  static async getById(id) {
    const query = "SELECT * FROM klinik WHERE id = ?";
    const [rows] = await db.promise().execute(query, [id]);
    return rows[0];
  }

  static async create(nama, alamat) {
    const query = "INSERT INTO klinik (nama, alamat) VALUES (?, ?)";
    const [result] = await db.promise().execute(query, [nama, alamat]);
    return result.insertId;
  }

  static async update(id, nama, alamat) {
    const query = "UPDATE klinik SET nama = ?, alamat = ? WHERE id = ?";
    const [result] = await db.promise().execute(query, [nama, alamat, id]);
    return result.affectedRows;
  }

  static async delete(id) {
    const query = "DELETE FROM klinik WHERE id = ?";
    const [result] = await db.promise().execute(query, [id]);
    return result.affectedRows;
  }
}

module.exports = Klinik;
