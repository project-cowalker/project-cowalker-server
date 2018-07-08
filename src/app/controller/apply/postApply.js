const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
const apply = require('../../model/schema/apply');
const pool = require('../../module/pool.js');

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
        await apply.create({
            introduce : req.body.introduce, 
            portfolio_url : req.body.portfolio_url,
            phone : req.body.phone,
            recruit_idx : req.body.recruit_idx, 
            project_idx : req.body.project_idx,
            position : req.body.position,
            applicant_idx : ID,
            answers : req.body.answers,
            join : 0
        },
        async function(err, docs){
            if(err) {
                res.status(405).send({
                    message: "fail"
                });
                return;
            }

            if(req.query.recommender_idx){
                let UPDATERECOMMEND = 'UPDATE RECOMMEND SET recommendee_idx = ? and join = 0 WHERE recommender_idx = ?';
                const UPDATEUSER = 'UPDATE USER SET point = point + 20 WHERE user_idx in (?, ?)';
                let data;
                
                if(req.query.project_idx){
                    UPDATERECOMMEND += ' and project_idx = ?';
                    data = req.query.project_idx;
                }

                if(req.query.recruit_idx){ 
                    UPDATERECOMMEND += ' and recruit_idx = ?';
                    data = req.query.recruit_idx;
                }

                let updateRecommend = await pool.execute2(UPDATERECOMMEND, [ID, req.query.recommender_idx, data]);
                
                if(!updateRecommend && updateRecommend != undefined){
                    res.status(405).send({
                        message: "database failure"
                    });
                    return;
                }

                let updatePoint = await pool.execute2(UPDATEUSER, [ID, req.query.recommender_idx]);

                if(!updatePoint && updatePoint != undefined){
                    res.status(405).send({
                        message: "database failure"
                    });
                    return;
                }
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