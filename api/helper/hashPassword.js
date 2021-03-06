const bcrypt = require('bcrypt'),
SALT_WORK_FACTOR = 10;

const hashPassword = (password) => {
    // generate a salt
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
            if (err) return false;
            // hash the password along with our new salt
            bcrypt.hash(password, salt)
                .then((res) => resolve(res))
                .catch(er => reject(er));
        });
    }); 
};


module.exports = {
    hashPassword,

}