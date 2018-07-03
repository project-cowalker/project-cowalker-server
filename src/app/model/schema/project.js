var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var projectSchema = new Schema({
    title : String,
    summary : String,
    area : Number,
    department : Number,
    aim : Number,
    explain : String,
    signup_date : {type : Date, default : Date.now},
    user_idx : Number
})

module.exports = mongoose.model('project', projectSchema);