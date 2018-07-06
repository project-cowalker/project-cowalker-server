const express = require('express');
const router = express.Router();
const db = require('../../module/pool.js');
const jwt = require('../../module/jwt.js');
const hash = require('../../module/hash.js');
let recruit_question = require('../../model/schema/recruit_question');

//질문 가지고 오기 : get
router.get('/:recruit_idx', function(req, res){
		
	let recruit_idx=req.params.recruit_idx;

	recruit_question.find({
        recruit_idx : recruit_idx
    }, function(err,result){
      if(err){
        res.status(405).send({
        message : "database failure"
      });
    }else{
    	if(result[0]){
    		console.log("result값 없다");
    		res.status(400).send({
    			message: "Bad Request"
    		});
    	}else{
    		res.status(200).send({
    		message:"success",
    		result : result[0].question
    	});

    	}
    	
	}

});
});


module.exports = router;