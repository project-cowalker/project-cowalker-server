const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
const db = require('../../module/pool.js');
const myIntro = require('../../model/schema/myIntro');

router.get('/', async (req, res, next) => {
    const ID = jwt.verify(req.headers.authorization);

    let data = new Array();

    if (ID != -1) {
        myIntro.find({user_idx : ID}, function (err, result) {
            if(err) {
                return res.status(405).send({
                    message: 'get message fail'
                });
            }else {
                for(i = 0; i < result.length; i++) {
                    let temp = {
                        intro_contents : "",
                        intro_img_url : ""
                    }
                    temp.intro_contents = result[i].intro_contents;
                    temp.intro_img_url = result[i].intro_img_url;
                    data.push(temp);
                }
                
                res.status(200).send({
                    message: "success",
                    result: data,
                });
                return;
            }
        });
    }

    res.status(401).send({
        message: "access denied"
    });

});

module.exports = router;
