const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
const apply = require('../../model/schema/apply');
const recruit = require('../../model/schema/recruit');

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
        object.applicant_idx = applies[i].applicant_idx;
        object.recruit_at = applies[i].recruit_at;
        object.answers = applies[i].answers;
        resultObj.push(object);
    }
    return resultObj;
}

router.get('/', async(req, res) => {
    const ID = jwt.verify(req.headers.authorization);

    if(ID != -1){
        apply.find({applicant_idx : ID}, function(err, applies){
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