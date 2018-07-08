const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
const apply = require('../../model/schema/apply');
const recruit = require('../../model/schema/recruit');
const project = require('../../model/schema/project');

//applies, applyAnswer을 하나의 response data로 합침
var findApply = function(applies){
    var resultObj = new Array();

    for(let i = 0; i < applies.length; i++){
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

//참여 및 지원한 프로젝트 모아보기
router.get('/', async(req, res) => {
    const ID = jwt.verify(req.headers.authorization);

    if(ID != -1){
        apply.aggregate([{'$group' : {'_id' : {'project_idx' : "$project_idx", 'join' : '$join'}}}], function(err, applies){
            if(err) {
                console.log(err);
                return res.status(500).send({message: 'database failure'});
            }
            res.json(applies);
        });
    } else {
        res.status(401).send({  
            message: "access denied"
        });
    }
});


// 지원한 프로젝트 모아보기
router.get('/apply_project', async(req, res) => {
    const ID = jwt.verify(req.headers.authorization);

    if(ID != -1){
        apply.find({
            'applicant_idx' : ID,
            'join' : 0
        }, function(err, applies){
            if(err) {
              console.log(err);
              return res.status(500).send({message: 'database failure'});
            }

            var project_list = new Array();
            
            for(let i = 0 ; i < applies.length; i++){
                project_list.push(applies[i].project_idx);
            }

            project.find({
              '_id' : {  $in :  project_list  }
            }, function(err, projects){
                if(err) {
                    console.log(err);
                    return res.status(500).send({message: 'database failure'});
                }
                res.json(projects);

                return
            });
        });
    } else {
        res.status(401).send({
            message: "access denied"
        });
    }
});

//참여한 프로젝트 모아보기
router.get('/enter_project', async(req, res) => {
    const ID = jwt.verify(req.headers.authorization);

    if(ID != -1){
        apply.find({
            'applicant_idx' : ID,
            'join' : 1
        }, function(err, applies){
            if(err) {
              console.log(err);
              return res.status(500).send({message: 'database failure'});
            }

            var project_list = new Array();
            
            for(let i = 0 ; i < applies.length; i++){
                project_list.push(applies[i].project_idx);
            }

            project.find({
              '_id' : {  $in :  project_list  }
            }, function(err, projects){
                if(err) {
                    console.log(err);
                    return res.status(500).send({message: 'database failure'});
                }
                res.json(projects);

                return;
            });
        });
    } else {
        res.status(401).send({
            message: "access denied"
        });
    }
});


//지원 멤버 보기
router.get('/:recruit_idx', async(req, res) => {
    const ID = jwt.verify(req.headers.authorization);

    if(ID != -1){
        apply.find({
            'recruit_idx' : req.params.recruit_idx,
            'join' : 0
        }, function(err, applies){
            if(err) {
                console.log(err);
                return res.status(500).send({message: 'database failure'});
            }
            var array = new Array();

            for(let i = 0; i < applies.length; i++){
                let obj = {
                    applicant_idx : ''
                }
                obj.applicant_idx = applies[i].applicant_idx;
                array.push(obj);
            }
            res.json(array);
        });
    } else {
        res.status(401).send({
            message: "access denied"
        });
    }
});

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

            res.json(findApply(applies));
        });
    } else {
        res.status(401).send({
            message: "access denied"
        });
    }
});

//지원서 보기(개설자)
router.get('/:apply_idx/:applicant_idx', async (req, res, next) => {
    const ID = jwt.verify(req.headers.authorization);
    var project_manage = false;

    if(ID != -1){
        await apply.find({
            _id : req.params.apply_idx
        }, function(err, applies){
            recruit.find({
                _id : applies[0].recruit_idx
            }, function(err, recruits){
                if(ID == recruits[0].user_idx)
                    project_manage = true;

                if(project_manage){
                    apply.find({
                        _id : req.params.apply_idx,
                        applicant_idx : req.params.applicant_idx
                    }, async function(err, applies){  
                        if(err){
                            return res.status(405).send({
                                message: "database failure"
                            });
                        }
                        res.json(findApply(applies));
                    });
                } else {
                    res.status(400).send({
                        message: "fail (no rights)"
                    });
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