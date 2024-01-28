const express = require('express');
const { getAllUsers, getUserRank, getUserMissions, getUserMissionDetails, getUserProfile, getUser, getUserDashboardStats } = require('../controllers/userController');
const {authFilter, checkUser} = require('../middlewares/authFilter');
const userRouter = express.Router();

// Apply the authFilter middleware to all routes
userRouter.use(authFilter);

// Check if the user is the correct user
userRouter.use('/:id', checkUser);

// GET all users (temporarily disabled until proper role-based API access is implemented)
// userRouter.get('/all', async (req, res) => {
//   try {
//     const allUsers = await getAllUsers();
//     res.json(allUsers);
//   } catch (e) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

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

userRouter.get('/:id/dashboard', async (req, res) => {
  try {
    const userDashboards = await getUserDashboardStats(req.params.id);
    res.json(userDashboards);
  } catch (e) {
    res.status(400).json({ error: 'Bad Request' });
  }
});

// GET leetcode username
userRouter.get('/:id/leetcode-username', async (req, res) => {
  try {
    const user = await getUser(req.params.id);
    res.json(user.leetcodeUsername);
  } catch (e) {
    res.status(400).json({ error: 'Bad Request' });
  }
});

userRouter.get('/:id/rank', async (req, res) => {
  try {
    const rank = await getUserRank(req.params.id);
    res.json(rank);
  } catch (e) {
    res.status(400).json({ error: 'Bad Request' });
  }
});

module.exports = userRouter;
