const alarmTime = require('../../module/time');

module.exports = {
    res : function(obj) {
        let data = new Array();

        let temp = {
            project_name : "",
            contents : "",
            create_at : "",
            time : ""
        }

        for(i = 0; i < obj.length; i++) {
            temp.project_name = obj[i].project_name;
            temp.contents = obj[i].contents;
            temp.create_at = obj[i].create_at;
            temp.time = alarmTime.elapsedTime(obj[i].create_at);
            data.push(temp);
        }
        return data;
    }   
}