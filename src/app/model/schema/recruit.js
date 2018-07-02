var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var recruitSchema = new Schema({
    project_idx : String,
    position : String,
    start_date : {type : Date, default : Data.now},
    end_date : {type : Date, default : Data.now},
    number : Number,
    task : String,
    activity : String,
    reward : String,
    area : String,
    ability : String,
    career : String,
    preference : String,
    comment : String,
    creat_at : {type : Date, default : Data.now}
})

module.exports = mongoose.model('recruit', recruitSchema);