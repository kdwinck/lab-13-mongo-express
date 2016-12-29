let expect = require('chai').expect
let request = require('superagent')
let mongoose = require('mongoose')

let Author = require('../model/author')
let url = 'http://localhost:3000/api'

let testAuthor = {
  name: 'Neal Stephenson'
}

describe('a restfull endpoint', function() {

  let server

  before(done => {
    server = require('../index.js')
    server.listen(3000)
    mongoose.connection.on('open', done)
  })

  // after(() => {
  //   server.close()
  // })

  // describe('an unregisterd route', function() {
  //   it('will respond 404', function(done) {
  //     request.get(`${url}/authors/1234`)
  //     .end((err, res) => {
  //       expect(res.status).to.equal(404)
  //       expect(res.text).to.equal('not found')
  //       done()
  //     })
  //   })
  // })

  describe('GET', function() {

    describe('/api/authors', function() {
      it('will return an array of authors', function(done) {
        request.get(`${url}/authors/`)
          .end( (err, res) => {
            expect(res.status).to.equal(200)
            expect(typeof res.body).to.equal(typeof [])
            done()
          })
      })
    })
    describe('/api/authors/:id', function() {

      before( done => {
        new Author(testAuthor).save()
          .then( author => {
            this.testAuthor = author
            done()
          })
          .catch(done)
      })
      after( done => {
        Author.remove({})
          .then( () => done())
          .catch(done)
      })

      it('can fetch a schema object', done => {
        request.get(`${url}/authors/${this.testAuthor._id}`)
          .end( (err, res) => {
            expect(res.status).to.equal(200)
            expect(res.body.name).to.equal('Neal Stephenson')
            done()
          })
      })
    })
  })

  describe('POST', function() {
    after( done => {
      Author.remove({})
        .then( () => done())
        .catch(done)
    })

    it('can create a new author', function(done) {
      request.post(`${url}/authors/`)
        .send({name: 'William Gibson'})
        .end((err, res)  => {
          if (err) return done(err)
          expect(res.status).to.equal(200)
          expect(res.body.name).to.equal('William Gibson')
          done()
        })
    })
  })
  describe('PUT', function() {

    before( done => {
      new Author(testAuthor).save()
        .then( author => {
          this.testAuthor = author
          done()
        })
        .catch(done)
    })

    after( done => {
      Author.remove({})
        .then( () => done())
        .catch(done)
    })

    it('can update a author', done => {
      request.put(`${url}/authors/${this.testAuthor._id}`)
        .send({name: 'PKD'})
        .end( (err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.name).to.equal('PKD')
          done()
        })
    })
    describe('DELETE', function() {

      before( done => {
        new Author(testAuthor).save()
          .then( author => {
            this.testAuthor = author
            done()
          })
          .catch(done)
      })

      it('can delete a author', done => {
        request.delete(`${url}/authors/${this.testAuthor._id}`)
          .end( (err, res) => {
            expect(res.status).to.equal(200)
            // expect(res.body).to.equal({})
            done()
          })
      })
    })
  })
})
