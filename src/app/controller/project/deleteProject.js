const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
let project = require('../../model/schema/project');


router.delete('/:project_id', function(req, res){
	project.remove({_id: req.params.project_id }, function(err, output){
        if(err){
			res.status(405).json({ error: "database failure" });
		}else{
        	if(output.n === 0){
	        res.status(400).send({
		       	error : "Bad Request"
		    });
		    } else{
		    	res.status(201).send({
			       	message : "delete success"
			    });
		    }
	    }
    });
});



module.exports = router;