# Lab-14 Double Resource Mongo-Express API

## Description
This project will let a user create, read, update, and destroy different Author and Book Schemas by using the /api/author or /api/book route in conjunction with GET, POST, PUT, and DELETE requests and implements persistent data using mongodb. It uses express to route requests.

## Endpoints

To make a get request, simply make a request to the following endpoints.

* '/api/authors'    
  - example  'http://localhost:3000/api/authors'

  This will return a list of all current authors in the database

  '/api/books'
  - example  'http://localhost:3000/api/books'

  This will return a list of all current books in the database

### GET request

When making a GET request to '/api/authors' or /api/books, you may include an ID number.

  - example  'http://localhost:3000/api/authors/<id>'

  This will return that specific author

  - example  'http://localhost:3000/api/books/<id>'

  This will return that specific book



### POST request

When making a POST request you must include a json object in the body. It must have a **name** property if it is an author or a **title** property if it is a book.

  - example '{"name": "Neal Stevenson"}'

  This will create a new author object with that schema's information

If the POST request is too the /api/books route you must also include an author id

  - example URL - "http://localhost:3000/api/books/<author-id>"
  - example data - '{"title": "Seveneves"}'

  This will create a new book and add that book the the appropriate authors list of books


### PUT request

When making a PUT request you must include a json object in the body and an ID. The
json object must have a **name** property.

  - example  'http://localhost:3000/api/author/<id>'
  - example body '{"name": "William Gibson"}'

  This will update an author object with that schema's information


### DELETE request

When making a DELETE request you must include the ID number for the
item you wish to delete.

  - example 'http://localhost:3000/api/author/<id>'
  - example 'http://localhost:3000/api/books/<id>'

  This will delete either an author or a book based on the url
