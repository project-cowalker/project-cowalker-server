var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var applySchema = new Schema({
    portfolio_url : String,
    introduce : String,
    recruit_idx : String,
    applicant_idx : String,
    recruit_at : {type : Date, default : Date.now},
    join : Boolean
},{
   versionKey: false // You should be aware of the outcome after set to false

});

module.exports = mongoose.model('apply', applySchema);