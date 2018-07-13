var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var alarmSchema = new Schema({
    project_name : String,
    user_idx : Number,
    contents : String,
    create_at : {type : Date, default : Date.now},
},{
    versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('alarm', alarmSchema);