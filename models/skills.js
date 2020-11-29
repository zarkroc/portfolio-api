var mongoose = require('mongoose')
const about = require('./about')
const auth = require('./auth')
var Schema = mongoose.Schema

var schema = new Schema({
  name: { type: String, required: true },
  level: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, reg: 'about' },
})

module.exports = mongoose.model('Skill', schema)
