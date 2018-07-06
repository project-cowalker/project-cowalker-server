const express = require('express');
const router = express.Router();
const db = require('../../module/pool.js');
const jwt = require('../../module/jwt.js');


// 나의 마이페이지 get
router.get('/', async(req, res) => {
    const ID = jwt.verify(req.headers.authorization);
    const profile = 'select * from USER where user_idx = ?';
    
    if(ID != -1) {
        let result = await db.execute2(profile, ID);

        //console.log(result);
        
        res.status(200).send({

        	profile_url : result[0].profile_url,
        	background_url : result[0].background_url,
        	email : result[0].email,
       		name : result[0].name,
       		point : result[0].point,
       		position : result[0].position,
       		introduce : result[0].introduce,
       		portfolio_url : result[0].portfolio_url,
       		aim : result[0].aim,
       		department : result[0].department,
       		area : result[0].area

        });
    }else {
        res.status(401).send({
            message : "access denied"
        });
    }
});



// 다른 사람 
router.get('/:user_idx', async(req, res) => {
	
	const ID = jwt.verify(req.headers.authorization);
	
	let user_idx=req.params.user_idx;

    const profile = 'select * from USER where user_idx = ?';
    let user_status = "null";
   
    if(user_idx) {
    	//참여멤버에서 나의 페이지로 들어올 때 
    	if(ID == user_idx){
    		let result = await db.execute2(profile, ID);
        
	        res.status(200).send({

	        	profile_url : result[0].profile_url,
	        	background_url : result[0].background_url,
	        	email : result[0].email,
	       		name : result[0].name,
	       		point : result[0].point,
	       		position : result[0].position,
	       		introduce : result[0].introduce,
	       		portfolio_url : result[0].portfolio_url,
	       		aim : result[0].aim,
	       		department : result[0].department,
	       		area : result[0].area,
	       		user_status : "나의 페이지"

	        });

	    // 참여멤버에서 타인 페이지 들어갈 때 
    	}else{
    		let result = await db.execute2(profile, user_idx);
        
	        res.status(200).send({

	        	profile_url : result[0].profile_url,
	        	background_url : result[0].background_url,
	        	email : result[0].email,
	       		name : result[0].name,
	       		point : result[0].point,
	       		position : result[0].position,
	       		introduce : result[0].introduce,
	       		portfolio_url : result[0].portfolio_url,
	       		aim : result[0].aim,
	       		department : result[0].department,
	       		area : result[0].area,
	       		user_status : "다른 사람의 페이지"

	        });

    	}
    }else {
    	res.status(401).send({
            message: "access denied"
        });
    }
});


module.exports = router;