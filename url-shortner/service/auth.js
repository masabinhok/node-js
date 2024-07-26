const jwt = require("jsonwebtoken");

const secretKey = "sabin!@#123";

function setUser(user) {
  const payload = {
    user,
  };
  return jwt.sign(payload, secretKey);
}

function getUser(token) {
  if (!token) return null;
  return jwt.verify(token, secretKey);
}

module.exports = {
  setUser,
  getUser,
};
