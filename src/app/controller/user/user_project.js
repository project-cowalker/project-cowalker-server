const express = require('express');
const router = express.Router();
const db = require('../../module/pool.js');
const jwt = require('../../module/jwt.js');
const hash = require('../../module/hash.js');
let project = require('../../model/schema/project');

router.get('/', async function (req, res) {

	const ID = jwt.verify(req.headers.authorization);
    console.log('ID : ',ID);

    const QUERY = 'select * from USER where user_idx = ?';
    var data = new Array();

    if (ID != -1) {
        project.find({
            user_idx : ID
        }, async function (err, result) {
            if (err) {
                return res.status(500).send({
                    message: "get project fail"
                });
            } else {
                
                for (let i = 0; i < result.length; i++) {
                    let project_user_id = result[0].user_idx;
                    let select_project = await db.execute2(QUERY, ID);
                    var temp = {
                        title: "",
                        summary: "",
                        area: "",
                        department: "",
                        aim: "",
                        explain: "",
                        create_at: "",
                        img_url: []
                    }
                    temp.title = result[i].title;
                    temp.summary = result[i].summary;
                    temp.area = result[i].area;
                    temp.department = result[i].department;
                    temp.aim = result[i].aim;
                    temp.explain = result[i].explain;
                    temp.create_at = result[i].create_at;
                    temp.img_url = result[i].img_url;
                    data.push(temp);
                 
                }
                 res.status(201).send({
                        message: "success",
                        result: data
                    });
                    return;
                }
            });
         }else{       
	      res.status(401).send({
	        message:"access denied"
	      });
   	 	}
            


});

module.exports = router;