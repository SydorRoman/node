const jwt = require('jsonwebtoken');

const messages = require('../../notification/notification');
const { JWT_SECRET } = require('../../config/config');

const verifyToken = async function (req, res, next) {
  const bearerHeader = req.headers.authorization;

  if (!bearerHeader) {
    res.sendStatus(403);
    return res.send({ err: messages.FORBIDDEN });
  }
  const bearer = bearerHeader.split(' ');
  const bearerToken = bearer[1];

 // console.log('session:\n', req.session.token);

  // if (req.session.token === bearerToken) {
  //   if (!req.state) {
  //     req.state = {};
  //   }
    try {
      const user = await jwt.verify(bearerToken, JWT_SECRET);
      req.user = user;
      return next();
    } catch ({ message }) {
      res.status(500);
      return res.send({ message });
    }
  // } else {
  //   return res.sendStatus(403);
  // }
};

exports.modules = { verifyToken };
