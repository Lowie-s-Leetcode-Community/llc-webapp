const express = require('express');
const {getLeaderboard} = require('../controllers/leaderboardController');
const leaderboardRouter = express.Router();

// GET all users
leaderboardRouter.get('/', async (req, res) => {
  try {
    const page = req.query.page;

    const leaderboard = await getLeaderboard(page);
    res.json(leaderboard);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = leaderboardRouter;