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
        }, async function(err, applies){
            if(err) {
                res.status(405).send({
                    message: "fail"
                });
                return;
            }
            //1. 추천해서 지원할 경우
            if(req.query.recommend_idx){
                //(1) 추천 링크를 통해 지원서가 작성되었는지 검사
                let SELECTRECOMMEND = 'SELECT * FROM RECOMMEND WHERE recommend_idx = ?';
                let selectRecommend = await pool.execute2(SELECTRECOMMEND, req.query.recommend_idx);

                if(selectRecommend.length === 0){
                    res.status(405).send({
                        message: "database failure"
                    });
                    return;
                }

                //(2) 이미 지원서가 작성이 된 적이 있으면 return
                if(selectRecommend[0].recommendee_idx !== null){
                    res.status(400).send({
                        message: "already exist"
                    });
                    return;
                }

                if(selectRecommend[0].recommender_idx === ID){
                    res.status(400).send({
                        message: "recommender and recommendee are same"
                    });
                    return;
                }

                let UPDATERECOMMEND = 'UPDATE RECOMMEND SET recommendee_idx = ?, status = true '
                                    + 'WHERE recommend_idx = ? and project_idx = ? and recruit_idx = ?';
                const UPDATEUSER = 'UPDATE USER SET point = point + 20 WHERE user_idx in (?, ?)';
                
                let data = {
                    project_idx : '',
                    recruit_idx : ''
                };

                data.project_idx = req.query.project_idx;
                data.recruit_idx = req.query.recruit_idx;

                //(3) - 2. 모집 공고를 추천한 경우 

                //(4) 추천을 통한 지원서가 처음 작성되면 지원자 정보 insert
                //    status : (true = 지원 완료) || (false = 지원 대기)
                console.log(req.query.recruit_idx);

                let updateRecommend = await pool.execute2(UPDATERECOMMEND, 
                        [ID, req.query.recommend_idx, req.query.project_idx, req.query.recruit_idx]);
                
                if(!updateRecommend && updateRecommend != undefined){
                    res.status(405).send({
                        message: "database failure"
                    });
                    return;
                }

                //(5) 추천자 idx select
                selectRecommend = await pool.execute2(SELECTRECOMMEND, req.query.recommend_idx);
                
                if(!selectRecommend && selectRecommend != undefined){
                    res.status(405).send({
                        message: "database failure"
                    });
                    return;
                }

                //(6) 추천자와 지원자에 대한 point 증가
                let updatePoint = await pool.execute2(UPDATEUSER, [ID, selectRecommend[0].recommender_idx]);

                if(!updatePoint && updatePoint != undefined){
                    res.status(405).send({
                        message: "database failure"
                    });
                    return;
                }

                alarm.recommendation(req.query.recommend_idx, data, ID);
            }

            //2. 공유해서 지원할 경우
            if(req.query.sharer_idx){
                let UPDATESHARE = 'UPDATE SHARE SET shared_idx = ?, status = true WHERE sharer_idx = ? and project_idx = ? and recruit_idx = ?';
                const UPDATEUSER = 'UPDATE USER SET point = point + 20 WHERE user_idx in (?, ?)';
                
                let data = {
                    project_idx : '',
                    recruit_idx : ''
                };

                data.project_idx = req.query.project_idx;
                data.recruit_idx = req.query.recruit_idx;

                //(1) - 1. 모집 공고를 공유한 경우

                //(2) 공유를 통한 지원서가 작성되면 지원자 정보 insert
                //    status : (true = 지원 완료) || (false = 지원 대기)

                let updateShare = await pool.execute2(UPDATESHARE, 
                        [ID, req.query.recommend_idx, req.query.project_idx, req.query.recruit_idx]);

                
                if(!updateShare && updateShare != undefined){
                    res.status(405).send({
                        message: "database failure"
                    });
                    return;
                }

                //(3) 공유자와 지원자에 대한 point 증가
                let updatePoint = await pool.execute2(UPDATEUSER, [ID, req.query.sharer_idx]);

                if(!updatePoint && updatePoint != undefined){
                    res.status(405).send({
                        message: "database failure"
                    });
                    return;
                }
            }

            if(req.query.recommend_idx === undefined 
                && (req.query[0] === undefined || req.query.sharer_idx)){
                alarm.apply(applies.project_idx, ID);
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