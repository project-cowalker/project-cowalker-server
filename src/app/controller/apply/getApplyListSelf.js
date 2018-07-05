const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
const upload = require('../../../config/multer.js');
const apply = require('../../model/schema/apply');
const recruit_question_answer = require('../../model/schema/recruit_question_answer');

router.get('/', async(req, res) => {
    const ID = jwt.verify(req.headers.authorization);
    if(ID != -1){
        apply.find({applicant_idx : ID}, function(err, applies){
            if(err) 
                return res.stauts(500).send({
                    message: 'database failure'
                });
            else
                recruit_question_answer.find({applicant_idx : ID}, function(err, answers){
                    res.json(answers);
                });
        });
    }
});

module.exports = router;