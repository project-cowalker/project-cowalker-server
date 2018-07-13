const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
const db = require('../../module/pool.js');
const message = require('../../model/schema/message');
const time = require('../../module/time');

router.get('/:partner_idx', async (req, res, next) => {
    const ID = jwt.verify(req.headers.authorization);
    const QUERY = 'select * from USER where user_idx = ?';
    const partner = req.params.partner_idx;
    
    let data = new Array();
    let partner_info = await db.execute2(QUERY, partner);
    
    if (ID != -1) {
        message.find({
            $or : [
                {
                    to_idx : ID,
                    from_idx : partner
                },
                {
                    to_idx : partner,
                    from_idx : ID
                }
            ]
        }, async function(err, obj){
            if(err){
                return res.status(405).send({
                    message: 'get message fail'
                });
            }else {
                for(i = 0; i < obj.length; i++) {
                    let temp = {
                        to_user_name : "",
                        from_user_name : "",
                        contents : "",
                        create_at : "",
                        time : ""
                    }
                    if(obj[i].to_idx == ID) {
                        temp.to_user_name = "나";
                        temp.from_user_name = partner_info[0].name;
                    }else {
                        temp.to_user_name = partner_info[0].name;
                        temp.from_user_name = "나";
                    }
                    temp.contents = obj[i].contents;
                    temp.create_at = obj[i].create_at;
                    temp.time = time.elapsedTime(obj[i].create_at);
                    data.push(temp);
                }
                res.status(200).send({
                    message: 'get message success',
                    result: data
                });
            }
        }).sort({'create_at' : -1});
        return; 
    }

    res.status(401).send({
        message: "access denied"
    });

});

module.exports = router;
