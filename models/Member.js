const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  memberCode: String,
  name: String,
  borrowedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  penalty: Boolean,
  penaltyEndDate: Date
});

module.exports = mongoose.model('Member', memberSchema);