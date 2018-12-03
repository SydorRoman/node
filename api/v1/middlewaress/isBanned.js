const messege = require('../../notification/notification');

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config/config');

exports.isBanned = async (req,res,next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded =  jwt.decode(token, JWT_SECRET);
    const ban = decoded.user.isBanned;
    if (!ban) {
        next();
    } else {
        return res.status(403).send({messege: messege.PROHIBITED_PERMISSION});
    }
}
