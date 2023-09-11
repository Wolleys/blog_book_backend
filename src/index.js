const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const corsOptions = require("./config/cors");
const server = require("./config/server");
const routes = require("./v1/routes");

// Middlewares
app.use(express.json());
app.use(cors(corsOptions));

// Serve static files from the 'uploads' folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use(routes);

// Start server and set up MongoDB connection
server(app);
