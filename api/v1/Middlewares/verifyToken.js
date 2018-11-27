const jwt = require('jsonwebtoken');

const messages = require('../../notification/notification');
const { JWT_SECRET } = require('../../config/config');

exports.verifyToken = async function (req, res, next) {
  const bearerHeader = req.headers.authorization;

  if (!bearerHeader) {
    res.sendStatus(403);
    return res.send({ err: messages.FORBIDDEN });
  }
  const bearer = bearerHeader.split(' ');
  const bearerToken = bearer[1];
  
    try {
      const result = await jwt.verify(bearerToken, JWT_SECRET);
      req.user = result.user;
      return next();
    } catch ({ message }) {
      res.status(500);
      return res.send({ message });
    }
};

