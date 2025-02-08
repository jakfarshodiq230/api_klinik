const db = require("../config/db");
const bcrypt = require("bcryptjs");

class User {
  static async create(username, password) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const query = "INSERT INTO users (username, password) VALUES (?, ?)";
    const [result] = await db.promise().execute(query, [username, hashedPassword]);
    return result.insertId;
  }

  static async findByUsername(username) {
    const query = "SELECT * FROM users WHERE username = ?";
    const [rows] = await db.promise().execute(query, [username]);
    return rows[0];
  }
}

module.exports = User;
