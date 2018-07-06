const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
const db = require('../../module/pool.js');
const message = require('../../model/schema/message');

router.get('/:user_idx', async (req, res, next) => {
    const ID = jwt.verify(req.headers.authorization);
    const QUERY = 'select * from USER where user_idx = ?';
    const partner = req.params.user_idx;
    
    let data = new Array();
    
    console.log("받는 사람" + ID);
    console.log("보내는 사람" + partner);

    if (ID != -1) {
        message.find({
            to_idx : ID,
        }, async function(err, obj){
            if(err){
                return res.status(405).send({
                    message: 'get message fail'
                });
            }else {
                for(i = 0; i < obj.length; i++) {
                    let to_user = await db.execute2(QUERY, ID);
                    let from_user = await db.execute2(QUERY, partner);
                    let temp = {
                        to_user_idx : "",
                        to_user_name : "",
                        to_user_photo_url : "",
                        from_user_idx : "",
                        from_user_name : "",
                        from_user_photo_url : "",
                        contents : "",
                        contents : "",
                        read : "",
                        create_at : ""
                    }
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
                console.log(data);
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
