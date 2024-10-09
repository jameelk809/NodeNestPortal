const express = require("express");
const productRoute = require("./routes/product.route.js");
const Connection = require("./database/db.js");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const app = express();

// Load environment variables
dotenv.config();

// Create a write stream for logging to a file
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// Middleware
app.use(cors());
app.use(morgan('combined', { stream: accessLogStream })); // Log to a file
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware to serve static files from the 'public' directory
app.use(express.static('public'));

// API routes
app.use("/api/v1/products", productRoute);

// Root route
app.get("/", (req, res) => {
    // res.send("Hello from Node API Server Updated");
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});

// Load database credentials from environment variables
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

// Connect to the database and start the server
Connection(USERNAME, PASSWORD, app);
