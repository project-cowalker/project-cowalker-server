const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
const apply = require('../../model/schema/apply');

router.delete('/:apply_idx', async(req, res) => {
    const ID = jwt.verify(req.headers.authorization);

    if(ID != -1){
        apply.remove({
            _id : req.params.apply_idx, 
            applicant_idx : ID
        }, function(err, applies){
            if(err) 
                return res.status(500).send({message: 'database failure'});
            
            res.status(201).send({
                message: "success"
            });
            
            return;
        });
    } else {
        res.status(401).send({
            message: "access denied"
        });
    }
});

module.exports = router;