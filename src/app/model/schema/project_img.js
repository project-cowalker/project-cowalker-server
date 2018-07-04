var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var projectImgSchema = new Schema({
    project_idx : String,
    img_url : String
},{
   versionKey: false // You should be aware of the outcome after set to false

});

module.exports = mongoose.model('project_img', projectImgSchema);