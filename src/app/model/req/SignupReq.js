const hash = require('../../module/hash.js');

module.exports = {
    new : function(email, password) {
        let newUser = {
            email: email,
            password: hash.encoding(password)
        };
        return newUser;
    }
}