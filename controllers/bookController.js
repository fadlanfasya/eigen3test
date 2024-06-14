const Book = require('../models/Book');
const Member = require('../models/Member');

exports.borrowBook = async (req, res) => {
  try {
    const bookCode = req.params.code;
    const memberCode = req.params.memberCode;

    const book = await Book.findOne({ code: bookCode });
    if (!book) {
      return res.status(404).json({ message: `Book ${bookCode} not found` });
    }

    if (book.stock === 0) {
      return res.status(400).json({ message: `Book ${bookCode} is out of stock` });
    }

    const member = await Member.findOne({ code: memberCode });
    if (!member) {
      return res.status(404).json({ message: `Member ${memberCode} not found` });
    }

    if (member.borrowedBooks.length >= 2) {
      return res.status(400).json({ message: `Member ${memberCode} has already borrowed 2 books` });
    }

    book.stock -= 1;
    await book.save();

    member.borrowedBooks.push(book._id); // Push the ObjectId of the book
    await member.save();

    res.json({ message: `Book ${bookCode} borrowed by member ${memberCode}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error borrowing book' });
  }
};

exports.returnBook = async (req, res) => {
  try {
    const bookCode = req.params.code;
    const memberCode = req.params.memberCode;

    const book = await Book.findOne({ code: bookCode });
    if (!book) {
      return res.status(404).json({ message: `Book ${bookCode} not found` });
    }

    const member = await Member.findOne({ code: memberCode });
    if (!member) {
      return res.status(404).json({ message: `Member ${memberCode} not found` });
    }

    const borrowedBookIndex = member.borrowedBooks.findIndex((id) => id.toString() === book._id.toString());
    if (borrowedBookIndex === -1) {
      return res.status(400).json({ message: `Member ${memberCode} did not borrow book ${bookCode}` });
    }

    const daysSinceBorrowed = Math.floor((Date.now() - member.borrowedBooks[borrowedBookIndex].borrowedAt) / (1000 * 60 * 60 * 24));
    if (daysSinceBorrowed > 7) {
      member.penalty = true;
      await member.save();
      res.json({ message: `Book ${bookCode} returned by member ${memberCode} with penalty` });
    } else {
      res.json({ message: `Book ${bookCode} returned by member ${memberCode}` });
    }

    member.borrowedBooks.splice(borrowedBookIndex, 1);
    await member.save();

    book.stock += 1;
    await book.save();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error returning book' });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching books' });
  }
};