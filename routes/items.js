/**
 * @swagger
 * /items:
 *   get:
 *     tags: [Items]
 *     summary: Get all items
 *     responses:
 *       200:
 *         description: Success
 *   post:
 *     tags: [Items]
 *     summary: Create a new item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ItemInput'
 *     responses:
 *       201:
 *         description: Item created successfully
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /items/{id}:
 *   put:
 *     tags: [Items]
 *     summary: Update an item by ID
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
 *             $ref: '#/components/schemas/ItemInput'
 *     responses:
 *       200:
 *         description: Item updated successfully
 *       404:
 *         description: Item not found
 *   delete:
 *     tags: [Items]
 *     summary: Delete an item by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item deleted successfully
 *       404:
 *         description: Item not found
 */

const router = require("express").Router();
const { getAllItems, createItem, getItemById, updateItem, deleteItem
 } = require("../controller/items")

router.get("/", getAllItems)
router.get("/:id", getItemById)
router.post("/", createItem)
router.put("/:id", updateItem)
router.delete("/:id", deleteItem)

module.exports = router;