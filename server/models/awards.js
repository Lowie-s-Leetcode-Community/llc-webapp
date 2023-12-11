const mongoose = require('mongoose')

const AwardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("lc_awards", AwardSchema)