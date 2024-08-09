const express = require("express");
const { handleGetAllUsers, handleCreateUser } = require("../controllers/user");

const router = express.Router();

// GET request for /users/
router.get("/user", handleGetAllUsers );
router.post("/user", handleCreateUser);


module.exports = router;