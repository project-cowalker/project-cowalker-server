var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var journeySchema = new Schema({
    //여정 제목
    title : String,
    //여정 시작 날짜
    start_time : {type : Date, default : Date.now},
    //여정 종료 날짜
    emd_time : {type : Date, default : Date.now},
    //여정 활동 요약
    summary : String,
    //프로젝트 id
    project_idx : String
},{
   versionKey: false // You should be aware of the outcome after set to false

});

module.exports = mongoose.model('journey', journeySchema);