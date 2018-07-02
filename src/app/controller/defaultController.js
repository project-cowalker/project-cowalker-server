const express = require('express');
const router = express.Router();

const db = require('../module/pool.js');

router.get('/', async(req, res) => {
    const findAlll = "select * from user"
    let data = await db.FindAll(findAlll);
    console.log(findAlll);
    res.status(200).send(data);
});

module.exports = router;
