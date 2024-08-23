const express = require("express");
const { handleGetAllUsers, handleUserSignUp, handleUserLogin, handleUserLogout, validateUserSignup } = require("../controllers/user");
const { restrictToLoggedInUserOnly } = require("../middlewares/auth");

const router = express.Router();

router.get("/users", restrictToLoggedInUserOnly, handleGetAllUsers);
router.post("/signup", validateUserSignup, handleUserSignUp);
router.post("/login", handleUserLogin);
router.post("/logout", handleUserLogout);


module.exports = router;