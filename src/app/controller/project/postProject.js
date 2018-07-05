const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
let project = require('../../model/schema/project');
const upload = require('../../../config/multer');

var multiUpload = upload.fields([{ name: 'img'}])

router.post('/', multiUpload, async (req, res) => {
    const ID = jwt.verify(req.headers.authorization);

    let tempArray = [];
    //console.log(req.files);
    if (req.files !== {}){
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
            user_idx: ID,
            img_url: tempArray

        }, function (err, docs) {
            if (err) {
                console.log(err);
                res.status(405).send({
                    message: "fail"
                });
            } else {
                //res.status(200).send(docs);
                res.status(200).send({
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