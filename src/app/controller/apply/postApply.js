const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
const apply = require('../../model/schema/apply');
const alarm = require('../../module/alarm.js');
const pool = require('../../module/pool.js');

/**  주소 = ip:3000/api/apply
  *  기능 = 지원하기
  *  요청 =
        1. introduce : 자기소개
        2. portfolio_url : 포트폴리오 링크  
        3. recruit_idx : 모집 idx
        4. answers : 배열

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
            //1. 추천해서 지원할 경우
            if(req.query.recommend_idx){
                let SELECTRECOMMEND = 'SELECT * FROM RECOMMEND WHERE recommend_idx = ?';
                let selectRecommend = await pool.execute2(SELECTRECOMMEND, req.query.recommend_idx);

                if(selectRecommend[0].recommendee_idx === null){
                    res.status(400).send({
                        message: "already exist"
                    });
                    return;
                }

                let UPDATERECOMMEND = 'UPDATE RECOMMEND SET recommendee_idx = ?, status = true WHERE recommend_idx = ?';
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

                let updateRecommend = await pool.execute2(UPDATERECOMMEND, [ID, req.query.recommend_idx, data]);
                
                if(!updateRecommend && updateRecommend != undefined){
                    res.status(405).send({
                        message: "database failure"
                    });
                    return;
                }

                selectRecommend = await pool.execute2(SELECTRECOMMEND, req.query.recommend_idx);
                
                if(!selectRecommend && selectRecommend != undefined){
                    res.status(405).send({
                        message: "database failure"
                    });
                    return;
                }
                
                let updatePoint = await pool.execute2(UPDATEUSER, [ID, selectRecommend[0].recommender_idx]);

                if(!updatePoint && updatePoint != undefined){
                    res.status(405).send({
                        message: "database failure"
                    });
                    return;
                }
            }

            //2. 공유해서 지원할 경우
            if(req.query.sharer_idx){
                let UPDATESHARE = 'UPDATE SHARE SET shared_idx = ?, status = true WHERE sharer_idx = ?';
                const UPDATEUSER = 'UPDATE USER SET point = point + 20 WHERE user_idx in (?, ?)';
                let data;
                
                if(req.query.project_idx){
                    UPDATESHARE += ' and project_idx = ?';
                    data = req.query.project_idx;
                }

                if(req.query.recruit_idx){ 
                    UPDATESHARE += ' and recruit_idx = ?';
                    data = req.query.recruit_idx;
                }

                let updateShare = await pool.execute2(UPDATESHARE, [ID, req.query.sharer_idx, data]);
                
                if(!updateShare && updateShare != undefined){
                    res.status(405).send({
                        message: "database failure"
                    });
                    return;
                }

                let updatePoint = await pool.execute2(UPDATEUSER, [ID, req.query.sharer_idx]);

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