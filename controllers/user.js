const { errorValidationMessageFormatter } = require("../errorValidation/errorValidationMessageFormatter");
const User = require("../models/user");
const { setUser } = require("../services/auth");


async function handleGetAllUsers(req, res) {
  try {
    const users = await User.find();
    res.status(200).json({
      message: "All users fetch successfully",
      data: users
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


async function handleUserLogin(req, res) {

  const hasErrors = errorValidationMessageFormatter(req, res);
  if (hasErrors) return; // Stop further execution if there are validation errors

  const { email, password } = req.body;

  // Check if user exists with provided email and password
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password!' });
  }
  const token = setUser(user);
  res.cookie("uidToken", token, {
    sameSite: 'None',  // allow cross-site requests
  });
  res.json({
    message: 'User logged in successfully',
    data: { userName: user.name, userEmail: user.email, token: token }
  });
}

async function handleUserLogout(req, res) {
  try {
    res.clearCookie("uidToken");
    res.json({ message: 'User logged out successfully' });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error!' });
  }
}


async function handleUserSignUp(req, res) {

  const hasErrors = errorValidationMessageFormatter(req, res);
  if (hasErrors) return; // Stop further execution if there are validation errors

  const { name, email, password } = req.body;

  try {
    // Check if email already exists
    const isExistingUser = await User.findOne({ email });
    if (isExistingUser) {
      return res.status(400).json({ message: 'Email already exists!' });
    }
    //checked password length
    if (password && password.length < 6) {
      return res.status(400).json({ message: 'Password should be at least 6 characters long!' });
    }

    const user = new User({
      name,
      email,
      password,
    });
    await User.create(user);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('myError', error);
    res.status(500).json({ message: 'Server Error!' });
  }
}

module.exports = {
  handleGetAllUsers,
  handleUserLogin,
  handleUserLogout,
  handleUserSignUp,
}