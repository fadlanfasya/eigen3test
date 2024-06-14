const Member = require('../models/Member');
const Book = require('../models/Book');

exports.getAllMembers = async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching members' });
  }
};

exports.getBorrowedBooks = async (req, res) => {
  try {
    const memberCode = req.params.memberCode;

    const member = await Member.findOne({ code: memberCode });
    if (!member) {
      return res.status(404).json({ message: `Member ${memberCode} not found` });
    }

    const borrowedBookIds = member.borrowedBooks;
    const borrowedBooks = await Book.find({ _id: { $in: borrowedBookIds } });

    res.json(borrowedBooks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error getting borrowed books' });
  }
};