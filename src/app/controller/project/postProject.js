const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
let project = require('../../model/schema/project');
const upload = require('../../../config/multer');
const db = require('../../module/pool.js');


var multiUpload = upload.fields([{ name: 'img'}])

router.post('/', multiUpload, async (req, res) => {

    const ID = jwt.verify(req.headers.authorization);

    let tempArray = [];
    //console.log(req.files);
    if (req.files === {}){
	    for (let i = 0 ; i < req.files.img.length ; i++) {
	    	tempArray.push(req.files.img[i].location);
	//    	console.log("tempArray : ", tempArray);
		}
	}
//	console.log(tempArray);
    if (ID != -1) {
        project.create({
            title: req.body.title,
            summary: req.body.summary,
            area: req.body.area,
            department: req.body.department,
            aim: req.body.aim,
            explain: req.body.explain,
            // user_idx : req.body.user_idx
            user_idx: ID,
            img_url: tempArray

        }, async function (err, docs) {
            if (err) {
                console.log(err);
                res.status(405).send({
                    message: "fail"
                });
            } else {
                //res.status(200).send(docs);
                console.log(docs._id);
                const project_idx = docs.id;
                const member_idx = ID;
                const position = "PM";
    
                const QUERY = 'INSERT INTO TEAM (project_idx, member_idx, position) VALUES (?, ?, ?)';
                let inserted = await db.execute4(QUERY,project_idx, member_idx, position);
                
                if (inserted == undefined) {
                  res.status(405).send({
                    message: 'fail'
                 });
                } else {
                    res.status(201).send({
                        message: "success"
                   }); 
                }
            }
        });

    } else {
        res.status(401).send({
            message: "access denied"
        });
    }


});

module.exports = router;

    