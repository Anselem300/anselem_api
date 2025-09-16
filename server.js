const dotenv = require("dotenv").config()
const express = require("express")
const itemsRouter = require("./routes/items");
const categoriesRouter = require("./routes/categories")
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors")
const setupSwagger = require("./swagger")
const mongoose = require("mongoose");

setupSwagger(app)

// Middleware
app.use(cors())
app.use(bodyParser.json())

// Routes
app.use("/items", itemsRouter)
app.use("/categories", categoriesRouter)


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("✅ MongoDB connected successfully.");
    app.listen(process.env.PORT, () => {
        console.log(`🚀 App is listening on localhost:${process.env.PORT}`);
    })
})
.catch(err => console.error("❌ MongoDB connection failed.", err));