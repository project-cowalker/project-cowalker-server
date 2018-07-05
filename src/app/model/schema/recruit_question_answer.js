var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var recruitQuestionAnswerSchema = new Schema({
    apply_idx : String,
    answer : String,
    question_idx : String,
    applicant_idx : String
},{
    versionKey : false
});


module.exports = mongoose.model('recruit_question_answer', recruitQuestionAnswerSchema);