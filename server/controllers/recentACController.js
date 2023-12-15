const RecentAC = require('../models/recentAC');
const asyncHandler = require('express-async-handler');

exports.get_recentAC = asyncHandler(async (req, res, next) => {
    const all_recentAC = await RecentAC.find({}).exec();
    res.json(all_recentAC);
});