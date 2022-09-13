const mongoose = require('mongoose');

const PortalsUrlSchema = new mongoose.Schema({
    portal_name: {
        type: String,
        require: true
    },

    portal_url: {
        type: String,
        require: true,
    },
    status: {
        type: String,
        enum: ['new', 'old'],
        default: 'new'
    }
}, { timestamps: true, collection: 'PortalUrls' });

module.exports = mongoose.model('PortalsUrlModel', PortalsUrlSchema);