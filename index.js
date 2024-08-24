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
const cors = require('cors')



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

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", '*'); // or '*'
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});



const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:8000',
  'https://diatomicsoft.vercel.app',
  'https://diatomicsoft-backend-api.vercel.app',
  // add more origins here
];

// app.use(cors({
//   origin: (origin, callback) => {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true, 
// }));

app.options('*', cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));


//routes
app.use("/api", apiRouter);
app.use("/api/projects", projectRouter);
app.use("/api/clientReviews", clientsReviewRouter);
// app.use('/', restrictToLoggedInUserOnly, staticRouter);
app.use('/', staticRouter);


app.listen(PORT, console.log(`Server listening on ${PORT}`));