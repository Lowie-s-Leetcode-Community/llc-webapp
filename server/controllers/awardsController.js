const Awards = require('../models/awards');
const asyncHandler = require('express-async-handler');

exports.get_awards = asyncHandler(async (req, res, next) => {
    const all_awards = await Awards.find({}).exec();
    res.json(all_awards);
});