module.exports = {
    res : function(obj) {
        let data = new Array();
        for(i = 0; i < obj.length; i++) {
            let temp = {
                project_name : "",
                contents : "",
                create_at : ""
            }
            temp.project_name = obj[i].project_name;
            temp.contents = obj[i].contents;
            temp.create_at = obj[i].create_at;
            data.push(temp);
        }
        return data;
    }   
}