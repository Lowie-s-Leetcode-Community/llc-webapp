const Missions = require('../models/missions');
const asyncHandler = require('express-async-handler');

exports.get_missions = asyncHandler(async (req, res, next) => {
    const all_missions = await Missions.find({}).exec();
    res.json(all_missions);
});