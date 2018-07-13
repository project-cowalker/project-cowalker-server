module.exports = {
    res : function(result) {
        let data = new Array();
        
        for (i = 0; i < result.length; i++) {
            let temp = {
                project_idx : "",
                title: "",
                summary: "",
                area: "",
                department: "",
                aim: "",
                explain: "",
                create_at: "",
                img_url: []
            }
            temp.project_idx = result[i]._id;
            temp.title = result[i].title;
            temp.summary = result[i].summary;
            temp.area = result[i].area;
            temp.department = result[i].department;
            temp.aim = result[i].aim;
            temp.explain = result[i].explain;
            temp.create_at = result[i].create_at;
            temp.img_url = result[i].img_url;
            data.push(temp);
        }
        return data;
    }   
}