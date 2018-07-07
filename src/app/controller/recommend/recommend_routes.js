const express = require('express');
const router = express.Router();

//getRecommend
const getRecommend = require('./getRecommend');
router.use('/recommend', getRecommend); 

//question
const postRecommend = require('./postRecommend');
router.use('/recommend', postRecommend); 

module.exports = router;
