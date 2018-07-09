const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
const db = require('../../module/pool.js');
const myIntro = require('../../model/schema/myIntro');

router.get('/', async (req, res, next) => {
    const ID = jwt.verify(req.headers.authorization);
    const QUERY = 'select * from USER where user_idx = ?';
    
    let data = new Array();
    
    if (ID != -1) {
        let user = await db
    }

    res.status(401).send({
        message: "access denied"
    });

});

module.exports = router;
