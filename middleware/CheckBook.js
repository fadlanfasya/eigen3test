// Create a middleware to check if a book is available
const Book = require('../models/Book');

const isBookAvailable = (req, res, next) => {
    const bookCode = req.params.bookCode;
    Book.findById(bookCode)
      .then(book => {
        if (!book || book.quantity === 0) {
          res.status(404).send({ error: 'Book is not available' });
        } else {
          next();
        }
      })
      .catch(error => console.error(error));
};

module.exports = isBookAvailable;