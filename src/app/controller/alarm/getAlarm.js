const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
const alarm = require('../../model/schema/alarm');
let alarmRes = require('../../model/res/alarmRes');

router.get('/', async (req, res, next) => {
    const ID = jwt.verify(req.headers.authorization);   

    let result;

    if(ID != -1) {
        
        try {
            result = await alarm.find({user_idx : ID});
        }catch(err) {
            return res.status(405).send({
                message: 'get alarm fail'
            });
        }
        if(result.length != 0)
            return res.status(200).send({
                message: 'get alarm success',
                result: alarmRes.res(result)
            });
        else 
            return res.status(200).send({
                message: 'no alarm list'
            });
    }else {
        return res.status(401).send({
            message: "access denied"
        });
    }

});

module.exports = router;
