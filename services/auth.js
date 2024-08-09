const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;

function setUser(user) {
  return jwt.sign({
    id: user._id,
    email: user.email,
  }, secretKey);
}

function getUser(token) {
  if (!token) {
    throw new Error("No token provided");
  }
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    throw new Error("Invalid token");
  }
}

module.exports = { setUser, getUser };