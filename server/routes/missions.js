const express = require("express");
const missionRouter = express.Router();
const {getAllMissions, getMissionById} = require('../controllers/missionsController');

// GET /missions/all
missionRouter.get('/all', async (req, res) => {
    try {
      const allMissions = await getAllMissions();
      res.json(allMissions);
    } catch (e) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET /missions/:id
missionRouter.get('/:id', async (req, res) => {
    try {
      const mission = await getMissionById(req.params.id);
      res.json(mission);
    } catch (e) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = missionRouter;