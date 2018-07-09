const express = require('express');
const router = express.Router();
const db = require('../../module/pool.js');
const jwt = require('../../module/jwt.js');
let project = require('../../model/schema/project');
let apply = require('../../model/schema/apply');

//프로젝트 id값으로 검색하기
router.get('/:project_id', function (req, res) {

    let project_idx = req.params.project_id;
    const ID = jwt.verify(req.headers.authorization);
    const QUERY = 'select * from USER where user_idx = ?';
    var data = new Array();
    var user_status = "null";

    project.find({
            _id: project_idx
        },

        async function (err, result) {
            if (err) {
                return res.status(500).send({
                    message: "get project fail"
                });
            } else {

                let project_user_id = result[0].user_idx;
                let select_project = await db.execute2(QUERY, project_user_id);

                for (let i = 0; i < result.length; i++) {
                    var temp = {
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

                // 개설자 
                if (ID != -1) {

                    if (ID == project_user_id) {
                        user_status = "개설자";
                    } else {

                        apply.find({
                                project_idx: project_idx,
                                applicant_idx: ID
                            },

                            function (err, obj) {

                                if (err) {
                                    res.status(405).send({
                                        message: "database failure"
                                    });
                                } else {
                                    console.log(obj[0]);
                                    // case 2-1: 개설자가 아니고, 팀에 아직 지원도 아직 안한 상태 ->"지원자"
                                    if (!obj[0]) {
                                        user_status = "참여하기";
                                        console.log(user_status);
                                    } else {
                                        // case 2-1: 개설자가 아닌데, 팀에 지원은 했고, 아직 수락/거절을 못받은 경우 -> "참여 대기"
                                        if (obj[0].join == 0) {
                                            user_status = "참여대기";
                                            // case 2-2: 개설자가 아닌데, 팀에 지원은 했고, 수락을 받음 -> "참여 완료 "
                                        } else if (obj[0].join == 1) {
                                            user_status = "참여완료";
                                        } else {
                                            // case 2-3: 개설자가 아닌데, 팀에 지원은 했고, 거절을 당한경우 -> "참여 하기"
                                            user_status = "참여하기"
                                        }
                                    }

                                    res.status(201).send({
                                        message: "success",
                                        result: data,
                                        user: user_status
                                    });

                                }

                            });

                    }

                } else {
                    user_status = "참여하기";

                    res.status(201).send({
                        message: "success",
                        result: data,
                        user: user_status
                    });
                }

            }
        });

});

module.exports = router;