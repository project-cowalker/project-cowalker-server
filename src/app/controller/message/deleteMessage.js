const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
const message = require('../../model/schema/message');

router.delete('/', async (req, res, next) => {
    const ID = jwt.verify(req.headers.authorization);
    if (ID != -1) {
        message.create({
            to_idx : ID,
            from_idx : req.body.from_idx,
            read : false,
            content : req.body.content
        }, function(err, obj){
            if(err){
                console.log(err);
                return res.status(405).send("실패");
            }
            res.status(200).send(obj);
        });
        return; 
    }

    res.status(401).send({
        message: "access denied"
    });

});

module.exports = router;
