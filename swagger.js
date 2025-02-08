// swagger.js
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
// const authenticateToken = require("./middlewares/authMiddleware"); untuk login terlebih dahulu

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0", // Versi OpenAPI
    info: {
      title: "API Klinik", // Judul API
      version: "1.0.0", // Versi API
      description: "Dokumentasi API untuk aplikasi klinik", // Deskripsi API
      contact: {
        name: "Developer", // Nama developer
        email: "jakfarshodiq230@gmail.com", // Email developer
      },
    },
    servers: [
      {
        url: "http://localhost:3000", // URL server
        description: "Server lokal",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"], // Lokasi file routes yang akan didokumentasikan
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
