var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var recruitQuestionSchema = new Schema({
    question : String,
    recruit_idx : Number
},{
    versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('recruit_question', recruitQuestionSchema);