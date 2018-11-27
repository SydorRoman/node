const messege = require('../../notification/notification');

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config/config');

exports.verifyRole = async (req,res,next) => {
    const token = req.headers.authorization.split(' ')[1];

    const decoded =  jwt.decode(token, JWT_SECRET);
    const role = decoded.user.role;
    if (role === 'ADMIN') {
        next();
    } else {
        return res.status(403).send({messege: messege.PROHIBITED_PERMISSIOM});
    }
}
