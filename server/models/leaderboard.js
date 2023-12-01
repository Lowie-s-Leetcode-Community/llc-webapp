const mongoose = require('mongoose')

const LeaderboardSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    rank: {
        type: Number,
    },
    aced: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("LC_learderboard", LeaderboardSchema)