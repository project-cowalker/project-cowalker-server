const express = require('express');
const router = express.Router();

const updateMypage = require('./updateMypage');
router.use('/mypage', updateMypage);


module.exports = router;