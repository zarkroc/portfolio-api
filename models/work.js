var mongoose = require('mongoose')
var Schema = mongoose.Schema

var work = new Schema({
  company: { type: String, required: true },
  description: { type: String, required: true },
  start: { type: String, required: true },
  stop: { type: String, required: true },
  role: { type: String, required: true },
})

module.exports = mongoose.model('WorkPlace', work)
