const express = require("express");
require('dotenv').config();
const { connectToMongoDB } = require("./connectMongoDB");
const apiRouter = require("./routes/user");
const projectRouter = require("./routes/project");
const clientsReviewRouter = require("./routes/clientsReview");
const cookieParser = require("cookie-parser");
const path = require('path');
const staticRouter = require("./routes/staticRoutes");
const { restrictToLoggedInUserOnly } = require("./middlewares/auth");


const app = express();
const PORT = process.env.PORT;

//connect to MongoDB database
connectToMongoDB(process.env.MONGO_URL);

// Set up EJS for rendering views
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//routes
app.use("/api", apiRouter);
app.use("/api/projects", projectRouter);
app.use("/api/clientReviews", clientsReviewRouter);
app.use('/', restrictToLoggedInUserOnly, staticRouter);


app.listen(PORT, console.log(`Server listening on ${PORT}`));