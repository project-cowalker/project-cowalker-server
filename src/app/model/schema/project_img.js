var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var projectImgSchema = new Schema({
    project_idx : String,
    img_url : String
})

module.exports = mongoose.model('project_img', projectImgSchema);