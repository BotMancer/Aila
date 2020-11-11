const mongoose = require('mongoose');

const serverSettingsSchema = mongoose.Schema({
    //Guild ID
    _id: {
        type: String,
        required: true
    },
    //Per-Server prefix.
    prefix: {
        type: String,
        required: true
    },
    /* 
    * Per-Server language.
    * - English
    * - Italian
    */
    language: {
        type: String,
        required: true
    },
    //Per-Server features settings and states.
    features: {
        type: Object,
        required: true
    }
})

module.exports = mongoose.model('servers-settings', serverSettingsSchema);