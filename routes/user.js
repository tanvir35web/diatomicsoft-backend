const express = require("express");
const { handleGetAllUsers, handleUserSignUp, handleUserLogin, handleUserLogout } = require("../controllers/user");
const { restrictToLoggedInUserOnly } = require("../middlewares/auth");

const router = express.Router();

router.get("/user", restrictToLoggedInUserOnly, handleGetAllUsers);
router.post("/signup", handleUserSignUp);
router.post("/login", handleUserLogin);
router.post("/logout", handleUserLogout);


module.exports = router;