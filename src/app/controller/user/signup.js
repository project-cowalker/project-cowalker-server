const express = require('express');
const router = express.Router();
const db = require('../../module/pool.js');
const signup = require('../../model/req/SignupReq');

router.post('/', async(req, res, next) => {
    const QUERY = 'insert into USER set ?';

    let newUser = signup.new(req.body);

    let inserted = await db.execute2(QUERY, newUser);
    ''
    if(inserted == undefined){
        res.status(405).send({
            message: 'please check email'
        });
    } else {
        res.status(201).send({
            message: "success"
        });
    }
});

module.exports = router;
