const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
const apply = require('../../model/schema/apply');
const recruit_question_answer = require('../../model/schema/recruit_question_answer');

//applies, applyAnswer을 하나의 response data로 합침
var findApply = function(applies, applyAnswer){
    var resultObj = new Array();

    for(let i = 0; i < applies.length; i++){
        var object = {
            apply_idx: '',
            introduce: '',
            portfolio_url: '',
            recruit_idx: '',
            applicant_idx: '',
            recruit_at: '',
            answers: []
        };

        object.apply_idx = applies[i]._id;
        object.introduce = applies[i].introduce;
        object.portfolio_url = applies[i].portfolio_url;
        object.recruit_idx = applies[i].recruit_idx;
        object.applicant_idx = applies[i].applicant_idx;
        object.recruit_at = applies[i].recruit_at;

        for(let j = 0; j < applyAnswer.length; j++){
            var answerObj = {
                answer: '',
                question_idx: ''
            };

            if(applyAnswer[j].apply_idx == applies[i]._id){
                answerObj.answer = applyAnswer[j].answer;
                answerObj.question_idx = applyAnswer[j].question_idx;
                object.answers.push(answerObj);
            }
        }
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

            recruit_question_answer.find({applicant_idx : ID}, function(err, applyAnswer){
                if(err) 
                    return res.stauts(500).send({message: 'database failure'});

                res.json(findApply(applies, applyAnswer));
            });
            
            return;
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

            recruit_question_answer.find({
                apply_idx : req.params.apply_idx, 
                applicant_idx : ID
            }, function(err, applyAnswer){
                if(err) 
                    return res.stauts(500).send({message: 'database failure'});

                res.json(findApply(applies, applyAnswer));
            });
            return;
        });
    } else {
        res.status(401).send({
            message: "access denied"
        });
    }
});


module.exports = router;