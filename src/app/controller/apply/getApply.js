const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
const apply = require('../../model/schema/apply');

//applies, applyAnswer을 하나의 response data로 합침
var findApply = function(applies){
    var resultObj = new Array();
    console.log(applies.length);
    for(let i = 0; i < applies.length; i++){
        var object = {
            apply_idx: '',
            introduce: '',
            portfolio_url: '',
            phone : '',
            recruit_idx: '',
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
module.exports = router;