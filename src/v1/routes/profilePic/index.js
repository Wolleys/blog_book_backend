const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../../../models/User");
const upload = require("../../../middlewares/upload");

//UPLOAD
router.post("/:id", upload.single("profile"), async (req, res) => {
    let image;
    try {
        image = req.file;
        const userId = req.params.id;

        if (!image) {
            return res.status(400).json("Select a photo to upload!");
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            // Check if userId is not a valid ObjectId
            if (image) {
                fs.unlinkSync(
                    path.join(__dirname, "../../../uploads/profile/", image.filename)
                );
            }
            return res.status(404).json({ error: "Invalid params" });
        }

        const user = await User.findById(userId);

        if (!user) {
            if (image) {
                fs.unlinkSync(
                    path.join(__dirname, "../../../uploads/profile/", image.filename)
                );
            }
            return res.status(404).json({ error: "User not found" });
        }

        user.profilePic = image.filename;
        await user.save();
        res.json({ message: "Image uploaded successfully!" });
    } catch (error) {
        if (image) {
            fs.unlinkSync(
                path.join(__dirname, "../../../uploads/profile/", image.filename)
            );
        }
        console.log(error);
        res.status(500).json({ error: "Image upload failed" });
    }
});

module.exports = router;
