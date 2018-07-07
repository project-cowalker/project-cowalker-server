const express = require('express');
const router = express.Router();

//쪽지 보내기
const postMessage = require('./postMessage');
router.use('/message', postMessage);

module.exports = router;
