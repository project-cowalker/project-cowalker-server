const express = require('express');
const router = express.Router();

//쪽지 보내기
const postMessage = require('./postMessage');
router.use('/message/to', postMessage);

//쪽지 삭제
const deleteMessage = require('./deleteMessage');
router.use('/message', deleteMessage);

//쪽지 리스트 조회(대화 리스트)
const getMessageList = require('./getMessageList');
router.use('/message/list', getMessageList);

//쪽지 내역 조회(대화 내용)
const getMessage = require('./getMessage');
router.use('/message/partner', getMessage);

module.exports = router;
