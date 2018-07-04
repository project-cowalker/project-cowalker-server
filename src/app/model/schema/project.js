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
},{
   versionKey: false // You should be aware of the outcome after set to false

});

module.exports = mongoose.model('project', projectSchema);