let mongoose = require('mongoose')
let Schema = mongoose.Schema

let carSchema = Schema({
  name: {type: String, require: true},
  color: {type: String}
})

module.exports = mongoose.model('car', carSchema)
