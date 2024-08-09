const express = require("express");
require('dotenv').config();
const { connectToMongoDB } = require("./connectMongoDB");
const apiRouter = require("./routes/user");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT;

connectToMongoDB("mongodb://127.0.0.1:27017");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", apiRouter);

app.listen(PORT, console.log(`Server listening on ${PORT}`));