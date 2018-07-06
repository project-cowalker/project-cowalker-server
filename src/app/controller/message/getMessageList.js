const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
const db = require('../../module/pool.js');
const message = require('../../model/schema/message');

//to : 받는 사람
//from : 보내는 사람

router.get('/', async (req, res, next) => {
    const ID = jwt.verify(req.headers.authorization);
    const QUERY = 'select * from USER where user_idx = ?';

    let data = new Array();

    if (ID != -1) {
        // // 2. find( ) 함수에 query 입력
        // message.find({$or : [{ to_idx : ID },{ from_idx : ID}]})
        //         .distinct('to_idx', function(err, obj) {
        //             if(err) {
        //                 console.log(err);
        //             }else {
        //                 console.log(obj);
        //             }
        //         })
        //         .sort({create_at : -1});

        // ///////////


        
        message.find({ $or : [{ to_idx : ID }, { from_idx : ID }] }, 
            async function(err, obj){
            if(err){
                return res.status(405).send({
                    message: 'get message fail'
                });
            }else {
                console.log(obj);
                for(i = 0; i < obj.length; i++) {
                    
                    for(j = 0; j < data.length; j++) {
                        if(obj[i].to_idx == ID) {
                            if(obj[i].from_idx == data[i].partner) continue;

                            var partner = obj[i].from_idx;
                        }else {
                            if(obj[i].to_idx == data[i].partner) continue;
                            
                            var partner = obj[i].to_idx;
                        }
                    }

                    if(obj[i].to_idx == ID) {
                        var partner = obj[i].from_idx;
                    }else {
                        var partner = obj[i].to_idx;
                    }
                    let partner_info = await db.execute2(QUERY, partner);
                    let temp = {
                        partner_idx : "",
                        partner_name : "",
                        partner_profile_url : "",
                        contents : "",
                        create_at : ""
                    }
                    partner_name = partner_info[0].name;
                    partner_profile_url = partner_info[0].profile_url
                    temp.contents = obj[i].contents;
                    temp.create_at = obj[i].create_at;
                    data.push(temp);
                }
                res.status(200).send({
                    message: 'get message success',
                    result: data
                });
            }
        }).sort({create_at : -1});
        return; 
    }

    res.status(401).send({
        message: "access denied"
    });

});

module.exports = router;
