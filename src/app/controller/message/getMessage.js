const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
const db = require('../../module/pool.js');
const message = require('../../model/schema/message');

router.get('/', async (req, res, next) => {
    const ID = jwt.verify(req.headers.authorization);
    const QUERY = 'select * from USER where user_idx = ?';

    if (ID != -1) {
        message.find({
            to_idx : ID
        }, async function(err, obj){
            if(err){
                console.log(err);
                return res.status(405).send("실패");
            }else {
                let result = obj;
                for(i = 0; i < obj.length; i++) {
                    user = await db.execute2(QUERY, obj[i].to_idx);
                    result[i].to_user = user[0];
                    user = await db.execute2(QUERY, obj[i].from_idx);
                    result[i].from_user = user[0];
                }
                console.log(result);
                res.status(200).send(result);
            }
        });
        return; 
    }

    res.status(401).send({
        message: "access denied"
    });

});

module.exports = router;
