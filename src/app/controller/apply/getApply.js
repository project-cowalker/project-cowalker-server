const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
const apply = require('../../model/schema/apply');
const recruit = require('../../model/schema/recruit');
const project = require('../../model/schema/project');
const pool = require('../../module/pool.js');

//applies, applyAnswer을 하나의 response data로 합침
var findApply = function (applies) {
    var resultObj = new Array();

    for (let i = 0; i < applies.length; i++) {
        var object = {
            apply_idx: '',
            introduce: '',
            portfolio_url: '',
            phone: '',
            recruit_idx: '',
            project_idx: '',
            position: '',
            applicant_idx: '',
            recruit_at: '',
            answers: []
        };

        object.apply_idx = applies[i]._id;
        object.introduce = applies[i].introduce;
        object.portfolio_url = applies[i].portfolio_url;
        object.phone = applies[i].phone;
        object.recruit_idx = applies[i].recruit_idx;
        object.project_idx = applies[i].project_idx;
        object.position = applies[i].position;
        object.applicant_idx = applies[i].applicant_idx;
        object.recruit_at = applies[i].recruit_at;
        object.answers = applies[i].answers;
        resultObj.push(object);
    }
    return resultObj;
}

/*//참여 및 지원한 프로젝트 모아보기
router.get('/', async(req, res) => {
    const ID = jwt.verify(req.headers.authorization);

    if(ID != -1){
        apply.aggregate([{'$group' : {'_id' : {'project_idx' : "$project_idx", 'join' : '$join'}}}], function(err, applies){
            if(err) {
                console.log(err);
                return res.status(500).send({message: 'database failure'});
            }
            console.log(applies[0]._id);
            console.log(applies[1]._id.project_idx);
            console.log(applies.length);

            var data = new Array();

            for(let i=0;i<applies.length;i++){
                console.log(applies[i]._id.project_idx);

                data.push(applies[i]._id.project_idx);

            }

            console.log(data);

            res.json(applies);

        });
    } else {
        res.status(401).send({  
            message: "access denied"
        });
    }
});
*/

// 지원한 프로젝트 모아보기
router.get('/apply_project', async (req, res) => {
    const ID = jwt.verify(req.headers.authorization);

    if (ID != -1) {
        apply.find({
            'applicant_idx': ID,
            'join': 0
        }, function (err, applies) {
            if (err) {
                console.log(err);
                return res.status(500).send({
                    message: 'database failure'
                });
            }

            var project_list = new Array();

            for (let i = 0; i < applies.length; i++) {
                project_list.push(applies[i].project_idx);
            }

            project.find({
                '_id': {
                    $in: project_list
                }
            }, function (err, projects) {
                if (err) {
                    console.log(err);
                    return res.status(500).send({
                        message: 'database failure'
                    });
                }
                var resultObj = {
                    message: "success",
                    result: ''
                }
                resultObj.result = projects;
                res.json(resultObj);

                return;
            });
        });
    } else {
        res.status(401).send({
            message: "access denied"
        });
    }
});

//참여한 프로젝트 모아보기
router.get('/enter_project', async (req, res) => {
    const ID = jwt.verify(req.headers.authorization);

    if (ID != -1) {
        apply.find({
            'applicant_idx': ID,
            'join': 1
        }, function (err, applies) {
            if (err) {
                console.log(err);
                return res.status(500).send({
                    message: 'database failure'
                });
            }

            var project_list = new Array();

            for (let i = 0; i < applies.length; i++) {
                project_list.push(applies[i].project_idx);
            }

            project.find({
                '_id': {
                    $in: project_list
                }
            }, function (err, projects) {
                if (err) {
                    console.log(err);
                    return res.status(500).send({
                        message: 'database failure'
                    });
                }
                var resultObj = {
                    message: "success",
                    result: ''
                }
                resultObj.result = projects;
                res.json(resultObj);

                return;
            });
        });
    } else {
        res.status(401).send({
            message: "access denied"
        });
    }
});

//참여한 프로젝트 모아보기
router.get('/enter_project/:user_idx', async (req, res) => {
    const ID = jwt.verify(req.headers.authorization);

    apply.find({
        'applicant_idx': req.params.user_idx,
        'join': 1
    }, function (err, applies) {
        if (err) {
            console.log(err);
            return res.status(500).send({
                message: 'database failure'
            });
        }

        var project_list = new Array();

        for (let i = 0; i < applies.length; i++) {
            project_list.push(applies[i].project_idx);
        }

        project.find({
            '_id': {
                $in: project_list
            }
        }, function (err, projects) {
            if (err) {
                console.log(err);
                return res.status(500).send({
                    message: 'database failure'
                });
            }
            var resultObj = {
                message: "success",
                result: ''
            }
            resultObj.result = projects;
            res.json(resultObj);

            return;
        });
    });
});

//지원 멤버 보기
router.get('/:recruit_idx', async (req, res) => {
    const ID = jwt.verify(req.headers.authorization);
    var project_manage = false;
    if (ID != -1) {
        // 1. apply 스키마에서 recruit_idx값이 일치하는 컬럼 중 지원 대기중인 상태의 컬럼 find 
        apply.find({
            recruit_idx : req.params.recruit_idx,
            join : 0 //참여 대기 상태
        }, function (err, applies) {
            if (err) {
                console.log(err);
                return res.status(500).send({
                    message: 'database failure'
                });
            }
            console.log(applies);
            if(applies.length === 0)
                return res.status(200).send({
                    message: "no list"
                });
           
            const QUERY = 'SELECT * FROM USER WHERE user_idx = ?';
            //2. (1)에서 조회한 결과를 바탕으로 recruit 스키마에서 해당 공고의 개설자가 누구인지 find
            recruit.find({
                _id: applies[0].recruit_idx
            }, async function (err, recruits) {
                if (err) {
                    console.log(err);
                    return res.status(500).send({
                        message: 'database failure'
                    });
                }

                if (ID == recruits[0].user_idx)
                    project_manage = true;

                //3. 개설자이면 조회 가능
                if (project_manage) {
                    var array = new Array();

                    for(let i = 0; i < applies.length; i++){
                        let obj = {
                            applicant_idx : '',
                            profile_url : '',
                            user_name : '',
                            position : '',
                            apply_idx : ''
                        }
                        const QUERY = 'SELECT * FROM USER WHERE user_idx = ?';
                        let userQuery = await pool.execute2(QUERY, applies[i].applicant_idx);
                        
                        obj.applicant_idx = applies[i].applicant_idx;
                        obj.profile_url = userQuery[0].profile_url;
                        obj.user_name = userQuery[0].name;
                        obj.position = applies[0].position;
                        obj.apply_idx = applies[i]._id;

                        array.push(obj);
                    }
                
                    var resultObj = {
                        message : "success",
                        result : ''
                    }
                    
                    resultObj.result = array;
                    res.json(resultObj);

                    return;

                } else {
                    //4. 개설자가 아니면 권한 없음
                    res.status(400).send({
                        message: "fail (no rights)"
                    });
                }
            });
            return;
        });
    } else {
        //토큰이 유효하지 않을 경우
        res.status(401).send({
            message: "access denied"
        });
    }
});

/*
//지원서 보기(참여자)
router.get('/:apply_idx', async(req, res) => {
    const ID = jwt.verify(req.headers.authorization);

    if(ID != -1){
        apply.find({
            _id : req.params.apply_idx, 
            applicant_idx : ID
        }, function(err, applies){
            if(err) 
                return res.stauts(500).send({message: 'database failure'});
            var resultObj = {
                message : "success",
                result : ''
            }
            resultObj.result = findApply(applies);
            res.json(resultObj);

            return;
        });
    } else {
        res.status(401).send({
            message: "access denied"
        });
    }
});
*/

//지원서 보기(개설자)
router.get('/:apply_idx/:applicant_idx', async (req, res, next) => {
    const ID = jwt.verify(req.headers.authorization);
    var project_manage = false;

    if (ID != -1) {
        // 1. apply 스키마에서 recruit_idx값이 일치하는 컬럼 중 지원 대기중인 상태의 컬럼 find 
        await apply.find({
            _id: req.params.apply_idx
        }, function (err, applies) {
            if (err) {
                return res.status(405).send({
                    message: "database failure"
                });
            }
            //2. (1)에서 조회한 결과를 바탕으로 recruit 스키마에서 해당 공고의 개설자가 누구인지 find
            recruit.find({
                _id: applies[0].recruit_idx
            }, function (err, recruits) {
                if (err) {
                    return res.status(405).send({
                        message: "database failure"
                    });
                }

                if (ID == recruits[0].user_idx)
                    project_manage = true;

                //3. 개설자이면 조회 가능
                if (project_manage) {
                    apply.find({
                        _id: req.params.apply_idx,
                        applicant_idx: req.params.applicant_idx
                    }, async function (err, applies) {
                        if (err) {
                            return res.status(405).send({
                                message: "database failure"
                            });
                        }
                        var resultObj = {
                            message: "success",
                            result: ''
                        }
                        resultObj.result = findApply(applies);
                        res.json(resultObj);

                        return;
                    });
                } else {
                    //4. 개설자가 아니면 권한 없음
                    res.status(400).send({
                        message: "fail (no rights)"
                    });

                    return;
                }
            });
        });
    } else {
        res.status(401).send({
            message: "access denied"
        });
    }
});

module.exports = router;