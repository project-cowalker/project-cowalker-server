var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var messageSchema = new Schema({
    to_idx : Number,
    from_idx : Number,
    create_at : {type : Date, default : Date.now},
    read : {type : Boolean, default : false},
    content : String
})

module.exports = mongoose.model('message', messageSchema);