const express = require('express');
const router = express.Router();

// postRecruit 
const home = require('./home');
router.use('/home', home);

module.exports = router;
