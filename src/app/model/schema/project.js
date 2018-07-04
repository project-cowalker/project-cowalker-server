var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var projectSchema = new Schema({
    title : String,
    summary : String,
    area : String,
    department : String,
    aim : String,
    explain : String,
    signup_date : {type : Date, default : Date.now},
    user_idx : Number,
    img_url : Array
},{
    versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('project', projectSchema);