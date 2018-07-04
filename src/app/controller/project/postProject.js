const express = require('express');
const router = express.Router();
const db = require('../../module/pool.js');
const jwt = require('../../module/jwt.js');
const signup = require('../../model/req/SignupReq');
let project = require('../../model/schema/project');

 router.post('/', async(req,res) => {
 	const ID = jwt.verify(req.headers.authorization);
    console.log(ID);
    if(ID != -1){
        project.create({
			title : req.body.title,
			summary : req.body.summary,
			//301 ; 서울, 302 ; 경기도 ... 
			area : req.body.area,
			//201 ; 블록체인, 202 ; IOT ...
			department : req.body.department,
			//101 ; 창업, 102 ; 공모전 참여 ...
			aim : req.body.aim,
			explain : req.body.explain,
			// user_idx : req.body.user_idx
			user_idx : ID
		},
		function(err, docs){
	       if(err) return res.status(405).send("fail");
	       //res.status(200).send(docs);
	       res.status(200).send({
       		message: "success"
    		});
  		 })

        return;
    }
    res.status(401).send({
        message: "access denied"
    });

});

module.exports = router;