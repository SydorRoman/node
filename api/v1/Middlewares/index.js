const { verifyToken } = require('./verifyToken');
const { verifyRole }  = require('./permission');

module.exports = {
  verifyToken,
  verifyRole,
};
