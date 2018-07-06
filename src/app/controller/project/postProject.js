const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
let project = require('../../model/schema/project');
const upload = require('../../../config/multer');
const pool = require('../../module/pool.js');


var multiUpload = upload.fields([{ name: 'img'}]);

router.post('/', multiUpload, async (req, res, next) => {

    const ID = jwt.verify(req.headers.authorization);

    let tempArray = [];
    if (req.files.img){
	    for (let i = 0 ; i < req.files.img.length ; i++) {
	    	tempArray.push(req.files.img[i].location);
		}
	}
    if (ID != -1) {
        await project.create({
            title: req.body.title,
            summary: req.body.summary,
            area: req.body.area,
            department: req.body.department,
            aim: req.body.aim,
            explain: req.body.explain,
            user_idx: ID,
            img_url: tempArray
        }, async function (err, docs) {
            if (err) {
                res.status(405).send({
                    message: "fail"
                });
                return;
            } 
                let project_idx = docs._id.toString();
                let member_idx = ID;
                let position = 'PM';

                const QUERY = 'INSERT INTO TEAM (project_idx, member_idx, position) VALUES (?, ?, ?)';
                let inserted = await pool.execute4(QUERY, project_idx, member_idx, position);

                if (!inserted) {
                  res.status(405).send({
                    message: 'team insert fail'
                 });
                } else {
                    res.status(201).send({
                        message: "success"
                   }); 
                }
            
        });


    } else {
        res.status(401).send({
            message: "access denied"
        });
    }


});

module.exports = router;

    