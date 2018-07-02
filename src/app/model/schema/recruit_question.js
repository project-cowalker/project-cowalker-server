var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var recruitQuestionSchema = new Schema({
    question : String,
    recruit_idx : String
})

module.exports = mongoose.model('recruit_question', recruitQuestionSchema);