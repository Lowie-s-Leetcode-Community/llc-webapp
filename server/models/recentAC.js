const mongoose = require('mongoose')

const RecentACSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    date: {
        tyoe: Date,
    }
});

module.exports = mongoose.model("lc_recentAC", RecentACSchema)