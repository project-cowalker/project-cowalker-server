const express = require('express');
const router = express.Router();

// postRecruit 
const home = require('./getHome');
router.use('/home', home);

module.exports = router;
