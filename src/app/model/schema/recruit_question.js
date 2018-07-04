var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var recruitQuestionSchema = new Schema({
    question : Array,
    recruit_idx : String
},{
<<<<<<< HEAD
    versionKey: false // You should be aware of the outcome after set to false
=======
   versionKey: false // You should be aware of the outcome after set to false

>>>>>>> develop
});

module.exports = mongoose.model('recruit_question', recruitQuestionSchema);