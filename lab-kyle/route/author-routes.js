let Router = require('express').Router
let jsonParser = require('body-parser').json()

let Author = require('../model/author')

let router = module.exports = new Router()

router.post('/api/authors', jsonParser, (req, res, next) => {
  new Author(req.body).save()
    .then(author => res.json(author))
    .catch(next)
})

router.get('/api/authors', (req, res, next) => {
  Author.find({})
    .then(schema => res.json(schema))
    .catch(next)
})

router.get('/api/authors/:id', (req, res, next) => {
  Author.findById(req.params.id)
    .then(author => res.json(author))
    .catch(next)
})

router.put('/api/authors/:id', jsonParser, (req, res, next) => {
  Author.findOneAndUpdate(req.params.id, req.body, {new: true})
    .then(author => res.json(author))
    .catch(next)
})

router.delete('/api/authors/:id', (req, res, next) => {
  Author.remove(req.params.id)
    .then(author => res.json(author))
    .catch(next)
})
