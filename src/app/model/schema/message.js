var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var messageSchema = new Schema({
    //받는 사람 idx
    to_idx : Number,
    //보내는 사람 idx
    from_idx : Number,
    //보낸 시간
    create_at : {type : Date, default : Date.now},
    //내용
    contents : String
},{
    versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('message', messageSchema);