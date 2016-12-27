let mongoose = require('mongoose')
let Schema = mongoose.Schema

let carSchema = Schema({
  name: {type: String, require: true},
})

module.exports = mongoose.model('car', carSchema)
