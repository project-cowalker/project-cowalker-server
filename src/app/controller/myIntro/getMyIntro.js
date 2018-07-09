const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
const db = require('../../module/pool.js');
const myIntro = require('../../model/schema/myIntro');

router.get('/:user_idx', async (req, res, next) => {
    let data = new Array();

    myIntro.find({user_idx : user_idx}, function (err, result) {
        if(err) {
            return res.status(405).send({
                message: 'get message fail'
            });
        }else {
            for(i = 0; i < result.length; i++) {
                let temp = {
                    intro_idx : "",
                    intro_contents : "",
                    intro_img_url : ""
                }
                temp.intro_idx = result[i]._id;
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
});

module.exports = router;
