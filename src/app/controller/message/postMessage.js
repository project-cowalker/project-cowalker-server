const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
const message = require('../../model/schema/message');

router.post('/:to_idx', async (req, res, next) => {
    const ID = jwt.verify(req.headers.authorization);
    
    if (ID != -1) {
        message.create({
            to_idx : req.params.to_idx,
            from_idx : ID,
            contents : req.body.contents
        }, function(err, obj){
            if(err){
                return res.status(500).send({
                    message: 'send message fail'
                });
            }
            res.status(201).send({
                message: 'send message success'
            });
        });
        return; 
    }

    res.status(401).send({
        message: "access denied"
    });

});

module.exports = router;
