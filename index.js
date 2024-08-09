const express = require("express");
require('dotenv').config();
const {connectToMongoDB} = require("./connectMongoDB");
const apiRouter = require("./routes/user");


const app = express();
const PORT = process.env.PORT;

connectToMongoDB("mongodb://127.0.0.1:27017");

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

app.get("/users", (req, res) => {
  const users = [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" },
    { id: 3, name: "Charlie", email: "charlie@example.com" },
  ];
  res.json({
    massage: "Users fetch successfully",
    data: users
  });
});

app.listen(PORT, console.log(`Server listening on ${PORT}`));