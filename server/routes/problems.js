const express = require('express');
const { getDailyProblem } = require('../controllers/problemsController');

const problemsRouter = express.Router();

problemsRouter.get('/daily', async (req, res) => {
    try {
        const dailyProblem = await getDailyProblem();
        res.json(dailyProblem);
    } catch (e) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = problemsRouter;