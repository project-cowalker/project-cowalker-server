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
        
        message.find({ $or : [{ to_idx : ID }, { from_idx : ID }] }, 
            async function(err, obj){
            if(err){
                return res.status(405).send({
                    message: 'get message fail'
                });
            }else {
                
                //나와 관련된 모든 쪽지 조회, 최신순
                for(i = 0; i < obj.length; i++) {

                    let check = true;
                    
                    //결과에 파트너가 있는지 조사
                    for(j = 0; j < data.length; j++) {
                        //내가 보낸 쪽지라면
                        if(obj[i].to_idx == ID) {
                            //받는사람 있는지 검사, 있으면 탈출
                            if(obj[i].from_idx == data[j].partner_idx) {
                                check = false;
                                break;
                            }
                        }

                        //나에게 온 쪽지라면
                        else {
                            //보낸사람 있는지 검사, 있으면 탈출
                            if(obj[i].to_idx == data[j].partner_idx) {
                                check = false;
                                break;
                            }
                        }
                    }

                    //결과에 파트너가 없을 경우
                    if(check) {
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

                        temp.partner_idx = partner;
                        temp.partner_name = partner_info[0].name;
                        temp.partner_profile_url = partner_info[0].profile_url
                        temp.contents = obj[i].contents;
                        temp.create_at = obj[i].create_at;

                        data.push(temp);
                    }

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
