const Category = require("../models/category")
const mongoose = require("mongoose");

// GET all categories
const getAllCategories = async (req, res) => {
    try{
        const categories = await Category.find();
        res.json(categories);
    } catch(err){
        res.status(500).json({ error: 'Server error', details: err.message })
    }
}

// GET single category by ID
const getCategoryById = async (req, res) => {
    try{
        const { id } = req.params;
        if(!id.match(/^[0-9a-fA-F]{24}$/)){
            return res.status(400).json({ error: "Invalid category ID"});
        }

        const category = await Category.findById(id);
        if(!category){
            return res.status(404).json({error: "Category not found"});
        }

        res.json(category);
    } catch(err) {
        res.status(500).json({ error: "Server error", details: err.message })
    }
}

// POST new category
const createCategory = async (req, res) => {
    try{
        const { name, description } = req.body;
        if(!name){
            return res.status(400).json({ error: "Name is required"});
        }

        const category = new Category({ name, description });
        const savedCategory = await category.save();
        res.status(201).json(savedCategory);
    } catch (err) {
        res.status(500).json({ error: "Server error", details: err.message})
    }
}

// PUT update category
const updateCategory = async (req, res) => {
    try{
        const { id } = req.params;
        const { name, description } = req.body;

        if(!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: "Invalid category ID"})
        }

        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            { name, description},
            { new: true, runValidators: true }
        );

        if(!updatedCategory) {
            return res.status(404).json({ error: "Category not found"});
        }
        res.json(updatedCategory);
    }
    catch (err) {
        res.status(500).json({ error: "Server error", details: err.message })
    }
};

// DELETE category
const deleteCategory = async (req, res) => {
    try{
        const { id } = req.params;
        if(!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: "Invalid category ID"});
        }

        const deletedCategory = await Category.findByIdAndDelete(id);
        if(!deletedCategory) {
            return res.status(404).json({ error: "Catgegory not found"});
        }

        res.json({message: "Category deleted successfully"});
    }
    catch(err) {
        res.status(500).json({error: "Server error", details: err.message });
    }
};

module.exports = {
    getAllCategories, createCategory, getCategoryById, deleteCategory, updateCategory
}