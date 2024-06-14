const express = require('express');
const router = express.Router();


const memberController = require('../controllers/memberController');
const bookController = require('../controllers/bookController'); 

router.get('/members', memberController.getAllMembers);
router.get('/:memberCode/borrowedBooks', memberController.getBorrowedBooks);

router.get('/books', bookController.getAllBooks);
router.post('/:code/borrow/:memberCode', bookController.borrowBook);
router.post('/:code/return/:memberCode', bookController.returnBook);

module.exports = router;