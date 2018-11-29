const jwt = require('jsonwebtoken');

const messages = require('../../notification/notification');
const { JWT_SECRET } = require('../../config/config');

exports.isAdmin = async function (req, res, next) {
    const bearerHeader = req.headers.authorization;

    if (!bearerHeader) {
        res.sendStatus(403);
        return res.send({ err: messages.FORBIDDEN });
    }
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];

    const decoded = jwt.decode(bearerToken, JWT_SECRET);
    const role = decoded.user.role;
    if (role === 'ADMIN') {
        next();
    } else {
        return res.status(403).send({ messege: messege.PROHIBITED_PERMISSION });
    }

    try {
        const result = await jwt.verify(bearerToken, JWT_SECRET);
        req.user = result.user;
        return next();
    } catch ({ message }) {
        res.status(500);
        return res.send({ error: message });
    }
};
