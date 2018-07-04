const express = require('express');
const router = express.Router();
const db = require('../../module/pool.js');
const jwt = require('../../module/jwt.js');
const hash = require('../../module/hash.js');
let project = require('../../model/schema/project');

//전체 긁어오기
// router.get('/', async(req, res) => {
//    project.find(function(err, projects){
//        if(err) return res.status(500).send({error: 'database failure'});
//        res.json(projects);
//    })
// });

router.get('/:project_id', function(req, res){

	project.findOne({_id: req.params.project_id}, function(err, project){
	        if(err) return res.status(500).json({error: err});
	        if(!project) return res.status(404).json({error: 'project not found'});
	        res.json(project);
    })
});



module.exports = router;