const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
const db = require('../../module/pool.js');
const message = require('../../model/schema/message');

router.get('/', async (req, res, next) => {
    const ID = jwt.verify(req.headers.authorization);
    const QUERY = 'select * from USER where user_idx = ?';

    let result = new Array();

    if (ID != -1) {
        message.find({
            from_idx : ID
        }, async function(err, obj){
            if(err){
                console.log(err);
                return res.status(405).send("실패");
            }else {
                for(i = 0; i < obj.length; i++) {
                    console.log(obj[i]);
                    result.push(obj[i]);
                    result.push(await db.execute2(QUERY, ID));
                    result.push(await db.execute2(QUERY, obj[i].from_idx));
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
