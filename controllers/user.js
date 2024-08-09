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
    res.status(500).json({ message: 'Server Error' });
  }
}

module.exports = {
  handleGetAllUsers,
  handleCreateUser,
}