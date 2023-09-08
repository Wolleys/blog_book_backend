const express = require("express");
const router = express.Router();

// Import route handlers
const v1AuthRouter = require("./auth");
const v1UserRouter = require("./users");
const v1PostRouter = require("./posts");
const v1CategoryRouter = require("./categories");
const v1ProfilePicRouter = require("./profilePic");

// Use route handlers
router.use("/api/v1/auth", v1AuthRouter);
router.use("/api/v1/users", v1UserRouter);
router.use("/api/v1/posts", v1PostRouter);
router.use("/api/v1/profile", v1ProfilePicRouter);
router.use("/api/v1/categories", v1CategoryRouter);

module.exports = router;
