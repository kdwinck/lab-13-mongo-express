let mongoose = require('mongoose')
let Schema = mongoose.Schema
let Author = require('./author')

let bookSchema = Schema({
  _author : { type: mongoose.Schema.ObjectId, ref: 'Author' },
  title : {type: String}
})

module.exports = mongoose.model('Book', bookSchema)
