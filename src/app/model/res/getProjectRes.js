module.exports = {
    res : function(result) {
        let data = new Array();
        
        for (let i = 0; i < result.length; i++) {
            let temp = {
                user_idx : "",
                title: "",
                summary: "",
                area: "",
                department: "",
                aim: "",
                explain: "",
                create_at: "",
                img_url: [],
                project_user_name: "",
                project_user_profile_url: ""
            }
            temp.user_idx = result[i].user_idx;
            temp.title = result[i].title;
            temp.summary = result[i].summary;
            temp.area = result[i].area;
            temp.department = result[i].department;
            temp.aim = result[i].aim;
            temp.explain = result[i].explain;
            temp.create_at = result[i].create_at;
            temp.img_url = result[i].img_url;
            temp.project_user_name = select_project[i].name;
            temp.project_user_profile_url = select_project[i].profile_url;
            data.push(temp);
        }
        return data;
    }   
}