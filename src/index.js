const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const server = require("./config/server");


// Start server and connect DB
server(app);
