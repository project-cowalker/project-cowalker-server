const express = require('express');
const router = express.Router();
const db = require('../../module/pool.js');
const jwt = require('../../module/jwt.js');
const hash = require('../../module/hash.js');
let project = require('../../model/schema/project');
let apply = require('../../model/schema/apply');

//프로젝트 id값으로 검색하기
router.get('/:project_id', function (req, res) {

    let project_idx = req.params.project_idx;
    const ID = jwt.verify(req.headers.authorization);

    const QUERY = 'select * from USER where user_idx = ?';
    var data = new Array();
    var user_status = "null";

    if (ID != -1) {
        project.find({
            _id: project_idx
        }, async function (err, result) {
            if (err) {
                return res.status(500).send({
                    message: "get project fail"
                });
            } else {
                //let project_user_id = result[0].user_idx;
                //console.log(result);
                for (let i = 0; i < result.length; i++) {
                    let project_user_id = result[0].user_idx;
                    let select_project = await db.execute2(QUERY, ID);
                    var temp = {
                        title: "",
                        summary: "",
                        area: "",
                        department: "",
                        aim: "",
                        explain: "",
                        create_at: "",
                        img_url: []
                    }
                    temp.title = result[i].title;
                    temp.summary = result[i].summary;
                    temp.area = result[i].area;
                    temp.department = result[i].department;
                    temp.aim = result[i].aim;
                    temp.explain = result[i].explain;
                    temp.create_at = result[i].create_at;
                    temp.img_url = result[i].img_url;
                    data.push(temp);
                    // 개설자 
                    if (ID == project_user_id) {
                        user_status = "개설자";
                    } else {
                        apply.find({
                            project_idx: project_idx
                        }, async function (err, result) {
                            if (err) {
                                res.status(405).send({
                                    message: "database failure"
                                });
                            } else {
                                // case 2-1: 개발자가 아니고, 팀에 아직 지원도 아직 안한 상태 ->"지원자"
                                if (!result[0]) {
                                    user_status = "참여하기";
                                } else {
                                    // case 2-1: 개발자가 아닌데, 팀에 지원은 했고, 아직 수락을 못받은 경우 -> "참여 대기"
                                    if (result[0].join == 1) {
                                        user_status = "참여완료";
                                        // case 2-2: 개발자가 아닌데, 팀에 지원은 했고, 거절을 당한경우 -> "참여 하기 "
                                    } else if (result[0].join == 2) {
                                        user_status = "참여하기";
                                    } else {
                                        // case 2-3: 개발자가 아닌데, 팀에 지원은 했고, 거절을 당한경우 -> "참여 대기 "
                                        user_status = "참여대기"
                                    }
                                }
                            }
                        });
                    }
                    res.status(201).send({
                        message: "success",
                        result: data,
                        user: user_status
                    });
                    return;
                }
            }
        });
    } else {
        res.status(401).send({
            message: "access denied"
        });
    }
});

module.exports = router;
