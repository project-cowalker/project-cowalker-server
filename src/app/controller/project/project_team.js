const express = require('express');
const router = express.Router();
const db = require('../../module/pool.js');
const jwt = require('../../module/jwt.js');

router.get('/:project_idx', async function (req, res) {
	let project_idx = req.params.project_idx;
    //console.log('ID : ',ID);

    const team = 'SELECT TEAM.member_idx,TEAM.position,USER.profile_url from TEAM,USER where TEAM.member_idx=USER.user_idx and project_idx=?';
    // const profile = 'select * from USER where user_idx = ?';
    // var data = new Array();

    if(project_idx) {
      let member = await db.execute2(team, project_idx);

        if(member){ 
	        res.status(200).send({
	          message : "success",
	          member : member
	        });
        }else {
          res.status(405).send({
            error : "Get data fail"
        });

        }

    	
    }else {
    	res.status(401).send({
            message: "project doesn't exist"
        });
    }
});

module.exports = router;