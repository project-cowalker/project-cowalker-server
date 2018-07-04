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
			area : req.body.area,
			department : req.body.department,
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