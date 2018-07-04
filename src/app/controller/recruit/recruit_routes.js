const express = require('express');
const router = express.Router();


//모집
const create = require('./recruit_create');
router.use('/recruit', create);

// 
const getRecruit=require('./getRecruit');
router.use('/recruit',getRecruit);

module.exports = router;
