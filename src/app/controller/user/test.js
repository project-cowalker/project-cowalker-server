const express = require('express');
const router = express.Router();
const db = require('../../module/pool.js');
const jwt = require('../../module/jwt.js');
const hash = require('../../module/hash.js');
let Message = require('../../model/schema/message');

router.get('/', async(req, res, next) => {
    
    var message = new Message();
    message.to_idx = 1;
    message.from_idx = 1;
    message.create_at = new Date();
    message.read = false;
    message.content = "메시지입니다.";
    console.log(message);

    message.save(function(err) {
        if(err) {
            console.log(err);
            res.json({result: 0});
            return;
        }

        res.json({result: 1});
    })
});

module.exports = router;
