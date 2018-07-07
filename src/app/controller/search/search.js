const express = require('express');
const router = express.Router();
let project = require('../../model/schema/project');

//탐색
//쿼리 스트링이 없을 경우 탐색, 무조건 프로젝트 최신순

//검색
//aim=창업&area=서울&position=PM&department=블록체인&keyword=검색어
router.get('/', function (req, res) {

    const aim = req.query.aim;
    const area = req.query.area;
    const position = req.query.position;
    const department = req.query.department;
    const keyword = req.query.keyword;

    let query = {
        $or: []
    };

    if (aim != undefined) {
        query.$or.push({
            aim: aim
        });
    }
    if (area != undefined) {
        query.$or.push({
            area: area
        });
    }
    if (position != undefined) {
        query.$or.push({
            position: position
        });
    }
    if (department != undefined) {
        query.$or.push({
            department: department
        });
    }
    if (keyword != undefined) {
        query.$or.push({
            keyword: keyword
        });
    }

    

    //탐색
    if (aim == area && area == position && position == department && department == keyword && keyword == undefined) {
        project.find({}, async function (err, result) {
            if (err) {
                return res.status(405).send({
                    message: "get project list fail"
                });
            } else {
                let data = new Array();
                for (i = 0; i < result.length; i++) {
                    let temp = {
                        project_idx: "",
                        title: "",
                        summary: "",
                        area: "",
                        department: "",
                        aim: "",
                        explain: "",
                        user_idx: "",
                        create_at: "",
                        img_url: "",
                    }
                    temp.project_idx = result[i]._id;
                    temp.title = result[i].title;
                    temp.summary = result[i].summary;
                    temp.area = result[i].area;
                    temp.department = result[i].department;
                    temp.aim = result[i].aim;
                    temp.explain = result[i].explain;
                    temp.user_idx = result[i].user_idx;
                    temp.create_at = result[i].create_at;
                    temp.img_url = result[i].img_url[0];
                    data.push(temp);
                }
                res.status(200).send({
                    message: "success",
                    result: data
                });
                return;
            }
        }).sort({
            create_at: -1
        }).limit(10);
    }
    //검색
    else {
        project.find(query, async function (err, result) {
            if (err) {
                return res.status(405).send({
                    message: "get project fail"
                });
            } else {
                let data = new Array();
                for (i = 0; i < result.length; i++) {
                    let temp = {
                        project_idx: "",
                        title: "",
                        summary: "",
                        area: "",
                        department: "",
                        aim: "",
                        explain: "",
                        user_idx: "",
                        create_at: "",
                        img_url: "",
                    }
                    temp.project_idx = result[i]._id;
                    temp.title = result[i].title;
                    temp.summary = result[i].summary;
                    temp.area = result[i].area;
                    temp.department = result[i].department;
                    temp.aim = result[i].aim;
                    temp.explain = result[i].explain;
                    temp.user_idx = result[i].user_idx;
                    temp.create_at = result[i].create_at;
                    temp.img_url = result[i].img_url[0];
                    data.push(temp);
                }
                res.status(200).send({
                    message: "success",
                    result: data
                });
                return;
            }
        }).sort({
            create_at: -1
        }).limit(10);
    }

});

module.exports = router;