const express = require('express');
const router = express.Router();
const alarm = require('../module/alaram.js');

router.get('/', async (req, res, next) => {
    console.log("test");
    alarm.apply("5b3d672e71a63d08fc84648c", 2);
    console.log("추천");
    alarm.recommendation(9, "5b3f3f28a989031a3ef84e3c", 2);
    console.log(1);
    alarm.join("5b3d672e71a63d08fc84648c", 1);
    console.log(2);
    alarm.join("5b3d672e71a63d08fc84648c", 2);
});

module.exports = router;
