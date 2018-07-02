var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email : String,
    name : String,
    password : String,
    signup_date : {type : Date, default : Data.now}
})

module.exports = mongoose.model('user', userSchema);