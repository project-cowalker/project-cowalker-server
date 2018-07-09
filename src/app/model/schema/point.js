var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var pointSchema = new Schema({
    user_idx : String,
    contents : String,
    create_at :  {type : Date, default : Date.now},
},{
    versionKey : false
});

module.exports = mongoose.model('point', pointSchema);