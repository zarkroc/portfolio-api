var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: { type: String, required: true },
    level: { type: Number, required: true },
});

module.exports = mongoose.model('Skill', schema);