const jwt = require('jsonwebtoken');

const verifyToken = async function (req, res, next) {
    const bearerHeader = req.headers['authorization']; 

    
    if(!bearerHeader){

        res.sendStatus(403);
        return res.send({err: "Forbidden"})
    } 
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1]; 

    if (req.session.token === bearerToken) {
        if (!req.state) {
            req.state = {};
        }
        try {
           // console.log('TRY')
            const user = await jwt.verify(bearerToken, 'secretkey');
            return next();
        } catch ({ message }) {
           // console.log('catch', message)
            res.status(500);
            return res.send({ message });
        }
    } else {
        return res.sendStatus(403);
    }

}
exports.modules = { verifyToken };