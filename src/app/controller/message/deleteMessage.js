const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
const message = require('../../model/schema/message');

router.delete('/:_id', async (req, res, next) => {
    const ID = jwt.verify(req.headers.authorization);

    if (ID != -1) {
        message.remove({
            from_idx : req.params._id
        }, function(err, obj){
            if(err){
                return res.status(500).send({
                    message: 'delete message fail'
                });
            }
            res.status(200).send({
                message: 'delete message success'
            });
        });
        return; 
    }

    res.status(401).send({
        message: "access denied"
    });

});

module.exports = router;
