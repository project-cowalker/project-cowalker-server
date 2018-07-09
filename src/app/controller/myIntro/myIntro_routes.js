const express = require('express');
const router = express.Router();

//내 소개 페이지 조회
const getMyIntro = require('./getMyIntro');
router.use('/intro', getMyIntro);

//내 소개 페이지 작성
const postMyIntro = require('./postMyIntro');
router.use('/intro', postMyIntro);

//내 소개 페이지 수정
const putMyIntro = require('./putMyIntro');
router.use('/intro', putMyIntro);

//내 소개 페이지 삭제
const deleteMyIntro = require('./deleteMyIntro');
router.use('/intro', deleteMyIntro);

module.exports = router;
