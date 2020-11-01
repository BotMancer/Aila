const mongoose = require('mongoose');

const serverSettingsSchema = mongoose.Schema({
    //Guild ID
    _id: {
        type: String,
        required: true
    },

    prefix: {
        type: String,
        required: true
    },

    features: {
        type: Object,
        required: true
    }
})

module.exports = mongoose.model('servers-settings', serverSettingsSchema);