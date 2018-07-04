const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
let project = require('../../model/schema/project');


router.delete('/:project_id', function(req, res){
	const ID = jwt.verify(req.headers.authorization);

	if (ID != -1) {
		console.log(ID);
		//1. project_id로  project 조회
		//2. project의 user_idx == ID가 일 경우, 프로젝트 삭제
		//3. != 일 경우 access denied
        project.remove({_id: req.params.project_id }, function(err, output){
	        if(err) {
	        	console.log(err);
	        	return res.status(500).json({ error: "database failure" });
	        }

	        /* ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
	        if(!output.result.n) return res.status(404).json({ error: "book not found" });
	        res.json({ message: "book deleted" });
	        */

	        res.status(201).send({
	        	message : "delete success"
	        });	

	    });

    } else {
        res.status(401).send({
            message: "access denied"
        });
    }
});

module.exports = router;