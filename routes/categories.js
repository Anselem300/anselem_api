/**
 * @swagger
 * /categories:
 *   get:
 *     tags: [Categories]
 *     summary: Get all categories
 *     responses:
 *       200:
 *         description: Success
 *   post:
 *     tags: [Categories]
 *     summary: Create a new category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryInput'
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     tags: [Categories]
 *     summary: Update a category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryInput'
 *     responses:
 *       200:
 *         description: Updated
 *       404:
 *         description: Category not found
 *   delete:
 *     tags: [Categories]
 *     summary: Delete a category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted
 *       404:
 *         description: Category not found
 */

const express = require('express')
const router = express.Router();
const { getAllCategories, createCategory, getCategoryById, deleteCategory, 
    updateCategory } = require("../controller/categories");
const { isAuthenticated } = require("../utilities/authenticate")

router.get("/", isAuthenticated, getAllCategories);
router.get("/:id", isAuthenticated, getCategoryById)
router.post("/", isAuthenticated, createCategory);
router.put("/:id", isAuthenticated, updateCategory)
router.delete("/:id", isAuthenticated, deleteCategory)

module.exports = router;