var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var alarmSchema = new Schema({
    user_idx : String,
    content : String,
    create_at : {type : Date, default : Data.now},
    read : Boolean
})

module.exports = mongoose.model('alarm', alarmSchema);