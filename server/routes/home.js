const express = require("express");
const router = express.Router();

const leaderboard_controller = require("../controllers/leaderboardController");

router.get('/leaderboard', leaderboard_controller.get_leaderboard);
  

module.exports = router;