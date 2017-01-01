'use strict'

let Router = require('express').Router
let jsonParser = require('body-parser').json()

let Author = require('../model/author')
let Book = require('../model/book')

let router = module.exports = new Router()

router.get('/api/books', (req, res, next) => {
  Book.find({})
    .then(schema => res.json(schema))
    .catch(next)
})

router.get('/api/books/:id', (req, res) => {
  Book.findById(req.params.id)
    .populate('_author')
    .then(book => res.json(book))
    .catch( () => res.status(404).send('not found'))
})

router.post('/api/books/:id', jsonParser, (req, res) => {
  let newBook
  Author.findById(req.params.id)
    .then(author => {
      new Book(req.body).save()
    .then(book => {
      newBook = book
      author.books.push(book)
      author.save()
    })
    .then(() => res.json(newBook))
    .catch(() => res.status(400).send('bad request'))
    })
})

router.delete('/api/books/:id', (req, res) => {
  Book.remove(req.params.id)
    .then(book => res.json(book))
    .catch(() => {
      res.status(404).send('not found')
    })
})
