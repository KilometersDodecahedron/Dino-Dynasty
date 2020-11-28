const router = require("express").Router();
const gameController = require("../../controllers/gameController.js");

// Matches with "/api/scores"
router.route("/")
  .post(gameController.createScore);

// Matches with "/api/scores/rogue"
router.route("/rogue")
  .get(gameController.findAllRogueScores);

// Matches with "/api/scores/dino"
router.route("/dino")
  .get(gameController.findAllDinoScores);

// Matches with "/api/scores/:id"
router
  .route("/:id")
  //you can pass the user name into the "id" here without causing issues
  .get(gameController.findScoreByName)
  .put(gameController.updatScore)
  .delete(gameController.removeScore);

module.exports = router;