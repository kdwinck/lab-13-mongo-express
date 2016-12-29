let mongoose = require('mongoose')
let Schema = mongoose.Schema
let Book = require('./book')

let authorSchema = Schema({
  name: {type: String, require: true},
  books: [{ type: mongoose.Schema.ObjectId, ref: 'Book' }]
})

module.exports = mongoose.model('Author', authorSchema)
