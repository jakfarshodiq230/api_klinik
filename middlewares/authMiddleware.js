const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // Jika token tidak ada
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized. Anda harus login terlebih dahulu.",
    });
  }

  // Verifikasi token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: "Forbidden. Token tidak valid atau telah kedaluwarsa.",
      });
    }

    // Jika token valid, simpan data user ke request
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
