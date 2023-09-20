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
    const { name } = req.body;
    const paramId = req.params.id;
    try {
        res.status(200).json(paramId);
    } catch (err) {
        res.status(500).json(err);
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
