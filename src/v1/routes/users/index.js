const express = require("express");
const router = express.Router();
const User = require("../../../models/User");
const Post = require("../../../models/Post");
const upload = require("../../../middlewares/upload");
const { hashPassword } = require("../../../middlewares/auth/bcrypt");

//UPDATE
router.put("/:id", upload.single("profile"), async (req, res) => {
    let image;
    const paramId = req.params.id;
    const { userId, username, email, password } = req.body;

    if (userId === paramId) {
        try {
            image = req.file;
            const hashedPass = await hashPassword(password);
            const updatedUser = await User.findByIdAndUpdate(
                paramId,
                {
                    email,
                    username,
                    password: hashedPass,
                    profilePic: image.filename,
                },
                { new: true }
            );
            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json("This is not your account!");
    }
});

//DELETE
router.delete("/:id", async (req, res) => {
    const userId = req.params.id;
    if (req.body.userId === userId) {
        try {
            const user = await User.findById(userId);
            try {
                await Post.deleteMany({ username: user.username });
                await User.findByIdAndDelete(userId);
                res.status(200).json("User has been deleted!");
            } catch (err) {
                res.status(500).json(err);
            }
        } catch (err) {
            res.status(404).json("User not found!");
        }
    } else {
        res.status(401).json("This is not your account!");
    }
});

//GET USER
router.get("/:id", async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(404).json("User not found!");
    }
});

module.exports = router;
