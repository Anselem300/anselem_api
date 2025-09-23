const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Inventory API",
      version: "1.0.0",
      description:
        "REST API for managing categories and items with full CRUD operations. Item routes require authentication (session cookie).",
    },
    servers: [
      {
        url: "https://anselem-api.onrender.com",
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "connect.sid", // Default name used by express-session
          description:
            "Session cookie set after successful login (e.g., GitHub OAuth). Required for protected routes.",
        },
      },
      schemas: {
        Category: {
          type: "object",
          properties: {
            _id: { type: "string", example: "68c940425bde8f49fec292a2" },
            name: { type: "string", example: "Electronics" },
            description: { type: "string", example: "Devices and gadgets" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        CategoryInput: {
          type: "object",
          required: ["name"],
          properties: {
            name: { type: "string", example: "Electronics" },
            description: { type: "string", example: "Devices and gadgets" },
          },
        },
        Item: {
          type: "object",
          properties: {
            _id: { type: "string", example: "68c94ab9a5da9b0e3b677638" },
            name: { type: "string", example: "Laptop" },
            description: { type: "string", example: "Gaming Laptop" },
            price: { type: "number", example: 1700 },
            quantity: { type: "integer", example: 3 },
            category: { type: "string", example: "68c940425bde8f49fec292a2" },
          },
        },
        ItemInput: {
          type: "object",
          required: ["name", "price", "quantity", "category"],
          properties: {
            name: { type: "string", example: "Laptop" },
            description: { type: "string", example: "Gaming Laptop" },
            price: { type: "number", example: 1700 },
            quantity: { type: "integer", example: 3 },
            category: { type: "string", example: "68c940425bde8f49fec292a2" },
          },
        },
      },
    },
    // Optional: Apply cookieAuth globally. Comment this out if you want to apply per route in your route files.
    security: [
      {
        cookieAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"], // Swagger will scan these files for route docs
};

const swaggerSpec = swaggerJsDoc(options);

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
