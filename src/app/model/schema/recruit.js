var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var recruitSchema = new Schema({
    project_idx : String,           
    position : String,
    start_date : {type : Date, default : Date.now},
    end_date : {type : Date, default : Date.now},
    number : Number,
    task : String,
    activity : String,
    reward : String,
    area : String,
    ability : String,
    career : String,
    preference : String,
    comment : String,
    user_idx : Number,
    creat_at : {type : Date, default : Date.now}
},{
    versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('recruit', recruitSchema);