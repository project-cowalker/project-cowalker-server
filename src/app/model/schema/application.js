var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var applicationSchema = new Schema({
    portfolio_url : String,
    introduce : String,
    recruit_idx : String,
    applicant_idx : String,
    recruit_at : {type : Date, default : Date.now},
    join : Boolean
})

module.exports = mongoose.model('application', applicationSchema);