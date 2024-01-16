const express = require('express');
const {getLeaderboard} = require('../controllers/leaderboardController');
const leaderboardRouter = express.Router();

// GET all users
leaderboardRouter.get('/', async (req, res) => {
  try {
    const leaderboard = await getLeaderboard();
    res.json(leaderboard);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = leaderboardRouter;