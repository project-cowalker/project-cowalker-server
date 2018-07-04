const express = require('express');
const router = express.Router();


///recruit/create : 팀원 모집
const create = require('./recruit_create');
router.use('/recruit', create);

module.exports = router;
