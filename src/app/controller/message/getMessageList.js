const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
const db = require('../../module/pool.js');
const message = require('../../model/schema/message');

router.get('/', async (req, res, next) => {
    const ID = jwt.verify(req.headers.authorization);
    const QUERY = 'select * from USER where user_idx = ?';

    let data = new Array();
    let temp = {
        to_user_idx : "",
        to_user_name : "",
        to_user_photo_url : "",
        from_user_idx : "",
        from_user_name : "",
        from_user_photo_url : "",
        contents : "",
        read : "",
        create_at : ""
    }

    if (ID != -1) {
        message.find({
            from_idx : ID
        }, async function(err, obj){
            if(err){
                return res.status(500).send({
                    message: 'get message fail'
                });
            }else {
                for(i = 0; i < obj.length; i++) {
                    let to_user = await db.execute2(QUERY, ID);
                    let from_user = await db.execute2(QUERY, obj[i].from_idx);
                    
                    temp.to_user_idx = to_user[0].user_idx;
                    temp.to_user_name = to_user[0].name;
                    temp.to_user_phtot_url = to_user[0].photo_url;
                    temp.from_user_idx = from_user[0].user_idx;
                    temp.from_user_name = from_user[0].name;
                    temp.from_user_photo_url = from_user[0].photo_url;
                    temp.contents = obj[i].contents;
                    temp.read = obj[i].read;
                    temp.create_at = obj[i].create_at;
                    data.push(temp);
                }

                res.status(200).send({
                    message: 'get message success',
                    result: data
                });
            }
        });
        return; 
    }

    res.status(401).send({
        message: "access denied"
    });

});

module.exports = router;
