const router = require("express").Router();
const userRoutes = require("./users.js");
const scoreRoutes = require("./scores.js")

router.use("/users", userRoutes);
router.use("/scores", scoreRoutes);

module.exports = router;