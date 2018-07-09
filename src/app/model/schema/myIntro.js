var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var myIntroSchema = new Schema({
    user_idx : String,
    contents : String,
    intro_img_url : Array
},{
    versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('myIntro', myIntroSchema);