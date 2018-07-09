const express = require('express');
const router = express.Router();
const myIntro = require('../../model/schema/myIntro');

router.delete('/:intro_id', async (req, res, next) => {
   
    myIntro.remove({_id: req.params.intro_id }, function(err, output){
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
