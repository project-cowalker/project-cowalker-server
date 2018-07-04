var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var recruitQuestionAnswerSchema = new Schema({
    application_idx : String,
    answer : String,
    question_idx : String,
    application_idx : String
},{
    versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('recruit_question_answer', recruitQuestionAnswerSchema);