const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
const pool = require('../../module/pool.js');

router.get('/', async (req, res, next) => {
    const ID = jwt.verify(req.headers.authorization);

    if(ID != -1){
        const SELECTRECOMMEND = 'SELECT recommend_idx, recommender_idx, reason, project_idx, recruit_idx '
                          + 'FROM RECOMMEND WHERE recommend_idx = ?';
        let selectRecommend = await pool.execute2(SELECTRECOMMEND, req.query.recommend_idx);

        if(!selectRecommend) {
            res.status(405).send({
                message: "fail"
            });
            return;
        }
        res.json(selectRecommend);
    } else {
        res.status(401).send({
            message: "access denied"
        });
    }
});

module.exports = router;