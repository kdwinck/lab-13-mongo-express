let Router = require('express').Router
let jsonParser = require('body-parser').json()

let Author = require('../model/author')

let router = module.exports = new Router()

router.post('/api/author', jsonParser, (req, res, next) => {
  new Author(req.body).save()
    .then(car => res.json(car))
    .catch(next)
})

router.get('/api/author', (req, res, next) => {
  Author.find({})
    .then(schema => res.json(schema))
    .catch(next)
})

router.get('/api/author/:id', (req, res, next) => {
  Author.findById(req.params.id)
    .then(car => res.json(car))
    .catch(next)
})

router.put('/api/author/:id', jsonParser, (req, res, next) => {
  Author.findOneAndUpdate(req.params.id, req.body, {new: true})
    .then(car => res.json(car))
    .catch(next)
})

router.delete('/api/author/:id', (req, res, next) => {
  Author.remove(req.params.id)
    .then(car => res.json(car))
    .catch(next)
})
