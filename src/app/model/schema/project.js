var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var projectSchema = new Schema({
    title : String,
    summary : String,
    area : String,
    department : String,
    aim : String,
    explain : String,
    create_at : {type : Date, default : Date.now},
    user_idx : Number,
    img_url : {type : Array, default : "https://s3.ap-northeast-2.amazonaws.com/project-cowalker/KakaoTalk_20180714_022936700.png"}
},{
    versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('project', projectSchema);