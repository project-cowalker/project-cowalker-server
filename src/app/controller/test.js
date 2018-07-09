const express = require('express');
const router = express.Router();
const alarm = require('../module/alarm.js');
const point = require('../module/point.js');

router.get('/', async (req, res, next) => {
    console.log("내 프로젝트에 누군가 지원서 작성");
    alarm.apply("5b3d672e71a63d08fc84648c", 2);
    console.log("추천자가 프로젝트에 참여");
    alarm.recommendation(9, "5b3f3f28a989031a3ef84e3c", 2);
    console.log("합격");
    alarm.join("5b3d672e71a63d08fc84648c", 1);
    console.log("불합격");
    alarm.join("5b3d672e71a63d08fc84648c", 2);
    console.log("프로젝트 추천");
    //5b3d672e71a63d08fc84648c
    point.recommendProject("5b3d672e71a63d08fc84648c", 1);
    console.log("모집 공고 추천");
    point.recommendRecruit('5b3ded48513a465fc039e68b', 1);
    //console.log("합류");
    //console.log("추천 합류");
    //console.log("공유 합류");
    res.status(201).send();
});

module.exports = router;
