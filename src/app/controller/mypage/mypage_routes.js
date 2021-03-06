const express = require('express');
const router = express.Router();

const updateMypage = require('./updateMypage');
router.use('/mypage', updateMypage);

const getMypage = require('./getMypage');
router.use('/mypage', getMypage);

const updateProfile = require('./updateProfileUrl');
router.use('/mypage', updateProfile);

module.exports = router;