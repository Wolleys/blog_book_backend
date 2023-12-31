const express = require("express");
const router = express.Router();
const Post = require("../../../models/Post");
const upload = require("../../../middlewares/upload");

//CREATE
router.post("/", upload.single("post"), async (req, res) => {
    let image;
    const { title, desc, username, categories } = req.body;

    try {
        image = req.file;
        if (!image) {
            return res.status(400).json({ error: "Select a photo to upload" });
        }

        const newPost = new Post({
            title,
            desc,
            username,
            categories: categories || [],
            photo: image.filename,
        });

        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE
router.put("/:id", upload.single("post"), async (req, res) => {
    let image;
    const paramId = req.params.id;
    const { title, desc, username, categories } = req.body;

    try {
        image = req.file;
        if (!image) {
            return res.status(400).json({ error: "Select a photo to upload" });
        }

        const post = await Post.findById(paramId);
        if (post.username === username) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(
                    paramId,
                    {
                        title,
                        desc,
                        username,
                        categories: categories || [],
                        photo: image.filename,
                    },
                    { new: true }
                );
                res.status(200).json(updatedPost);
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("You are not the author!");
        }
    } catch (err) {
        res.status(404).json("Post not found!");
    }
});

//DELETE
router.delete("/:id", async (req, res) => {
    const paramId = req.params.id;
    try {
        const post = await Post.findById(paramId);
        if (post.username === req.body.username) {
            try {
                await Post.findByIdAndDelete(paramId);
                res.status(200).json("Post has been deleted!");
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("You are not the author!");
        }
    } catch (err) {
        res.status(404).json("Post not found!");
    }
});

//GET POST
router.get("/:id", async (req, res) => {
    const paramId = req.params.id;
    try {
        const post = await Post.findById(paramId);
        if (!post) {
            return res.status(404).json("Post not found!");
        }
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
        let posts;
        if (username) {
            posts = await Post.find({ username }).sort({ createdAt: "desc" });
        } else if (catName) {
            posts = await Post.find({
                categories: {
                    $in: [catName],
                },
            }).sort({ createdAt: "desc" });
        } else {
            posts = await Post.find().sort({ createdAt: "desc" });
        }
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
