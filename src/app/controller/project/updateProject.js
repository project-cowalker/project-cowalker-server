const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
const upload = require('../../../config/multer');
let project = require('../../model/schema/project');

var multiUpload = upload.fields([{ name: 'img'}]);

router.put('/:project_id', multiUpload, async (req, res, next) => {
    
    let tempArray = [];

    if (req.files.img){
	    for (let i = 0 ; i < req.files.img.length ; i++) {
	    	tempArray.push(req.files.img[i].location);
        }
    }
    
    project.update({ _id: req.params.project_id }, { $set: req.body, img_url: tempArray }, function(err, output){
        if(err) res.status(500).json({ error: 'database failure' });
        if(!output.n) return res.status(404).json({ error: 'project not found' });
        res.json( { message: 'success' } );
    })
});

module.exports = router;