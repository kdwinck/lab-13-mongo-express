'use strict'

let expect = require('chai').expect
let request = require('superagent')
let mongoose = require('mongoose')

let Book = require('../model/book')
let Author = require('../model/author')

let url = 'http://localhost:3000/api'

// let alfred = new Author({ name: 'Alfred Bester' }).save()
//
// let testBook = {
//   _author: alfred._id,
//   title: 'The Stars My Destination'
// }

describe('a restfull endpoint', function() {

  describe('GET', function() {

    describe('an unregisterd route', function() {
      it('will respond 404', function(done) {
        request.get(`${url}/books/something`)
        .end((err, res) => {
          expect(res.status).to.equal(404)
          expect(res.text).to.equal('not found')
          done()
        })
      })
    })

    describe('/api/books', function() {
      it('will return an array of books', function(done) {
        request.get(`${url}/books/`)
          .end( (err, res) => {
            expect(res.status).to.equal(200)
            expect(typeof res.body).to.equal(typeof [])
            done()
          })
      })
    })
    describe('/api/books/:id', function() {

      before( done => {
        new Author({ name: 'Alfred Bester' }).save()
          .then(alfred => {
            new Book({ _author: alfred._id, title: 'The Stars My Destination' }).save()
            .then(book => {
              this.testBook = book
              alfred.books.push(book)
              alfred.save()
            })
            .then(() => done())
          })
      })
      after( done => {
        Book.remove({})
          .then( () => done())
          .catch(done)
      })

      it('can fetch a book schema object', done => {
        request.get(`${url}/books/${this.testBook._id}`)
          .end( (err, res) => {
            expect(res.status).to.equal(200)
            expect(res.body.title).to.equal('The Stars My Destination')
            done()
          })
      })
    })
  })

  describe('POST', function() {
    after( done => {
      Book.remove({})
        .then( () => done())
        .catch(done)
    })

    it('can create a new Book', done => {
      request.post(`${url}/books/`)
        .send({name: 'William Gibson'})
        .end((err, res)  => {
          if (err) return done(err)
          expect(res.status).to.equal(200)
          expect(res.body.name).to.equal('William Gibson')
          done()
        })
    })
  })
})
