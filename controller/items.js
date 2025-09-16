const Item = require("../models/item")
const mongoose = require("mongoose");

// GET all items
const getAllItems = async (req, res) => {
    try{
        const items = await Item.find().populate("category");
        res.json(items);
    }
    catch (err) {
        res.status(500).json({ error: 'Server error', details: err.message});
    }
}

// GET item by ID
const getItemById = async (req, res) => {
    try{
        const { id } = req.params;
        if(!id.match(/^[0-9a-fA-F]{24}$/)){
            return res.status(400).json({ error: "Invalid item ID"});
        }

        const item = await Item.findById(id).populate("category");
        if(!item){
            return res.status(404).json({ error: "Item not found"});
        }

        res.json(item);
    }
    catch (err) {
        res.status(500).json({error: "Server error", details: err.message})
    }
}

// POST new item
const createItem = async (req, res) => {
    try{
        const { name, description, price, quantity, category } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }

        const item = new Item({ name, description, price, quantity, category });
        const savedItem = await item.save();
        res.status(201).json(savedItem);
    } catch(err){
        res.status(500).json({ error: 'Server error', details: err.message })
    }
}


// PUT update item
const updateItem = async (req, res) => {
    try{
        const { id } = req.params;
        const { name, description, price, quantity, category } = req.body;

        if (!id.match(/^[0-9a-fA-F]{24}$/)){
            return res.status(400).json({ error: "Invalid item ID"})
        }
        const updatedItem = await Item.findByIdAndUpdate(
            id, 
            { name, description, price, quantity, category },
            { new: true, runValidators: true }
        );

        if(!updatedItem){
            return res.status(404).json({ error: "Item not found"})
        }

        res.json(updatedItem)
    }
    catch(err) {
        res.status.json({ error: "Server error", details: err.message })
    }
}

// DELETE item
const deleteItem = async (req, res) => {
    try{
        const { id } = req.params;
        if (!id.match(/^[0-9a-fA-F]{24}$/)){
            return res.status(400).json({ error: "Invalid item ID"});
        }

        const deletedItem = await Item.findByIdAndDelete(id);
        if(!deletedItem) {
            return res.status(404).json({ error: "Item not found"})
        }

        res.json({ message: "Item deleted successfully"});
    }
    catch(err){
        res.status(500).json({ error: "Server error", details: err.message })
    }
}

module.exports = {
    getAllItems, createItem, getItemById, updateItem, deleteItem
}