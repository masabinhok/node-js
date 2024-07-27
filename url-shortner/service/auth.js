const jwt = require("jsonwebtoken");

const secretKey = "sabin!@#123";

function setUser(user) {
  return jwt.sign(
    {
      name: user.name,
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    secretKey
  );
}

function getUser(token) {
  if (!token) return null;
  return jwt.verify(token, secretKey);
}

module.exports = {
  setUser,
  getUser,
};
