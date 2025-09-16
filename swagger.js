const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Inventory API",
      version: "1.0.0",
      description: "REST API for managing categories and items with full CRUD operations.",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Local development server",
      },
      {
        url: "https://your-render-app-name.onrender.com",
        description: "Production server",
      },
    ],
    components: {
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
  },
  apis: ["./routes/*.js"], // Swagger will scan these files for route docs
};

const swaggerSpec = swaggerJsDoc(options);

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
