var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var applySchema = new Schema({
    portfolio_url : String,
    introduce : String,
    recruit_idx : String,
    applicant_idx : String,
    phone : String,
    recruit_at : {type : Date, default : Date.now},
    join : {type : Boolean, default : false},
    answers : Array
},{
    versionKey : false
});

module.exports = mongoose.model('apply', applySchema);