const express = require('express');
const router = express.Router();
const db = require('../../module/pool.js');
const jwt = require('../../module/jwt.js');


// //프로젝트 선택 -> 모집 공고 수정
router.post('/', async (req, res, next) => {
    const ID = jwt.verify(req.headers.authorization);

    if (ID != -1) {  

      let project_idx = req.body.project_idx;
      let recruit_idx = req.body.recruit_idx;

      const INSERTSHARE = 'INSERT INTO SHARE (sharer_idx, project_idx, recruit_idx) VALUES (?, ?, ?)';
      let insertShare = await db.execute2(INSERTSHARE, [ID, project_idx, recruit_idx]);

      if(!insertShare && insertShare != undefined){
        return res.status(405).send({
            message: "database failure"
        });
      }
      res.status(201).send({
        message: "success",
        sharer_idx : ID
      });
    } else {                           
      res.status(401).send({
        message:"access denied"
      })
    }

});


module.exports = router;

