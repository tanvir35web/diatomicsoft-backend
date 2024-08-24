const express = require("express");
const { handleGetAllUsers, handleUserSignUp, handleUserLogin, handleUserLogout } = require("../controllers/user");
const { restrictToLoggedInUserOnly } = require("../middlewares/auth");
const { validateUserSignup, validateUserLogin } = require("../errorValidation/validationMassages");

const router = express.Router();

router.get("/users", restrictToLoggedInUserOnly, handleGetAllUsers);
router.post("/signup", validateUserSignup, handleUserSignUp);
router.post("/login", validateUserLogin, handleUserLogin);
router.post("/logout", handleUserLogout);


module.exports = router;