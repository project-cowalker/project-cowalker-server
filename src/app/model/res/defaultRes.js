module.exports = {
    new : function(body) {
        let newUser = {
            email: body.email,
            password: hash.encoding(body.password)
        };
        return newUser;
    }
}