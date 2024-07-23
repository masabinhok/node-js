const User = require("../models/user");

async function handleGetAllUsers(req, res) {
  const allDbUsers = await User.find({});
  res.send(allDbUsers);
}

async function handleGetUsersById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({
      status: "failed",
      message: "User not found",
    });
  }
  return res.status(201).json({ status: "success", user: user });
}

async function handleUpdateUserById(req, res) {
  const user = await User.findByIdAndUpdate(req.params.id, {
    lastName: "Handsome",
    new: true,
  });
  res.status(201).json({ status: "success", user: user });
}

async function handleDeleteUserById(req, res) {
  const id = req.params.id;
  console.log(id);
  await User.findByIdAndDelete(id);
  res.status(201).json({ status: "success", message: "User deleted" });
}

async function handleCreateNewUser(req, res) {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.job_title ||
    !body.gender
  ) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    jobTitle: body.job_title,
    gender: body.gender,
  });

  return res.status(201).json({ status: "success", user: result });
}

module.exports = {
  handleGetAllUsers,
  handleGetUsersById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
};
