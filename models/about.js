var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var about = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    interest: { type: String, required: true },
});

module.exports = mongoose.model('About', about);