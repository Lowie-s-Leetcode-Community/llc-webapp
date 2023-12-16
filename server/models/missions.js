const mongoose = require('mongoose')

const MissionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    route: {
        type: String,
        required: true,
    },
    progress: {
        type: Number,
        required: true,
        maxLen: 100,
        minLen: 0,
    }
});

module.exports = mongoose.model("lc_missions", MissionSchema)