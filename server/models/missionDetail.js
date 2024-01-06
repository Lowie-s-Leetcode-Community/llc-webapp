const mongoose = require('mongoose');

const MissionDetailSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    problemList: {
        type: [{
            name: {
                type: String,
                required: true,
            },
            link: {
                type: String,
                required: true,
            },
            difficulty: {
                type: String,
                required: true,
            },
            aced: {
                type: Boolean,
                required: true,
            },
        }],
        required: true,
    }
});

module.exports = mongoose.model('lc_missionDetail', MissionDetailSchema);
