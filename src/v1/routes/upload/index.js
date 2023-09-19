const express = require("express");
const router = express.Router();
const upload = require("../../../middlewares/upload");

router.post("/", upload.single("post"), async (req, res) => {
    let image;
    try {
        image = req.file;

        if (!image) {
            return res.status(400).json("Select a photo to upload!");
        }

        
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
