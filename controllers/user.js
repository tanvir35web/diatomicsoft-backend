const User = require("../modals/user");


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


async function handleCreateUser(req, res) {
  const { name, email, password } = req.body;

  //check all required fields are present
  if (!name ||!email ||!password) {
    return res.status(400).json({ message: 'All fields (name, email, password) are required!' });
  }

  // Check if email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'Email already exists!' });
  }

  //checked password length
  if (password.length < 6) {
    return res.status(400).json({ message: 'Password should be at least 6 characters long!' });
  }

  try {
    const newUser = new User({
      name,
      email,
      password,
    });
    await User.create(newUser);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error!' });
  }
}

module.exports = {
  handleGetAllUsers,
  handleCreateUser,
}