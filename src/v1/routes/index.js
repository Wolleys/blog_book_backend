const express = require("express");
const router = express.Router();

// Import route handlers
const v1AuthRouter = require("./auth");

// Use route handlers
router.use("/api/v1/auth", v1AuthRouter);

module.exports = router;