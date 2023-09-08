const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const server = require("./config/server");
const routes = require("./v1/routes");

// Middlewares
app.use(express.json());

// Serve static files from the 'uploads' folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use(routes);

// Start server and set up MongoDB connection
server(app);
