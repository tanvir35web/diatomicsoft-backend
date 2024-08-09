const express = require("express");
require('dotenv').config();
const { connectToMongoDB } = require("./connectMongoDB");
const apiRouter = require("./routes/user");
const projectRouter = require("./routes/project");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT;

//connect to MongoDB database
connectToMongoDB("mongodb://127.0.0.1:27017");

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//routes
app.use("/api/user", apiRouter);
app.use("/api/project", projectRouter);

app.listen(PORT, console.log(`Server listening on ${PORT}`));