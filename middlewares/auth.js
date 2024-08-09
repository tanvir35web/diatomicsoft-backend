const { getUser } = require("../services/auth");

async function restrictToLoggedInUserOnly(req, res, next) {
  const userUidToken = req.cookies?.uidToken;
  if (!userUidToken) {
    return res.status(401).json({ message: 'You must be logged in to access this resource!' });
  }
  const user = getUser(userUidToken);
  if (!user) {
    return res.status(401).json({ message: 'Invalid or expired user token!' });
  };
  req.user = user;
  next();
};


module.exports = { restrictToLoggedInUserOnly };