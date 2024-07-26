const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.redirect("/login");
  }

  const token = authHeader.split("Bearer ")[1];
  if (!token) {
    return res.redirect("/login");
  }

  try {
    const user = await getUser(token);
    if (!user) {
      return res.redirect("/login");
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.redirect("/login");
  }
}

async function checkAuth(req, res, next) {
  const authHeader = req.headers["authorization"];
  
  if (!authHeader) {
    return next();
  }

  const token = authHeader.split("Bearer ")[1];
  if (!token) {
    return next();
  }

  try {
    const user = await getUser(token);
    req.user = user;
  } catch (error) {
    console.error(error);
  }

  next();
}

module.exports = {
  restrictToLoggedinUserOnly,
  checkAuth,
};
