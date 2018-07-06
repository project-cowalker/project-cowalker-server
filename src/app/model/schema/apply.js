var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var applySchema = new Schema({
    portfolio_url : String,
    introduce : String,
    recruit_idx : String,
    applicant_idx : String,
    phone : String,
    recruit_at : {type : Date, default : Date.now},
    project_idx: String,
    position: String,
    join : {type : Number, default : 0},
    answers : Array
},{
    versionKey : false
});

module.exports = mongoose.model('apply', applySchema);