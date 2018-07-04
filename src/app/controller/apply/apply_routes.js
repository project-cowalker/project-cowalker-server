const express = require('express');
const router = express.Router();

//apply
const postApply = require('./postApply');
router.use('/apply', postApply);

//signup
const getApply = require('./getApply');
router.use('/apply', getApply);

module.exports = router;
