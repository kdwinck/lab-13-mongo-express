let Router = require('express').Router
let jsonParser = require('body-parser').json()

let Author = require('../model/author')
let Book = require('../model/book')

let router = module.exports = new Router()

router.get('/api/books/:id', (req, res, next) => {
  Book.findById(req.params.id)
    .populate('_author')
    .then(book => res.json(book))
    .catch(next)
})

router.post('/api/books/:id', jsonParser, (req, res, next) => {
  Author.findById(req.params.id)
    .then(author => {
      new Book(req.body).save()
      .then(book => {
        author.books.push(book)
        author.save()
      .catch(next)
      })
    })
})

router.delete('/api/books/:id', (req, res, next) => {
  Book.remove(req.params.id)
    .then(book => res.json(book))
    .catch(next)
})
