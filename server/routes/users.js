const express = require('express');
const {getAllUsers, getUserStats, getUserMissions, getUserMissionDetails, getUserProfile} = require('../controllers/userController');
const userRouter = express.Router();

// GET all users
userRouter.get('/all', async (req, res) => {
  try {
    const allUsers = await getAllUsers();
    res.json(allUsers);
  } catch (e) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET overall statistics of a user
userRouter.get('/:id', async (req, res) => {
  try {
    const userStats = await getUser(req.params.id);
    res.json(userStats);
  } catch (e) {
    res.status(400).json({ error: 'Bad Request' });
  }
});

// GET overall statistics of a user
userRouter.get('/:id/stats', async (req, res) => {
  try {
    const userStats = await getUserStats(req.params.id);
    res.json(userStats);
  } catch (e) {
    res.status(400).json({ error: 'Bad Request' });
  }
});

// GET status of all missions for a user
userRouter.get('/:id/missions/all', async (req, res) => {
  try {
    const userMissions = await getUserMissions(req.params.id);
    res.json(userMissions)
  } catch (e) {
    res.status(400).send(e)
  }
});

// GET detailed information of a mission for a user
userRouter.get('/:id/missions/:missionId', async (req, res) => {
  try {
    const missionDetails = await getUserMissionDetails(req.params.id, req.params.missionId);
    res.json(missionDetails);
  } catch (e) {
    res.status(400).json({ error: 'Bad Request' });
  }
});

// GET user profile
userRouter.get('/:id/profile', async (req, res) => {
  try {
    const userProfile = await getUserProfile(req.params.id);
    res.json(userProfile);
  } catch (e) {
    res.status(400).json({ error: 'Bad Request' });
  }
});

module.exports = userRouter;
