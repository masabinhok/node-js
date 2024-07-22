const express = require("express");
const {
  handleGetAllUsers,
  handleGetUsersById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
} = require("../controllers/user");

const router = express.Router();

//Routes
router.route("/").get(handleGetAllUsers).post(handleCreateNewUser);

router
  .route("/:id")
  .get(handleGetUsersById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

module.exports = router;
