const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
const pool = require('../../module/pool.js');

/**  주소 = ip:3000/api/apply
  *  기능 = 추천하기
  *  요청 =
        1. recommendee_idx : 추천 받는 사람 idx
        2. recommender_idx : 추천인 idx  
        3. reason : 추천 이유,
        4. project_idx : 프로젝트 고유 idx,
        5. recruit_idx : 모집 고유 idx
  */

router.post('/', async (req, res, next) => {
    const ID = jwt.verify(req.headers.authorization);

    if(ID != -1){
        const INSERTQUERY = 'INSERT INTO RECOMMEND(recommender_idx, reason, project_idx, recruit_idx) VALUES(?, ?, ?, ?)';
        const UPDATEQUERY = 'UPDATE USER SET point = point + 10 where user_idx = ?';
        let insertRecommend = await pool.execute2(QUERY, [ID, req.body.reason, req.body.project_idx, req.body.recruit_idx]);
        let pointUpdate = await pool.execute2(UPDATEQUERY, ID);
        
        if(!insertRecommend && insertRecommend != undefined 
            && !pointUpdate && pointUpdate != undefined){
            res.status(405).send({
                message: "database failure"
            });
            return;
        }
        res.status(201).send({
            message: "success"
        });
    } else {
        res.status(401).send({
            message: "access denied"
        });
    }
});

module.exports = router;