const router = require("express").Router();
const gameController = require("../../controllers/gameController.js");
const { route } = require("./scores.js");

// Matches with "/api/users"
router.route("/")
  .get(gameController.findAllUsers)
  .post(gameController.createUser);
  
//for logins, "/api/users/byName"
//send it as data, object with properties "userName" and "password"
router
  .route("/byName")
  .get(gameController.findUserInfoByName);
  
// Matches with "/api/users/:id"
router
  .route("/:id")
  //you can pass the user name into the "id" here without causing issues
  .get(gameController.findUserByName)
  .put(gameController.updateUser)
  .delete(gameController.removeUser);


module.exports = router;