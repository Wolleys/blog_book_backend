const express = require("express");
const router = express.Router();
const Category = require("../../../models/Category");

//CREATE
router.post("/", async (req, res) => {
    const newCat = new Category(req.body);
    try {
        const savedCat = await newCat.save();
        res.status(200).json(savedCat);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE
router.put("/:id", async (req, res) => {
    const categoryId = req.params.id;
    const { name } = req.body;

    try {
        // Find the category by ID
        const existingCategory = await Category.findById(categoryId);

        if (!existingCategory) {
            return res.status(404).json({ error: "Category not found" });
        }

        // Update the category's name
        existingCategory.name = name;
        const updatedCategory = await existingCategory.save();

        res.status(200).json(updatedCategory);
    } catch (err) {
        // Handle other errors here
        res.status(500).json({ error: "Internal server error" });
    }
});

//GET ALL
router.get("/", async (req, res) => {
    try {
        const cats = await Category.find().sort({ createdAt: "desc" });
        res.status(200).json(cats);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
