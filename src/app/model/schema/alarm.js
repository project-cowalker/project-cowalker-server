var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var alarmSchema = new Schema({
    user_idx : String,
    content : String,
    create_at : {type : Date, default : Date.now},
    read : Boolean
},{
    versionKey: false // You should be aware of the outcome after set to false
});


module.exports = mongoose.model('alarm', alarmSchema);