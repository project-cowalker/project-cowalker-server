const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
const upload = require('../../../config/multer.js');
const apply = require('../../model/schema/apply');
const recruit_question_answer = require('../../model/schema/recruit_question_answer');

/**  주소 = ip:3000/api/apply
  *  기능 = 지원하기
  *  요청 =
        1. introduce : 자기소개
        2. portfolio_url : 포트폴리오 링크 / 파일   
        3. recruit_idx : 모집 idx
        4. answers : 배열. 
                     [
                         { "answer" : "1234", "question_idx" : "1" },
                         { "answer" : "2222", "question_idx" : "2" }
                     ]

  */
router.post('/', upload.single('portfolio_url'), async (req, res, next) => {

    const ID = jwt.verify(req.headers.authorization);
    var reqAnswers = req.body.answers;

    if(ID != -1){
        await apply.create({
            introduce : req.body.introduce, 
            portfolio_url : req.file ? req.file.location : req.body.portfolio_url, 
            recruit_idx : req.body.recruit_idx, 
            applicant_idx : ID,
//            join : req.body.join,
        },
        function(err, docs){
            if(err) {
                res.status(405).send({
                    message: "fail"
                });
                return;
            } else {
                var apply_idx = docs._id;
                var answers = new Array();

                console.log(apply_idx);
                for(var i = 0 ; i < reqAnswers.length; i++){
                    reqAnswers[i].apply_idx = apply_idx;
                    reqAnswers[i].applicant_idx = ID;
                    answers.push(reqAnswers[i]);
                }
                console.log(answers);
                recruit_question_answer.create(answers, function(err, answers){
                    if(err) {
                        res.status(405).send({
                            message: "database failure"
                        });
                        return;
                    } else {
                        res.status(200).send({
                            message: "success"
                        });
                    }
                });
            }
        });
    } else {
        res.status(401).send({
            message: "access denied"
        });
    }
});

module.exports = router;