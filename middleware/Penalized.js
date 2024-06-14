// Create a middleware to check if a member is penalized
const Member = require('../models/Member');

const isPenalized = (req, res, next) => {
    const memberCode = req.params.memberCode;
    Member.findById(memberCode)
      .then(member => {
        if (member.penalty) {
          res.status(403).send({ error: 'Member is penalized' });
        } else {
          next();
        }
      })
      .catch(error => console.error(error));
  };

module.exports = isPenalized;  