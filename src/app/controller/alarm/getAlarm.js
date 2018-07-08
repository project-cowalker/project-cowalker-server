const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');

const alarm = require('../../model/schema/alarm');

router.get('/', async (req, res, next) => {
    const ID = jwt.verify(req.headers.authorization);

    let data = new Array();

    if (ID != -1) {
        alarm.find({user_idx : ID}, async function(err, obj){
            if(err){
                return res.status(405).send({
                    message: 'get alarm fail'
                });
            }else {

                for(i = 0; i < obj.length; i++) {
                    let temp = {
                        project_name : "",
                        contents : "",
                        create_at : ""
                    }
                    temp.project_name = obj[i].project_name;
                    temp.contents = obj[i].contents;
                    temp.create_at = obj[i].create_at;
                    data.push(temp);
                }

                res.status(200).send({
                    message: 'get alarm success',
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
