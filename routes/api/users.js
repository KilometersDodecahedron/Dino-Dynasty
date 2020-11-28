const router = require("express").Router();
const gameController = require("../../controllers/gameController.js");

// Matches with "/api/users"
router.route("/")
  .get(gameController.findAllUsers)
  .post(gameController.createUser);

// Matches with "/api/users/:id"
router
  .route("/:id")
  //you can pass the user name into the "id" here without causing issues
  .get(gameController.findUserByName)
  .put(gameController.updateUser)
  .delete(gameController.removeUser);

module.exports = router;