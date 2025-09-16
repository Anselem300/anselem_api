const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: String,
    price: Number,
    quantity: Number,
    status: {type: String, default: "active"},
    category: {type: mongoose.Schema.Types.ObjectId, ref: "Category"},
    createdAt: { type: Date, default: Date.now}
})

module.exports = mongoose.model("Item", itemSchema);