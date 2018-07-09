const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
const db = require('../../module/pool.js');
const myIntro = require('../../model/schema/myIntro');

router.get('/:user_idx', async (req, res, next) => {
    let data = new Array();
   
    myIntro.find({user_idx : req.params.user_idx}, function (err, result) {
        if(err) {
            return res.status(405).send({
                message: 'get myIntro fail'
            });
        }else {
            let temp = {
                intro_contents : "",
                intro_img_url : ""
            }
            temp.intro_contents = result[0].intro_contents;
            temp.intro_img_url = result[0].intro_img_url;
            data.push(temp);
            
            res.status(200).send({
                message: "success",
                result: data,
            });
            return;
        }
    });
});

router.get('/', async (req, res, next) => {
    const ID = jwt.verify(req.headers.authorization);
    let data = new Array();
   
    myIntro.find({user_idx : ID}, function (err, result) {
        if(err) {
            return res.status(405).send({
                message: 'get myIntro fail'
            });
        }else {
            let temp = {
                intro_idx : "",
                intro_contents : "",
                intro_img_url : ""
            }
            temp.intro_idx = result[0]._id;
            temp.intro_contents = result[0].intro_contents;
            temp.intro_img_url = result[0].intro_img_url;
            data.push(temp);
            
            res.status(200).send({
                message: "success",
                result: data,
            });
            return;
        }
    });
});

module.exports = router;
