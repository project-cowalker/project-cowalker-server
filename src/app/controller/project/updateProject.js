const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
let project = require('../../model/schema/project');

router.put('/:project_id', function(req, res){
    project.update({ _id: req.params.project_id }, { $set: req.body }, function(err, output){
        if(err) res.status(500).json({ error: 'database failure' });
        console.log(output);
        if(!output.n) return res.status(404).json({ error: 'project not found' });
        res.json( { message: 'success' } );
    })
});

module.exports = router;