module.exports = {
    res : function(result) {
        let temp = {
            intro_contents : "",
            intro_img_url : ""
        }
        temp.intro_contents = result[0].intro_contents;
        temp.intro_img_url = result[0].intro_img_url;
        return temp;
    }   
}