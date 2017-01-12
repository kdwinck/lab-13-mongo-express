'use strict'

let expect = require('chai').expect
let request = require('superagent')
let mongoose = require('mongoose')

let Book = require('../model/book')
let Author = require('../model/author')

let url = 'http://localhost:3000/api'

let alfred = new Author({ name: 'Alfred Bester' }).save()

let testBook = {
  _author: alfred._id,
  title: 'The Stars My Destination'
}

describe('a restfull endpoint', function() {

  describe('GET', function() {

    describe('an unregisterd route', function() {
      it('will respond 404', function(done) {
        request.get(`${url}/books/something`)
        .end((err, res) => {
          expect(res.status).to.equal(404)
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

    describe('/api/authors/books/:id', function() {

      before( done => {
        new Author({ name: 'Alfred Bester' }).save()
          .then(neal => {
            new Book({ _author: neal._id, title: 'The Stars My Destination' }).save()
            .then(book => {
              this.testBook = book
              neal.books.push(book)
              neal.save().then(() => {
                done()
              })
            })
          })
      })

      after( done => {
        Book.remove({})
          .then( () => {
            Author.remove({})
            done()
          })
          .catch(done)
      })

      it('can fetch a book schema object', done => {
        request.get(`${url}/authors/books/${this.testBook._id}`)
          .end( (err, res) => {
            expect(res.status).to.equal(200)
            expect(res.body.title).to.equal('The Stars My Destination')
            done()
          })
      })
    })
  })

  describe('POST', function() {

    before( done => {
      new Author({ name: 'Roger Zelazny' }).save()
      .then( author => {
        this.author = author
        done()
      })
      .catch(done)
    })

    after( done => {
      Book.remove({})
        .then( () => done())
        .catch(done)
    })

    it('can create a new Book', done => {
      request.post(`${url}/authors/${this.author._id}/books`)
        .send({title: 'Hello World'})
        .end((err, res)  => {
          if (err) return done(err)
          expect(res.status).to.equal(200)
          expect(res.body.title).to.equal('Hello World')
          done()
        })
    })

    it('will throw an error if no body is provided', done => {
      request.post(`${url}/authors/${this.author._id}/books`)
        .end((err, res)  => {
          expect(res.status).to.equal(400)
          expect(res.text).to.equal('bad request')
          done()
        })
    })
  })

  describe('DELETE', function() {
    before( done => {
      new Book(testBook).save()
        .then( book => {
          this.testBook = book
          done()
        })
        .catch(done)
    })

    it('can delete a book', done => {
      request.delete(`${url}/books/${this.testBook._id}`)
        .end( (err, res) => {
          expect(res.status).to.equal(200)
          // expect(res.body).to.equal({})
          done()
        })
    })
  })
})
