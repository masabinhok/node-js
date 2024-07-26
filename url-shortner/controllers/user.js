const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  console.log("user", user);

  if (!user)
    return res.render("login", {
      error: "Invalid email or password",
    });

  const token = setUser(user);

  //cookies are domain specific and also can be set an expiry date...
  res.cookie("uid", token);
  return res.json({ token });
}

module.exports = { handleUserSignup, handleUserLogin };
