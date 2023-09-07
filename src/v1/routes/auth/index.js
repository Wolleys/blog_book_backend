const express = require("express");
const router = express.Router();
const User = require("../../../models/User");
const {
    hashPassword,
    validatePassword,
} = require("../../../middlewares/auth/bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
    try {
        const hashedPass = await hashPassword(req.body.password);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        });

        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

//LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(400).json("Invalid credentials!");
        }

        const isPasswordValid = await validatePassword(
            req.body.password,
            user.password
        );
        if (!isPasswordValid) {
            return res.status(400).json("Invalid credentials!");
        }

        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
