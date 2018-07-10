const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
const myIntro = require('../../model/schema/myIntro');
let introRes = require('../../model/res/introRes');

router.get('/:user_idx', async (req, res, next) => {

    let result;
    
    try {
        result = await myIntro.find({user_idx : req.params.user_idx});
    }catch(err) {
        return res.status(405).send({
            message: 'get myIntro fail'
        });
    }
    return res.status(200).send({
        message: "success",
        result: introRes.res(result),
    });

});

router.get('/', async (req, res, next) => {
    const ID = jwt.verify(req.headers.authorization);

    let result;

    try {
        result = await myIntro.find({user_idx : ID});
    }catch(err) {
        return res.status(405).send({
            message: 'get myIntro fail'
        });
    }

    return res.status(200).send({
        message: "success",
        result: introRes.res(result),
    });
});

module.exports = router;
