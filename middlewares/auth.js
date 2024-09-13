// const { getUser } = require("../services/auth");

// async function restrictToLoggedInUserOnly(req, res, next) {
//   const userUidToken = req.cookies?.uidToken;
//   if (!userUidToken) {
//     return res.status(401).json({ message: 'You must be authenticated to access this resource!' });
//   }
//   const user = getUser(userUidToken);
//   if (!user) {
//     return res.status(401).json({ message: 'Invalid or expired user token!' });
//   };
//   req.user = user;
//   next();
// };


// module.exports = { restrictToLoggedInUserOnly };

const { getUser } = require("../services/auth");
const jwt = require("jsonwebtoken"); // Assuming you're using JWT
const User = require("../models/user"); // Mongoose User model

async function restrictToLoggedInUserOnly(req, res, next) {
  const authorizationHeader = req.headers.authorization;

  // Check if the Authorization header exists and starts with "Bearer "
  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header missing or malformed!' });
  }

  // Extract token from Authorization header
  const token = authorizationHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Bearer token not provided!' });
  }

  try {
    // Verify the token (assuming JWT is being used)
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure you have set JWT_SECRET

    // Retrieve the user from the database using the decoded token info
    const user = await User.findById(decoded.id); // Assuming you store user ID in token

    // Check if user exists
    if (!user) {
      return res.status(401).json({ message: 'User does not exist or token is invalid!' });
    }

    // Attach user to request object
    req.user = user;
    next();

  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired user token!' });
  }
}

module.exports = { restrictToLoggedInUserOnly };
