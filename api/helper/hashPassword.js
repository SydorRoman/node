const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10; // value to config

function hashPass(password) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
      if (err) return reject(err);
      // hash the password along with our new salt
      return bcrypt.hash(password, salt)
        .then(res => resolve(res))
        .catch(er => reject(er));
    });
  });
};

module.exports = {
  hashPass,
};
