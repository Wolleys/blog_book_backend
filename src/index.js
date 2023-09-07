const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const server = require("./config/server");
const routes = require("./v1/routes");

// Built-in json body parser middleware
app.use(express.json());

// App routes
app.use(routes);

// Start server and connect DB
server(app);
