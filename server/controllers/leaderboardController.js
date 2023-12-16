const Leaderboard = require('../models/leaderboard');
const asyncHandler = require('express-async-handler');

exports.get_leaderboard = asyncHandler(async (req, res, next) => {
    const leaderboard = await Leaderboard.find({}).exec();
    res.json(leaderboard);
});