const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 3000;

const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: true }));

const path = require("path");

// Database Connection
const connectDB = require("./server/database/connection");
connectDB();

// Set template kind
app.set("view engine", "ejs");

// Load assests
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
//  '/css' now becomes virtual path
// Now if you create style.css inside css folder then only you have link it css/style.css

app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

// Handling Routes
app.use("/", require("./server/routes/router"));

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
