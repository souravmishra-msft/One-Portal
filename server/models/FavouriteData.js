const mongoose = require('mongoose');

const FavouriteDataSchema = new mongoose.Schema({
    portal_id: {
        type: String,
        require: true
    },
    portal_name: {
        type: String,
        require: true
    },
    portal_url: {
        type: String,
        require: true
    },
    userId: {
        type: String,
        require: true
    },
}, { timestamps: true, collection: 'FavouriteData' });

module.exports = mongoose.model('FavouriteDataModel', FavouriteDataSchema);