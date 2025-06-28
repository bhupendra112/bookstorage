const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
require("./conn/conn");

const app = express();
const port = process.env.PORT || 5000;

// Routers
const user = require("./router/user");
const books = require("./router/books");
const faverate = require("./router/faverateBook");
const cart = require("./router/cart");
const order = require("./router/order");

// Middleware
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/api/v1", user);
app.use("/api/v2", books);
app.use("/api/v3", faverate);
app.use("/api/v4", cart);
app.use("/api/v5", order);

// Serve static files
app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));
// Serve index.html for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
});
// Start server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});