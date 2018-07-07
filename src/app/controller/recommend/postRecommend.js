const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
const recommend = require('../../model/schema/recommend');

/**  주소 = ip:3000/api/apply
  *  기능 = 지원하기
  *  요청 =
        1. introduce : 자기소개
        2. portfolio_url : 포트폴리오 링크  
        3. recruit_idx : 모집 idx
        4. answers : 배열. 
                     [
                         { "answer" : "1234", "question_idx" : "1" },
                         { "answer" : "2222", "question_idx" : "2" }
                     ]

  */

router.post('/', async (req, res, next) => {
    const ID = jwt.verify(req.headers.authorization);

    if(ID != -1){
        const QUERY = 'INSERT INTO RECOMMEND(recommendee_idx, recommender_idx, recommend_at, recruit_idx, project_idx, join ) VALUES(?, ?, ?, ?, ?, ?)'
        await recommend.create({
            recommendee_idx : req.body.recommendee_idx, 
            recommender_idx : req.body.recommender_idx,
            recommend_at : req.body.recommend_at,
            recruit_idx : req.body.recruit_idx, 
            project_idx : req.body.project_idx,
            join : 0
        },
        function(err, docs){
            if(err) {
                res.status(405).send({
                    message: "fail"
                });
                return;
            }
            res.status(201).send({
                message: "success"
            });
        });
    } else {
        res.status(401).send({
            message: "access denied"
        });
    }
});

module.exports = router;