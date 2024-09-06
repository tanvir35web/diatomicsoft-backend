const express = require("express");
require('dotenv').config();
const { connectToMongoDB } = require("./connectMongoDB");
const apiRouter = require("./routes/user");
const projectRouter = require("./routes/project");
const clientsReviewRouter = require("./routes/clientsReview");
const blogsRouter = require("./routes/blogs");
const cookieParser = require("cookie-parser");
const path = require('path');
const corsConfig = require("./corsConfig");



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
app.use(express.static(path.resolve("./public")));


// CORS Configuration
corsConfig();


//routes
app.use("/api", apiRouter);
app.use("/api/projects", projectRouter);
app.use("/api/clientReviews", clientsReviewRouter);
app.use("/api/blogs", blogsRouter);



app.listen(PORT, console.log(`Server listening on ${PORT}`));