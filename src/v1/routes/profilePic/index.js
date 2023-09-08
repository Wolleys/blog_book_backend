const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const User = require("../../../models/User");
const upload = require("../../../middlewares/upload");

//UPLOAD
router.post("/:id", upload.single("image"), async (req, res) => {
    try {
        let image = req.file;
        const userId = req.params.id;

        if (!image) {
            return res.status(400).json("Select a photo to upload!");
        }

        if (userId) {
            const user = await User.findById(userId);

            if (!user) {
                if (image) {
                    fs.unlinkSync(
                        path.join(__dirname, "../../../uploads/", image.filename)
                    );
                }
                return res.status(404).json({ error: "User not found" });
            }

            user.profilePic = image.filename;
            await user.save();
            res.json({ message: "Image uploaded successfully!" });
        } else {
            if (image) {
                fs.unlinkSync(
                    path.join(__dirname, "../../../uploads/", image.filename)
                );
            }
            res.status(401).json({ error: "Authentication required" });
        }
    } catch (error) {
        if (image) {
            fs.unlinkSync(path.join(__dirname, "../../../uploads/", image.filename));
        }
        console.error(error);
        res.status(500).json({ error: "Image upload failed" });
    }
});

module.exports = router;
