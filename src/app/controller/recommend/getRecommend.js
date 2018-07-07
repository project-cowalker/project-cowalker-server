const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
const apply = require('../../model/schema/apply');

router.get('/', async (req, res, next) => {
    const ID = jwt.verify(req.headers.authorization);

    if(ID != -1){
        if(err) {
            res.status(405).send({
                message: "fail"
            });
            return;
        }
        res.status(201).send({
            message: "success"
        });
    } else {
        res.status(401).send({
            message: "access denied"
        });
    }
});

module.exports = router;