const express = require('express');
const router = express.Router();

//쪽지 보내기
const postMessage = require('./postMessage');
router.use('/message', postMessage);

//쪽지 조회
const getMessage = require('./getMessage');
router.use('/message', getMessage);

//쪽지 삭제
const deleteMessage = require('./deleteMessage');
router.use('/message', deleteMessage);

module.exports = router;
