const express = require('express');
const router = express.Router();

//question
const question = require('./getQuestion');
router.use('/question', question); 

module.exports = router;
