const express = require('express');
const router = express.Router();
const db = require('../../module/pool.js');

// 이메일 중복 체크
router.get('/check/:email', async(req, res, next) => {
    const email = req.params.email;
    console.log(email);

    const checkEmail = 'select * from USER where email = ?';

    let checkResult = await db.execute2(checkEmail,[email]);

        if (checkResult) {                                             // 정상적으로 query문이 수행되지 않았을 경우
           if (checkResult.length === 1) {                           // 배열의 길이 === 1 => DB에 user_id가 존재
            res.status(405).send({
                message : "Already Exists"
            });
        }  else {
            res.status(200).send({                                      // 결과값이 없으면, 새로운 이메일! -> 성공
                message: "success"
            });
        }
        } 
    
});
    

// signup : 회원가입 
router.post('/', async(req, res, next) => {
    
    const QUERY = 'insert into USER set ?';

    let newUser = signup.new(req.body);

    let inserted = await db.execute2(QUERY, newUser);
    
    if(inserted == undefined) {
        res.status(405).send({
            message: 'please check email'
        });
    }else {
        res.status(201).send({
            message: "success"
        });
    }
});

module.exports = router;
